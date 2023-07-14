# -------------------------------------------------------

import time
import aiohttp
import asyncio

# 协程示例(生成器函数)


def coroutine_example():
    while True:
        x = yield  # 暂停执行，并返回一个值给调用方
        print('Received:', x)


# 创建一个协程对象
coroutine = coroutine_example()

# 启动协程，准备执行
next(coroutine)

# 发送一个值给协程
coroutine.send(10)  # 输出：Received: 10

# 继续执行协程
coroutine.send('Hello')  # 输出：Received: Hello


def countdown(n):
    while n > 0:
        time.sleep(1)
        yield n
        n -= 1


# 创建一个协程对象
coroutine = countdown(5)

# 通过迭代协程对象来获取值
for num in coroutine:
    print(num)


# -------------------------------------------------------
# 网络请求


async def fetch(session, url):
    async with session.get(url) as response:
        return await response.text()


async def main():
    urls = [
        'http://example.com',
        'http://example.org',
        'http://example.net'
    ]

    async with aiohttp.ClientSession() as session:
        tasks = []
        for url in urls:
            task = asyncio.create_task(fetch(session, url))
            tasks.append(task)

        responses = await asyncio.gather(*tasks)
        for response in responses:
            # print(response)
            ...

asyncio.run(main())
