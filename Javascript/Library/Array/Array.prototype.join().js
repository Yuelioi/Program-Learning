// 将数组（或类数组对象）所有元素连接成一个字符串并返回这个字符串。
// 如果数组只有一个项目，那么将返回该项目而不使用分隔符。

const elements = ['Fire', 'Air', 'Water'];

console.log(elements.join());
// expected output: "Fire,Air,Water"

console.log(elements.join(''));
// expected output: "FireAirWater"

console.log(elements.join('-'));
// expected output: "Fire-Air-Water"