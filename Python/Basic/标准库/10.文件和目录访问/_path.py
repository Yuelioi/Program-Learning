
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
