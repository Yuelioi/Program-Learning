// 名称：直接复制 V1.01
// 作者: Brennan Chapman
// 创建合成副本，包括子合成.
// 当然，如果某个合成重复使用，只会复制一次
// 其他的重复项也会指向该合成

let previousComps: any[] = []

function duplicateStructure(comp: CompItem) {
    // 复制合成
    var comp = comp.duplicate();

    // 循环遍历合成里的图层，如果有子合成，则进行检测
    for (var i = 1; i <= comp.numLayers; i++) {
        var layer = comp.layer(i) as AVLayer;
        //检查是否为合成
        if (layer.source && layer instanceof CompItem) {
            // 检查合成是否被复制
            let check = checkPreviousComps(layer.source.id);
            if (check == null) {
                // 子合成没有复制过 ,保存合成id到合成集
                var sourceID = layer.source.id;
                // 替换图层源，并检查子合成
                layer.replaceSource(duplicateStructure(layer.source), false);
                // 存储新合成的ID 并储存在检查列表里
                var destID = layer.source.id;
                previousComps[sourceID] = destID;
            } else {
                // 替换已经有源的合成
                layer.replaceSource(check as AVItem, false);
            }
        }
    }

    // 为了再次检查，返回合成对象
    return comp;
}

// 判断合成有没有复制过
function checkPreviousComps(checkID: number) {
    if (previousComps[checkID]) {
        return getItemWithID(previousComps[checkID]);
    }
    return null;
}

// 返回项目item的独特id
function getItemWithID(id: number) {
    for (let x = 1; x <= app.project.numItems; x++) {
        if (app.project.item(x).id == id) {
            return app.project.item(x);
        }
    }
    return null;
}

let mainComp = app.project.activeItem;
if (mainComp && mainComp instanceof CompItem) {
    alert("start")
    app.beginUndoGroup("Duplicate Hierarchy");
    duplicateStructure(mainComp);
    app.endUndoGroup();
} else if (!mainComp) {
    alert("请选择一个合成进行复制.");
} else {
    alert("ERROR: 没有选择合成.n 请在项目面板重新选择.");
}

