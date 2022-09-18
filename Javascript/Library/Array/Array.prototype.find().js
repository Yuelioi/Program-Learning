// 返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
// *筛选 1个 返回值

const array1 = [5, 12, 8, 130, 44];
const found = array1.find(element => element > 10);
console.log(found);
// expected output: 12

const inventory = [
  {name: 'apples', quantity: 2},
  {name: 'bananas', quantity: 0},
  {name: 'cherries', quantity: 5}
];
const result = inventory.find(({ name }) => name === 'cherries');
console.log(result) // { name: 'cherries', quantity: 5 }