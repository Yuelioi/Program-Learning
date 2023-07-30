import math

# print("\n".join([ele for ele in dir(math) if not ele.startswith("__")]))
# print(help(math))

print(math.modf(11.5))  # 返回小数和整数部分 (0.5, 11.0)
