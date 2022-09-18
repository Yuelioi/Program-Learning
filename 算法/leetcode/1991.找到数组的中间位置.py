#
# @lc app=leetcode.cn id=1991 lang=python
#
# [1991] 找到数组的中间位置
#

# @lc code=start
class Solution(object):
    def findMiddleIndex(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        for i in range(len(nums)):
            if sum(nums[0:i]) == sum(nums[i+1:len(nums)]):
                return i
        return -1

# @lc code=end
