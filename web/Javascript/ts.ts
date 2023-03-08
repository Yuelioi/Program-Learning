const arr: readonly [x: number, y?: number] = [1, 2];

type f = typeof arr[0];
type f2 = typeof arr["length"];

// ![20230308-13082075.png](https://img.yuelili.com/vscode/20230308-13082075.png)

type num = 1 extends number ? 1 : 0; // 返回1, extends在type里 类似 in, 包含的意思

enum A {
    a = 1,
}
// 使用const 定义的枚举, 会被编译成常数, 不用则编译成对象
const enum B {
    b = 2,
}
