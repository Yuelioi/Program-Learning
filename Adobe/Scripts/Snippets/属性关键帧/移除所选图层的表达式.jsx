// 名称：移除所选图层的表达式
// 来源: 
// 源码：https://www.yuelili.com/?p=10427


app.beginUndoGroup("Remove all Expressions");

{
    var comp = app.project.activeItem;
    var layerNumber = comp.selectedLayers.length;
    var chosenLayers = comp.selectedLayers;

    if (layerNumber >= 1) {

        for (var i = 0; i < layerNumber; i++) {
            var layerNames = chosenLayers[i].index;
            recurse_children(comp.layers[layerNames]);
        }
    }
    else {
        alert('no layer selected');
    }

    function recurse_children(propParent) {
        if (propParent != null) {
            var prop;

            for (var i = 1; i <= propParent.numProperties; i++) {
                prop = propParent.property(i);
                switch (prop.propertyType) {
                    case PropertyType.PROPERTY:

                        if (prop.canSetExpression && prop.expression)
                            prop.expression = '';
                        break;
                    case PropertyType.INDEXED_GROUP:
                        recurse_children(prop);
                        break;
                    case PropertyType.NAMED_GROUP:
                        recurse_children(prop);
                        break;
                    default:
                        break;
                }
            }
        }
    }
}

app.endUndoGroup();
