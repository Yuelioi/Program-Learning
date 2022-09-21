
★ https://www.php.net/manual/zh/ref.array.php

## array_count_values
array_count_values(array $array): array
统计词频 {a:3, b:5, c:8}

## array_fill
array_fill(int $start_index, int $count, mixed $value): array
生成0数组 array_fill(0, 10, 0);

## array_filter
array_filter(array $array, ?callable $callback = null, int $mode = 0): array
过滤偶数 $array = [6, 7, 8, 9, 10, 11, 12];
print_r(array_filter($array, function ($var){return !($var & 1);}));

## array_is_list
array_is_list(array $array): bool
判断键是否 0 到 count($array)-1

## array_key_exists
array_key_exists(string|int $key, array $array): bool
判断是否有键

## array_key_first array_key_last
获取首/尾值

## array_keys | array_values
获取所有键名|值

## array_map array_walk
array_map(?callable $callback, array $array, array ...$arrays): array
map

## array_merge
array_merge(array ...$arrays): array
合并一个或多个数组

## array_multisort
多维排序


## array_pop array_push array_shift array_unshift
出入栈

## array_rand
取1/多个随机键名

## array_reduce

## array_replace
使用第二个数组替换第一个数组
都有键名 2换1
1有2没有 不变
1没有2有 创建

## array_reverse
反转数组

## array_search
搜索值 返回首个键名

## array_slice array_splice


## array_sum
求和

## array_unique
过滤重复

## asort arsort ksort krsort sort rsort uasort uksort usort
排序

## count sizeof
计算个数

## current
当前值(有指针的)

## reset prev next end
指针指最后

## in_array
是否在数组内

## key($array)
当前单元的键名

## list
list — 把数组中的值赋给一组变量 解构赋值?
list($drink, $color, $power) = $info;

## range
range(string|int|float $start, string|int|float $end, int|float $step = 1): array
range — 根据范围创建数组，包含指定的元素

## shuffle
打乱数组





array_change_key_case — 将数组中的所有键名修改为全大写或小写
array_chunk — 将一个数组分割成多个
array_column — 返回输入数组中指定列的值
array_combine — 创建一个数组，用一个数组的值作为其键名，另一个数组的值作为其值
★array_count_values — 统计数组中所有的值
array_diff_assoc — 带索引检查计算数组的差集
array_diff_key — 使用键名比较计算数组的差集
array_diff_uassoc — 用用户提供的回调函数做索引检查来计算数组的差集
array_diff_ukey — 用回调函数对键名比较计算数组的差集
array_diff — 计算数组的差集
array_fill_keys — 使用指定的键和值填充数组
array_fill — 用给定的值填充数组
array_filter — 使用回调函数过滤数组的元素
array_flip — 交换数组中的键和值
array_intersect_assoc — 带索引检查计算数组的交集
array_intersect_key — 使用键名比较计算数组的交集
array_intersect_uassoc — 带索引检查计算数组的交集，用回调函数比较索引
array_intersect_ukey — 在键名上使用回调函数来比较计算数组的交集
array_intersect — 计算数组的交集
array_is_list — 判断给定的 array 是否为 list
array_key_exists — 检查数组里是否有指定的键名或索引
array_key_first — 获取指定数组的第一个键
array_key_last — 获取一个数组的最后一个键值
array_keys — 返回数组中部分的或所有的键名
array_map — 为数组的每个元素应用回调函数
array_merge_recursive — 递归地合并一个或多个数组
array_merge — 合并一个或多个数组                                
array_multisort — 对多个数组或多维数组进行排序
array_pad — 以指定长度将一个值填充进数组
array_pop — 弹出数组最后一个单元（出栈）                             
array_product — 计算数组中所有值的乘积
array_push — 将一个或多个单元压入数组的末尾（入栈）
array_rand — 从数组中随机取出一个或多个随机键
array_reduce — 用回调函数迭代地将数组简化为单一的值
array_replace_recursive — 使用传递的数组递归替换第一个数组的元素
array_replace — 使用传递的数组替换第一个数组的元素
array_reverse — 返回单元顺序相反的数组                               
array_search — 在数组中搜索给定的值，如果成功则返回首个相应的键名
array_shift — 将数组开头的单元移出数组                               
array_slice — 从数组中取出一段                                      
array_splice — 去掉数组中的某一部分并用其它值取代                      
array_sum — 对数组中所有值求和
array_udiff_assoc — 带索引检查计算数组的差集，用回调函数比较数据
array_udiff_uassoc — 带索引检查计算数组的差集，用回调函数比较数据和索引
array_udiff — 用回调函数比较数据来计算数组的差集
array_uintersect_assoc — 带索引检查计算数组的交集，用回调函数比较数据
array_uintersect_uassoc — 带索引检查计算数组的交集，用单独的回调函数比较数据和索引
array_uintersect — 计算数组的交集，用回调函数比较数据
array_unique — 移除数组中重复的值
array_unshift — 在数组开头插入一个或多个单元
array_values — 返回数组中所有的值
array_walk_recursive — 对数组中的每个成员递归地应用用户函数
array_walk — 使用用户自定义函数对数组中的每个元素做回调处理
array — 新建一个数组
arsort — 对数组进行降向排序并保持索引关系
asort — 对数组进行升序排序并保持索引关系
compact — 建立一个数组，包括变量名和它们的值
count — 统计数组、Countable 对象中所有元素的数量
current — 返回数组中的当前值
each — 返回数组中当前的键／值对并将数组指针向前移动一步
end — 将数组的内部指针指向最后一个单元
extract — 从数组中将变量导入到当前的符号表
in_array — 检查数组中是否存在某个值
key_exists — 别名 array_key_exists
key — 从关联数组中取得键名
krsort — 对数组按照键名逆向排序
ksort — 对数组根据键名升序排序
list — 把数组中的值赋给一组变量
natcasesort — 用“自然排序”算法对数组进行不区分大小写字母的排序
natsort — 用“自然排序”算法对数组排序
next — 将数组中的内部指针向前移动一位
pos — current 的别名
prev — 将数组的内部指针倒回一位
range — 根据范围创建数组，包含指定的元素
reset — 将数组的内部指针指向第一个单元
rsort — 对数组降序排序
shuffle — 打乱数组
sizeof — count 的别名
sort — 对数组升序排序
uasort — 使用用户自定义的比较函数，保持索引和值的对应关系，原地排序 array。
uksort — 使用用户自定义的比较函数对数组中的键名进行排序
usort — 使用用户自定义的比较函数对数组中的值进行排序