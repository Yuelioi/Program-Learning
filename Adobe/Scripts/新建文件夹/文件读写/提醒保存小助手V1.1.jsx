/**
 * 名称：提醒保存小助手
 * 功能：单击开启提醒，shift单击关闭提醒（如果没开启，按住shift则会开启提醒）
 * V1.1: 原版本有点逻辑问题，写2分钟，实际会3分钟提醒
 * V1.0
 * 源码：https://www.yuelili.com/?p=18056
 */

var n = 1  // 初始化计时器
var t = 10// 默认多少分钟弹出保存
var id = 0
timerIt = function () {
    // 判断当前项目是否保存，保存则计时器归零
    if (!app.project.dirty) {
        n = 0
    }
    if (n == t) {
        n = 0  // 计时器归零
        alert("记得ctrl s保存工程哟")  //弹出保存对话框       
    }
    n = n + 1
}


var panelGlobal = this;
var main = (function () {

    // MAIN
    // ====
    var main = (panelGlobal instanceof Panel) ? panelGlobal : new Window("palette");
    if (!(panelGlobal instanceof Panel)) main.text = "提醒保存小助手";
    main.orientation = "row";
    main.alignChildren = ["center", "top"];
    main.spacing = 10;
    main.margins = 16;

    var edittext1 = main.add('edittext {properties: {name: "edittext1"}}');
    edittext1.text = "10";

    var alert_btn = main.add("button", undefined, undefined, { name: "alert_btn" });
    alert_btn.text = "计时";
    alert_btn.helpTip = "单击开启，按住shift单击关闭";
    alert_btn.preferredSize.width = 50;
    alert_btn.onClick = start


    function start() {
        t = parseInt(edittext1.text)
        var shiftHeld = ScriptUI.environment.keyboardState.shiftKey;

        if (shiftHeld && id) {
            alert("已关闭提醒")
            app.cancelTask(id)
        } else {
            alert("已打开提醒小助手：" + edittext1.text + "分钟提醒一次哦")
            id = app.scheduleTask("timerIt()", 60000, true)  // 60秒 也就是1分钟检测一次  
        }
    }

    main.layout.layout(true);
    main.layout.resize();
    main.onResizing = main.onResize = function () { this.layout.resize(); }

    if (main instanceof Window) main.show();

    return main;

}());


