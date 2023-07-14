# py3.7 +
# https://docs.python.org/zh-cn/3/library/dataclasses.html
from typing import List
import dataclasses
from dataclasses import dataclass,field
import inspect

# 优点1: 定义清爽


@dataclass(frozen=True,order=True)
class User:
    name: str
    age: int
    height: int = 160 # 设置默认值1
    secret: int = field(default=10086,repr=False,hash=False) # 设置默认值2, 并且不许打印
    cars:List[str] = field(default_factory=list) # 设置默认列表, 不能使用[], 不然多个实例会共享

    def get_age(self) -> float:
        return self.age
    
    def update_age(self,new_age):
        # 如果frozen了, 只能用原生替换属性, 再返回新的实例
        return dataclasses.replace(self,age=new_age)
        


user = User(name="张三", age=19)
user =user.update_age( new_age=20)

# user.age = 20 # frozen后不可更改


# 优点2: 打印方便
print(user)
print(dataclasses.asdict(user))
print(dataclasses.astuple(user))


