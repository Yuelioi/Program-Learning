"""
https://docs.python.org/zh-cn/3.9/library/stdtypes.html#iterator-types

迭代器是一种对象，它可以用于遍历序列中的元素。
迭代器对象实现了两个方法：__iter__() 和 __next__()。

__iter__() 方法返回迭代器对象本身，并允许迭代器对象被用于 for 循环。
__next__() 方法返回序列中的下一个元素，在序列结尾时引发 StopIteration 异常。
"""

from itertools import count, cycle, repeat
import asyncio
numbers = [1, 2, 3, 4, 5]
iterator = iter(numbers)
print(next(iterator))  # 1
print(next(iterator))  # 2
print(next(iterator))  # 3


# 生成器, 是一种特殊的迭代器
generator = (x * 2 for x in range(5))

# 生成一个从0开始的无限整数序列
generator1 = count()

# 生成一个无限循环的迭代器
generator2 = cycle([1, 2, 3])

# 生成一个重复指定元素的无限序列
generator3 = repeat('Hello', 3)


def generator4():
    yield 1
    yield 2
    yield 3


def generator5():
    yield 'A'
    yield 'B'


def combined_generator():
    yield from generator4()
    yield from generator5()


for i in combined_generator():
    print(i)


async def async_generator():
    for i in range(5):
        yield i
        await asyncio.sleep(1)
