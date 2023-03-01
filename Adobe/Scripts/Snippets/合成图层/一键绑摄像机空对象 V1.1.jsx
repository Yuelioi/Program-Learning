
/**
 * 名称：摄像机一键绑定空对象
 * 功能：选择一个摄像机，单击创建，可以创建2个空对象，分别绑定兴趣点和位置
 * 源码：https://www.yuelili.com/?p=18041
 * 1.1 新增摄像机景深开关，放在 兴趣点图层空对象上
 * 1.0
 */

var panelGlobal = this;
var palette = (function () {

    // 自定义空对象名称
    var CAM_POS = "CAM_POS"  // 摄像机位置
    var CAM_POI = "CAM_POI"  // 摄像机兴趣点
    var DOF_NAME = "DOF"    // 摄像机景深


    // UI 界面
    var palette = (panelGlobal instanceof Panel) ? panelGlobal : new Window("palette");
    if (!(panelGlobal instanceof Panel)) palette.text = "摄像机控制";
    palette.orientation = "row";
    palette.alignChildren = ["center", "top"];
    palette.spacing = 10;
    palette.margins = 16;

    var cam_btn = palette.add("button", undefined, undefined, { name: "" });
    cam_btn.helpTip = "";  // 小提示
    cam_btn.text = "创建";
    cam_btn.preferredSize.width = 80;
    cam_btn.onClick = cam_it

    // 主函数
    function cam_it() {

        app.beginUndoGroup("cam it");
        var cam_layer = app.project.activeItem.selectedLayers[0]

        if (cam_layer && cam_layer("ADBE Camera Options Group")) {

            var layer1 = app.project.activeItem.layers.addNull()
            layer1.threeDLayer = true
            layer1.name = CAM_POI

            var layer2 = app.project.activeItem.layers.addNull()
            layer2.threeDLayer = true
            layer2.name = CAM_POS

            var DOF = cam_layer.property("ADBE Camera Options Group").property("ADBE Camera Depth of Field")
            var DOF_Control= layer1.property("ADBE Effect Parade").addProperty("ADBE Checkbox Control")
            DOF_Control.name = DOF_NAME + " CONTROL"


            cam_layer.property("ADBE Transform Group").property(1).expression = 'thisComp.layer("' + layer1.name + '").transform.position'
            cam_layer.property("ADBE Transform Group").property("ADBE Position").expression = 'thisComp.layer("' + layer2.name + '").transform.position'
            DOF.expression = 'thisComp.layer("' + CAM_POI + '").effect("' + DOF_NAME +  ' CONTROL")(1)'



        } else {
            alert("请选择一个摄像机")
        }
        app.endUndoGroup();
    }


    // UI 结尾
    palette.layout.layout(true);
    palette.layout.resize();
    palette.onResizing = palette.onResize = function () { this.layout.resize(); }

    if (palette instanceof Window) palette.show();
    return palette;

}());


