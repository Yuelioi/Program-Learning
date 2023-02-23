class A:
    def __new__(cls, x=1):
        # 创建object前
        print("__new__")
        return super().__new__(cls)

    def __init__(self, x=1) -> None:
        # 创建object后 初始化
        print("__init__")

    def __del__(self):
        # 释放时(有点像析构), 跟del不一样
        print("__del__")

    def __repr__(self):
        # 更详细的str
        return "_repr__A"

    def __str__(self):
        # 更注重可读性
        return "_str__A"

    def __format__(self, __format_spec: str):
        if __format_spec == "x":
            return "xxx_A"

    def __call__(self, *args: Any, **kwds: Any) -> Any:
        pass

    def __(self):
        pass


# obj = A()
# obj = __new__(A)
# __init__(obj)
# obj = A(1)
# obj = __new__(A,1)
# __init__(obj,1)
print(A())
# __new__
# __init__
# _str__A
# __del__

print(repr(A()))

# __new__
# __init__
# __del__
# _repr__A
