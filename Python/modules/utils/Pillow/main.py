from PIL import Image, ImageDraw, ImageFont
from PIL import Image, ImageDraw, ImageFont
import os
from pathlib import Path

os.chdir(os.path.dirname(os.path.abspath(__file__)))


def get_root_path():
    return str(Path(__file__).parent.parent.resolve())


def xibao2():

    img_path = Path(get_root_path()) / "data/petpet/images/xibao/0.png"
    with Image.open(img_path) as img:
        bg_size = img.size

        font_size = 48
        font_path = Path(get_root_path()) / \
            "data/fonts/SourceHanSansCN-Medium.otf"
        img = Path(get_root_path()) / "data/petpet/images/xibao/0.png"

        font = ImageFont.truetype(font_path, font_size)
        text_width = font.getsize(text)
        text_coordinate = int(
            (bg_size[0] - text_width[0]) / 2), int((bg_size[1] - text_width[1]) / 2)
        draw = ImageDraw.Draw(img)
        draw.text(text_coordinate, text, (228, 30, 30), font=font)

        return img.save_jpg()


def xibao(text: str):

    with Image.open("test.png") as img:
        bg_size = img.size

        font_size = 48

        font_path = os.path.join('..', 'SourceHanSansCN-Medium.otf')
        font = ImageFont.truetype(font_path, font_size)
        text_width = font.getsize(text)
        text_coordinate = int(
            (bg_size[0]-text_width[0])/2), int((bg_size[1]-text_width[1])/2)
        draw = ImageDraw.Draw(img)
        draw.text(text_coordinate, text, (228, 30, 30), font=font)
        img.show()


xibao("因为寄生虫的研究多来自于人")
