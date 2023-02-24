L1 = [1, 2, 3]

# 增
L1.append(4)  # object
L1.extend([5, 6])  # iterable
L1.insert(6, 7)  # index,object


# 删
L1.pop(-1)  # 基于索引删除
L1.remove(6)  # 基于值删除
L1.clear()  # 清空
print(L1)

# 改
# L1[0] = [1, 2]


# list(iterable)

# x in /not in s 判断是否在
# s\* n 自身拼接
# s[i:j:k] 截断
# min(s) max(s) 获取最小/最大值
# s.index(x[, i[, j]]) 首次出现的索引
# s.count(x) 计数

# s.insert(i, x) 插入(s[i:i]=[x]))

# s.clear()
# s.copy() 浅拷贝
# del s[i:j:k] 删除指定片段

# 列表函数
# sort
