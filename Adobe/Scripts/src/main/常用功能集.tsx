


var panelGlobal = this;


/*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
{"activeId":4,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":null,"windowType":"Palette","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"Dialog","preferredSize":[0,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["center","top"]}},"item-1":{"id":1,"type":"Button","parentId":5,"style":{"enabled":true,"varName":"button1","text":"透明渐隐","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":"透明度出现和消失动画"}},"item-2":{"id":2,"type":"Button","parentId":5,"style":{"enabled":true,"varName":"button2","text":"缩放出现","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":"缩放出现 + 弹性动画"}},"item-3":{"id":3,"type":"Button","parentId":5,"style":{"enabled":true,"varName":"button4","text":"路径生长","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-4":{"id":4,"type":"Button","parentId":5,"style":{"enabled":true,"varName":"button3","text":"透明闪烁","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-5":{"id":5,"type":"Group","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-6":{"id":6,"type":"Group","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-7":{"id":7,"type":"Button","parentId":6,"style":{"enabled":true,"varName":"button5","text":"移动透明","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-8":{"id":8,"type":"Button","parentId":6,"style":{"enabled":true,"varName":"button6","text":"逐字跳动","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-9":{"id":9,"type":"Button","parentId":6,"style":{"enabled":true,"varName":"button7","text":"形状虚线","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":"现在图层描边变虚线"}},"item-10":{"id":10,"type":"Button","parentId":6,"style":{"enabled":true,"varName":"button8","text":"填充变色","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}}},"order":[0,5,1,2,4,3,6,7,8,9,10],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":true,"afterEffectsDockable":true,"itemReferenceList":"None"}}
*/

// PALETTE
// =======
var palette: Window = new Window("palette");
if (!(panelGlobal instanceof Panel)) palette.text = "Dialog";



palette.orientation = "column";
palette.spacing = 10;
palette.margins = 16;

// GROUP1
// ======
var group1 = palette.add("group", undefined, { name: "group1" });
group1.orientation = "row";
group1.alignChildren = ["left", "center"];
group1.spacing = 10;
group1.margins = 0;

var button1 = group1.add("button");
// button1.helpTip = "透明度出现和消失动画";
button1.text = "透明渐隐";


var button2 = group1.add("button", undefined, "缩放出现");
button2.helpTip = "缩放出现 + 弹性动画";


var button3 = group1.add("button");
button3.text = "透明闪烁";

var button4 = group1.add("button");
button4.text = "路径生长";

// GROUP2
// ======
var group2 = palette.add("group");
group2.orientation = "row";
group2.alignChildren = ["left", "center"];
group2.spacing = 10;
group2.margins = 0;

var button5 = group2.add("button");
button5.text = "移动透明";

var button6 = group2.add("button");
button6.text = "逐字跳动";

var button7 = group2.add("button");
button7.helpTip = "现在图层描边变虚线";
button7.text = "形状虚线";

var button8 = group2.add("button");
button8.text = "填充变色";

palette.layout.layout(true);
palette.layout.resize();
palette.onResizing = palette.onResize = function () { this.layout.resize(); }




button1.onClick = function () {
    // 获取当前选中的活动图层
    var activeLayer = (app.project.activeItem as CompItem).selectedLayers[0];
    // 设置透明度从0到70%的关键帧
    var opacityProperty: Property = (activeLayer.property("Opacity") as Property);
    var currentOpacity = opacityProperty.value
    var frameRate = activeLayer.containingComp.frameRate;
    var frameDuration = 1 / frameRate;
    var fadeInDurationFrames = 7;
    var fadeInDurationSeconds = fadeInDurationFrames * frameDuration;
    opacityProperty.setValueAtTime(activeLayer.inPoint, 0);
    opacityProperty.setValueAtTime(activeLayer.inPoint + fadeInDurationSeconds, currentOpacity);
    opacityProperty.setValueAtTime(activeLayer.outPoint, 0);
    opacityProperty.setValueAtTime(activeLayer.outPoint - fadeInDurationSeconds, currentOpacity);



    // 在图层入点和图层入点+7帧之间线性插值透明度
    opacityProperty.setInterpolationTypeAtKey(opacityProperty.nearestKeyIndex(activeLayer.inPoint), KeyframeInterpolationType.BEZIER);
    opacityProperty.setInterpolationTypeAtKey(opacityProperty.nearestKeyIndex(activeLayer.inPoint + fadeInDurationSeconds), KeyframeInterpolationType.BEZIER);
    opacityProperty.setInterpolationTypeAtKey(opacityProperty.nearestKeyIndex((activeLayer.inPoint + activeLayer.inPoint + fadeInDurationSeconds) / 2), KeyframeInterpolationType.BEZIER);

    // 在图层入点和图层入点+7帧之间线性插值透明度
    opacityProperty.setInterpolationTypeAtKey(opacityProperty.nearestKeyIndex(activeLayer.outPoint), KeyframeInterpolationType.BEZIER);
    opacityProperty.setInterpolationTypeAtKey(opacityProperty.nearestKeyIndex(activeLayer.outPoint - fadeInDurationSeconds), KeyframeInterpolationType.BEZIER);
    opacityProperty.setInterpolationTypeAtKey(opacityProperty.nearestKeyIndex((activeLayer.outPoint + activeLayer.outPoint - fadeInDurationSeconds) / 2), KeyframeInterpolationType.BEZIER);

}

