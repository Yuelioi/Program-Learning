from PIL import Image
import imagehash

def check_duplicate_images(image_path1, image_path2):
    # 打开并调整图像大小
    image1 = Image.open(image_path1)
    image2 = Image.open(image_path2)
    image1 = image1.resize((8, 8))
    image2 = image2.resize((8, 8))
    
    # 计算图像的哈希值
    hash1 = imagehash.average_hash(image1)
    hash2 = imagehash.average_hash(image2)
    
    # 比较哈希值
    if hash1 == hash2:
        print("图片重复")
    else:
        print("图片不重复")

# 两个图片路径
image_path1 = r"Python\Snippets\图片处理\1.PNG"
image_path2 = r"Python\Snippets\图片处理\3.PNG"

# 检测图片是否重复
check_duplicate_images(image_path1, image_path2)
