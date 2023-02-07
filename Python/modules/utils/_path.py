from pathlib import Path
from os import path

file_path = "H:/Scripting/Vue/xx.html"
fold_path = "H:/Scripting/Vue"


# basename 实际名称
path.basename(file_path)  # xx.html
path.basename(fold_path)  # Vue

# abspath 绝对路径
path.abspath(file_path)  # H:\Scripting\Vue\xx.html
path.abspath(fold_path)  # H:\Scripting\Vue

# dirname 父级路径
path.dirname(file_path)  # H:/Scripting/Vue
path.dirname(fold_path)  # H:/Scripting

# exist 路径是否存在
path.exists(file_path)
path.exists(fold_path)

# isdir isfile 是否为文件夹或者文件
path.isfile(file_path)  # 不存在也是false
path.isdir(fold_path)  # 不存在也是false

# join 拼接
# print(path.join(fold_path, "xx"))  # H:/Scripting/Vue\xx

## ----------pathlib----------##
# https://docs.python.org/3.4/library/pathlib.html#pathlib.PurePath

# join
Path(fold_path, "11.html")  # H:\Scripting\Vue\11.html
Path(fold_path).joinpath("11.html")

# 父文件夹
Path(fold_path).parent  # H:\Scripting
Path(file_path).parent  # H:\Scripting\Vue

# 名称
Path(fold_path).name  # Vue
Path(file_path).name  # xx.html


fp = Path(file_path)
fdp = Path(fold_path)

# 查询
fp.exists()  # 是否存在
fp.is_dir  # 是否为文件夹
fp.is_file  # 是否为文件

# 属性
fp.suffix  # 后缀 带.
fp.stem  # 去掉后缀的名字
fp.resolve()  # 完整路径

# 处理
fp.as_posix()  # 改为/分割: H:/Scripting/Vue/xx.html
fp.as_uri()    # file:///H:/Scripting/Vue/xx.html
fp.with_name("yy.html")  # 只替换文件名 H:\Scripting\Vue\yy.html
fp.with_stem("yy")       # 只替换文件名(不带后缀)
fp.with_suffix(".py")     # 只替换后缀

# 方法

# 文件夹创建以及移动 已存在则无法创建

# fdp.joinpath("123").mkdir()  # H:/Scripting/Vue/123
# fdp.rename(Path("H:\Scripting\V2"))
# fdp.replace(Path("H:\Scripting\V2"))

# 文件创建
# fp.touch()

# print(str(Path("./1.png").resolve().as_uri()))
print(str((Path().parent).resolve() / "data" / "images" / "yueli-bot"))

print(str((Path().parent).resolve(
) / "data/fonts/SourceHanSansCN-Medium"))
