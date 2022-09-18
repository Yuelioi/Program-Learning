/*
 * @lc app=leetcode.cn id=1991 lang=cpp
 *
 * [1991] 找到数组的中间位置
 */

// @lc code=start
class Solution {
 public:
  int findMiddleIndex(vector<int> &nums) {
    for (int i = 0, l = nums.size(); i < l; i++) {
      int left = 0;
      int right = 0;

      for (int j = 0; j < i; j++) {
        left += nums[j];
      }

      for (int k = i + 1; k < l; k++) {
        right += nums[k];
      }

      if (left == right) {
        return i;
      }
    }
    return -1;
  }
};
// @lc code=end
