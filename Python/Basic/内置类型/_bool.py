# 布尔运算

# and, or, not


# and or 为短路运算符, 第一个参数为假/真时才会对第二个参数求值

x = 1
y = 0
if x == 1 and y == 2:
    print(y)
