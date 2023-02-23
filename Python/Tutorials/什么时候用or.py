# https://www.bilibili.com/video/BV1xL411N7iS/

b = None or False  # False
b = False or None  # None


# 错误用法, 当输入值可以为False(比如0) 并且为有效值时
b = 0 or 100  # 比如成绩可以为0分
