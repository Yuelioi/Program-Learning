# https://www.bilibili.com/video/av681790373/


import sys

print(sys.getsizeof([0, 0, 0]))  # 120
print(sys.getsizeof([0] * 3))  # 80
print(sys.getsizeof([0 for _ in range(3)]))  # 88
