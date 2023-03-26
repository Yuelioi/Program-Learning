import glob
"""
通配符 * 匹配任意字符，包括路径分隔符。
通配符 ? 匹配单个字符，不包括路径分隔符。
通配符 [...] 匹配指定范围内的字符。
通配符 [^...] 匹配不在指定范围内的字符。
通配符 {...} 可以指定多个匹配模式，以 , 分隔。
"""
# files = glob.glob('/path/to/directory/*.py')
files = glob.glob(
    'H:\Snippets\Program-Learning\Python\Snippets\sub_progress\output/How to Color Your Animation and Comic Webtoon Like a PRO (Cel Shading Tutorial) -IWSJamdVp4*vtt')
# files = glob.glob('*.py')
print(files)
