from PIL import Image, ImageDraw, ImageFont
from PIL import Image, ImageDraw, ImageFont
import os
from pathlib import Path

os.chdir(os.path.dirname(os.path.abspath(__file__)))


def get_root_path():
    return str(Path(__file__).parent.parent.resolve())


def split_text(text: str, font, max_width):
    final = []
    last = 0
    total = 0
    for i in range(len(text)):
        t = text[i]

        w = font.getsize(t)[0]
        total += w
        if (total > max_width):
            final.append(text[last:i])
            total = w
            last = i
        elif i == len(text) - 1:
            final.append(text[last:])
    return final or [text]


def xibao(text: str):

    with Image.open("test.png") as img:
        # 图片尺寸
        bg_size = img.size
        # 字体大小
        font_size = 60
        # 最大排列宽度
        max_width = 0.75 * img.width

        # 行间距
        line_height = 10

        # 字体设置c
        font_path = os.path.join('..', 'SourceHanSansCN-Medium.otf')
        font = ImageFont.truetype(font_path, font_size)
        final = text

        # 起始文字高度, 因为有标题 所以先加 50
        start_height = 30
        start_width = 500
        draw = ImageDraw.Draw(img)

        for i in range(len(final)):
            text_coordinate = (
                start_width, start_height
                + i * line_height + font.getsize(final[i])[1] * i)
            draw.text(text_coordinate, final[i], (50, 50, 50), font=font)
        img.show()


xibao("征征征征")
