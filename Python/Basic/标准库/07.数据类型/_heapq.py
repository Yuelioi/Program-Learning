# 堆 完全二叉树
# 大根堆 顶部最大
# 小根堆
# 下滤 下滤,直到形成大根堆 O(logN)
# 上滤

import heapq
import asyncio
from heapq import *

h = []
heappush(h, 1)
heappush(h, 3)
heappush(h, 2)
heappush(h, 2)
print(h)  # [1, 2, 2, 3]


h = []
heappush(h, (5, 'write code'))
heappush(h, (7, 'release product'))
heappush(h, (1, 'write spec'))
heappush(h, (3, 'create tests'))
heappop(h)  # (1, 'write spec')


async def process_item(item):
    # 模拟异步处理任务
    await asyncio.sleep(item)
    print(f"Processed item {item}")


async def process_items(items):
    # 创建一个空堆
    heap = []

    # 同时启动多个异步任务，并将它们的延迟时间添加到堆中
    for item in items:
        heapq.heappush(heap, item)

    # 依次处理堆中的任务，由于堆是最小堆，因此会按照延迟时间从小到大处理任务
    while heap:
        next_item = heapq.heappop(heap)
        await process_item(next_item)


async def main():
    # 创建一个包含延迟时间的任务列表
    items = [5, 2, 7, 1, 3]

    # 使用异步方式处理任务列表
    await process_items(items)

# 运行主函数
asyncio.run(main())
