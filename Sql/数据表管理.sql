-- 增
create table tb1(
  id int auto_increment primary key,
  --  主键 不允许为空 不允许重复(auto_increment代表自增)
  name varchar(16) not null,
  --  不允许为空
  age int null,
  --  允许为空(默认)
  score int default 60,
  --  默认值
) default charset = utf8;

insert into tb1 (name,age) value("AA",18);

-- 查
desc tb1 

-- 删
drop table tb1


