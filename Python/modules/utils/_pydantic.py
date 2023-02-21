# https://docs.pydantic.dev/usage/models/#abstract-base-classes


from pydantic import BaseModel, Field
from pydantic import AnyUrl
from typing import Optional, Union


class Model(BaseModel):
    a: int
    b: float
    c: str


# > dict |{'a': 3, 'b': 2.72, 'c': '123'}
model = Model(a=3.1415, b=' 2.72 ', c=123).dict()
# > str | {'a': 3, 'b': 2.72, 'c': '123'}
model = Model(a=3.1415, b=' 2.72 ', c=123).json()
print(model)


#  types  字段类型------------------------------------------------------------------------------
"""
None , bool, int ,float,str, bytes,list,tuple,dict,set,frozenset等内置类型
deque
datetime.date等日期

typing.Any 任何类型
typing.Annotated,typing.TypeVa
typing.List,typing.Tuple,typing.Dict等等
typing.Union,typing.Optional

pathlib.Path

pydantic.types ↓
FilePath/DirectoryPath
AnyUrl/FileUrl
"""

Field  # 用于定义数据模型中的字段，并指定其验证规则和序列化/反序列化行为


class Person(BaseModel):
    name: str = Field(..., min_length=1, max_length=50,
                      description='The name of the person')
    age: int = Field(..., gt=0, lt=150, description='The age of the person')
    email: str = Field(...,
                       regex=r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', description='The email of the person')
    url: AnyUrl


person = Person(name='John', age=30, email='john@example.com',
                url="http://example.com?password=123")


class Reply(BaseModel):
    ID: Union[int, None] = None
    username: Union[str, None] = None
    keyword: str = ""
    reply: str = ""
    qq_groups: Union[list[str], str, None] = None


reply_obj = Reply(
    ID=None,
    username="1",
    keyword="3",
    reply="4",

)

print(*reply_obj)