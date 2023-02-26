// 叠加计算
// 每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。

const array1 = [1, 2, 3, 4];

// 20+ 1 + 2 + 3 + 4
const initialValue = 20;
const sumWithInitial = array1.reduce(
  (previousValue, currentValue) => previousValue + currentValue,
  initialValue
);

// console.log(sumWithInitial);


let nums =[2,3,-1,8,4];
var findMiddleIndex = function (nums) {
  if (nums.length === 1) {
    return 0;
  }

  if (nums.length === 2) {
    if (nums[1] === 0) {
      return 0
    } else if (nums[0] === 0) {
      return 1
    }
    return -1;
  }

  for (var i = 0; i < nums.length; i++) {
    const left = nums.slice(0,i).reduce((a, b)=>a+b,0);
    const right = nums.slice(i+1,nums.length).reduce((a, b)=>a+b,0);

    console.log(left,right)

    if (left === right) {
      return i;
    }
  }
  return -1;
};
console.log( findMiddleIndex(nums) );
