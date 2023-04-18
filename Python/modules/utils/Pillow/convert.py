from PIL import Image
import os

os.chdir(os.path.dirname(os.path.abspath(__file__)))

with Image.open("test.png") as img:
    img.convert(mode='RGB')
    img.save("test.jpg")
