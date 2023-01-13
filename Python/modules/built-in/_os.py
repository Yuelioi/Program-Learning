import os

file_path = "H:/Scripting/Vue/xx.txt"
fold_path = "H:/Scripting/Vue"

# 文件工作目录
os.getcwd()

# 删除文件与文件夹
# os.remove(file_path)
# os.rmdir(fold_path) # 目录必须为空
# os.removedirs(fold_path)  # 递归删

# shutil.rmtree(fold_path) 还是用这个吧+

# listdir 子文件夹列表 不会深入
os.listdir(fold_path)

# 创建文件夹
os.mkdir
os.makedirs  # 深度创建

# rename
# os.rename(fold_path, "H:/Scripting/Vue2") # 禁止访问

# 遍历起始目录内所有子目录
for root, dirs, files in os.walk(fold_path):
    ...
