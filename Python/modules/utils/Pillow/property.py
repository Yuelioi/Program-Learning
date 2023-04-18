from PIL import Image
import os

os.chdir(os.path.dirname(os.path.abspath(__file__)))

with Image.open("test.png") as img:

    img.size  # 尺寸 (宽, 高)
    img.height  # 高
    img.width  # 高
    img.mode  # 模式 如:RGB
    a = img.format  # 格式 如:PNG
    a = img.info  # 格式 如:PNG

    print(a)
