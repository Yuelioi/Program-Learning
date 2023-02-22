var Main = new Window("palette");
Main.text = "父子级链接";
Main.orientation = "column";
Main.alignChildren = ["center", "top"];
Main.spacing = 10;
Main.margins = 16;

var parent_name = Main.add("statictext", undefined, undefined, { name: "" });
parent_name.helpTip = "当前父级索引";
parent_name.text = "无父级";

var sel_parent = Main.add("button", undefined, undefined, { name: "sel_parent" });
sel_parent.text = "选择父级";

var set_childs = Main.add("button", undefined, undefined, { name: "set_childs" });
set_childs.text = "设置子级";

// 定义一个全局变量, 用于更改
var parent = null;

sel_parent.onClick = function () {
    var myComp = app.project.activeItem; //myComp = 当前合成
    parent = myComp.selectedLayers[0]; //选择图层集里的第 1 个 作为父级
    parent_name.text = parent.index // 显示框 显示当前父级的索引
};
set_childs.onClick = function () {
    var selLayers = app.project.activeItem.selectedLayers
    if (!parent) {
        alert("Please select A Parent Layer!")
    }
    for (var i = 0, l = selLayers.length; i < l; i++) {
        var layer = selLayers[i];
        layer.parent = parent
    }
}


Main.show();