image_path = "./Python/Snippets/2.jpg"


import numpy as np
from PIL import Image
from sklearn.cluster import KMeans


def extract_main_colors(image_path, num_colors=5):
    # K均值（K-Means）聚类算法

    image = Image.open(image_path)

    # 将图像转换为NumPy数组
    image_np = np.array(image)

    # 获取图像的形状
    height, width, _ = image_np.shape

    image_flat = image_np.reshape((height * width, 3))

    # 使用KMeans算法进行颜色聚类
    kmeans = KMeans(n_clusters=num_colors)
    kmeans.fit(image_flat)

    # 获取聚类中心
    dominant_colors = kmeans.cluster_centers_.astype(int)

    return dominant_colors


# 用法示例

main_colors = extract_main_colors(image_path, num_colors=5)

print("主要颜色：", main_colors)
