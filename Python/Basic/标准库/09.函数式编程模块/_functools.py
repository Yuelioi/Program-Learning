from functools import partial, reduce


def add(x, y):
    return x+y


# 冻结一部分函数参数
add2 = partial(add, y=1)
add2(1)

# 累加计算 --> 1+2+3+4+5 = 15
reduce(lambda x, y: x+y, [1, 2, 3, 4, 5])
