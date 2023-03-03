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


const text = `try {
amp = effect("amp")("Slider") / 200;
freq = effect("freq")("Slider") / 30;
decay = effect("decay")("Slider")/ 10;
n = 0;
if (numKeys > 0){
n = nearestKey(time).index;
if (key(n).time > time){
n--;
}
}
if (n == 0){
t = 0;
} else {
t = time - key(n).time;
}

if (n > 0){
v = velocityAtTime(key(n).time - thisComp.frameDuration/10);
value + v*amp*Math.sin(freq*t*2*Math.PI)/Math.exp(decay*t);
} else {
value;
}
}catch (e$$4) {
value = value;
}`
TsxText2JsxText(text)
