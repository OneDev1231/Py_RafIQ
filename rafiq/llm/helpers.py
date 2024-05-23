from pathlib import Path
import math
import pandas as pd
from pypdf import PdfReader
import zipfile, xml.dom.minidom
import os

def get_csv_pages(file_path):
    num_rows = pd.read_csv(file_path, usecols=[0]).shape[0]
    return math.ceil(num_rows / 100)


def get_txt_pages(file_path):
    with open(file_path, 'r') as f:
        return math.ceil(len(f.read().split()) / 500)


def get_pdf_pages(file_path):
    return len(PdfReader(file_path).pages)


def get_document_pages(file_path):
    document = zipfile.ZipFile(file_path)
    dxml = document.read('docProps/app.xml')
    uglyXml = xml.dom.minidom.parseString(dxml)
    return uglyXml.getElementsByTagName('Pages')[0].childNodes[0].nodeValue


def get_pages(file):
    page_func = {'.csv': get_csv_pages, '.pdf': get_pdf_pages, '.txt': get_txt_pages, '.doc': get_document_pages, '.docx': get_document_pages}
    file = Path(file)
    suffix = file.suffix
    pages = page_func[suffix](str(file))
    return pages

def get_file_size(file):
    file_size = os.path.getsize(file) / (1024**2)
    return file_size

def get_suffix(file_path):
    return Path(file_path).suffix