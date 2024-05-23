import os
import pickle
from pathlib import Path

from langchain.document_loaders import CSVLoader, PyPDFLoader, UnstructuredWordDocumentLoader, UnstructuredFileLoader
from langchain.embeddings import OpenAIEmbeddings, CohereEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores.weaviate import Weaviate
import tiktoken
from langchain.document_loaders.base import Document
from langchain.utilities import ApifyWrapper
from langchain.utilities import ApifyWrapper
import os
from django.conf import settings
import weaviate
from langchain.vectorstores.weaviate import Weaviate
from langchain.docstore.document import Document
from rafiq.core.models import Embedding

LOADERS = {".pdf": PyPDFLoader, ".csv": CSVLoader, '.txt': UnstructuredFileLoader, '.doc': UnstructuredWordDocumentLoader, '.docx': UnstructuredWordDocumentLoader}

class WeaviateRafiq(Weaviate):
    def similarity_search(
        self, query: str, k: int = 4, **kwargs
    ):
        if self._embedding is not None:
            embedding = self._embedding.embed_query(query)

        return self.similarity_search_by_vector(embedding, k, **kwargs)



def get_openai_embeddings(pages, api_key):
    embeddings = OpenAIEmbeddings(openai_api_key=api_key)

    COST = 0.0004 / 1000
    enc = tiktoken.get_encoding("cl100k_base")
    total_tokens = sum([len(enc.encode(page.page_content)) for page in pages])
    total_cost = total_tokens * COST
    return embeddings, total_cost


def get_cohere_embeddings(pages, api_key):
    embeddings = CohereEmbeddings(cohere_api_key=api_key)

    COST = 0.001
    total_cost = COST * len(pages)
    return embeddings, total_cost

def _load_website_pages(website_link, max_web_pages):
    apify = ApifyWrapper()
    loader = apify.call_actor(
        actor_id="apify/website-content-crawler",
        run_input={"startUrls": [{"url": website_link}], 'maxPagesPerCrawl': max_web_pages},
        dataset_mapping_function=lambda item: Document(
            page_content=item["text"] or "", metadata={"source": item["url"]}
        ),
    )
    pages = loader.load_and_split(
        text_splitter=RecursiveCharacterTextSplitter.from_tiktoken_encoder(
            encoding_name="cl100k_base",
            chunk_size=settings.CONTEXT_CHUNK_SIZE,
            chunk_overlap=settings.CONTEXT_CHUNK_SIZE_OVERLAP,
        )
    )
    return pages


def create_vector_store(files, website_link, index_name, max_web_pages, embedding_type='OPENAI', reinit=False):
    pages = []
    for file in files:
        file = Path(file)
        if file.is_file():
            loader_cls = LOADERS[file.suffix]
            sub_pages = loader_cls(str(file)).load_and_split(
                text_splitter=RecursiveCharacterTextSplitter.from_tiktoken_encoder(
                    encoding_name="cl100k_base",
                    chunk_size=settings.CONTEXT_CHUNK_SIZE,
                    chunk_overlap=settings.CONTEXT_CHUNK_SIZE_OVERLAP,
                )
            )
            # TODO: this is done because weaviate doesn't work very well with metadata
            if loader_cls is PyPDFLoader:
                for page in sub_pages:
                    page.metadata = {'source': f"{page.metadata['source']}^{page.metadata['page']}"}
            elif loader_cls is CSVLoader:
                for page in sub_pages:
                    page.metadata = {'source': f"{page.metadata['source']}^{page.metadata['row']}"}

            pages.extend(sub_pages)

    if website_link:
        website_pages = _load_website_pages(website_link, max_web_pages)
        pages.extend(website_pages)

    if embedding_type == 'OPENAI':
        embeddings, cost = get_openai_embeddings(pages, api_key=Embedding.objects.all().first().open_api_key)
    else:
        embeddings, cost = get_cohere_embeddings(pages, api_key=Embedding.objects.all().first().cohere_api_key)

    client = weaviate.Client(
        url=os.environ['WEAVIATE_URL']
    )
    if reinit:
        client.schema.delete_class(index_name)

    # TODO: langchain's weaviate doesn't support authorization as of now
    vectorstore = WeaviateRafiq.from_documents(
        pages,
        embeddings,
        index_name=index_name,
        weaviate_url=os.environ['WEAVIATE_URL']
    )
    return vectorstore, cost

