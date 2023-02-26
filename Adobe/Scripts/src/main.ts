export default class Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    sayHello() {
        console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
    }

    static sayHi() {
        console.log("Hi there!");
    }
}

const john = new Person("John", 30);
john.sayHello(); // Output: Hello, my name is John and I'm 30 years old.

Person.sayHi(); // Output: Hi there!


