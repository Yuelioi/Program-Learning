/**
 * 功能：选择一个合成，指定当前合成的所有调整图层
 * 源码：https://www.yuelili.com/?p=17996
 * 版本：1.0
 */

var panelGlobal = this;
var palette = (function () {

    // PALETTE
    var palette = (panelGlobal instanceof Panel) ? panelGlobal : new Window("palette");
    if (!(panelGlobal instanceof Panel)) palette.text = "置顶调整图层";
    palette.orientation = "row";
    palette.alignChildren = ["center", "top"];
    palette.spacing = 10;
    palette.margins = 16;


    var create = palette.add("button", undefined, undefined, { name: "create" });
    create.helpTip = "选择一个合成，然后单击";
    create.text = "置顶";
    create.preferredSize.width = 80;
    create.onClick = move_top


    // 判断
    function move_top() {
        app.beginUndoGroup("adjust_to_top");
        var comp = app.project.activeItem

        if (comp instanceof CompItem) {
            myLayers = comp.layers
            var jug = 0
            for (var i = myLayers.length; i > 1; i--) {
                theLayer = comp.layer(i)
                if (theLayer.adjustmentLayer == true) {
                    theLayer.moveToBeginning()
                    i = i + 1
                    jug += 1
                }
                if (jug + 1 == i) {
                    break
                }
            }

        } else {
            alert("雪姐姐笨蛋，不选合成")
        }
        app.endUndoGroup();

    }


    palette.layout.layout(true);
    palette.layout.resize();
    palette.onResizing = palette.onResize = function () { this.layout.resize(); }

    if (palette instanceof Window) palette.show();

    return palette;

}());