button2.onClick = function () {
    // 获取当前选中的活动图层
    var activeLayer = (app.project.activeItem as CompItem).selectedLayers[0];

    // 设置缩放动画
    var scaleProperty: Property = (activeLayer.property("Scale") as Property);
    var currentScale = scaleProperty.value;
    var frameRate = activeLayer.containingComp.frameRate;
    var frameDuration = 1 / frameRate;
    var fadeInDurationFrames = 7;
    var fadeInDurationSeconds = fadeInDurationFrames * frameDuration;

    scaleProperty.setValueAtTime(activeLayer.inPoint, [0, 0, 0]);
    scaleProperty.setValueAtTime(activeLayer.inPoint + fadeInDurationSeconds, currentScale);


    var exp = "e = .22; // Bouncing\n" +
        "g = 1; // Gravity\n" +
        "nMax = 10; // Maximum bounces\n" +
        "n = 0;\n" +
        "if (numKeys > 0){\n" +
        "n = nearestKey(time).index;\n" +
        "if (key(n).time > time) n--;\n" +
        "}\n" +
        "if (n > 0){\n" +
        "t = time - key(n).time;\n" +
        "v = -velocityAtTime(key(n).time - .001)*e;\n" +
        "vl = length(v);\n" +
        "if (value instanceof Array){\n" +
        "vu = (vl > 0) ? normalize(v) : [0,0,0];\n" +
        "}else{\n" +
        "vu = (v < 0) ? -1 : 1;\n" +
        "}\n" +
        "tCur = 0;\n" +
        "segDur = 2*vl/(g*1000);\n" +
        "tNext = segDur;\n" +
        "nb = 1; // number of bounces\n" +
        "while (tNext < t && nb <= nMax){\n" +
        "vl *= e;\n" +
        "segDur *= e;\n" +
        "tCur = tNext;\n" +
        "tNext += segDur;\n" +
        "nb++\n" +
        "}\n" +
        "if(nb <= nMax){\n" +
        "delta = t - tCur;\n" +
        "value +  vu*delta*(vl - (g*1000)*delta/2);\n" +
        "}else{\n" +
        "value\n" +
        "}\n" +
        "}else\n" +
        "value"
    scaleProperty.expression = exp;
}
button3.onClick = function () {

    // 获取当前选中的图层
    var activeLayer = (app.project.activeItem as CompItem).selectedLayers[0];
    // 设置缩放动画
    var opacityProperty: Property = (activeLayer.property("Opacity") as Property);

    var currentOpacity = opacityProperty.value
    var frameRate = activeLayer.containingComp.frameRate;
    var frameDuration = 1 / frameRate;
    var durationSeconds = 5 * frameDuration;

    for (var i = 0; i <= (activeLayer.outPoint - activeLayer.inPoint) / durationSeconds; i++) {
        var opacity = (i % 2 == 0) ? 0 : currentOpacity;
        var currentTime = activeLayer.inPoint + i * durationSeconds;
        opacityProperty.setValueAtTime(currentTime, opacity);
        opacityProperty.setInterpolationTypeAtKey(opacityProperty.nearestKeyIndex(currentTime), KeyframeInterpolationType.HOLD);

    }
}

button4.onClick = function () {
    // 获取当前选中的形状图层
    var activeLayer = (app.project.activeItem as CompItem).selectedLayers[0];

    var frameRate = activeLayer.containingComp.frameRate;
    var frameDuration = 1 / frameRate;
    var durationSeconds = 20 * frameDuration;

    // 添加 Trim Paths 属性并设置初始值

    var shapeGroup = (activeLayer.property("Contents") as PropertyGroup);

    var trimPaths = shapeGroup.addProperty("ADBE Vector Filter - Trim");
    var endProperty = (trimPaths.property("End") as Property);
    endProperty.setValueAtTime(activeLayer.inPoint, 0);
    endProperty.setValueAtTime(activeLayer.inPoint + durationSeconds, 100);


    // 设置动画时长为 20 帧
    // var interval = (app.project.activeItem as CompItem).frameDuration * 20;
    // var startTime = endTime - interval;
    // endProperty.setValuesAtTimes([startTime, endTime], [0, 100]);

}

