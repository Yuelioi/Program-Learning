# pip install objprint
from objprint import op


class Positon:
    def __init__(self, x, y):
        self.x = x
        self.y = y


print(Positon(10, 20)) # <__main__.Positon object at 0x000001F3F69A9460>
op(Positon(10, 20))
