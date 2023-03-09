// 生成器
function* gen() {
    yield 1; //
    yield Promise.resolve("test");
}

const foo = gen();
foo.next(); // { value: 1, done: false }
foo.next(); // { value: Promise { 'test' }, done: false }
foo.next(); // { value: undefined, done: true }

// 迭代器
// set map

new Set([1, 2, 3, 3]); // Set(3) { 1, 2, 3 }
let map = new Map();
map.set(1, 2);

const list = [1, 2, 3];
list[Symbol.iterator]().next(); // { value: 1, done: false }

// for of 类似于
const each = (v: any) => {
    let it = v[Symbol.iterator]();
    let nx: any = { done: false };
    while (!nx.done) {
        nx = it.next();
        if (!nx.done) {
            console.log(nx.value);
        }
    }
};
// each(list);

// 迭代器的语法糖 for of ,不能用于对象
// for (let v of list) {
//     console.log(v);
// }

// 给对象加it

let obj = {
    max: 5,
    current: 0,
    [Symbol.iterator]() {
        const that = this;
        that.current = 0;
        return {
            next() {
                if (that.current == that.max) {
                    return { value: 3, done: true };
                }
                return { value: that.current++, done: false };
            },
        };
    },
};
for (let v of obj) {
    console.log(v);
}
let x = [...obj];
console.log(x);

// 泛型

function xx<T>(a: T, b: T): Array<T> {
    return [a, b];
}

// 泛型约束
interface AA {
    len: number;
}

function fn<T extends AA>(a: T) {
    a.len;
}

// 命名空间 namespace

// 三斜线 path 类似导入, types 类似申明

/// <reference path=""/>
