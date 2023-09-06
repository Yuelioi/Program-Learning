var highlightStyle = `
    position: absolute;
    border: 2px solid red;
    pointer-events: none;
    z-index: 9999;
`;

var highlightBox = document.createElement("div");
highlightBox.style.cssText = highlightStyle;
document.body.appendChild(highlightBox);

var isSelecting = false;

// 禁用点击事件的标志
var isClickDisabled = false;

// 监听键盘事件，按下 Ctrl + Shift + X 进入选择模式
document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.shiftKey && event.key === "X") {
        isSelecting = !isSelecting;
        highlightBox.style.display = isSelecting ? "block" : "none";

        // 开启选择模式时禁用网页点击事件
        isClickDisabled = isSelecting;
    }
});

// 鼠标移动事件
document.addEventListener("mousemove", function (event) {
    if (isSelecting) {
        var x = event.clientX;
        var y = event.clientY;

        highlightBox.style.left = (x - 10) + "px";
        highlightBox.style.top = (y - 10) + "px";
    }
});

// 鼠标点击事件
document.addEventListener("click", function (event) {
    if (isClickDisabled) {
        event.stopPropagation(); // 阻止点击事件冒泡
    }

    if (isSelecting) {
        isSelecting = false;
        highlightBox.style.display = "none";

        var selectedElement = document.elementFromPoint(event.clientX, event.clientY);
        console.log("您选择了元素：", selectedElement);

        // 在这里可以进行处理，例如获取元素的信息或执行操作
    }
});
