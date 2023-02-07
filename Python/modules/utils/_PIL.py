# -*- coding:utf-8 -*-
from PIL import Image

from PIL import Image, ImageDraw, ImageFont

msg = """思源黑体思源黑体是一套 OpenType/CFF 泛中日韩字体。这个开源项目不仅提供了可用的 OpenType 字体，还提供了利用 AFDKO 工具创建这些 OpenType 字体时的所有源文件。下载字体（OTF、OTC、Super OTC, Subset OTF 和 Variable OTF/TTF/WOFF2）本项目提供了为多种部署方式而设定的独立字体资源以及 ZIP 文件供下载：最新发布参考《官方字体 readme 文件》的 Configurations（设置）部分，可以帮助您决定下载哪一套字体。推荐不熟悉 GitHub 的人士参照以英文、日文、韩文、简体中文、繁体中文提供的《思源字体官方下载指南》。您也可以两个 ZIP 文件形式下载整个 releases，内含所有设置。"""


def split_content(content, content_size_list, max_line_width):
    """清理文字, 转为合适长度的文字列表"""
    current_line_width = 0
    final_content = []
    last_index = 0
    for i in range(len(content)):
        if current_line_width + content_size_list[i] >= max_line_width:
            final_content.append(content[last_index:i])
            last_index = i
            current_line_width = 0

        else:
            if i == len(content) - 1:
                final_content.append(content[last_index:i])
            current_line_width += content_size_list[i]
    return final_content


def get_msg_size(msg, font):
    """获取文字渲染后宽度"""
    size = []
    for t in msg:
        box = font.getbbox(t)
        size.append(box[2] - box[0])
    return size


def text_to_image(text):

    font_size = 48
    font = ImageFont.truetype('SourceHanSansCN-Medium', font_size)
    msg_size = get_msg_size(msg, font)
    footage = Image.open(r"Python\modules\utils\background.png")

    lines_space = 15
    line_padding_left_and_right = 30
    max_line_width = font_size * 31 - line_padding_left_and_right * 2
    to_render_text_list = split_content(msg, msg_size, max_line_width)

    footage_clip_size = 45
    header = footage.crop(box=(0, 0, footage.width, footage_clip_size))
    footer = footage.crop(box=(0, footage.height - footage_clip_size,
                               footage.width, footage.height))
    line_height = font_size + lines_space

    content = footage.crop(
        box=(0, footage_clip_size, footage.width, line_height + footage_clip_size))

    image_result = Image.new("RGBA", (footage.width, footage_clip_size *
                                      2 + len(to_render_text_list) * line_height), color=(255, 255, 255, 0))
    image_result.paste(im=header, box=(0, 0))

    # # 设置文字的字体

    for idx, text in enumerate(to_render_text_list):
        cache = content.copy()
        draw = ImageDraw.Draw(cache)
        draw.text(xy=(line_padding_left_and_right, 0), text=text, font=font,
                  fill=(125, 97, 85))
        image_result.paste(im=cache, box=(
            0, footage_clip_size + line_height * (idx)))

    # # # 绘制文字
    image_result.paste(im=footer, box=(
        0, footage_clip_size + line_height * len(to_render_text_list)))

    image_result.show()


text_to_image(msg)


def _():
    src = r"H:\Snippets\Program-Learning\_test\test.jpg"

    image = Image.open(src)

    # image_copy = image.copy()
    # width = 1
    # clip = 20
    # image_new = Image.new('RGB', (width, width), (0, 0, 255))
    # image_width = image.width
    # image_height = image.height

    # box = (3, 3, image_width-3, image_height-3)

    # for i in range(5):
    #     rnd_w = random.randint(1, image_width-width)
    #     rnd_h = random.randint(1, clip*2)
    #     rnd = random.randint(width, image.width-width)
    #     if rnd_h > clip:
    #         rnd_h = image_height-rnd_h+clip
    #     image_copy.paste(image_new, (rnd_w, rnd_h, rnd_w+width, rnd_h+width))

    # im_crop = image_copy.crop(box)
    # out = r'H:\Snippets\Program-Learning\_test\test-out.jpg'
    # im_crop.save(out, quality=50)
