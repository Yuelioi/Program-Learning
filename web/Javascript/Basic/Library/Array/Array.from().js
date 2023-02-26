对一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。


console.log(Array.from('foo'));
// expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], x => x + x));
// expected output: Array [2, 4, 6]

var m = [1, 2, 2];
console.log(Array.from(new Set(m)));
// 数组去重


数组 Set Map 类数组对象(arguments)