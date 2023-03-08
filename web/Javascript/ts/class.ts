// 类与继承, 以及属性/方法类型
class Person {
    public name: string; // 公有, 默认
    protected house: number; // 子类可访问
    private money: number; // 当前类可访问
    static car: string = "123"; // 可以直接Person.car

    constructor(name: string, house: number, money: number) {
        this.name = name;
        this.house = house;
        this.money = money;
    }

    // 静态函数只能访问静态属性
    static run() {
        console.log(this.car);
    }
}
Person.run();

// implements: 类只需要实现接口中定义的方法和属性

interface Shape {
    getArea(): number;
}

class Square implements Shape {
    private sideLength: number;

    constructor(sideLength: number) {
        this.sideLength = sideLength;
    }

    public getArea(): number {
        return this.sideLength ** 2;
    }

    public getSideLength(): number {
        return this.sideLength;
    }
}

const square = new Square(5);
console.log(square.getArea()); // 输出：25
console.log(square.getSideLength()); // 输出：5

/// 混用
interface A {
    id: number;
}
interface B {
    name: string;
}
class C {
    id: number;
}

// D继承C,因此自带id, 但是要同时实现A和B接口
class D extends C implements A, B {
    name: string;
}

/**
 * 基类/抽象类
 * abstract 定义的方法, 用于描述, 而不能实现
 * 而后代继承, 需要实现抽象类的方法和属性, 有点像interface
 */
abstract class Animal {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }

    abstract makeSound(): void;

    move(distance: number = 0) {
        console.log(`${this.name} moved ${distance}m.`);
    }
}

class Dog extends Animal {
    constructor(name: string) {
        super(name);
    }

    makeSound() {
        console.log(`${this.name} barks.`);
    }
}

const dog = new Dog("Buddy");
dog.makeSound(); // 输出 "Buddy barks."
dog.move(10); // 输出 "Buddy moved 10m."
