from collections import OrderedDict
from copy import deepcopy

# 交换变量
a = b = 1
a, b = b, a


# 多变量赋值
a, b, c = 1, 2, 3
a, b, *c = [1, 2, 3, 4, 5] # c = [3, 4, 5]


# 读取文件
# c = [line.strip() for line in open("file.txt")]
# c = list(open("file.txt"))

# 列表映射(将字符串转整数)
l = list(map(int, ['1', '2', '3']))


# 转置
original = [['a', 1], ['b', 2], ['c', 3]]
list(zip(*original))  # [('a', 'b', 'c'), (1, 2, 3)]

# 链式比较
a = 10
8 < a < 12

# 复制列表
l[:]
l.copy()
deepcopy(l)

# 列表转字符串
numbers = [1, 2, 3]
','.join(map(str, numbers))

# 列表转字典
d0 = ['tom', 'jerry']
dict(enumerate(d0))  # {0: 'tom', 1: 'jerry'}

# 合并字典
d1 = {'a': 1}
d2 = {'b': 1}
d3 = {**d1, **d2}
d4 = dict(d1.items() | d2.items())
d1.update(d2)
# print(d3, d4, d1)  # {'a': 1, 'b': 1} {'b': 1, 'a': 1} {'a': 1, 'b': 1}

# 移除重复值
items = [1, 1, 2, 2, 3]
list(set(items))  # [1, 2, 3]
list(OrderedDict.fromkeys(items).keys())
