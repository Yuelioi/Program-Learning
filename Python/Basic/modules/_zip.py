"""
* Zip 在英文中是拉链、拉锁，也有拉上拉链和用拉链锁上以及使沿某方向快速移动的意思。
* 因此非常形象地表明了它的功能，它常用于将两个及以上的列表（可迭代对象）按位置一一对应地拉在一起。

* 特点
* 木桶短板效应, 只取短的, 一一对应
https://www.gairuo.com/p/python-zip
![20230430-15595613.png](https://img.yuelili.com/vscode/20230430-15595613.png)
"""


# 无传入


# 传入一个
import itertools


z = zip([1, 2, 3])
list(z)
# [(1,), (2,), (3,)]

# 传入两个
z = zip([1, 2, 3], [3, 4, 5])
list(z)
# [(1, 3), (2, 4), (3, 5)]

# 不同长度(取最短)
z = zip([1, 2], [3, 4, 5])
list(z)
# [(1, 3), (2, 4)]

z = zip([1, 2, 3], [4, 5])
list(z)
# [(1, 4), (2, 5)]

# 解包
coordinate = ['x', 'y', 'z']
value = [3, 4, 5]

result = zip(coordinate, value)
result_list = list(result)  # [('x', 3), ('y', 4), ('z', 5)]

c, v = zip(*result_list)
# c  =>  ('x', 'y', 'z')
# v  => (3, 4, 5)


# * 短板补齐

z = itertools.zip_longest([1, 2], [3, 4, 5])
list(z)
# [(1, 3), (2, 4), (None, 5)]
