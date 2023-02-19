"""
https://docs.python.org/zh-cn/3.9/library/stdtypes.html#iterator-types

迭代器是一种对象，它可以用于遍历序列中的元素。
迭代器对象实现了两个方法：__iter__() 和 __next__()。

__iter__() 方法返回迭代器对象本身，并允许迭代器对象被用于 for 循环。
__next__() 方法返回序列中的下一个元素，在序列结尾时引发 StopIteration 异常。
"""

numbers = [1, 2, 3, 4, 5]
iterator = iter(numbers)
print(next(iterator))  # 1
print(next(iterator))  # 2
print(next(iterator))  # 3
