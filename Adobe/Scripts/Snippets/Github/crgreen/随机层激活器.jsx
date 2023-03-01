/**
 * 名称：Randomly_Enable_Selected_Layers .jsx
 * 功能：一个简单的随机层激活器。随机关闭和打开图层。特点：用户界面包括“权重滑块”和选择，要么保持所有原始选择的图层处于选中状态，要么将选择更改为仅保留的图层。
 * 油管：http://www.crgreen.com/aescripts/
 * 日期：2016.1.9
 * 源码（中文）：https://www.yuelili.com/
 * 源码（英文）：http://www.crgreen.com/aescripts/actual_scripts/Randomly_Enable_Selected_Layers.jsx
 * 其他：
 */


//Randomly Enabled Selected Layers, by crgreen.

//globals:
var scriptVer = "1.1";
var wt = 50.0;
var keepSel = true;

function doRando(winObj){
    var alertMsg = "";
    var activeItem = app.project.activeItem;
    if (activeItem == null || !(activeItem instanceof CompItem)){
        alert("You need to select some layers first.");
    } else {
        var selectedLayers = activeItem.selectedLayers;
        var selNum = activeItem.selectedLayers.length;
        if (selNum == 0) {
            alert("No layers selected.");
        } else {
            app.beginUndoGroup("Layer On Randomization");
            winObj.randoBttn.text = "Wait ... "
            winObj.randoBttn.enabled = false;
            for (var la = (selNum-1); la >= 0; la--) {//working backwards here.
                var rando=(Math.floor( Math.random() * 100)+1);
                var bool=true;
                if (rando<=wt) {bool=false;}
                currLayer = selectedLayers[la];
                currLayer.enabled = bool;
                if (!keepSel) {currLayer.selected = bool;}
            }
            winObj.randoBttn.text = "Randomize"
            winObj.randoBttn.enabled = true;
            app.endUndoGroup();
        }
    }
}

function buildUI(this_obj_) {
    var win = (this_obj_ instanceof Panel)
    ? this_obj_
    : new Window('palette', 'crgreen.com Randomize Selected Layers (v' + scriptVer + ')',[237,170,708,290]);
    
    win.theSlider = win.add('slider', [22,32,449,65], 50, 0, 100);
    
    win.theSlider.onChange = function () { wt=(win.theSlider.value);}
    
    win.ctl_label4 = win.add('statictext', [22,18,449,38], '(on)                                              Weight                                              (off)');
    win.ctl_label4.justify = 'center';
    
    win.selAllBttn = win.add('checkbox', [47,74,146,100], 'Keep Selection');
    win.selAllBttn.value = keepSel;
    win.selAllBttn.onClick = function () { keepSel = win.selAllBttn.value; }
    
    win.randoBttn = win.add('button', [174,74,314,100], 'Randomize');
    win.closeBttn = win.add('button', [340,74,410,100], 'Close');
    win.closeBttn.onClick = function () { this.parent.close(1) ;}
    win.randoBttn.onClick = function () { doRando(win) ;}
    
    return win
}
var w = buildUI(this);
if (w.toString() == "[object Panel]") {
    w;
} else {
    w.show();
}