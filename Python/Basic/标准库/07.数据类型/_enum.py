from enum import Enum, IntEnum

# class syntax


class Color(IntEnum):
    RED = 1
    GREEN = 2
    BLUE = 3


# functional syntax
Color2 = Enum('Color', ['RED', 'GREEN', 'BLUE'])


print(Color.RED.value)  # 1
print(Color2.RED.value)  # 1
