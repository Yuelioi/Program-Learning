# 获取帮助信息
import random
import inspect
help(print)
print(print.__doc__)

# 获取方法属性
print(dir(print))


inspect.getmembers("")

print("\n".join([ele for ele in dir(random) if not ele.startswith("_")]))
