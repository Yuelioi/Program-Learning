
import os
from pathlib import Path


def get_file_name(root_dir):
    """
    获取文件名称
    root : 所在文件夹(完整路径)
    dirs: 当前文件夹子文件夹列表
    files: 当前文件夹子文件列表
    """
    for root, dirs, files in os.walk(root_dir):

        for file in files:
          print (1671689900< Path(root).joinpath(file).stat().st_mtime<1671691000  )
        
get_file_name("E:\Project\docs_ue\测试")
