import threading
import queue

# https://docs.python.org/zh-cn/3/library/queue.html
# Queue 是一个 同步的队列类

"""
q.qsize() 队列大致大小
q.empty() 队列是否为空
q.full() 队列是否满
q.put() 加入队列
q.get() 移除一个元素,,并返回该元素
q.task_done() 排队任务已经完成
q.join() 阻塞至队列中所有的元素都被接收和处理完毕。


"""


def main():
    q = queue.Queue()

    def worker():
        while True:
            item = q.get()
            print(f'Working on {item}')
            print(f'Finished {item}')
            q.task_done()

    # Turn-on the worker thread.
    threading.Thread(target=worker, daemon=True).start()

    # Send thirty task requests to the worker.
    for item in range(30):
        q.put(item)

    # Block until all tasks are done.
    q.join()
    print('All work completed')


if __name__ == '__main__':
    main()
