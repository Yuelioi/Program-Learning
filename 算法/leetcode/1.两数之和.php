/*
* @lc app=leetcode.cn id=1 lang=php
*
* [1] 两数之和
*/
<?php
// @lc code=start
class Solution
{

  /**
   * @param Integer[] $nums
   * @param Integer $target
   * @return Integer[]
   */
  function twoSum($nums, $target)
  {
    $l = count($nums);
    for ($i = 0; $i < $l; $i++) {
      $t = $target - $nums[$i];
      for ($j = $i + 1; $j < $t; $j++) {
        if ($nums[$j] === $t  ) {
          return array($i, $j);
        }
      }
    }
  }
}
// @lc code=end
