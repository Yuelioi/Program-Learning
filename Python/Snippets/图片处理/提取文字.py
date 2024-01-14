import pytesseract
from PIL import Image

# 设置Tesseract OCR的路径（根据您的安装路径进行更改）
pytesseract.pytesseract.tesseract_cmd = r"C:\Programs\Tesseract-OCR5.3.3\tesseract.exe"


def extract_chinese_text(image_path):
    # 打开图像
    image = Image.open(image_path)

    # 使用Tesseract提取文本
    text = pytesseract.image_to_string(image, lang="chi_sim")

    return text


# 图片文件的路径
image_path = r"E:\Scripting\Program-Learning\Python\Snippets\2.jpg"

# 提取中文文字
chinese_text = extract_chinese_text(image_path)
