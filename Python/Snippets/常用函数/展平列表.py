import pydash

def flatten_list1(nested_list):
    flattened = []
    for item in nested_list:
        if isinstance(item, list):
            flattened.extend(flatten_list(item))
        else:
            flattened.append(item)
    return flattened


def flatten_list(nested_list):
    return sum(map(flatten_list, nested_list), []) if isinstance(nested_list, list) else [nested_list]

# 第三方库
pydash.flatten_deep([1, 2, [3, [4, 5, [6, 7]]]])


def iterflatten(array, depth=-1):
    """Iteratively flatten a list shallowly or deeply."""
    for item in array:
        if isinstance(item, (list, tuple)) and depth != 0:
            for subitem in iterflatten(item, depth - 1):
                yield subitem
        else:
            yield item
            
print(list(iterflatten([1, 2, [3, [4, 5, [6, 7]]]])))
