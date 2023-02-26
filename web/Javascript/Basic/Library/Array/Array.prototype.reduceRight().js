// 接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值。


const array1 = [[0, 1], [2, 3], [4, 5]];

const result = array1.reduceRight((accumulator, currentValue) => accumulator.concat(currentValue));

console.log(result);
// expected output: Array [4, 5, 2, 3, 0, 1]