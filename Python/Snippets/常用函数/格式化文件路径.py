def format_file_name(name, to_replace):
    """格式化文件路径"""
    dist = ['/', '\\', ':', '*', "?", '"', '<', '>', '|']
    for chara in dist:
        name = name.replace(chara, to_replace)
    return name
