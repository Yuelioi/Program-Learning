# https://www.bilibili.com/video/BV19Y411G7ox
class Position:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __hash__(self):
        return hash((self.x, self.y))
        # return id(self)

    def __eq__(self, other) -> bool:
        return self.x == other.x and self.y == other.y
# id 用来比较是否同一个obj
# hansh 用来比较hash值
# 2个不同数据的hash 是可能一样的
# 所以要用eq比较obj的数据也一样


pos1 = Position(0, 1)
pos2 = Position(0, 1)

d = {}
d[pos1] = 1
d[pos2] = 2

print(d[pos1]) # 2 成功更改!
