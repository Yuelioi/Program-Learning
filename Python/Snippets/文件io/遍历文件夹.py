
import os
from pathlib import Path


def get_file_name(root_dir):
    """
    获取文件名称
    root : 所在文件夹(完整路径)
    dirs: 当前文件夹子文件夹列表
    files: 当前文件夹子文件列表
    """
<<<<<<< HEAD
    for root, dirs, files in os.walk(root_dir + "\\final"):
        for file in files:
            print(file)
            enRoot = root.replace(r"H:\Scripting\Vue Projects\docs_ue\docs\final",
                                  r"H:\Scripting\Vue Projects\docs_ue\docs\en")
            with open(enRoot + "\\" + file, "r+", encoding='utf-8') as f:
                enContent = f.readlines()[1:]

            with open(root + "\\" + file, "r+", encoding='utf-8') as f2:
                file_content = f2.read()
                f2.seek(0)
                f2.truncate()
                f2.write( (file_content + "\n<hr>\n" + "".join(enContent)).replace("$-","/uploads/projects/ue-bluprint/") )


path = r"H:\Scripting\Vue Projects\docs_ue\docs"

get_file_name(path)
=======
    for root, dirs, files in os.walk(root_dir):
        for file in files:
          # if Path(file).suffix != ".csv":
            os.rename(root+ "/" + file,root + "/" + file.split(".")[0]+".md")
        
get_file_name("E:\Project\docs_ue\测试")

root_dir = "E:\Project\docs_ue\测试"
>>>>>>> 50b2e60efe65f7d0441c9c296f8a250ca2eb911c
