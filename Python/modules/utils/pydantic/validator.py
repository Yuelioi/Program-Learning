# https://docs.pydantic.dev/usage/validators/
from pydantic import BaseModel, validator
from typing import List
from pydantic import BaseModel, ValidationError, validator

# ----------------------------------------------------------------
# Value Validation


class User(BaseModel):
    name: str
    age: int

    @validator('age')
    def validate_age(cls, v):
        if v < 0:
            raise ValueError('Age must be a positive integer')
        return v


# when age is less than 0, throw value error
# user = User(
#     name="John",
#     age=-19
# )

# ----------------------------------------------------------------
# Subclass Validators and each_item


class Grade(BaseModel):
    name: str
    score: float


class Student(BaseModel):
    name: str
    grades: List[Grade]

    def __setitem__(self, key, value):
        print(key)
        # 调用父类 __setitem__ 方法以实际更改属性值
        super().__setitem__(key, value)
        # 检查是否更改了 grades 属性，并调用验证函数
        if key == 'grades':
            self.validate_grades()

    @validator('grades', each_item=True)
    def validate_grades(cls, value):
        print(value)

        """
        > use each_item:
        name='Math' score=85.0
        name='English' score=92.0
        name='Physics' score=78.0
        name='Chemistry' score=95.0

        > not use each_item:
        [Grade(name='Math', score=85.0), Grade(name='English', score=92.0), Grade(name='Physics', score=78.0), Grade(name='Chemistry', score=95.0)]
        """

        # 验证嵌套列表中的每个元素
        if isinstance(value, Grade) and (value.score < 0 or value.score > 100):
            raise ValueError('成绩必须在 0 到 100 之间')
        return value


s = Student(name='Alice', grades=[Grade(name='Math', score=85), Grade(name='English', score=92),
            Grade(name='Physics', score=78), Grade(name='Chemistry', score=95)])

s.grades[2].score = -15
print(s.grades[2].score)
# 抛出 ValueError: 成绩必须在 0 到 100 之间
