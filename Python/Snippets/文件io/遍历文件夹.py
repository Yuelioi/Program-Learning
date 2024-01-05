import os
from pathlib import Path

dir_path = "Rust"
# tag walk 每次迭代都是根目录/文件夹/文件
for root, dirs, files in os.walk(dir_path):
    for file in files:
        print(file)

print("---------------")


# tag scandir 只遍历一次
def loop_folder_new(folder_path):
    # 遍历文件夹中的所有文件和子文件夹
    for entry in os.scandir(folder_path):
        print(entry.name)
        if entry.is_dir():
            loop_folder_new(folder_path)
        else:
            ...


print("---------------")


import glob

directory_path = "./Python"
image_files = glob.glob("Python/**/*.*", recursive=True)

for image_path in image_files:
    print(image_path)


print("---------------")
files = os.listdir(dir_path)

for file in files:
    file_path = os.path.join(dir_path, file)
    # 处理文件或目录
