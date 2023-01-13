# https://www.bilibili.com/video/BV1xL411N7iS?t=22.7

lst = [[], {}, set(), None, False, 0]
for a in lst:
    if not a:
        print(str(a) + " not None")

    if a == None:
        print(str(a) + " == None")

    if a is None:
        print(str(a) + " is None")

# is 是比较地址 很快 并且只会剔出None
