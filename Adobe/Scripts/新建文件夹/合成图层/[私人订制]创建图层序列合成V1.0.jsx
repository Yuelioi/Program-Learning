
/**
 * 作者：yueli
 * 源码：https://www.yuelili.com/?p=18010
 */
var panelGlobal = this;
var palette = (function () {

    // UI 构建
    // =======
    var palette = (panelGlobal instanceof Panel) ? panelGlobal : new Window("palette");
    if (!(panelGlobal instanceof Panel)) palette.text = "序列创建合成";
    palette.orientation = "row";
    palette.alignChildren = ["center", "top"];
    palette.spacing = 10;
    palette.margins = 16;

    var create = palette.add("button", undefined, undefined, { name: "create" });
    create.helpTip = "选择一个素材，然后单击";
    create.text = "创建合成";
    create.preferredSize.width = 80;
    create.onClick = create_it

    // 主函数功能区
    function create_it() {
        var selItems = app.project.selection
        
        // 判断是否选择项目
        if (selItems.length === 0) {
            alert("请在项目面板选择至少一个序列")
        } else {
            app.beginUndoGroup("pre comp")
            for (var i = 0; i < selItems.length; i++) {
                var layer = selItems[i];

                // 创建里合成
                var comp = app.project.items.addComp(layer.name.substr(0, 1) + "_", layer.width, layer.height, layer.pixelAspect, layer.duration, layer.frameRate)
                // 添加素材图层
                comp.layers.add(layer)

                // 创建外合成
                var comp2 = app.project.items.addComp(layer.name.substr(0, 1), layer.width, layer.height, layer.pixelAspect, layer.duration, layer.frameRate)
                // 添加里合成
                comp2.layers.add(comp)

                // 里合成添加效果并更改值
                var effect = comp2.layer(1).property("ADBE Effect Parade").addProperty("ADBE Color Key");
                var colorProperty = effect.property(1)
                colorProperty.setValue([1, 1, 1, 1])
    
            }
            app.endUndoGroup()
        }
    }


    palette.layout.layout(true);
    palette.layout.resize();
    palette.onResizing = palette.onResize = function () { this.layout.resize(); }

    if (palette instanceof Window) palette.show();

    return palette;

}());