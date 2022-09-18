// * unscopables
// ! 最好别使用 with 语句
var keys = [];
with (Array.prototype) {
  keys.push("something");
}

const output = Object.keys(Array.prototype[Symbol.unscopables]);
console.log(output);

// expected output
// [
//   'copyWithin', 'entries',
//   'fill', 'find',
//   'findIndex', 'flat',
//   'flatMap', 'includes',
//   'keys', 'values',
//   'at'
// ]


// * length

const clothing = ['shoes', 'shirts', 'socks', 'sweaters'];
console.log(clothing.length);
// expected output: 4

clothing.length = 2;
console.log(clothing);
// [ 'shoes', 'shirts' ] 截断数组