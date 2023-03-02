// 名称：直接复制 V1.02
// 作者: Brennan Chapman
// 创建合成副本，包括子合成.
// 当然，如果某个合成重复使用，只会复制一次
// 其他的重复项也会指向该合成

interface CompIDMap {
    [sourceID: number]: number;
}

const previousComps222: CompIDMap = {};

function duplicateComp(comp: CompItem): CompItem {
    // 复制合成
    const newComp = comp.duplicate() as CompItem;

    // 循环遍历合成里的图层
    for (const layer of newComp.layers) {
        //检查是否为合成
        if (layer instanceof AVLayer && layer.source instanceof CompItem) {
            // 检查合成是否被复制
            const check = previousComps222[layer.source.id];
            if (check) {
                // 替换已经有源的合成
                layer.replaceSource(getItemWithID(check), false);
            } else {
                // 子合成没有复制过, 保存合成id到合成集
                const sourceID = layer.source.id;
                const newSource = duplicateComp(layer.source);
                layer.replaceSource(newSource, false);
                // 存储新合成的ID 并储存在检查列表里
                previousComps222[sourceID] = newSource.id;
            }
        }
    }

    // 返回合成对象
    return newComp;
}

// 返回项目item的独特id
function getItemWithID(id: number): AVItem | null {
    return app.project.items.find(item => item.id === id) || null;
}

const mainComp22 = app.project.activeItem;

if (mainComp22 instanceof CompItem) {
    app.beginUndoGroup("Duplicate Hierarchy");
    const newComp = duplicateComp(mainComp22);
    app.endUndoGroup();
    alert(`已复制合成 "${newComp.name}"`);
} else {
    alert("请选择一个合成进行复制.");
}
