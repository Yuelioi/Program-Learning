# https://pypi.org/project/emoji/

from PIL import Image, ImageDraw, ImageFont
import emoji
print(emoji.demojize('Python 👍'))
print(emoji.emojize("Python :thumbs_up:"))


# 创建一个空白的RGBA模式图像
img = Image.new('RGBA', (200, 200), color='white')

# 获取Emoji字符的Unicode字符串
emoji_unicode = emoji.emojize(':thumbs_up:')

# 获取绘制对象和字体
draw = ImageDraw.Draw(img)
font_path = r'H:\Snippets\Program-Learning\Python\modules\utils\SourceHanSansCN-Medium.otf'
emoji_font_path = r'H:\Snippets\Program-Learning\Python\modules\utils\SEGUIEMJ.TTF'


font = ImageFont.truetype(font_path, 24, encoding='unic')
emoji_font = ImageFont.truetype(emoji_font_path, 24)

# 创建图像和绘图对象
image = Image.new("RGB", (200, 200), (255, 255, 255))
draw = ImageDraw.Draw(image)

# 绘制文本
text = "Hello, 世界 👍"
x, y = 50, 50
for char in text:
    # 如果是 emoji
    if char.encode('unicode_escape').decode('utf-8').startswith('\\U'):

        draw.text((x, y+8), char, font=emoji_font,
                  fill=None, embedded_color=True)
        size = draw.textlength(char, font=emoji_font)
    else:
        draw.text((x, y), char, font=font, fill=(0, 0, 0))
        size = draw.textlength(char, font=font)

    x += size

# 显示图像
# image.show()

original_list = ['❤❤️']

new_list = ["".join([char for char in string if char.encode(
    'unicode_escape').decode('utf-8') != '\\ufe0f']) for string in original_list]
print(new_list)
