<?php

// 单条
$card_info = ($db->query("SELECT * FROM `activities` WHERE `ID` = '$activity_id'"))->fetch_assoc()["team_info"];


// 遍历
foreach ($card_info as $key => $value) {
  echo '<img src="https://... '  . sprintf("%02d", $value) . '.png" ></img>';
}
