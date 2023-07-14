# > < = ...
# is
# is not

# and, or, not
# and or 为短路运算符, 第一个参数为假/真时才会对第二个参数求值

# all any

x = 1
y = 0
if x == 1 and y == 2:
    print(y)


# all 列表全真或者空迭代对象(如列表) 则=>True
all([])  # True
all([True, False])  # False

# any 任意元素为真则=>True 空迭代对象(如列表)返回False
any([])  # False
any({"a": 1})  # True

# bool(x=False) => True/False False值/对象见 逻辑值与布尔
bool([])  # False (傻逼js)
