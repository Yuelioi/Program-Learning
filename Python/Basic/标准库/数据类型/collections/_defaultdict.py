from collections import defaultdict

"""
* 使用 defaultdict 类型时，如果访问一个不存在的键，则会返回一个默认值。
* 因此一些场景下非常方便，比如在统计某个字符串中每个字符出现次数时，可以使用 defaultdict(int) 来避免手动初始化每个字符的计数器。
"""

my_dict = defaultdict(int)  # 默认值为 0
print(my_dict["foo"])  # 输出 0

my_dict = defaultdict(list)  # 默认值为 []
print(my_dict["bar"])  # 输出 []

my_dict = defaultdict(set)  # 默认值为 set()
print(my_dict["baz"])  # 输出 set()

my_dict = defaultdict(dict)  # 默认值为 {}
print(my_dict["qux"])  # 输出 {}

my_dict = defaultdict(lambda: "default value")  # 默认值为 "default value"
print(my_dict["foobar"])  # 输出 "default value"
