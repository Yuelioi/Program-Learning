'''
classmethod 是 Python 中的一种修饰符，用于修饰类方法。
类方法是一种特殊的方法，它的第一个参数是类本身（而不是实例），通常用来定义类级别的行为。
通过使用 @classmethod 修饰符，可以将一个普通的函数声明为类方法


在下面的示例中，modify_x 方法是一个类方法，接收一个参数 cls ，cls是类本身，而非类的实例对象。
在这个方法中，我们可以使用 cls.x 来访问类变量。

类方法可以通过类调用或类的实例调用，但通常我们会使用类名直接调用。
它主要用于更改类级别的属性和方法，而不是实例级别的属性和方法。
'''


class MyClass:
    x = [1, 2, 3]

    @classmethod
    def modify_x_cls(cls, new_val) -> None:
        cls.x.append(new_val)

    def modify_x_self(self, new_val) -> None:
        self.x.append(new_val)


MyClass.modify_x_cls(4)
print(MyClass.x)  # [1, 2, 3, 4]


mc = MyClass()
mc.modify_x_self(4)
print(mc.x)  # [1, 2, 3, 4, 4] 类已经改过一次了
