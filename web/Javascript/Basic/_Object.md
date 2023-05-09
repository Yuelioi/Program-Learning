`Object` 是 JavaScript 中非常常用的对象之一，它提供了很多有用的方法来操作对象。以下是一些示例：

### 合并对象

使用 `Object.assign()` 方法可以将一个或多个源对象的所有属性复制到目标对象中，并返回目标对象：

```javascript
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

Object.assign(target, source);
console.log(target); // { a: 1, b: 4, c: 5 }
```

### 创建对象

使用 `Object.create()` 方法可以创建一个新的对象，并将其原型指向另一个对象：

```javascript
const person = {
  firstName: 'John',
  lastName: 'Doe',
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
};

const john = Object.create(person);
john.firstName = 'John';
john.lastName = 'Doe';
console.log(john.fullName()); // John Doe
```

### 遍历对象

使用 `for...in` 循环可以遍历对象的所有可枚举属性：

```javascript
const person = { firstName: 'John', lastName: 'Doe', age: 30 };

for (const key in person) {
  console.log(`${key}: ${person[key]}`);
}
// firstName: John
// lastName: Doe
// age: 30
```

### 检查对象属性

使用 `Object.hasOwnProperty()` 方法可以检查对象是否拥有指定的属性：

```javascript
const person = { firstName: 'John', lastName: 'Doe', age: 30 };

console.log(person.hasOwnProperty('firstName')); // true
console.log(person.hasOwnProperty('fullName')); // false
```

### 获取对象属性

使用 `Object.getOwnPropertyDescriptor()` 方法可以获取对象指定属性的描述符：

```javascript
const person = { firstName: 'John', lastName: 'Doe' };

const descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log(descriptor);
// {
//   value: "John",
//   writable: true,
//   enumerable: true,
//   configurable: true
// }
```

以上只是 `Object` 的一些常用示例，它还有很多有用的方法，可以查看官方文档来了解更多信息。
