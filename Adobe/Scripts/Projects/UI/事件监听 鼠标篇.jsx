// 源码: https://www.yuelili.com/?p=22039

var myButton = new Window("palette", "我的按钮");
myButton.button = myButton.add("button", undefined, "单击我");

// 监听右键菜单事件
myButton.button.addEventListener("mousedown", clickHandler);

// 鼠标左键是 0 中间滚轮是 1 右键 是2

function clickHandler(event) {
    if (event.button == 0) { alert("点了左键") }
    if (event.button == 1) { alert("滚轮") }
    if (event.button == 2) { alert("点了右键") }
}

myButton.show();
