Go 语言全都是值传递, 整形 数组的值是完全复制, 而字符串, slice, map, channel, interface, function这样的引用类型也是值拷贝, 不过复制的是标头值(地址)
