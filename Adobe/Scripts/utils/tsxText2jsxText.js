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


const text = `textSpace = createTextSpace(); // 文字受影响的范围


// 处理选择器生效程度
function rangeHandle(a,b,tClip){
	// return Math.sin(linear(Math.abs(a-b),0,tClip,0,Math.PI/2)); // 圆形选择器
	return clamp(Math.abs(a-b)/tClip,0,textSpace); // 三角形选择器
}

// 定义生效范围(基于总字数)
function createTextSpace(){
	if (textTotal<4){
		return 1;
	}else if(textTotal <12){
		return 1 + textTotal/8;
	}else{
		return textTotal / 6;
	}
}

// 如果没有关键帧 则跳过
if (thisProperty.numKeys >=2){
	tStart = thisProperty.key(1).time;
	tEnd = thisProperty.key(2).time;
	tTotal = tEnd - tStart;
	tClip = tTotal/(textTotal+1) // 结尾动画结束 所以间距要+1
	
	// 区间外直接跳过
	if (time < tStart || time > tEnd){
		[0,0,0]
	}else{
		(textSpace - rangeHandle(time, tStart + tClip * textIndex,tClip))/tTotal * [100,100,100]
	}
}else{
	[0,0,0]
}
`
TsxText2JsxText(text)
