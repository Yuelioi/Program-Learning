// 重置图层的变换，比如拖拽创建形状图层的时候，会很方便
// 如果有关键帧的话，会在当前时间打个新关键帧，并重置。
// 用法：选择一个或多个图层，运行此脚本
// https://www.yuelili.com/?p=18127

var comp = app.project.activeItem;
if (comp && comp.selectedLayers.length > 0) {
    for (var i = 0; i < comp.selectedLayers.length; i++) {

        var layer = comp.selectedLayers[i];
        reset_transform(comp, layer);
    };
} else {
    alert('您没有选中图层。');
};

/**
 * @description：重置图层变换，可以有关键帧
 * @param {*} comp :合成
 * @param {*} layer ：图层
 */
function reset_transform(comp, layer) {
    var TRANSFORM = layer.property("ADBE Transform Group")

    // 锚点
    try {
        TRANSFORM.property("ADBE Anchor Point").setValue([comp.width / 2, comp.height / 2]);
    } catch (e) {
        TRANSFORM.property("ADBE Anchor Point").setValueAtTime(comp.time, [comp.width / 2, comp.height / 2]);
    }

    // 位置：要判断是否分离尺寸
    if (TRANSFORM.property("ADBE Position").dimensionsSeparated) {
        try {
            TRANSFORM.property("ADBE Position_0").setValue(comp.width / 2);  // X
            TRANSFORM.property("ADBE Position_1").setValue(comp.height / 2);  // Y
            TRANSFORM.property("ADBE Position_2").setValue(0);  // Y
         
        } catch (e) {
            TRANSFORM.property("ADBE Position_0").setValueAtTime(comp.time, comp.width / 2);  // X
            TRANSFORM.property("ADBE Position_1").setValueAtTime(comp.time, comp.height / 2);  // Y
            TRANSFORM.property("ADBE Position_2").setValueAtTime(comp.time, 0);  // Y
            
        }
    } else {
        try {
            TRANSFORM.property("ADBE Position").setValue([comp.width / 2, comp.height / 2]);
        } catch (e) {
            TRANSFORM.property("ADBE Position").setValueAtTime(comp.time, [comp.width / 2, comp.height / 2]);
        }
    }

    // 缩放 ADBE Scale
    try {
        TRANSFORM.property("ADBE Scale").setValue([100, 100, 100]);
    } catch (e) {
        TRANSFORM.property("ADBE Scale").setValueAtTime(comp.time, [100, 100, 100]);
    }

    // 旋转
    if (layer.threeDLayer) {
        try {
            TRANSFORM.property("ADBE Rotate X").setValue(0);  // X
            TRANSFORM.property("ADBE Rotate Y").setValue(0);  // Y
            TRANSFORM.property("ADBE Rotate Z").setValue(0);  // Z
        } catch (e) {
            TRANSFORM.property("ADBE Rotate X").setValueAtTime(comp.time, 0);  // X
            TRANSFORM.property("ADBE Rotate Y").setValueAtTime(comp.time, 0);  // Y
            TRANSFORM.property("ADBE Rotate Z").setValueAtTime(comp.time, 0);  // Z
        }
    } else {
        try {
            TRANSFORM.property("ADBE Rotate Z").setValue(0);
        } catch (e) {
            TRANSFORM.property("ADBE Rotate Z").setValueAtTime(comp.time, 0);
        }
    }

    // 方向
    if (layer.threeDLayer) {
        try {
            TRANSFORM.property("ADBE Orientation").setValue([0, 0, 0]);

        } catch (e) {
            TRANSFORM.property("ADBE Orientation").setValueAtTime(comp.time, [0, 0, 0]);
        }
    }

    // 不透明度
    try {
        TRANSFORM.property("ADBE Opacity").setValue(100);
    } catch (e) {
        TRANSFORM.property("ADBE Opacity").setValueAtTime(comp.time, 100);
    }
}