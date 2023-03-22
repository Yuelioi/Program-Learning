const babel = require("babel");

const code = `const sayHi = () => {
    console.log("hello world");
};

sayHi();`;

const optionsObject = {};
const result = babel.transform(code, optionsObject);
console.log(result);
