// 基于索引获取值 支持负数索引

const array1 = [5, 12, 8, 130, 44];

let index = 2;
console.log(array1.at(index));
// expected output: 8

index = -2;
console.log(array1.at(index));
// expected output: 130

console.log(array1[index])
// expected output: undefined 普通调用不支持负数索引