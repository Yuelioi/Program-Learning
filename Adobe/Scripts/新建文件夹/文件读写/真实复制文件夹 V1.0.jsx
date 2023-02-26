

/**
 * 名称：真实复制文件夹
 * 用途：完整复制一个文件夹，里面的合成也会被真实复制，跟原文件夹以及所属合成，互不干扰。静态资源、图片、纯色层等不会被复制，因为他们不会影响引用
 * Vision：1.0
 * 作者：yueli
 * 链接：https://www.yuelili.com/?p=17969
 * 使用条件：文件夹内的合成名称不得重复（因为是基于文件名 判断是否唯一）
 * 可优化：要想合成名能重复，可以在复制合成函数里，单独命名（比如 合成1_output），复制完之后再改名。由于目前这个脚本使用频率较低，不做单独优化
 */
var panelGlobal = this;
var palette = (function () {

    // UI 界面
    var palette = (panelGlobal instanceof Panel) ? panelGlobal : new Window("palette");
    if (!(panelGlobal instanceof Panel)) palette.text = "真实复制文件夹";
    palette.orientation = "column";
    palette.alignChildren = ["center", "top"];
    palette.spacing = 10;
    palette.margins = 16;

    var seq_import = palette.add("button", undefined, undefined, { name: "seq_import" });
    seq_import.text = "复制文件夹";
    seq_import.onClick = duplicate_folder



    /**
     * 名称：直接复制 V1.01
     * 链接：https://www.yuelili.com/?p=15050
     * 创建合成副本，包括子合成.当然，如果某个合成重复使用，只会复制一次，其他的重复项也会指向该合成
     * @param {*} comp 
     * @returns 
     */


    function duplicateStructure(comp) {
        // Duplicate the incoming comp
        source_name = comp.name
        var comp = comp.duplicate();
        comp.name = source_name

        // 循环合成内的图层与子合成
        for (var i = 1; i <= comp.numLayers; i++) {
            var layer = comp.layer(i);

            // 检查图层是否有源 并且类型为合成
            if (layer.source && layer.source.typeName == "Composition") {

                // 检查是否被复制过了
                check = checkPreviousComps(layer.source.id, previousComps);

                if (check == null) {
                    // 子合成还没被复制

                    // 存储原合成id 用于校对
                    var sourceID = layer.source.id;
                    // 替换图层的源, 递归检查子合成中的 子子合成们
                    layer.replaceSource(duplicateStructure(layer.source), false);
                    // 存储新合成id 用于校正
                    var destID = layer.source.id;
                    // 添加校正id到数组
                    previousComps[sourceID] = destID;
                } else {
                    // 如果已经复制了该合成 直接替换源
                    layer.replaceSource(check, false);
                }
            }
        }

        // 为了递归，返回复制后的合成
        return comp;
    }

    // 检查以前的复制，确保一个合成不会复制两次
    function checkPreviousComps(checkID, previousComps) {
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
    function duplicate_it(mainComp) {

        if (mainComp && mainComp instanceof CompItem) {
            previousComps = [];
            duplicateStructure(mainComp);
        }

    }



    /**
     * 复制文件夹函数：里面的合成会被 “真实”复制 如果包含纯色图层、视频等静态资源，不会复制（因为没必要
     */
    function duplicate_folder() {
        app.beginUndoGroup("Duplicate Hierarchy");
        var proj = app.project;
        var selFolder
        var newFolder
        var tarFolder

        for (var i = 1; i <= proj.numItems; i++) {
            var itm = proj.item(i)
            if (itm.selected) {
                selFolder = itm
                tarFolder = app.project.items.addFolder(itm.name + "_output");
                tarFolder.parentFolder = itm.parentFolder
            }
        }

        // 文件夹遍历加判断
        function folder_recursive(folderGroup, tarfolderGroup) {
            for (var i = 1; i <= folderGroup.numItems; i++) {

                var items = folderGroup.item(i);

                // 判断当前属性是否为文件夹，如果是，则继续遍历
                if (items instanceof FolderItem) {
                    newFolder = app.project.items.addFolder(items.name);
                    newFolder.parentFolder = tarfolderGroup
                    //对每个文件夹逐个操作
                    folder_recursive(items, newFolder);
                    continue
                }
                // 判断是否为合成
                if (items instanceof CompItem) {

                    // if (i > 1 && items.name == folderGroup.item(i - 1).name) {
                    //     items.parentFolder = tarfolderGroup
                    //     continue
                    // }
                    // if (i < folderGroup.numItems && !(items.name == folderGroup.item(i + 1).name)) {
                    newComp = duplicate_it(items)
                    newComp.parentFolder = tarfolderGroup
                    // }
                }
            }
        }

        // 判断是否选择了文件夹,如果没有选择，则遍历所有文件夹
        if (!(selFolder instanceof FolderItem)) {
            selFolder = app.project.rootFolder
        }

        folder_recursive(selFolder, tarFolder)
        app.endUndoGroup();
    }

    palette.layout.layout(true);
    palette.layout.resize();
    palette.onResizing = palette.onResize = function () { this.layout.resize(); }

    if (palette instanceof Window) palette.show();
    return palette;
}());