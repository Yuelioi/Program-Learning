// 创建给定数组一部分的浅拷贝，其包含通过所提供函数实现的测试的所有元素。

const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
const result = words.filter(word => word.length > 6);
console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]
