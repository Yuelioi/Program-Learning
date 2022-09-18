#
# @lc app=leetcode.cn id=35 lang=python3
#
# [35] 搜索插入位置
#

# @lc code=start
from hashlib import new


class Solution:
    def searchInsert(self, nums, target):
        lens = len(nums)

        if nums[lens - 1] < target:
            return lens

        left = 0
        right = lens-1
        while left <= right:
            mid = left + ((right - left) >> 1)
            if nums[mid] < target:
                left += 1
            else:
                right -= 1

        return left


s = Solution()
s.searchInsert([1, 3, 5, 6], 5)

# @lc code=end
