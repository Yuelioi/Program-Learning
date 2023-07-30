from operator import *
from dataclasses import dataclass, field


@dataclass()
class P:
    name = "小明"
    age = 16


f = attrgetter("name", "age")

print(f(P))  # ('小明', 16)
