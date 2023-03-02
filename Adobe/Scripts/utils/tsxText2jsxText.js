/**
 * @description : 将``文字转为 脚本可用的文字
 * @param text :string
 */

export function TsxText2JsxText() {
    const textL = text.split("\n");
    let res = "";
    textL.forEach(element => {
        res += `'${element}\\n' +\n`;
    });
    console.log(res);
}


const text = `hello
world`
TsxText2JsxText(text)
