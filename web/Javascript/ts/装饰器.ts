// https://www.jianshu.com/p/3550b06828ed
// *2.1 类装饰器 无法传参

function addAge(cls: any) {
    cls.age = 20;
}

@addAge
class User1 {}

const p1 = new User1();
// @ts-ignore
console.log(User1.age);

// *2.2 装饰器工厂

function addName(username: string) {
    console.log("这里是装饰器工厂");
    return function (cls: any) {
        console.log("这里是真正的装饰器");
        cls.prototype.username = username;
    };
}
@addName("admin")
class User2 {}
const p2 = new User2();
// @ts-ignore
console.log(p2.username);

// *2.3 装饰器组合

@addAge
@addName("admin")
class User3 {}

// *2.4 属性装饰器
// 也可以使用装饰器工厂

function changeProp(cls: any, attr: any) {
    // 在这里可以直接给类加属性
    cls.age = 15;
    console.log(cls.age, attr);
}

class User4 {
    @changeProp
    username = "";
}

const p4 = new User4();
// @ts-ignore
console.log(p4.age);

// *2.5 方法装饰器
// 装饰类的方法

// *3 执行顺序
// 组合使用, 从上往下先执行装饰器工厂, 然后从下往上执行类装饰器
// 属性>方法>方法参数>类
