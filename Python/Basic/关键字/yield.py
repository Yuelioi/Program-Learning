# -------------------------------------------------------
# 基本用法
import asyncio


def basic_generator():
    yield 'apple'
    yield 'banana'
    yield 'cherry'

# 创建生成器对象
gen = basic_generator()

# 迭代生成器对象
for item in gen:
    ...

# -------------------------------------------------------
# 生成器表达式
gen = (x for x in range(10) if x % 2 == 0)

# -------------------------------------------------------
# 子生成器
def sub_generator():
    yield 'apple'
    yield 'banana'

def parent_generator():
    yield from sub_generator()
    yield 'cherry'

gen = parent_generator()


# -------------------------------------------------------
# 异步生成器
async def async_generator():
    yield 'apple'
    await asyncio.sleep(3)
    yield 'banana'

async def process_values():
    async for item in async_generator():
        print(item)

asyncio.run(process_values())