class A:
    def __bool__(self):
        return False

    def __len__(self):
        return 1

    def __eq__(self):
        ...

    def __lt__(self):
        ...

    def __le__(self):
        ...

    def __gt__(self):
        ...

    def __ge__(self):
        ...


a = A()

print(bool(a))
