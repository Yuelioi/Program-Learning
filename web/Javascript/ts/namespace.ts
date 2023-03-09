// Namespace, 用于防止名称冲突。使用命名空间可以将全局命名空间拆分成更小的部分
// 有点像类?
// namespace 可以写多个, 自动合并
// namespace 可以嵌套

namespace Shapes {
    export class Rectangle {
        constructor(public height: number, public width: number) {}
    }
}

const rect = new Shapes.Rectangle(10, 20);
console.log(rect.height); // 10
console.log(rect.width); // 20
