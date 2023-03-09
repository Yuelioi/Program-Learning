通用法则 : 谁调就是谁

https://www.bilibili.com/video/BV19V411J77j

1.在方法中，this 指的是所有者对象。 2.单独的情况下，this 指的是全局对象。 3.在函数中，this 指的是全局对象。 4.在函数中，严格模式下，this 指的是 undefined。 5.在事件中，this 指的是接收事件的元素。
@docs:http://www.ruanyifeng.com/blog/2018/06/javascript-this.html

沿着作用域,向上找最近的 function(不是箭头函数), 看它如何执行/调用的

function 调用分为

1. 作为函数调用: 如 foo(), 指向全局对象(globalThis), 严格模式为 undefined
2. 作为方法调用: foo.bar()/`foo['bar']())`/`foo[0]()`, 指向调用这个方法的对象
3. 构造函数, new Foo(), 指向新对象
4. 特殊: foo.call/apply/bind
5. 找不到: 指向全局

```javascript
// 全局对象 默认是Window / 或者Nodejs的全局对象
console.log(this);

// 箭头函数 只跟上下文有关 this指向Window
var fun1 = () => {
    console.log(this);
};

// 直接用function 定义的对象 this也指向Window
function fun2() {
    console.log(this);
}
var fun3 = function fun2() {
    console.log(this);
};

// 闭包
function fun4() {
    function fun5() {
        console.log(this);
    }
    fun5();
}
fun4();

// 构造函数里的this 指向实例对象
function Person(name) {
    this.name = name;
    console.log(this);
}
Person("xxx"); // 还是Window
var p = new Person("xxx"); // 实例对象p. new会把this自动绑定

// OBJ
let obj = {
    a: 1,
    b: 2,
    p: { id: 007 },
};
obj.p.fun1 = fun1;
obj.p.fun2 = fun2;
obj.p.fun1(); // 箭头函数还是Window
obj.p.fun2(); // { id: 7, fun: [Function: fun2] }

// 事件处理
<button onclick="this.style.display='none'">this指向当前按钮</button>;

// call apply bind
```

示例

```javascript
length = 5;
function fn() {
    console.log(this.length);
}
obj = {
    length: 10,
    foo(fn) {
        fn();
        arguments[0](); // ~ arguments.0(); 所以是3个参数
    },
};
obj.foo(fn, 1, 2); // 5 3
```
