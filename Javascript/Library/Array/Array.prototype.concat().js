// 创建新数组(连接) 不改变原数组

const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);

console.log(array3);
// expected output: Array ["a", "b", "c", "d", "e", "f"]

// *参数可以是值或数组 * N
// *省略参数 会获得浅拷贝
// *不改变原数组



const letters = ['a', 'b', 'c'];
const alphaNumeric = letters.concat(1, [2, 3]);
console.log(alphaNumeric);
// results in ['a', 'b', 'c', 1, 2, 3]


// TODO 使用 Symbol.isConcatSpreadable 合并类数组对象

