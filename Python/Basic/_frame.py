import inspect

def f1():
    if frame := inspect.currentframe():
        if frame and frame.f_back:
            print(frame.f_back.f_lineno)
    
def main():
    f1()

main()