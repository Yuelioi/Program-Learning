# -*- coding:utf-8 -*-

# pip install Pillow

from PIL import Image
import random
import textwrap


from PIL import Image, ImageDraw, ImageFont


white = (255, 255, 255)
black = (0, 0, 0)


footage = Image.open(r"Python\modules\utils\background.png")

msg = """思源黑体思源黑体是一套 OpenType/CFF 泛中日韩字体。这个开源项目不仅提供了可用的 OpenType 字体，还提供了利用 AFDKO 工具创建这些 OpenType 字体时的所有源文件。下载字体（OTF、OTC、Super OTC, Subset OTF 和 Variable OTF/TTF/WOFF2）本项目提供了为多种部署方式而设定的独立字体资源以及 ZIP 文件供下载：最新发布参考《官方字体 readme 文件》的 Configurations（设置）部分，可以帮助您决定下载哪一套字体。推荐不熟悉 GitHub 的人士参照以英文、日文、韩文、简体中文、繁体中文提供的《思源字体官方下载指南》。您也可以两个 ZIP 文件形式下载整个 releases，内含所有设置。"""
font_size = 48
lines_space = 15
line_padding_left_and_right = 30
max_line_width = font_size * 31 - line_padding_left_and_right * 2


current_draw_line_height = 0

footage_clip_size = 45
box = (0, 0, footage.width, footage_clip_size)
header = footage.crop(box)
box = (0, footage.height - footage_clip_size, footage.width, footage.height)
footer = footage.crop(box)
line_height = footage_clip_size + font_size + lines_space


content = footage.crop(
    box=(0, footage_clip_size, footage.width, line_height))


# # 设置文字的字体


font = ImageFont.truetype('SourceHanSansCN-Medium', font_size)


def get_msg_size(msg, font):
    size = []
    for t in msg:
        box = font.getbbox(t)
        size.append(box[2] - box[0])
    return size


msg_size = get_msg_size(msg, font)


def split_content(content, content_size_list, max_line_width):
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


res = split_content(msg, msg_size, max_line_width)

image_result = Image.new(
    "RGB", (footage.width, line_height * (3 + len(res))))


draw = ImageDraw.Draw(content)


draw.text(xy=(line_padding_left_and_right, 0), text=res[0], font=font,
          fill=(125, 97, 85))
# # # 绘制文字
# for idx, val in enumerate(res):
#     draw.text(xy=(line_padding_left_and_right, current_draw_line_height + idx * (font_size + lines_space)), text=val, font=font,
#               fill=(125, 97, 85))

content.show()

# print(textwrap.fill(msg, width=50))

# d = ImageDraw.Draw(msg)

# # draw text, half opacity
# d.text((10, 10), "Hello", font=font, fill=(255, 255, 255, 128))
# # draw text, full opacity
# d.text((10, 60), "World", font=font, fill=(255, 255, 255, 255))

# out = Image.alpha_composite(content, msg)


# out.show()


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
