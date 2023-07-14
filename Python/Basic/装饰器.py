# 装饰器是一种函数或类，可以用于修改其他函数或类的行为。装饰器提供了一种简洁的方式来对函数或类进行包装或扩展，而不需要修改原始定义。
def decorator(func):
    def wrapper(*args, **kwargs):
        print("预处理")
        result = func(*args, **kwargs)
        print("结束处理")
        return result
    return wrapper


@decorator
def add_numbers(a, b):
    return a + b


result = add_numbers(3, 5)
print(result)


def decorator_with_args(*args1, **kwargs1):
    def decorator(func):
        def wrapper(*args2, **kwargs2):
            print(f"装饰器参数: {args1}")
            ...
            result = func(*args2, **kwargs2)
            ...
            return result
        return wrapper
    return decorator


@decorator_with_args("arg1", "arg2")
def add_numbers2(a, b):
    return a + b


result = add_numbers2(3, 5)
print(result)


def test():
    def decorator1(func):
        def wrapper(*arg, **kwargs):
            arg = arg[0]+1
            func(arg)

        return wrapper
    return decorator1


@test()
def add1(arg):
    print(arg)


add1(1)
