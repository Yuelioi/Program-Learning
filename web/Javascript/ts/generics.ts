// @泛型

type StringArray = Array<string>;
type ObjectWithNameArray = Array<{ name: string }>;

interface Backpack<T> {
    add: (obj: T) => void;
    get: () => T;
}

// 这一行是一个简写，可以告诉 TypeScript 有一个常量，叫做`backpack`，并且不用担心它是从哪
// 里来的。
declare const backpack: Backpack<string>;

// 对象是一个字符串，因为我们在上面声明了它作为 Backpack 的变量部分。
const object = backpack.get();
