from PIL import Image, ImageDraw, ImageFont


import datetime
from pathlib import Path


def generate_timestamp():
    return datetime.datetime.now().strftime("%Y%m%d-%H%M%S%f")[:-4]


def get_root_path():
    return str(Path(__file__).parent.parent.resolve())


def generate_cache_image_path():
    return Path(__file__).parent.parent.resolve() / "data/cache" / f'{generate_timestamp()}.jpg'


def split_content(content, content_size_list, max_line_width):
    """清理文字, 转为合适长度的文字列表"""

    current_line_width = 0
    final_content = []
    last_index = 0

    for i in range(len(content)):
        if current_line_width + content_size_list[i] >= max_line_width:
            if i == len(content) - 1:
                # 正好最后一个字超了 直接加
                final_content.append(content[last_index:])
            else:
                final_content.append(content[last_index:i])
                last_index = i
                current_line_width = 0

        else:
            if i == len(content) - 1:
                final_content.append(content[last_index:])
            current_line_width += content_size_list[i]
    return final_content


def get_msg_size(msg, font):
    """获取文字渲染后宽度"""
    size = []
    for t in msg:
        box = font.getbbox(t)
        size.append(box[2] - box[0])
    return size


def text_to_image(text_list):
    """将文字转为图片"""
    font_size = 24

    font = ImageFont.truetype(
        f"{get_root_path()}/data/fonts/SourceHanSansCN-Medium.otf", font_size
    )

    footage_clip_size = 60
    lines_space = 15
    line_padding_left_and_right = 60  # 文字距离最左边距离

    line_height = font_size + lines_space

    footage = Image.open(f"{get_root_path()}/data/images/background.jpg")
    header = footage.crop(box=(0, 0, footage.width, footage_clip_size))
    footer = footage.crop(box=(0, footage.height - footage_clip_size,
                               footage.width, footage.height))

    max_line_width = footage.width - line_padding_left_and_right * 2  # 自己减下边框值
    content = footage.crop(
        box=(0, footage_clip_size, footage.width, line_height + footage_clip_size))

    to_render_text_list = []
    for to_render_text in text_list:
        msg_size = get_msg_size(to_render_text, font)
        to_render_text_list.extend(
            split_content(to_render_text, msg_size, max_line_width))

    image_result = Image.new("RGB", (footage.width, footage_clip_size *
                             2 + len(to_render_text_list) * line_height), color=(255, 255, 255, 0))
    image_result.paste(im=header, box=(0, 0))

    for idx, text in enumerate(to_render_text_list):
        cache = content.copy()
        draw = ImageDraw.Draw(cache)
        draw.text(xy=(line_padding_left_and_right, 0), text=text, font=font,
                  fill=(125, 97, 85))
        image_result.paste(im=cache, box=(
            0, footage_clip_size + line_height * (idx)))

    image_result.paste(im=footer, box=(
        0, footage_clip_size + line_height * len(to_render_text_list)))
    image_result.show()
    cache_path = generate_cache_image_path()
    print(cache_path)
    image_result.save(fp=cache_path)

    return cache_path


if __name__ == "__main__":
    text1 = ['娱乐功能', '名称: 复述 用法:echo + 需要机器人重复的内容','------------------------------------------------', '名称: 龙图插件 用法:关键字含龙图,或者发送龙图', '名称: 表情包生成 用法:表情包指令:查看所有指令', '名称: 成分查看 用法:成分 + B站uid',
             '名称: AI聊天 用法:chat + 问题(结尾最好带问号)', '名称: 随机二次元图 用法:实用关键词 召唤老婆/我老婆呢', '名称: 随机插件 用法:抽群友关键词 抽群友/抽..女群友/抽..男群友/抽老婆/抽老公\n\t\t抽菜单关键词 吃什么, 吃啥, 饿饿, 换一个吃, 想吃', '实用功能', '群管理', '名称: 群员管理 用法:关键词: 杀群友: 查看半年未说话群友, 并且可以选择一键踢出', '名称: 备份群文件 用法:关键词: 备份群文件\n关键词: 恢复群文件', '链接解析', '名称: 微博解析 用法:被动技能', '名称: Twitter解析 用法:被动技能', '名称: CSDN解析 用法:被动技能', '名称: youtube解析 用法:被动技能', '名称: Github解析 用法:被动技能']

    print(text_to_image(text1))
