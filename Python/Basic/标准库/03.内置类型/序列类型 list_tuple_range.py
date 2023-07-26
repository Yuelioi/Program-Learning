# https://docs.python.org/zh-cn/3.9/library/stdtypes.html#iterator-types
# list 可变序列
# tuple 不可变序列
# range 不可变数字序列
# 文本 不可变序列


L1 = [1, 2, 3]

# 增
L1.append(4)  # object
L1.extend([5, 6])  # iterable
L1.insert(6, 7)  # index,object
L1*5


# 删
L1.pop(-1)  # 基于索引删除
L1.remove(6)  # 基于值删除
L1.clear()  # 清空


# 改
L1[1:2] = [88, 99]
L1[3:5:2]

# 查
1 in L1
L1.index(1)  # 首次出现的索引
L1.count(1)  # 计数

# 其他
L1.copy()  # 浅拷贝
del L1[2:4:2]  # 删除指定片段
L1.sort()
