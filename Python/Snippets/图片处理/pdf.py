from PyPDF2 import PdfFileReader
import os
from pathlib import Path


def ext(pdf_path):
    # 创建输出目录 (同文件目录的cache目录)
    output_dir = Path(pdf_path).parent / "cache"
    Path(output_dir).mkdir(parents=True, exist_ok=True)

    with open(pdf_path, 'rb') as f:
        pdf = PdfFileReader(f)
        num_pages = pdf.getNumPages()

        # 遍历每一页
        for page_number in range(num_pages):
            page = pdf.getPage(page_number)

            # 检查页面是否包含图像
            if '/XObject' in page['/Resources']:  # type: ignore
                x_objects = page['/Resources']['/XObject'].getObject()

                for index, obj in enumerate(x_objects):
                    if x_objects[obj]['/Subtype'] == '/Image':
                        # 提取图像数据
                        image = x_objects[obj]._data

                        output_path = os.path.join(
                            output_dir, f"page_{page_number + 1}_image_{index + 1}.jpg")

                        # 保存图像文件
                        with open(output_path, 'wb') as image_file:
                            image_file.write(image)

    print("图像提取完成！")


# 使用示例
pdf_path = r"D:\Working\Products\斗转星移SHIFT选手卡产品手册0710.pdf"
ext(pdf_path)
