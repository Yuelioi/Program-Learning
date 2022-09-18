// 返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回-1。
// *筛选 1个 返回索引

const array1 = [5, 12, 8, 130, 44];
const isLargeNumber = (element) => element > 13;
console.log(array1.findIndex(isLargeNumber));
// expected output: 3


function isPrime(element, index, array) {
  var start = 2;
  while (start <= Math.sqrt(element)) {
    console.log(1)
    if (element % start ++ <1) { // ? 居然不用 ==0
      return 0;
    }
  }
  return 1;
}

console.log([4, 6, 8, 12].findIndex(isPrime)); // -1, not found
console.log([4, 6, 7, 12].findIndex(isPrime)); // 2