#
# @lc app=leetcode.cn id=1748 lang=python3
#
# [1748] 唯一元素的和
#

# @lc code=start
class Solution:
    def sumOfUnique(self, nums):
        myD = dict()
        total = 0
        for i in range(len(nums)):
            myD[nums[i]] = 1 if nums[i] not in myD else myD[nums[i]]+1

        for key,value in myD.items():
            if value == 1:
                total += key
        return total
# @lc code=end


print(Solution().sumOfUnique([1, 2, 3, 2]))
