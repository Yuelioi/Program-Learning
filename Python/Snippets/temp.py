import os
import re

import requests
from bs4 import BeautifulSoup


def addTitle(root_dir, ext=None):
    """
    :param root_dir: 文件夹
    :param ext: 筛选后缀
    :return: 无
    filter: 过滤.开头文件  过滤readme 筛选md文件
    """
    fullNames_list = []
    paths_list = []
    i = 0
    regex = "[0-9]{1,3}"
    for parent, _, fileNames in os.walk(root_dir):
        # 文件排序
        fileNames.sort(key=lambda x: int(re.search(regex, x).group(
            0) if re.search(regex, x) else 0))  # 文件名 按数字排序

        for fullName in fileNames:
            # 过滤
            if fullName.startswith('.'):  # 去除隐藏文件
                continue
            if fullName.lower().startswith('readme'):
                continue

            if ext:  # 根据后缀名搜索
                if fullName.endswith(tuple(ext)):
                    i += 1
                    name = fullName.rsplit(".", 1)[0]

                    filePath = os.path.join(parent, fullName)
                    with open(filePath, "r+", encoding='utf-8') as f:
                        ff = f.read()
                        f.seek(0)
                        f.truncate()
                        f.write(addTitle(name, i, "AE表达式") + ff)

            else:
                ...


def addTitle(name, index, tag):
    return f"""---
title: {name}
order: {index}
category:
  - {tag}
---
    """


def loopFolder(root_dir):
    for parent, _, fileNames in os.walk(root_dir):
        # 文件排序
        parent = '"' + parent.replace(r"H:\Scripting\Vue Projects\docs_yuelili_com\docs",
                                      "").replace("\\", "/") + '/"' + ':"structure",'
        print(parent)
        # i= 0
        # for fullName in fileNames:
        #     # 过滤
        #     if fullName.startswith('_'):  # 去除隐藏文件
        #         continue
        #     if fullName.lower().startswith('readme'):
        #         continue
        #
        #     else:
        #
        #         i += 1
        #         print(fullName)


def getCat(URL, ROOT):
    ...
    names = []
    links = []

    htmlfile = requests.get(URL)
    htmlfile.encoding = 'utf-8'
    soup = BeautifulSoup(htmlfile.text, 'html.parser')
    cats = soup.findAll(class_='docs-single-cat-wrap')
    for cat in cats:
        cat_title = cat.find(class_='docs-cat-heading').text
        if not os.path.exists(ROOT + cat_title):
            os.makedirs(ROOT + cat_title)
        print(cat_title)
        webs = cat.findAll('li')
        i = 0
        for web in webs:
            i = i+1
            title = web.find("a").text
            print("正在处理:" + title)
            link = web.find("a")['href']
            print(link)
            content = html2md(link)

            content = addTitle(
                title, i, "AE") + content.replace(r"[ __ 展开本节中英对照](javascript:void\(0\))\n", "")

            with open(ROOT + "/" + cat_title + "/" + title + ".md", "w+", encoding="utf-8") as f:
                f.write(content)


def html2mdBug(input):
    def replace_filter(matched):
        """处理链接换行问题"""
        inputStr = matched.group("group")
        inputStr = inputStr.replace("\n", "")
        return inputStr

    def replace_filter2(matched):
        """正则处理表格少|"""
        input_content = matched.group("group")
        return "|" + input_content.strip() + "|"

    def replace_filter3(matched):
        """正则处理图片在一行问题"""
        input_content = matched.group("group")

        return "\n" + input_content
    input = re.sub("(?P<group>(http.+-\n))", replace_filter, input)
    input = re.sub("(?P<group>(.+\|.+\|.+))", replace_filter2, input)
    input = re.sub(r"(?P<group>.+\)(\!\[].+))", replace_filter3, input)

    return input


def html2md(URL):
    import html2text as ht

    text_maker = ht.HTML2Text()
    text_maker.bypass_tables = False

    htmlfile = requests.get(URL)
    htmlfile.encoding = 'utf-8'
    soup = BeautifulSoup(htmlfile.text, 'html.parser')
    content = str(soup.find(class_='betterdocs-content'))

    text = text_maker.handle(content)
    text = html2mdBug(text)

    return text


if __name__ == '__main__':

    ROOT = r"F:\\obsidian_notes\\TEST\\"

    URL = "https://www.yuelili.com/docs/ae-basic/shape/"
    getCat(URL, ROOT)
