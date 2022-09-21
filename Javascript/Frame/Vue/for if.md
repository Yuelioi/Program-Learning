## v-if

```js
<p v-if="seen">Now you see me</p>
```








![[../../../../ASSETS/Pasted image 20220516193236.png]]


```html
<!-- for 建议绑定key，唯一，一般是id 字符串/数字 -->
<li v-for="item in items" :key="item.id" :title="{{item.id}}"> {{ item.name }} </li>
<!-- <li v-for="(item,index) in items"> {{ item }} </li> -->
```