button5.onClick = function () {
    // 获取当前选中的形状图层
    var activeLayer = (app.project.activeItem as CompItem).selectedLayers[0];

    var frameRate = activeLayer.containingComp.frameRate;
    var frameDuration = 1 / frameRate;
    var durationSeconds = 7 * frameDuration;

    var opacityProperty: Property = (activeLayer.property("Opacity") as Property);
    var positionProperty: Property = (activeLayer.property("Position") as Property);
    var currentOpacity = opacityProperty.value
    var currentPosition = positionProperty.value


    opacityProperty.setValueAtTime(activeLayer.inPoint, 0);
    opacityProperty.setValueAtTime(activeLayer.inPoint + durationSeconds, currentOpacity);

    positionProperty.setValueAtTime(activeLayer.inPoint, [currentPosition[0], currentPosition[1] - 100]);
    positionProperty.setValueAtTime(activeLayer.inPoint + durationSeconds, currentPosition);
    var exp = "e = .22; // Bouncing\n" +
        "g = 1; // Gravity\n" +
        "nMax = 10; // Maximum bounces\n" +
        "n = 0;\n" +
        "if (numKeys > 0){\n" +
        "n = nearestKey(time).index;\n" +
        "if (key(n).time > time) n--;\n" +
        "}\n" +
        "if (n > 0){\n" +
        "t = time - key(n).time;\n" +
        "v = -velocityAtTime(key(n).time - .001)*e;\n" +
        "vl = length(v);\n" +
        "if (value instanceof Array){\n" +
        "vu = (vl > 0) ? normalize(v) : [0,0,0];\n" +
        "}else{\n" +
        "vu = (v < 0) ? -1 : 1;\n" +
        "}\n" +
        "tCur = 0;\n" +
        "segDur = 2*vl/(g*1000);\n" +
        "tNext = segDur;\n" +
        "nb = 1; // number of bounces\n" +
        "while (tNext < t && nb <= nMax){\n" +
        "vl *= e;\n" +
        "segDur *= e;\n" +
        "tCur = tNext;\n" +
        "tNext += segDur;\n" +
        "nb++\n" +
        "}\n" +
        "if(nb <= nMax){\n" +
        "delta = t - tCur;\n" +
        "value +  vu*delta*(vl - (g*1000)*delta/2);\n" +
        "}else{\n" +
        "value\n" +
        "}\n" +
        "}else\n" +
        "value"
    positionProperty.expression = exp;
}

button6.onClick = function () {

}
button7.onClick = function () {
    var activeLayer = (app.project.activeItem as CompItem).selectedLayers[0];
    if (activeLayer instanceof ShapeLayer) {
        var curGroup = activeLayer.property("ADBE Root Vectors Group");
        var curContents = curGroup.property("ADBE Vectors Group");
        var curShape = curContents.property(1);
        if ((curShape.property("ADBE Vector Shape") as PropertyGroup).numProperties > 0) {
            // 给第一个形状的描边添加虚线效果
            var curStroke = curShape.property("ADBE Vector Stroke");
            if ((curStroke as PropertyGroup).numProperties > 0) {
                var curDash = (curStroke as PropertyGroup).addProperty("ADBE Vector Stroke Dashes") as Property;
                curDash.setValue([10, 10]); // 设置虚线的间隔和宽度
            }
        }
    }

}
button8.onClick = function () {
    var activeLayer = (app.project.activeItem as CompItem).selectedLayers[0];
    var fillEffect = (activeLayer.property("ADBE Effect Parade") as PropertyGroup).addProperty("ADBE Fill");
    var colorProperty = (fillEffect.property("ADBE Fill-0002") as Property)

    var frameRate = activeLayer.containingComp.frameRate;
    var frameDuration = 1 / frameRate;

    colorProperty.addKey((app.project.activeItem as CompItem).time);
    colorProperty.addKey((app.project.activeItem as CompItem).time + frameDuration * 7);
    colorProperty.addKey((app.project.activeItem as CompItem).time + frameDuration * 7 + frameDuration * 50);
    colorProperty.addKey((app.project.activeItem as CompItem).time + frameDuration * 7 + frameDuration * 50 + frameDuration * 7);
}


palette.layout.layout(true);
palette.layout.resize();
palette.onResizing = palette.onResize = function () { this.layout.resize(); }
if (palette instanceof Window) palette.show();

