
//UI 构建
var mainWindow = new Window("palette", "表达式插入器", undefined);
mainWindow.orientation = "column";

// 下拉菜单
var groupOne = mainWindow.add("group", undefined, "groupOne");
groupOne.orientation = "row";
groupOne.alignment = "left";
var dropDown = groupOne.add("dropdownlist", undefined, ["位置", "缩放", "不透明度"]);
dropDown.selection = 0;
// 表达式编辑区
var groupTwo = mainWindow.add("group", undefined, "groupTwo");
groupTwo.orientation = "row";
var expressionText = mainWindow.add('edittext {size: [200,80], properties: {name: "expressionText", multiline: true}}'); 
expressionText.text = "请输入表达式"; 

// 应用按钮
var groupThree = mainWindow.add("group", undefined, "groupThree");
groupThree.orientation = "row";
groupThree.alignment = "right";
var applyButton = groupThree.add("button", undefined, "应用表达式");


mainWindow.center();
mainWindow.show();

applyButton.onClick = function() {
        if(app.project.activeItem.selectedLayers.length < 1) {
            alert("请先选择图层", "");
            return false;
            }
        else {
            app.beginUndoGroup("Expression Injection");
                injectExpression(app.project.activeItem.selectedLayers);
                app.endUndoGroup();
            }
    }

function injectExpression(layerArray) {
    for(var i = 0; i < layerArray.length; i++) {
        layerArray[i].property(getPropertyName()).expression = expressionText.text;
        }
    alert("成功应用!", "");
    }

function getPropertyName() {
    switch(dropDown.selection.index) {
        case 0:
            return "Position";
        break;
        case 1:
            return "Scale";
        break;
        case 2:
            return "Opacity";
        break;
        }
    }

