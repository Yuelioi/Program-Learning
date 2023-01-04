from copy import deepcopy

# 读取文件
# c = [line.strip() for line in open("file.txt")]
# c = list(open("file.txt"))


# 链式比较
a = 10
8 < a < 12

# 复制列表
l = [1,2,3]
l[:]
l.copy()
deepcopy(l)


# 合并字典
d1 = {'a': 1}
d2 = {'b': 1}
d3 = {**d1, **d2}
d4 = dict(d1.items() | d2.items())
d1.update(d2)
# print(d3, d4, d1)  # {'a': 1, 'b': 1} {'b': 1, 'a': 1} {'a': 1, 'b': 1}

