def get_prop(obj):
    print([attr for attr in dir(obj) if not callable(
        getattr(obj, attr)) and not attr.startswith("__")])


def get_method(obj):

    methods = [method for method in dir(
        obj) if callable(getattr(obj, method)) and not method.startswith("__")]
    print(methods)


def get_method_doc(obj):
    import inspect

    methods = [method for method in dir(
        obj) if inspect.ismethod(getattr(obj, method))]
    for method_name in methods:
        method = getattr(obj, method_name)
        docstring = method.__doc__
        print(f"{method_name}: {docstring}")


if __name__ == '__main__':
    cl = []

    # get_prop(cl)
    # get_method(cl)
    get_method_doc(cl)
