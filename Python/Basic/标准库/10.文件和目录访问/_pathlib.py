from pathlib import Path

file_path = "H:/Scripting/Vue/xx.html"
fold_path = "H:/Scripting/Vue"

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
fp.is_dir()  # 是否为文件夹
fp.is_file()  # 是否为文件
# fp.stat()  # 信息
print(sorted(Path(r"Python\Basic\标准库\10.文件和目录访问").glob('*.py')))  # 通配符解析列表


# 属性
fp.suffix  # 后缀 带.
fp.stem  # 去掉后缀的名字
fp.resolve()  # 完整路径
fp.parts  # 分离成元祖 ('H:\\', 'Scripting', 'Vue', 'xx.html')
fp.parents  # 找爹们 fp.parents[0] --> .parent


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
# mkdir
# rmdir
# rename
# replace
# open
# read_text

# 文件运行路径 并拼接
# Path().absolute() / "data" / "images"
# # 文件当前路径  并拼接
# Path(__file__).parent.resolve() / "1.png"


# print(Path().absolute() / "data" / "images")
# print(Path(__file__).parent.resolve() / "data" / "images")
