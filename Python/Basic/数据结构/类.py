class MyClass:
    def __init__(self, *args, **kwargs):
        self.args = args

        # vars(self).update(kwargs) # 或者

        for k, v in kwargs.items():
            setattr(self, k, v)


obj = MyClass(1, 2, 3, 4, arg1='hello', arg2='world')
print(obj.args)  # (1, 2, 3, 4)
print(obj.arg1)  # 'hello'
print(dir(vars(obj)))
