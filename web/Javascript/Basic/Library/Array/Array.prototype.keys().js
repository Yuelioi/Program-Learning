// 返回一个包含数组中每个索引键的 Array Iterator 对象。

const array1 = ['a', 'b', 'c'];
const iterator = array1.keys();

console.log( iterator.next())
console.log( iterator.next())
console.log( iterator.next())

// { value: 0, done: false }
// { value: 1, done: false }
// { value: 2, done: false }

for (const key of iterator) {
  console.log(key);
}

// expected output: 0
// expected output: 1
// expected output: 2
