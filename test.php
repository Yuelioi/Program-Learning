<?php 
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

$s = twoSum([0,4,3,0],0);

print_r($s);
