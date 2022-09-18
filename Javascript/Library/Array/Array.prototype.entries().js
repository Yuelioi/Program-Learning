// 返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对。


const array1 = ['a', 'b', 'c'];

const iterator1 = array1.entries();

console.log(iterator1.next());
// expected output: { value: [ 0, 'a' ], done: false }

console.log(iterator1.next().value);
// expected output: Array [1, "b"]


// 对二维数组的每一行 进行排序
function sortArr(arr) {
  var goNext = true;
  var entries = arr.entries();
  while (goNext) {
      var result = entries.next();
      if (result.done !== true) {
          result.value[1].sort((a, b) => a - b);
          goNext = true;
      } else {
          goNext = false;
      }
  }
  return arr;
}

var arr = [[1,34],[456,2,3,44,234],[4567,1,4,5,6],[34,78,23,1]];
sortArr(arr);
