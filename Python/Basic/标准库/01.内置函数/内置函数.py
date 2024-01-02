# https://docs.python.org/zh-cn/3.9/library/functions.html


# abs 绝对值
abs(-1)  # =>1

a = 114124
# TODO aiter() # 3.10+
# TODO anext 3.10+
# TODO breakpoint() 3.7+
# bytearray(source, encoding, errors) # 可变序列(参考列表)
# callable() #


# delattr()

# dict() 字典
# dir() =>属性列表
dir()  # 本地作用域
dir(__builtins__)  # 指定作用域

# divmod() => 商+余数
divmod(10, 3)  # (3, 1)

# enumerate()
seasons = ["Spring", "Summer", "Fall", "Winter"]
# [(0, 'Spring'), (1, 'Summer'), (2, 'Fall'), (3, 'Winter')]
list(enumerate(seasons))
# [(1, 'Spring'), (2, 'Summer'), (3, 'Fall'), (4, 'Winter')]
list(enumerate(seasons, start=1))


# eval() 解析表达式=>结果 慎用
eval("a+1")  # => a+1的结果

# exec()
# exec('print("hello")') # hello


# filter(function, iterable) 用 iterable 中函数返回真的元素，构建一个新的迭代器。
# 过滤列表中的偶数
numbers = [1, 2, 3, 4, 5, 6]
even_numbers = filter(lambda x: x % 2 == 0, numbers)
list(even_numbers)  # [2, 4, 6]

# float()
a = float(10)  # 10.0
# format()


# 使用字典
person = {"name": "John", "age": 30}
"My name is {0[name]} and I am {0[age]} years old.".format(person)
# Output: My name is John and I am 30 years old.

# frozenset()

# getattr()


class Person:
    name = "John Doe"


person = Person()
getattr(person, "name", "Unknown")  # Output: "John Doe"
getattr(person, "age", "Unknown")  # Output: "Unknown"


# globals()
...  # 当前模块全局变量 函数 类

# hasattr()
hasattr(person, "name")  # True


# hash()
hash(person)  # 148116558183 | __hash__()

# help()
# help(seasons)


# id()
id(person)

# input()

# int()

# isinstance()
isinstance(person, Person)  # 实例
# issubclass()
issubclass(Person, Person)  # True 子类(可以是自己)


# iter()
it = iter(range(5))
next(it)  # 0
next(it)  # 1


# len()


# list()


# locals() # global + 函数内使用
def add():
    name = "1"
    print(locals())  # {'name': '1'}
    return 1


# map() => 迭代器

list(map(lambda x: x + 1, numbers))  # [2, 3, 4, 5, 6, 7]


# max()

print(max(["1", "2"]))
# memoryview()
# min()
# next()

# object()
# oct() 八进制
# open()
# ord() Unicode码 a=>97
# pow() 幂
# print()
# property()
# range() # 不可变的序列类型
# repr()
# reversed()
# round()
# set()
# setattr()
# slice()
# sorted()  # 排序
# staticmethod() 将方法转换为静态方法。
# str()
# sum()
# super()
# tuple()
# type() = __class__
# vars()  __dict__
# zip() # 返回一个元组的迭代器
# __import__()
