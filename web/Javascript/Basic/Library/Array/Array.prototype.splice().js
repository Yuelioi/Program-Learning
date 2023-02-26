// 通过删除或替换现有元素或者原地添加新的元素来修改数组。此方法会改变原数组。


const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// inserts at index 1
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "June"]