import random
print(dir(random))

['betavariate', 'choice', 'choices', 'expovariate', 'gammavariate', 'gauss', 'getrandbits', 'getstate', 'lognormvariate', 'normalvariate', 'paretovariate',
    'randbytes', 'randint', 'random', 'randrange', 'sample', 'seed', 'setstate', 'shuffle', 'triangular', 'uniform', 'vonmisesvariate', 'weibullvariate']

# 生成一个随机浮点数，范围在 [0.0, 1.0) 之间。
random.random()

# 生成一个随机整数 [1,10]
print(random.randint(1, 10))

# 生成一个随机浮点数 [1.0,10.0]
print(random.uniform(1, 10))

# 从序列中随机选择一个元素
print(random.choice(['apple', 'banana', 'orange']))
result = random.choices([5, 8], [0.3, 0.7])  # 30%概率5 70%概率8

# 将序列中的元素随机排列
fruits = ['apple', 'banana', 'orange']
random.shuffle(fruits)
print(fruits)

# 生成一个随机整数，范围在 [start, stop) 之间，步长为 step。
random.randrange(1, 100, 10)

# 初始化随机数生成器。
random.seed(a=None, version=2)
random.gauss()

# 从数字列表中选择 3 个数字
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
sample = random.sample(numbers, 3)
print(sample)

# --------------- #

# 生成均值为 0, 标准差为 1 的正态分布随机数
random_number = random.gauss(0, 1)
print(random_number)

# 生成均值为 5, 标准差为 2 的正态分布随机数
random_number = random.gauss(5, 2)
print(random_number)
