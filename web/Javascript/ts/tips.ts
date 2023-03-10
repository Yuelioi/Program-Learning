/**
?. 是可选链操作符，它可以用来检查对象的属性是否存在，避免在不存在属性时引起运行时错误。如果属性存在，则返回该属性的值，否则返回 undefined。
|| 范围更广,适用于布尔值和可转换为布尔值的值，如果左侧表达式的值为 falsy（即 false、null、undefined、0、""、NaN），则返回右侧表达式的值，否则返回左侧表达式的值。
?? 适用于任何类型的值，如果左侧表达式的值为 null 或 undefined，则返回右侧表达式的值，否则返回左侧表达式的值。
 */

// ?.
const obj = { a: { b: 123 } };
console.log(obj.a?.b); // 123
// console.log(obj.c?.d); // undefined

// ??
const a = null;
const b = a || "default value";
console.log(b); // "default value"

const c = "hello";
const d = c ?? "default value";
console.log(d); // "hello"
