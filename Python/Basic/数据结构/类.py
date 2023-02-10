class Parent:
  name = "父类"
  
  def __init__(self, name):
    self.name = name
      
  @classmethod
  def class_print(cls):
    return cls.name
  
  @staticmethod
  def static_print():
    return "父类静态方法"


parent = Parent("实例对象")
print(parent.name)  # 实例对象
print(Parent.name)  # 父类
print(Parent.static_print()) # 父类静态方法


class Child(Parent):
  def __init__(self, name):
    self.name = super().name
    self.name1 = super().static_print()

  
child = Child("子类")
print(child.name) # 父类
print(child.name1) # 父类静态方法
