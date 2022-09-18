// 浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。

copyWithin(target [, start, end])
start 可以为负
const array1 = ['a', 'b', 'c', 'd', 'e'];

// copy to index 0 the element at index 3
console.log(array1.copyWithin(0, 3, 4));
// expected output: Array ["d", "b", "c", "d", "e"]