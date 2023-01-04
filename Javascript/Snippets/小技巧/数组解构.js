let a = 1;
let b = 2;

// 传统写法
let temp = a;
a = b;
b = temp;

// 使用解构赋值
[a, b] = [b, a];
