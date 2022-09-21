
// * 如果 options 为 undefined 自动短路到空对象
const options = options || {};


// ? 空值合并运算符 新特性
result = a ?? b;
result = (a !== null && a !== undefined) ? a : b;