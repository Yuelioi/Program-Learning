a = set([1, 2])
b = set([2, 3, 4])
print(a)
print(a < b)

c = a | b  # 并集
c = a | b  # 交集
c = a - b  # 在a不在b
c = a ^ b  # 交集取反
print(c)
