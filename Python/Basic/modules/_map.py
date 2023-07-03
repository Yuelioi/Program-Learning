"""
* map() 函数的作用是将给定的函数应用于 iterable 的每一项（列表、元组等），并返回结果列表。
* 可以使用嵌入函数（内置函数）、lambda（拉姆达式、无名函数）、def 中定义的函数等应用到所有元素中。
* ![20230430-16085217.png](https://img.yuelili.com/vscode/20230430-16085217.png)

* 短板效应
"""

# 单个对象


def add_1(x):
    return x + 1


m = map(add_1, [1, 2, 3, 4])
list(m)  # [2, 3, 4, 5]


# 多个对象
def add_num(x, y):
    return x + y


m = map(add_num, [1, 2, 3, 4], [1, 2, 3, 4])
list(m)  # [2, 4, 6, 8]
