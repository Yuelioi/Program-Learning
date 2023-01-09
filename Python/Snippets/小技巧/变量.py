# 交换变量
a = b = 1
a, b = b, a


# 多变量赋值
a, b, c = 1, 2, 3
a, b, *c = [1, 2, 3, 4, 5] # c = [3, 4, 5]

# 短路赋值
a = "" or "hello"
print(a) # "hello"