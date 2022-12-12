UPDATE user SET `password_hash` = ' $2a$ 14$ajq8Q7fbtFRQvXpdCq7Jcuy.Rx1h/L4J60Otx.gyNLbAYctGMJ9tK' WHERE `id` = 101

// 批量把书籍的 ID 改为 $xx.html 格式

UPDATE `md_documents` SET `identify` = REGEXP_REPLACE(`identify`,'(.+)\.md','\1.html') WHERE `book_id` = 9

// 改为 $xx.html 格式

UPDATE `md_documents` SET `identify` = CONCAT('$', identify) WHERE `book_id` != 9;

// 将文章内容替换一下

UPDATE `md_documents` SET `release` = REGEXP_REPLACE(`release`, '\.md','\.html') WHERE `book_id` = 9 AND `member_id` = 0;
