from pathlib import Path
import re
from pypdf import PdfReader
from collections import defaultdict
import pandas as pd
from langchain.document_loaders import UnstructuredFileLoader, UnstructuredWordDocumentLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.docstore.document import Document
from django.conf import settings
def _merge_intervals(intervals):
    stack = []
    stack.append(intervals[0])
    for i in intervals[1:]:
        if stack[-1][0] <= i[0] <= stack[-1][-1]:
            stack[-1][-1] = max(stack[-1][-1], i[-1])
        else:
            stack.append(i)
 
    return stack
 

def _generate_pdf_source(sources):
    for source in sources:
        actual_source, page = source.metadata['source'].split('^')
        source.metadata = {'source': actual_source, 'page': int(page)}

    pdf_path = sources[0].metadata['source']
    pdf_page_groups = defaultdict(list)
    reader = PdfReader(pdf_path)
    text_splitter=RecursiveCharacterTextSplitter.from_tiktoken_encoder(
        encoding_name="cl100k_base",
        chunk_size=settings.CONTEXT_CHUNK_SIZE,
        chunk_overlap=settings.CONTEXT_CHUNK_SIZE_OVERLAP,
    )

    for source in sources:
        pdf_page_groups[source.metadata['page']].append(source)

    spans = []
    for page_num, page_sources in pdf_page_groups.items():
        page = reader.pages[page_num]
        docs = [Document(page_content=page.extract_text())]
        sub_pages = text_splitter.split_documents(docs)

        for orig_sub_page in sub_pages:
            color = 'background-color: #ffff66' if any(orig_sub_page.page_content == src.page_content for src in page_sources) else ''
            spans.append(f"""<span style="white-space: pre-line;{color}">{orig_sub_page.page_content}</span>""")

    spans = '\n'.join(spans)
    html = f"""
    <html>
    <body>
        {spans}
    </body>
    </html>
    """
    return html


def _generate_csv_source(sources):
    for source in sources:
        actual_source, row = source.metadata['source'].split('^')
        source.metadata = {'source': actual_source, 'row': int(row)}

    sources = sorted(sources, key=lambda x: x.metadata['row'])
    file_path = sources[0].metadata['source']
    num_rows = pd.read_csv(file_path, usecols=[0]).shape[0]
    sources_row_range = [[max(0, source.metadata['row']-5), min(num_rows-1, source.metadata['row']+5)] for source in sources]
    sources_row_range = _merge_intervals(sources_row_range)
    
    df = pd.read_csv(file_path)
    highlight_rows = [source.metadata['row'] for source in sources]
    df = df.style.apply(lambda x: ['background-color: #ffff66' if x.name in highlight_rows else '' for i in x], axis=1)


    table_styles = [{'selector': 'table', 'props': [('border-collapse', 'collapse')]},
                {'selector': 'th, td', 'props': [('border', '1px solid black')]},
                {'selector': 'th', 'props': [('background-color', '#f2f2f2')]}]

    df.set_table_styles(table_styles)
    return df.to_html()


def _generate_text_source(sources):
    file_path = sources[0].metadata['source']

    file_contents = UnstructuredFileLoader(file_path).load()[0].page_content

    spans = []
    for source in sources:
        search_text = source.page_content
        find_ix = file_contents.find(search_text) 
        start_ix = max(0, find_ix - 20)
        end_ix = min(len(file_contents), find_ix + len(search_text) + 20)

        span = f"""<span style="white-space: pre-line">{file_contents[start_ix:find_ix]}<span style="background-color: #ffff66">{search_text}</span>{file_contents[find_ix+len(search_text):end_ix+1]}</span>"""
        spans.append(span)

    spans = '\n'.join(spans)
    html = f"""
    <html>
    <body>
        {spans}
    </body>
    </html>
    """
    return html


def _generate_website_source(sources):
    website_link = sources[0].metadata['source']

    spans = '\n'.join(f"<span style='white-space: pre-line'>{source.page_content}</span>" for source in sources)

    html = f"""<html><body><a href="{website_link}">{website_link}</a><br>{spans}</body></html>"""
    return html

def _generate_doc_source(sources):
    doc_path = sources[0].metadata['source']
    pages = UnstructuredWordDocumentLoader(str(doc_path)).load_and_split(
        text_splitter=RecursiveCharacterTextSplitter.from_tiktoken_encoder(
            encoding_name="cl100k_base",
            chunk_size=settings.CONTEXT_CHUNK_SIZE,
            chunk_overlap=settings.CONTEXT_CHUNK_SIZE_OVERLAP,
        )
    )

    spans = []
    for source in sources:
        i = 0
        while i < len(pages):
            if pages[i].page_content == source.page_content:
                span = f"""<span style="white-space: pre-line">{pages[i-1].page_content if i > 0 else ''}<span style="background-color: #ffff66">{source.page_content}</span>{pages[i+1].page_content if i < (len(pages)-1) else ''}</span>"""
                spans.append(span)
                break
            i += 1

    spans = '\n'.join(spans)
    html = f"<html><body>{spans}</body></html>"

    return html


def generate_sources(sources):
    new_sources = []
    source_groups = {}
    source_groups = defaultdict(list)

    for source in sources:
        source_groups[source.metadata['source']].append(source)

    for source in source_groups:
        source = Path(source)

        if source.is_file():
            suffix = source.suffix
            
            if suffix == '.pdf':
                new_source = _generate_pdf_source(source_groups[str(source)])
            elif suffix == '.csv':
                new_source = _generate_csv_source(source_groups[str(source)])
            elif suffix == '.txt':
                new_source = _generate_text_source(source_groups[str(source)])
            elif suffix in ('.doc', '.docx'):
                new_source = _generate_doc_source(source_groups[str(source)])
        else:
            new_source = _generate_website_source(source_groups[str(source)])

        new_sources.append(new_source)
    
    return new_sources
