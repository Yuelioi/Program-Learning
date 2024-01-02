# region 装饰器类


import time
from typing import Any


class Timer1:
    def __init__(self, func):
        self.func = func

    def __call__(self, *args: Any, **kwds: Any) -> Any:
        start = time.time()
        ret = self.func(*args, **kwds)
        print(f"use time{(time.time()- start):.10f}")
        return ret


class Timer2:
    def __init__(self, preload) -> None:
        self.preload = preload

    def __call__(self, func) -> Any:
        def wrapper(*args, **kwds) -> Any:
            print(self.preload)
            start = time.time()
            ret = func(*args, **kwds)
            print(f"use time{(time.time()- start):.10f}")
            return ret

        return wrapper


@Timer1
def add1(num1, num2):
    return num1 + num2


"""
等价于
ADD1 = Timer1(add1)
ADD1(3, 4)
"""


@Timer2(preload=True)
def add2(num1, num2):
    return num1 + num2


"""
ADD2 = Timer2(preload=True)(add2)
ADD2(3, 4)

"""

# endregion 装饰器类


# region 装饰器函数


def decorator1(func):
    def wrapper(*args, **kwargs):
        print("wrapper2")
        func(*args, **kwargs)

    return wrapper


@decorator1
def add3(num1, num2):
    return num1 + num2


add3(2, 3)


def decorator_with_param(preload):
    def decorator(func):
        def wrapper(*args, **kwargs):
            print(preload)
            print("wrapper2")
            func(*args, **kwargs)

        return wrapper

    return decorator


@decorator_with_param(preload="test")
def add4(num1, num2):
    return num1 + num2


add4(2, 3)
# endregion 装饰器函数
