import string
string.digits
# 字符串 '0123456789'。

string.ascii_lowercase
# 小写字母 'abcdefghijklmnopqrstuvwxyz

string.ascii_uppercase
# 大写字母 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'。 该值不依赖于语言区域，不会发生改变。

string.hexdigits
# 字符串 '0123456789abcdefABCDEF'。

string.octdigits

# 字符串 '01234567'

string.punctuation
# !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~

string.whitespace
# 空格、制表、换行、回车、进纸和纵向制表符


'{2}, {1}, {0}'.format(*'abc')
# 'c, b, a'

coord = (3, 5)  # {0: 3, 1: 5}
'X: {0[0]};  Y: {0[1]}'.format(coord)
# 'X: 3;  Y: 5'
