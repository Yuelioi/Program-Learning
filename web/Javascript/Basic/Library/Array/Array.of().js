
// Array.of() 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。

// Array.of() 和 Array 构造函数之间的区别在于处理整数参数：
// Array.of(7) 创建一个具有单个元素 7 的数组，而 Array(7) 创建一个长度为 7 的空数组
// （注意：这是指一个有 7 个空位(empty) 的数组，而不是由 7 个undefined组成的数组）。

const arr1 = new Array(7) // [,,,,,,,]
const arr2 = Array.of(7) // [7]
console.log(arr1)
console.log(arr2)
