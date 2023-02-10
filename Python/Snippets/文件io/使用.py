import os
import re


def vuepress_generate_file_doc(root_dir, ext="md"):
    """
    基于文件名 生成顺序目录
    """

    i = 0
    regex = "[0-9]{1,3}"
    for parent, _, file_names in os.walk(root_dir):
        # 文件排序
        file_names.sort(
            key=lambda x: int(
                re.search(regex, x)[0] if re.search(regex, x) else 0
            )
        )

        for full_name in file_names:
            # 过滤
            if full_name.startswith('.'):  # 去除隐藏文件
                continue
            if full_name.lower().startswith('readme'):
                continue

            if ext:  # 根据后缀名搜索
                if full_name.endswith(tuple(ext)):
                    i += 1
                    name = full_name.rsplit(".", 1)[0]
                    content = f"""---
title: {name}
order: {i}
category:
  - Speed Tree
---
"""
                    file_path = os.path.join(parent, full_name)
                    with open(file_path, "r+", encoding='utf-8') as file:
                        file_content = file.read()
                        file.seek(0)
                        file.truncate()
                        file.write(content + file_content)

            else:
                ...


def ob_rename_image(root_dir, ext="md"):
    """
    obsidian 批量重命名图片名称(png 与 md)
    ext:处理的文件类型 默认为md
    """

    for parent, _, file_names in os.walk(root_dir):
        # 文件排序 按数字排序

        for full_name in file_names:
            # 过滤
            if full_name.startswith('.'):  # 去除隐藏文件
                continue
            if full_name.lower().startswith('readme'):
                continue

            file_path = os.path.join(parent, full_name)
            if file_path.endswith("png") and file_path.startswith("Pasted image"):
                os.rename(file_path, file_path.replace(
                    "Pasted image ", "SpeedTree-"))
            if file_path.endswith(ext):
                with open(file_path, "r+", encoding='utf-8') as file:
                    file_content = file.read()
                    file.seek(0)
                    file.truncate()
                    file.write(file_content.replace("Pasted image ", "SpeedTree-")
                               .replace("Pasted%20image%20", "SpeedTree-"))
