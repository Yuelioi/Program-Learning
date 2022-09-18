/*
 * @lc app=leetcode.cn id=35 lang=php
 *
 * [35] 搜索插入位置
 */
<?php
// @lc code=start
class Solution {

    /**
     * @param Integer[] $nums
     * @param Integer $target
     * @return Integer
     */
    function searchInsert($nums, $target) {
      
      $right = count($nums)-1;
      if($nums[$right]<$target){
        return $right+1;
      }
      $left = 0;
      while($left<$right){
        $mid = $left + (($right-$left)>>1);
        if($nums[$mid]>=$target){
          $right = --$mid;
        }
        $left = $mid;
      }
      return $left;

    }
}
// @lc code=end
