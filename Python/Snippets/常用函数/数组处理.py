

from typing import List


def split_arr_by_length(arr: List[str], lens: int):
    """ 将数组按照元素最大长度划分, 超过则拆分
    Args:
        arr (List[str]): 原始数组
        lens (int): _description_

    """
    return [subele for ele in arr for subele in ([ele[i:i+lens] for i in range(0, len(ele), lens)] if len(ele) >= lens else [ele])]
    # return [subele for ele in arr for subele in textwrap.wrap(ele, width=lens)] # 也可以用 textwrap
