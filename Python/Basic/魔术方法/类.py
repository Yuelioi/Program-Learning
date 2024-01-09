from typing import Any
from collections.abc import Iterable


class Element(object):
    log = False
    __slots__ = ["x", "_data"]  # 实例属性白名单

    # tag 创建与销毁
    def __new__(cls, x):
        # 创建object前, 单例模式下可以用(只允许一个实例对象)
        print("__new__")
        return super().__new__(cls)

    def __init__(self, x) -> None:
        # 创建object后 初始化
        print("__init__")
        self.x = x
        self._data = x


    def __del__(self):
        # 释放时(有点像析构), 跟del不一样, 不太可控
        print("__del__")

    def __init_subclass__(cls, log=True):
        """衍生类"""
        cls.log = log
        print("__init_subclass_", cls)

    # tag 打印与转换
    def __repr__(self):
        # 更详细的str, 没有__str__时会直接调用__repr__
        return "__repr__"

    def __str__(self):
        # 更注重可读性
        return "__str__"

    def __format__(self, __format_spec: str):
        if __format_spec == "x":
            print("__format__with x")
            return "xxx_A"

        print("__format__")
        return "__format__"

    def __bytes__(self):
        print("__bytes__")
        return bytes()

    # tag 比较
    def __eq__(self, __value: object) -> bool:
        """等于"""
        print("__eq__")
        return __value is not None

    def __bool__(self):
        """判断,自定义对象默认都返回True"""
        return True

    def __ne__(self, __value: object) -> bool:
        """不等于, 如果没写就调用__eq__,然后取反"""
        print("__eq__")
        return __value is not None

    def __gt__(self, __value: object) -> bool:
        """大于"""
        return False

    def __lt__(self, __value: object) -> bool:
        """小于,没有就走大于, 同类= x.__lt__(y) 不同类
        算了 看视频吧
        https://www.bilibili.com/video/BV1Mx4y1u7gG?t=337.0
        """
        return False

    def __hash__(self) -> int:
        """当自定义eq函数时, hash函数也需要自定义
        1. 整数
        2. 相等必须返回同样的值
        """
        return 1

    # tag 属性
    def __getattr__(self, name):
        """读取不存在的属性才会调用"""
        print("__get_error__")
        return f"Default value for {name}"

    def __getattribute__(self, name):
        """读取属性时都会调用"""
        """ 在这里使用以下内容,会产生递归错误
        self.x +=1
        self.__getattr__(x)
        """
        print("__getattribute__ always call this")

        # 默认behavior: 使用super(). 或者 object.
        return super().__getattribute__(name)

    def __setattr__(self, __name: str, __value: Any) -> None:
        pass

    def __delattr__(self, __name: str) -> None:
        """del x.attr 时调用"""
        pass

    # tag 描述器
    # https://www.bilibili.com/video/BV1pT4y1a7dd/

    def __get__(self, obj, owner=None):
        """作为属性被调用时

        Args:
            obj: 父级实例化对象
            owner: 父级类

        Returns:
            _type_: _description_
        """
        print("__get__", obj, owner)

        return 0

    def __set__(self, obj, value):
        """同上,作为属性被设置时调用"""
        print("__set__")

    def __delete__(self, obj):
        """同上,作为属性被删除时调用"""
        print("__set__")

    def __set_name__(self, owner, name):
        """同上,作为属性时调用"""
        print("__set_name__", owner, name)

    # tag 计算
    # https://www.bilibili.com/video/BV1Jx4y1w7oJ/
    # 加减乘除等等 + - * / @ // % | & += -= 等等
    def __add__(self, obj):
        pass

    # tag 其他
    def __dir__(self) -> Iterable[str]:
        lst = super().__dir__()
        return [el for el in lst if not el.startswith("__")]

    def __getitem__(self,key):
        """使用 a[0]这种方式调用时"""
        print("__getitem__",key)
        return self._data[key]
    
    def __setitem__(self,key,value):
        """使用 a[0]这种方式调用时"""
        print("__setitem__",key)
        self._data[key] = value
    def __delitem__(self,key):
        """使用 a[0]这种方式调用时"""
        print("__delitem__",key)
        self._data[key]  = self._data[:key] + self._data[key+1:]
        
    def __reverse__(self):
        return Element(self.data[::-1])
        

    def __class_getitem__(cls, item):
        """使用 A[0]这种方式调用时"""
        print("__class_getitem__", item)
        return "ABC"

    def __mro_entries__(self, bases):
        """给给基类, 用子类instance of的时候可用"""
        print("__mro_entries__", bases)
        return (Element,)
    
    def __len__(self):
        # 如果没有bool 会尝试调用len
        ...


class Parent:
    child = Element(10)


class Child(Element):
    pass


# Parent().child
# print(Element[0])


class Meta(type):
    """https://www.bilibili.com/video/BV1zv4y147Ms?t=298.8"""

    @classmethod
    def __prepare__(cls, name, bases, **kwds):
        print("__prepare__", name, bases, kwds)
        return {}

    def __instancecheck__(self, __instance: Any) -> bool:
        return super().__instancecheck__(__instance)

    def __subclasscheck__(self, __subclass: type) -> bool:
        return super().__subclasscheck__(__subclass)


class MetaChild(metaclass=Meta):
    pass


# todo 描述器/metaclass
"""
https://www.bilibili.com/video/BV1pT4y1a7dd/
https://www.bilibili.com/video/BV13F411g7CD/
"""
