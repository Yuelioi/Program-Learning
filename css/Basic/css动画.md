https://www.runoob.com/css3/css3-animations.html

## transition

![[../../../ASSETS/Pasted image 20220524103613.png]]

transition-property:all|none|property-name

transition-duration:s/ms

 **Keyword values**
transition-timing-function: ease;
transition-timing-function: ease-in;
transition-timing-function: ease-out;
transition-timing-function: ease-in-out;
transition-timing-function: linear;
transition-timing-function: step-start;
transition-timing-function: step-end;

**Function values**
transition-timing-function: steps(4, end);
transition-timing-function: cubic-bezier(0.1, 0.7, 1.0, 0.1);

**Multiple timing functions**
transition-timing-function: ease, step-start, cubic-bezier(0.1, 0.7, 1.0, 0.1);

**Global values**
transition-timing-function: inherit;
transition-timing-function: initial;
transition-timing-function: unset;

## transform
translate

百分比是基于自身

所以 -50% -50% 可以做居中


 
transform:rotate(r deg) 基于圆心旋转
scale(float)
skew(deg, deg)
