import time


tStart = time.time()

def myFun():
  for i in range(100000000):
    ...
myFun()

print(time.time() - tStart)