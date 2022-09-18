[MDN_ARRAY](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/)



Array.prototype[@@unscopables]  
Array.prototype.length          =>数组长度  
Array.prototype[@@iterator]()   
get Array[@@species]            

Array.isArray()                 是数组=>true
Array.prototype.every()         条件匹配(全员)=>boolean
Array.prototype.some()          条件匹配(1个)=>boolean
Array.prototype.includes()      值匹配=> 一个命中→true | 全员不命中→false [小every]


Array.prototype.map()           条件=>新数组
Array.of()                      值们=>新数组
Array.from()                    类数组=>数组
Array.prototype.forEach()       遍历
Array.prototype.filter()        条件筛选=>新数组
Array.prototype.concat()        值/数组 => 新数组
Array.prototype.copyWithin()    =>原数组复制
Array.prototype.flat()          =>展平后的新数组
Array.prototype.flatMap()       map+flat=>展平后的新数组
Array.prototype.reverse()       反转数组
Array.prototype.fill()          指定位置填充元素=>原数组改变
Array.prototype.sort()          条件排序=>新数组
Array.prototype.slice()         切割=>原数组浅拷贝
Array.prototype.splice()        切割=>改变原数组
Array.prototype.reduce()        遍历=>叠加计算
Array.prototype.reduceRight()   反向遍历=>叠加计算

Array.prototype.entries()       =>键值对
Array.prototype.values()        =>值迭代器
Array.prototype.keys()          =>索引迭代器

Array.prototype.at()            索引=>值(单个)
Array.prototype.find()          条件匹配=>首个命中值
Array.prototype.findIndex()     条件匹配=>首个命中索引
Array.prototype.findLast()      条件匹配=>首个尾部命中值
Array.prototype.findLastIndex() 条件匹配=>首个尾部命中索引

Array.prototype.indexOf()       值匹配=>首个命中索引 | -1
Array.prototype.lastIndexOf()   值匹配=>首个尾部命中索引 | -1
Array.prototype.pop()           尾部删除1元素=>删除的元素 原数组改变
Array.prototype.push()          尾部追加1元素=>数组新长度 原数组改变
Array.prototype.shift()         头部删除1元素=>删除的元素 原数组改变
Array.prototype.unshift()       头部追加1元素=>数组新长度 原数组改变


Array.prototype.join()          =>字符串
Array.prototype.toString()      数组转字符串
Array.prototype.toLocaleString()数组转字符串(本地化)

Array.prototype.group()         未上架
Array.prototype.groupToMap()    未上架

