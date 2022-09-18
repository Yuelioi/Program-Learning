/*
 * @lc app=leetcode.cn id=1991 lang=javascript
 *
 * [1991] 找到数组的中间位置
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMiddleIndex = function (nums) {

  let left = 0;
  for (var i = 0; i < nums.length; i++) {
    if(i>0){
      left += nums[i-1];
    }
    if (left === nums.slice(i + 1, nums.length).reduce((a, b) => a + b, 0)) {
      return i;
    }
  }
  return -1;
};
// @lc code=end

findMiddleIndex([2,3,-1,8,4])

// !第一版 左边等于右边即可
// var findMiddleIndex = function (nums) {

//   for (var i = 0; i < nums.length; i++) {
//     if (nums.slice(0, i).reduce((a, b) => a + b, 0) === nums.slice(i + 1, nums.length).reduce((a, b) => a + b, 0)) {
//       return i;
//     }
//   }
//   return -1;
// };

// *官方解法
var findMiddleIndex = function(nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
      if (2 * sum + nums[i] === total) {
          return i;
      }
      sum += nums[i];
  }
  return -1;
};

