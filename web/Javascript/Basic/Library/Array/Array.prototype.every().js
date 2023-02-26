// 测试数组内的所有元素是否都能通过某个指定函数的测试。返回布尔值。



const isBelowThreshold = (currentValue) => currentValue < 60;
const array1 = [1, 30, 39, 29, 10, 13];
console.log(array1.every(isBelowThreshold));
// expected output: true