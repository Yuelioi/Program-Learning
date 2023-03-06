"""
@link: https://www.bilibili.com/video/av990399507/

obj 默认比较方法是 is

"""


""" __eq__  __ne__￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣
相等,默认使用is判断
eq: ==
ne: !=, 如果没有ne函数就调用 eq 函数取反

默认没有
gt/ge: 大于 大于等于
lt/le: 小于 小于等于

调用规则
y是x的衍生类, 调用 y.__xx__(x), 否则是x.__xx__(y)
"""


class Pos:
    def __init__(self, x: int, y: int):
        self.x = x
        self.y = y


class Pos2(Pos):
    def __init__(self, x: int, y: int):
        super().__init__(x, y)

    def __eq__(self, __o: Pos) -> bool:
        return self.x == __o.x and self.y == __o.y


p1 = Pos(1, 2)
p2 = Pos(1, 2)
print(p1 == p2)  # False


p1 = Pos(1, 2)
p2 = Pos2(1, 2)
print(p1 == p2)  # False
