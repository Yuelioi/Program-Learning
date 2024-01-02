"""
https://docs.python.org/zh-cn/3.9/library/stdtypes.html#iterator-types

迭代器是一种对象，它可以用于遍历序列中的元素。
迭代器对象实现了两个方法：__iter__() 和 __next__()。
可迭代对象实现了__iter__()
迭代器都是可迭代对象

__iter__() 方法返回迭代器对象本身，并允许迭代器对象被用于 for 循环。会在迭代时运行一次, 用于获取迭代器, 之后不会再调用
__next__() 方法返回序列中的下一个元素，在序列结尾时引发 StopIteration 异常。
"""

import asyncio
from itertools import count, cycle, repeat

# region 迭代器


class NodeIterator:
    def __init__(self, name):
        self.name = name
        self.curr = self
        self.next = None  # node

    def __iter__(self):
        return self

    def __next__(self):
        if self.curr is None:
            raise StopIteration
        else:
            curr = self
            self.curr = self.next
            return curr


node1 = NodeIterator("Node 1")
node2 = NodeIterator("Node 2")
node3 = NodeIterator("Node 3")

# 连接节点
node1.next = node2
node2.next = node3

# 使用迭代器遍历链表
for node in node1:
    print(node.name)

# endregion

# region 生成器


class NodeGenerator:
    def __init__(self, name):
        self.name = name
        self.next = None  # node

    def __iter__(self):
        node = self
        while node is not None:
            yield node
            node = node.next
        return self


# 生成器, 是一种特殊的迭代器
generator = (x * 2 for x in range(5))

# 生成一个从0开始的无限整数序列
generator1 = count()

# 生成一个无限循环的迭代器
generator2 = cycle([1, 2, 3])

# 生成一个重复指定元素的无限序列
generator3 = repeat("Hello", 3)


def generator4():
    yield 1
    yield 2
    yield 3


def generator5():
    yield "A"
    yield "B"


def combined_generator():
    yield from generator4()
    yield from generator5()


for i in combined_generator():
    print(i)


async def async_generator():
    for i in range(5):
        yield i
        await asyncio.sleep(1)

    return  # 相当于 raise StopIteration


def gen():
    x = yield 5
    print(x)
    yield 50


g = gen()
print(next(g))  # 5, 需要先用next启动 相当于send(None)
print(g.send(25))  # 50
# endregion
