"""
本文件名不能使用 _asyncio.py
https://zhuanlan.zhihu.com/p/158641367
https: // www.bilibili.com/video/BV1oa411b7c9/

coroutine:  协同程序

event loop : 消息队列, 等待任务以及交接控制权
task: 任务, 获取以及交还控制权
把 coroutine 变成 task




"""
import asyncio
import time

"""￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣
运行一个task
asyncio.run
1. 建立 event loop
2. 把 coroutine 转为 task
"""


async def main():
    print("1")
    await asyncio.sleep(1)
    print("2")

coro = main()  # Coroutine
# asyncio.run(coro)

# 3.11+ 可以使用Runner
# with asyncio.Runner() as runner:
#     runner.run(main())
#     runner.close()
#     runner.get_loop()


"""￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣
await
1. 把 coroutine 转为 task
2. 告诉event loop 执行完 await 后面的内容之后, 再执行我这个 task
3. 会 yield 出去
4. 会把 await 后面的内容的返回值保存
"""


async def say_after(delay, what):
    await asyncio.sleep(delay)
    return f"{what} - {delay}"


async def main2():
    print(f"start {time.strftime('%X')}")
    await say_after(1, "hello")
    await say_after(2, "world")
    print(f"finish {time.strftime('%X')}")


# 共耗时3s 因为 await 会等待任务完成
# asyncio.run(main2())


"""￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣
create_task 也会把 coro 变成 task
"""


async def main3():
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
会等待他的所有task完成 才继续,并返回各个task的返回值

"""


async def main4():
    task1 = asyncio.create_task(say_after(1, "hello"))
    task2 = asyncio.create_task(say_after(3, "world"))
    task3 = asyncio.create_task(say_after(5, "world"))

    print(f"start {time.strftime('%X')}")

    ret = await asyncio.gather(task1, task2, task3)
    print(ret)

    print(f"finish {time.strftime('%X')}")


asyncio.run(main4())
