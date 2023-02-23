# https://www.bilibili.com/video/BV1NP4y1g7CT?t=34.0

class Player:
    def __init__(self, name, items=[]):
        self.name = name
        self.items = items
        print(id(self.items))


p1 = Player("Alice")
p2 = Player("Bob")
p3 = Player("Charles", ["sword"])
p1.items.append("armor")
p2.items.append("sword")
print(p1.items)  # !!! ['armor', 'sword']

# 默认参数为列表(mutable)时 会共享


# 正确写法

class Player2:
    def __init__(self, name, items=None):
        if items == None:
            self.items = []
        self.name = name
