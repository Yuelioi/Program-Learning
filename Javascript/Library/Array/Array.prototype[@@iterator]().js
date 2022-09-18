// * arr[Symbol.iterator]()


var arr = ['a', 'b', 'c', 'd', 'e'];
var eArr = arr[Symbol.iterator]();
// 浏览器必须支持 for...of 循环
for (let letter of eArr) {
  console.log(letter);
}