# https://www.zhihu.com/question/381784377/answer/1099438784
table = 'fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF'
tr = {}
for index in range(58):
    tr[table[index]] = index
s = [11, 10, 3, 8, 4, 6]
XOR = 177451812
ADD = 8728348608


def bv2av(x):
    R = 0
    for i in range(6):
        R += tr[x[s[i]]]*58**i
    return (R-ADD) ^ XOR


def av2bv(x):
    x = (x ^ XOR)+ADD
    r = list('BV1  4 1 7  ')
    for i in range(6):
        r[s[i]] = table[x//58**i % 58]
    return ''.join(r)


print(bv2av('BV17x411w7KC'))
print(bv2av('BV1Q541167Qg'))
print(bv2av('BV1mK4y1C7Bz'))
print(av2bv(170001))
print(av2bv(455017605))
print(av2bv(882584971))
