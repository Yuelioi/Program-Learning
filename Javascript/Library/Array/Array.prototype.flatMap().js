// 映射函数映射每个元素，然后将结果压缩成一个新数组。

// flat + map

const arr1 = [1, 2, [3], [4, 5], 6, []];

const flattened = arr1.flatMap(num => num);
console.log(flattened);
// [1, 2, 3, 4, 5, 6]


const flattened2 = arr1.flatMap(num => num instanceof Array?num.flat(2):num*2);
console.log(flattened2);
// [ 2, 4, 3, 4, 5, 12 ]
