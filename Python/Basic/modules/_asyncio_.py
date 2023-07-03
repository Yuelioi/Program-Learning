"""
本文件名不能使用 _asyncio.py
https://zhuanlan.zhihu.com/p/158641367
[【python】asyncio的理解与入门，搞不明白协程？看这个视频就够了。_高天](https://www.bilibili.com/video/BV1oa411b7c9/)

* 关键词
coroutine:  协同程序
event loop : 消息队列, 等待任务以及交接控制权
task: 任务, 获取以及交还控制权


把 coroutine 变成 task


* 概念
async 函数 就是coroutine function
async 函数在调用时, 返回一个coroutine object

* 如何运行
1. 进入async 模式
2. 把coroutine变成task



"""
import asyncio
import time

"""￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣
运行一个task
asyncio.run
1. 建立 event loop
    asyncio.run
2. 把 coroutine 转为 task
    (0) asyncio.run
    (1) create_task
    (2) gather
"""


async def demo_test():
    print("1")
    await asyncio.sleep(1)
    print("2")


# 3.11+ 可以使用Runner
# with asyncio.Runner() as runner:
#     runner.run(main())
#     runner.close()
#     runner.get_loop()


"""￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣
await
1. 告诉 event loop 执行完 await 后面的内容之后, 再执行我这个 task
2. 会 yield 出去
3. 会把 await 后面的内容的返回值保存
"""


async def say_after(delay, what):
    await asyncio.sleep(delay)
    return f"{what} - {delay}"


async def demo_await():
    print(f"start {time.strftime('%X')}")
    await say_after(1, "hello")
    await say_after(2, "world")
    print(f"finish {time.strftime('%X')}")


# 共耗时3s 因为 await 会等待任务完成


"""￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣
create_task 也会把 coro 变成 task
特点
    1. 再次使用await时, 不需要将coroutine变成task
    2. 提前在event loop里注册了task, 只是暂未执行
"""


async def demo_create_task():
    task1 = asyncio.create_task(say_after(1, "hello"))
    task2 = asyncio.create_task(say_after(2, "world"))

    print(f"start {time.strftime('%X')}")
    await task1
    await task2
    print(f"finish {time.strftime('%X')}")

# 共耗时2s 因为 await 会等待任务完成
# asyncio.run(main3())


"""￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣
asyncio.gather 返回一个 Future
特点
    也可以await
    参数可以是
        (1) coroutine(会被包装成task,并注册到event loop, 有点像create_task) ,
        (2) task
        (3) future
    await 一个 future: 会等待他的所有task完成 才继续,并返回各个task的返回值, 一个列表

"""


async def demo_gather():
    task1 = asyncio.create_task(say_after(1, "hello"))
    task2 = asyncio.create_task(say_after(3, "world"))
    task3 = asyncio.create_task(say_after(5, "world"))

    print(f"start {time.strftime('%X')}")

    ret = await asyncio.gather(task1, task2, task3)
    print(ret)

    print(f"finish {time.strftime('%X')}")


async def main():
    # await demo_test()
    # await demo_await()
    # await demo_create_task()
    await demo_gather()
    ...


if __name__ == '__main__':
    asyncio.run(main())
