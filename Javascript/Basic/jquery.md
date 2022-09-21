## 事件监听

```javascript
// .on( events [, selector ] [, data ] )
$("#card-area").on("click", ".card-item", function() {
	console.log($(this).attr("data-id"))
});
```
