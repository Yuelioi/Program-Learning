
import os
from pathlib import Path


def loop_folder(root_dir):
    """
    获取文件名称
    root : 所在文件夹(完整路径)
    dirs: 当前文件夹子文件夹列表
    files: 当前文件夹子文件列表
    """

    for root, dirs, files in os.walk(root_dir + "\\final"):
        for file in files:
            print(file)


def loop_folder_new(folder_path):
    # 遍历文件夹中的所有文件和子文件夹
    for entry in os.scandir(folder_path):
        print(entry.name)
        if entry.is_dir():
            loop_folder_new(folder_path)


root_dir = "E:\Project\docs_ue\测试"
