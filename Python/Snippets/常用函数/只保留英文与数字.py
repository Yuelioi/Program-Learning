
def hanji_to_eng(content):
    """
    去除汉字与特殊字符,只保留英文单词与数字(单词首字母大写)
    """
    import re
    reg_res = re.findall(r"[A-Za-z0-9_]+", content)

    reg_res = " ".join(reg_res).strip().title().replace(" ", "-")
    return reg_res if len(reg_res) > 2 else content
