from bs4 import BeautifulSoup
import markdown
import os
import re
from pathlib import Path
summary = ""


def get_sql(name, docs, cat, markdown, docs_url):
    return f"INSERT INTO `ae-expression` ( `name`, `docs`, `cat`, `markdown`, `docs_url`) VALUES ( {name}, {docs}, {cat}, {markdown}, {docs_url});"


def get_content(file_path, docs, cat):

    with open(file_path, "r", encoding='utf-8') as file:
        markdown_text = file.read()
        # print(markdown_text)
        reg = r'^##.+\n[^#]+'
        result = re.findall(reg, markdown_text, re.M)
        for res in result:
            name = res.split("\n\n")[0]
            markdown = "\n".join(res.split("\n\n")[1:])
            # get_sql()
            cat = Path(file_path).name
            print(name.replace("## ", "").replace("(", "").replace(")", ""))
            docs = docs
            cat = cat.replace(".md", "")
            get_sql(name, docs, cat, markdown, "")
            print(markdown)


def print_folder_tree(folder_path, cat=""):
    # 遍历文件夹中的所有文件和子文件夹
    global summary
    global index
    index += 1
    for entry in os.scandir(folder_path):
        if index > 2:
            return
        summary += "\n"
        if entry.is_dir():
            print_folder_tree(entry.path, entry.name)
            ...
        else:
            if entry.name == "summary.md":
                continue
            get_content(entry.path)


# with open('data.txt', "r+", encoding='utf-8') as file:
#     file_content = file.read()
#     file.seek(0)
#     file.truncate()
#     file.write("# Title\n" + file_content)


root_dir = r"H:\Scripting\Vue Projects\docs2_yuelili_com\AE\expression"


# print_folder_tree(root_dir)
# get_content(
#     r"H:\Scripting\Vue Projects\docs2_yuelili_com\AE\expression\General\Global.md")
