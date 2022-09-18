/*
 * @lc app=leetcode.cn id=1991 lang=php
 *
 * [1991] 找到数组的中间位置
 */
<?php
class Solution {

    /**
     * @param Integer[] $nums
     * @return Integer
     */
    function findMiddleIndex($nums) {
        for ($i = 0;$i<count($nums); $i++){
            if(array_sum(array_slice($nums,0,$i))==array_sum(array_slice($nums,$i+1,count($nums)))){
              return $i;
            }
        }
        return -1;
    }
}
// @lc code=end

