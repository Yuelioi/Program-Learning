https://www.bilibili.com/video/av46317897

块级格式化内容

容器内元素不会影响容器外元素

触发规则


![[../../../ASSETS/Pasted image 20220526022007 1.png]]


常用 2 种

.lbf-content { overflow: hidden; }  缺点: 子元素要定位到父元素的外面可能会被隐藏

.lbf-content { 
　 display: table-cell; width: 9999px;
　 /* 如果不需要兼容IE7，下面样式可以省略 */
　 *display: inline-block; *width: auto;
} 缺点: 元素内连续英文字符无法换行

解决问题

1 ) 浮动元素, 父级元素坍塌
![[../../../ASSETS/Pasted image 20220523191107 1.png]]
给父元素添加 
-overflow:hidden
-display:table-cell
-display:block
-postion:fixed
-postion:abosulte

父元素也浮动
浮动元素后加个空元素, clear:both
最后一个浮动元素 :: after{clear:both} 原理同上

2 ) 自适应布局

除了浮动加 BFC, 还可以固定 2 块区域位置

3 ) 外边距垂直方向重合

默认 margin 只取最大, 可以外面套个父元素

![[../../../ASSETS/Pasted image 20220523191749 1.png]]