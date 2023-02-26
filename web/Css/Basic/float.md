https://www.bilibili.com/video/av44823731

脱离文档流

浮动, 相当于独立通道(位于上层), 只不过必须在父元素内.

![[../../../ASSETS/Pasted image 20220523190119.png]]


![[../../../ASSETS/Pasted image 20220523190103.png]]

文本很特殊, 可以识别到浮动元素

![[../../../ASSETS/Pasted image 20220523190240.png]]

## 高度坍塌

父元素没其他元素(此时高度就为0了)


解决方案:

overflow:hidden (高度为auto)

父元素也float

用clear清除浮动