querySelector静态获取dom，不会根据页面变化而实时获取

getElement动态获取dom，获取页面实时最新dom元素

```javascript
// 动态
var ul = document.getElementsByTagName('ul')[0],
list1 = ul.getElementsByTagName("li");
// 静态
var ul = document.querySelectorAll('ul'),
list2 = ul.querySelectorAll("li");

for(var i = 0; i < list.length ; i++){
     ul.appendChild(document.createElement("li"));
}


console.log( list1.length);  //3
console.log( list2.length);  //6
```
