import html2text as ht
import requests
from bs4 import BeautifulSoup


def html2md(URL):

    text_maker = ht.HTML2Text()
    text_maker.bypass_tables = False
    # 获取网页内容
    htmlfile = requests.get(URL)
    htmlfile.encoding = 'utf-8'
    soup = BeautifulSoup(htmlfile.text, 'html.parser')
    content = str(soup.find(class_='betterdocs-content'))

    text = text_maker.handle(content)
    return text
