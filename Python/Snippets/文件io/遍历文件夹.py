import asyncio


async def long_running_task():
    print("Long running task started")
    await asyncio.sleep(10)
    print("Long running task completed")


async def main():
    task = asyncio.create_task(long_running_task())

    while not task.done():
        current_coroutine = task.get_coro()
        if current_coroutine:
            print(f"Currently executing coroutine: {current_coroutine.__qualname__}")
        await asyncio.sleep(1)

    print("Task completed")


if __name__ == "__main__":
    asyncio.run(main())
