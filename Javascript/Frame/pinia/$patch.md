## 使用场景

同时修改多个 state 属性

```js
// 直接设置
store.$patch({
  counter: store.counter + 1,
  name: "Abalam",
});

// 传参
cartStore.$patch(state => {
  state.items.push({ name: "shoes", quantity: 1 });
  state.hasChanged = true;
});
```
