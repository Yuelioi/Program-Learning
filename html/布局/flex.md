https://www.cnblogs.com/damocleses/p/16198003.html

## 介绍

flex 盒状布局, 分为容器与项目两部分

容器内有 2 轴: 主轴与交叉轴

拿文字比喻, 主轴就是字在一行上书写, 交叉轴就是一行一行文字从上往下

## 容器属性

以下默认以 row 为说明,如果设置 column,把左右上下颠倒即可(轴向变了)

flex-direction: 排列方向, 左右上下 共 4 个方向`row、column、row-reverse、column-reverse`

flex-wrap: 满了是否换行. 换|不换|反向换| `nowrap、wrap、wrap-reverse`

align-content: 交叉轴方向.`flex-start、flex-end、center、space-around、space-between、stretch`

justify-content: 主轴方向上项目的对齐方式. 靠左|靠右|靠中|靠两边|靠两边+边间距=1/2 元素间距|靠两边+边间距=元素间距 `flex-start、flex-end、center、space-between、space-around`

align-items: 交叉轴项目对齐方式. 靠上|靠中(边间距 1/2)|靠下|上下拉|基于文字 `flex-start、flex-end、center、stretch、baseline`

flex-flow: 缩写 (方向+换行)

## 项目属性

order: 项目 id,越小越靠前

flex-grow: 是否放大, 默认为 0 不放大

flex-shrink: 是否缩小, 默认都是 1(等比缩小) 为 0 则不缩小

flex-basic: 默认 auto,权重高于 width

flex: 上面 3 个合体 (1 1 auto 等分放大缩小) (0 0 autuo 不放大 等分缩小)

align-self: 单独设置排列 `flex-start、flex-end、center、baseline、stretch、auto`

## 其他

父元素要有高度, 否则交叉轴无效, 子元素超出容器高度, 好多也无效

当只有一个项目时，space-around 的效果等同于 center，space-between 的效果等同于 flex-start

以文字对齐时, 没有文字的 item 可以认为是文字在最底部

justify-content 是针对主轴的，而 align-content 和 align-items 是针对交叉轴的

align-content 不支持单轴线，align-items 本质就是对每条轴线的操作

操作冲突时，align-items 的操作会被 align-content 覆盖掉
