
# @classmethod 把一个方法封装成类方法。
# 参见 https://www.cnblogs.com/baxianhua/p/10845620.html


class C:
    y = "类属性"

    def __init__(self, x) -> None:
        self.x = x

    def test(self):
        print(self.x)

    @classmethod
    def f(cls, arg1):
        print(cls.y, arg1)