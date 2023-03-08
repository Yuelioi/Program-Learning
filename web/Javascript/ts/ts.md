## 类型

https://www.bilibili.com/video/BV1wR4y1377K

https://blog.csdn.net/LiangHui0914/article/details/127960843

js 基础类型 `boolean`、 `bigint`、 `null`、`number`、 `string`、 `symbol`和 `undefined` 等等

拓展类型: `any`、 `never`、 `unknown`(只能赋值给自身或者是 any 类型),

其他: `interface`、 `number[]`、 `class` ...

对象类型: Object(所有类型), object(非原始类型), {}(new Object,跟 Object 一样)

组合类型: 联合和泛型。

```javascript
// 二维数组
let arr: number[][] = [[1], [2], [3]]; // 泛型 Array<Array<number>>

// 联合
type MyBool = true | false;

// 泛型
type StringArray = Array<string>; // string[]
```

### 接口

```javascript
interface Parent {
    name: string;
    id: number;
}

interface Child extends Parent {
    school: string;
}

const child: Child = {
    name: "Child",
    id: 1,
    school: "",
};

interface Fn {
    (name: string): string;
}

const fn: Fn = (name: string) => {
    return name;
};
```

### 函数

```javascript
// 参数的类型 IArguments
function foo(...args: number[]) {
    let bar: IArguments = arguments;
    console.log(args);
}

foo(1, 2, 3); // [1,2,3]

// 可选参数
function foo(a:number,b?:number,c:number=10){}

// 定义this的类型
interface Obj {
    add(this: Object);
}

let obj: Obj = {
    add(this: Obj) {
        this.add()..; // 否则输入this不提示add
    },
};

// 函数重载
function A(num:number) {}
function A(str:string) {}
```

| &
