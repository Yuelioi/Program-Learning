/*
 * @lc app=leetcode.cn id=1748 lang=javascript
 *
 * [1748] 唯一元素的和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var sumOfUnique = function (nums) {
  let hash = {};
  let sum=0;
  for (let i = 0; i < nums.length; i++) {
    hash[nums[i]] = hash[nums[i]] + 1 || 1;
  }
  for (const key in hash) {
    if (hash[key] === 1) {
      sum += parseInt(key);
    }
  }
  return sum;
};
// @lc code=end

console.log(sumOfUnique([1, 2, 3, 2]));
