// 声明全局变量或模块
declare const $: any;

$("#my-element").hide();

// 声明函数、类或命名空间
declare function myLibFunc(): void;

declare class MyLibClass {
    constructor(name: string);
    sayHello(): void;
}

declare namespace MyLib {
    const version: string;
}

myLibFunc();

const myObj = new MyLibClass("World");
myObj.sayHello();

console.log(MyLib.version);
