# abs 绝对值
abs(-1)  # =>1

a = 114124
# TODO aiter() # 3.10+

# all 列表全真或者空迭代对象(如列表) 则=>True
all([])  # True
all([True, False])  # False

# any 任意元素为真则=>True 空迭代对象(如列表)返回False
any([])  # False
any({"a": 1})  # True

# TODO anext 3.10+

# ascii() 类似repr
ascii("中文")  # '\u4e2d\u6587'

# bin() => `0b+二进制`
bin(3)  # 0b11

# bool(x=False) => True/False False值/对象见 逻辑值与布尔
bool([])  # False (傻逼js)

# TODO breakpoint() 3.7+

# bytearray(source, encoding, errors) # 可变序列(参考列表)
# bytearray(b'hello \xe4\xb8\xad\xe6\x96\x87')
bytearray("hello 中文", encoding='utf-8')


# bytes # 不可变序列
bytes("hello 中文", encoding='utf-8')  # b'hello \xe4\xb8\xad\xe6\x96\x87'
# xx.replace(b"\xe4",b"\xe5") # 与str类似 不过需要bytes类型作为参数

# callable() #


def fun():
    ...


callable(fun)  # True


class FUN:
    def __call__(self):
        ...


callable(FUN())  # True

# chr() => unicode字符
chr(73)  # I
chr(16515)  # 䂃

# @classmethod 把一个方法封装成类方法。
# 参见 https://www.cnblogs.com/baxianhua/p/10845620.html


class C:
    y = "类属性"

    def __init__(self, x) -> None:
        self.x = x

    def test(self):
        print(self.x)

    @classmethod
    def f(cls, arg1):
        print(cls.y, arg1)


# C("实例化对象属性").f(20) # 类属性 20
# c = C("实例化对象属性").test() # 实例化对象属性

# compile()
# compile(source, filename, mode, flags=0, dont_inherit=False, optimize=- 1)
# 将 source 编译成代码或 AST 对象

# complex() # 复数

# delattr()

# dict() 字典
# dir() =>属性列表
dir()  # 本地作用域
dir(__builtins__)  # 指定作用域

# divmod() => 商+余数
divmod(10, 3)  # (3, 1)

# enumerate()
seasons = ['Spring', 'Summer', 'Fall', 'Winter']
# [(0, 'Spring'), (1, 'Summer'), (2, 'Fall'), (3, 'Winter')]
list(enumerate(seasons))
# [(1, 'Spring'), (2, 'Summer'), (3, 'Fall'), (4, 'Winter')]
list(enumerate(seasons, start=1))


# eval() 解析表达式=>结果 慎用
eval('a+1')  # => a+1的结果

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

# 使用位置参数
'My name is {0} and I am {1} years old.'.format('John', 30)
# Output: My name is John and I am 30 years old.

# 使用关键字参数
'My name is {name} and I am {age} years old.'.format(
    name='John', age=30)
# Output: My name is John and I am 30 years old.

# 使用字典
person = {'name': 'John', 'age': 30}
'My name is {0[name]} and I am {0[age]} years old.'.format(person)
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

# hex()
hex(255)  # 十六进制 '0xff'

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

list(map(lambda x:x+1,numbers)) # [2, 3, 4, 5, 6, 7]


# max()

print(max(["1","2"]))
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
# sorted()
# staticmethod() 将方法转换为静态方法。
# str()
# sum()
# super()
# tuple()
# type() = __class__ 
# vars()  __dict__
# zip()
# __import__()
