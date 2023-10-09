// 使用 filter(Boolean) 时，它会利用 JavaScript 中 Boolean 构造函数的特性。
// Boolean 构造函数将值转换为布尔值，删除所有假值，并保留所有真值。

const mixedArray = [1, 0, true, false, "hello", "", null, undefined, NaN];

// 使用 filter(Boolean) 移除假值
const truthyValues = mixedArray.filter(Boolean);

console.log(truthyValues);
