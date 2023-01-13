# decorator
# 函数 callable
# 本质是函数作为参数传递的语法糖

# https://www.bilibili.com/video/BV1Gu411Q7JV?t=78.2


import time


def double(x):
    return x*2


def triple(x):
    return x*3


def calc(func, x):
    print(func(x))


# calc(double, 3)
# calc(triple, 3)
# ---------------------------------------------------------------------------------

def mul_fun(n):
    def mul(x):
        return n * x
    return mul


double = mul_fun(2)
triple = mul_fun(3)

# print(double(3))
# print(triple(3))
# ---------------------------------------------------------------------------------


def dec(f):
    pass


@dec
def _double(x):
    return x * 2


# 等价于
# double = dec(double)

# ---------------------------------------------------------------------------------
def timeit(f):
    def warpper(x):
        start = time.time()
        ref = f(x)
        print(time.time()-start)
        return ref
    return warpper


# @timeit
# def my_func(x):
#     time.sleep(x)
# my_func(1)


@timeit
def my_func2(x):
    return x*2


# print(my_func2(2))  # 4
# ---------------------------------------------------------------------------------
# 标准写法


def timeit(f):
    def warpper(*args, **kwargs):
        start = time.time()
        ref = f(*args, **kwargs)
        print(time.time()-start)
        return ref
    return warpper


@timeit
def my_func2(x):
    return x*2


print(my_func2(2))  # 4
# ---------------------------------------------------------------------------------
# 带参数的


# @timeit(10)
# def my_func2(x):
#     return x*2

# 等价于
# db = timeit(10)(double)


# ---------------------------------------------------------------------------------
# 参上
# 带参数的decorator = 普通的函数 返回普通的decorator

def timeit(it):

    def inner(f):
        def warpper(*args, **kwargs):
            start = time.time()

            for _ in range(it):
                ref = f(*args, **kwargs)

            print(time.time()-start)
            return ref
        return warpper
    return inner
@timeit(1000)
def double(x):
  return x*2

# 等价于
inner = timeit(1000)
double = inner(double)
print(double(10))

