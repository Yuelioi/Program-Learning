// 用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。

// *fill(value, start, end)

const array1 = [1, 2, 3, 4];
console.log(array1.fill(0, 2, 4));
// expected output: [1, 2, 0, 0]


// 创建100个0的数组
var arr =new Array(100);
arr.fill(0);
console.log(arr);

[1, 2, 3].fill(4);               // [4, 4, 4]
[1, 2, 3].fill(4, 1);            // [1, 4, 4]
[1, 2, 3].fill(4, 1, 2);         // [1, 4, 3]
[1, 2, 3].fill(4, 1, 1);         // [1, 2, 3]
[1, 2, 3].fill(4, 3, 3);         // [1, 2, 3]
[1, 2, 3].fill(4, -3, -2);       // [4, 2, 3]
[1, 2, 3].fill(4, NaN, NaN);     // [1, 2, 3]
[1, 2, 3].fill(4, 3, 5);         // [1, 2, 3]
Array(3).fill(4);                // [4, 4, 4]