/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let hash = {};
  for (let i = 0; i < nums.length; i++) {
    const ref = target - nums[i];
    if (hash[ref] !== undefined) {
      return [i, hash[ref]];
    }
    hash[nums[i]] = i;
  }
  return [];

};
// @lc code=end


// 直接双重遍历
var twoSum = function (nums, target) {
  for (var i = 0; i < nums.length; i++) {
    const t = target - nums[i];
    for (var j = i + 1; j < nums.length; j++) {
      if (t === nums[j]) {
        return [i, j];
      }
    }
  }
  return [];
};