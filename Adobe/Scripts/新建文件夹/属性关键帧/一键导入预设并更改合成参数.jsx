/**
 * https://www.yuelili.com/?p=18012
 * 导入预设文件aep，并且基于项目面板选择的素材，批量修改合成尺寸等
 */
var panelGlobal = this;
var palette = (function () {


    // 用户自定义区。预设aep位置
    var file = new File("F:/Footage/cell预设.aep")


    // 对合成进行修改内容，基于选择的素材。如果不想更改那么多，可以在每行前面加  “// “  比如当前帧速率就不会随素材更改
    function do_some_change(comp) {
        comp.width = selFootage.width   // 合成宽度
        comp.height = selFootage.height   // 合成高度
        // comp.frameRate = selFootage.frameRate   // 合成帧速率
        comp.duration = selFootage.duration   // 合成持续时间

    }

    // PALETTE
    // =======
    var palette = (panelGlobal instanceof Panel) ? panelGlobal : new Window("palette");
    if (!(panelGlobal instanceof Panel)) palette.text = "导入预设 并修改尺寸";
    palette.orientation = "row";
    palette.alignChildren = ["center", "top"];
    palette.spacing = 10;
    palette.margins = 16;

    var create = palette.add("button", undefined, undefined, { name: "create" });
    create.helpTip = "选择一个素材，然后单击“导入”按钮";
    create.text = "导入";
    create.preferredSize.width = 80;
    create.onClick = create_it

    // 主函数区
    function create_it() {

        var selItems = app.project.selection

        if (selItems.length === 0) {
            alert("请在项目面板选择至少一个素材文件")
        } else {
            app.beginUndoGroup("import file")
            selFootage = selItems[0]


            // 导入预设
            var itemFolder = app.project.importFile(new ImportOptions(file));
            for (var i = 1; i <= itemFolder.numItems; i++) {
                var mainComp = itemFolder.item(i);

                // 判断顶级合成名称
                if (mainComp.name == "合成1") {

                    if (mainComp && mainComp instanceof CompItem) {

                        // 嵌套合成处理
                        do_some_change(mainComp)
                        app.beginUndoGroup("Comp Recursive");
                        previousComps = [];
                        comp_recursive(mainComp);
                        app.endUndoGroup();
                    }
                }
            }

            app.endUndoGroup()
        }
    }



    function comp_recursive(comp) {
        // 循环合成内的图层与子合成
        for (var i = 1; i <= comp.numLayers; i++) {
            var layer = comp.layer(i);

            // 检查图层是否有源 并且类型为合成
            if (layer.source && layer.source instanceof CompItem) {
                layer.resolutionFactor = [4, 4]
                do_some_change(layer.source)
                // 检查是否遍历过该合成
                check = checkPreviousComps(layer.source.id);

                if (check == null) {
                    // 存储原合成id 用于校对
                    var sourceID = layer.source.id;

                    // 再次遍历
                    comp_recursive(layer.source)
                    // 存储新合成id 用于校正
                    var destID = layer.source.id;
                    // 添加校正id到数组
                    previousComps[sourceID] = destID;
                } else {

                }
            }
        }
        // 为了递归，返回复制后的合成
        return comp;
    }

    // 检查以前的复制，确保一个合成不会复制两次
    function checkPreviousComps(checkID) {
        if (previousComps[checkID]) {
            return getItemWithID(previousComps[checkID]);
        }
        return null;
    }

    // 返回具有指定 ID 的项目
    function getItemWithID(id) {
        for (x = 1; x <= app.project.numItems; x++) {
            if (app.project.item(x).id == id) {
                return app.project.item(x);
            }
        }
        return null;
    }


    palette.layout.layout(true);
    palette.layout.resize();
    palette.onResizing = palette.onResize = function () { this.layout.resize(); }

    if (palette instanceof Window) palette.show();

    return palette;

}());