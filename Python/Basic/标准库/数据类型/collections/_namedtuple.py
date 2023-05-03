from collections import namedtuple

# 创建一个 Point 类型，包含 x 和 y 两个字段
Point = namedtuple('Point', ['x', 'y'])

# 使用 Point 函数创建一个元组
p = Point(1, 2)
p = Point(x=1, y=2)
p = Point(**{"x": 1, "y": 2})

# 访问元组的字段
print(p.x)  # 输出 1
print(p.y)  # 输出 2
