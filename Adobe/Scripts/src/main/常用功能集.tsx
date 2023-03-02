// import { find_prop } from "@utils/prop"



var panelGlobal = this;
var palette = (function () {

    /*
    Code for Import https://scriptui.joonas.me — (Triple click to select): 
    {"activeId":4,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":null,"windowType":"Palette","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"Dialog","preferredSize":[0,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["center","top"]}},"item-1":{"id":1,"type":"Button","parentId":5,"style":{"enabled":true,"varName":"button1","text":"透明渐隐","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":"透明度出现和消失动画"}},"item-2":{"id":2,"type":"Button","parentId":5,"style":{"enabled":true,"varName":"button2","text":"缩放出现","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":"缩放出现 + 弹性动画"}},"item-3":{"id":3,"type":"Button","parentId":5,"style":{"enabled":true,"varName":"button4","text":"路径生长","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-4":{"id":4,"type":"Button","parentId":5,"style":{"enabled":true,"varName":"button3","text":"透明闪烁","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-5":{"id":5,"type":"Group","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-6":{"id":6,"type":"Group","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-7":{"id":7,"type":"Button","parentId":6,"style":{"enabled":true,"varName":"button5","text":"移动透明","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-8":{"id":8,"type":"Button","parentId":6,"style":{"enabled":true,"varName":"button6","text":"逐字跳动","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-9":{"id":9,"type":"Button","parentId":6,"style":{"enabled":true,"varName":"button7","text":"形状虚线","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":"现在图层描边变虚线"}},"item-10":{"id":10,"type":"Button","parentId":6,"style":{"enabled":true,"varName":"button8","text":"填充变色","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}}},"order":[0,5,1,2,4,3,6,7,8,9,10],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":true,"afterEffectsDockable":true,"itemReferenceList":"None"}}
    */

    // PALETTE
    // =======
    var palette: any = (panelGlobal instanceof Panel) ? panelGlobal : new Window("palette");
    if (!(panelGlobal instanceof Panel)) palette.text = "功能集";
    palette.orientation = "column";
    palette.alignChildren = ["center", "top"];
    palette.spacing = 10;
    palette.margins = 16;



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
    button1.helpTip = "左键渐现 右键渐隐";
    button1.text = "透明显隐";


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

    // var button9 = group2.add("button");
    // button9.text = "测试";

    palette.layout.layout(true);
    palette.layout.resize();
    palette.onResizing = palette.onResize = function () { this.layout.resize(); }


    button1.addEventListener("mousedown", button1Handler);

    function button1Handler(event: any) {
        // 获取当前选中的活动图层
        var activeLayer = (app.project.activeItem as CompItem).selectedLayers[0];
        // 设置透明度从0到70%的关键帧
        var opacityProperty: Property = (activeLayer.property("Opacity") as Property);
        var currentOpacity = opacityProperty.value
        var frameRate = activeLayer.containingComp.frameRate;
        var frameDuration = 1 / frameRate;
        var fadeInDurationFrames = 7;
        var fadeInDurationSeconds = fadeInDurationFrames * frameDuration;
        var tStart = activeLayer.time
        app.beginUndoGroup(event.target.text);

        if (event.button == 2) {
            opacityProperty.setValueAtTime(tStart, currentOpacity);
            opacityProperty.setValueAtTime(tStart + fadeInDurationSeconds, 0);
        } else {
            opacityProperty.setValueAtTime(tStart, 0);
            opacityProperty.setValueAtTime(tStart + fadeInDurationSeconds, currentOpacity);

        }

        opacityProperty.setInterpolationTypeAtKey(opacityProperty.nearestKeyIndex(tStart), KeyframeInterpolationType.BEZIER);
        opacityProperty.setInterpolationTypeAtKey(opacityProperty.nearestKeyIndex(tStart + fadeInDurationSeconds), KeyframeInterpolationType.BEZIER);
        opacityProperty.setInterpolationTypeAtKey(opacityProperty.nearestKeyIndex((tStart + tStart + fadeInDurationSeconds) / 2), KeyframeInterpolationType.BEZIER);

        app.endUndoGroup()



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

        var tStart = activeLayer.time
        app.beginUndoGroup(this.text);

        scaleProperty.setValueAtTime(tStart, [0, 0, 0]);
        scaleProperty.setValueAtTime(tStart + fadeInDurationSeconds, currentScale);


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
        app.endUndoGroup()
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

        var tStart = activeLayer.time
        app.beginUndoGroup(this.text);

        for (var i = 0; i <= 4; i++) {
            var opacity = (i % 2 == 0) ? 0 : currentOpacity;
            var currentTime = tStart + i * durationSeconds;
            opacityProperty.setValueAtTime(currentTime, opacity);
            // opacityProperty.setInterpolationTypeAtKey(opacityProperty.nearestKeyIndex(currentTime), KeyframeInterpolationType.HOLD);

        }
        app.endUndoGroup()
    }

    button4.onClick = function () {
        // 获取当前选中的形状图层
        var activeLayer = (app.project.activeItem as CompItem).selectedLayers[0];
        var tStart = activeLayer.time;

        var frameRate = activeLayer.containingComp.frameRate;
        var frameDuration = 1 / frameRate;
        var durationSeconds = 20 * frameDuration;

        // 添加 Trim Paths 属性并设置初始值
        var tStart = activeLayer.time
        app.beginUndoGroup(this.text);

        var shapeGroup = (activeLayer.property("Contents") as PropertyGroup);

        var trimPaths = shapeGroup.addProperty("ADBE Vector Filter - Trim");
        var endProperty = (trimPaths.property("End") as Property);
        endProperty.setValueAtTime(tStart, 0);
        endProperty.setValueAtTime(tStart + durationSeconds, 100);

        app.endUndoGroup()
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

        var tStart = activeLayer.time
        app.beginUndoGroup(this.text);

        opacityProperty.setValueAtTime(tStart, 0);
        opacityProperty.setValueAtTime(tStart + durationSeconds, currentOpacity);

        positionProperty.setValueAtTime(tStart, [currentPosition[0], currentPosition[1] - 100]);
        positionProperty.setValueAtTime(tStart + durationSeconds, currentPosition);
        var exp = 'var compFrameDuration = Number(thisComp.frameDuration);\n' +
            'var timeEpsilon = compFrameDuration / 10;\n' +
            '\n' +
            'var bounceBack = function (elasticity, gravity, nMax) {\n' +
            '        elasticity = elasticity || 0.4; //弹性\n' +
            '        gravity = gravity || 1; //重力\n' +
            '        nMax = nMax || 4; //最大反弹次数\n' +
            '        var lastKeyIndex = getKeyParameter("last", thisProperty).index;\n' +
            '        var lastKeyTime = getKeyParameter("last", thisProperty).time;\n' +
            '        var keyTime = thisLayer.time - lastKeyTime;\n' +
            '        if (lastKeyIndex > 0) {\n' +
            '            var velocityValue = thisLayer.mul(thisProperty.velocityAtTime(lastKeyTime - timeEpsilon), -elasticity);\n' +
            '            var velocityLength = thisLayer.length(velocityValue);\n' +
            '            if (value instanceof Array) var direction = velocityLength > 0 ? thisLayer.normalize(velocityValue) : [0, 0, 0];\n' +
            '            else var direction = velocityValue < 0 ? -1 : 1;\n' +
            '            var tCur = 0;\n' +
            '            var segDur = thisLayer.mul(velocityLength, 2 / (gravity * 1000));\n' +
            '            var tNext = segDur;\n' +
            '            var bouncesNumber = 1;\n' +
            '            while (tNext < keyTime && bouncesNumber <= nMax) {\n' +
            '                velocityLength *= elasticity;\n' +
            '                segDur *= elasticity;\n' +
            '                tCur = tNext;\n' +
            '                tNext += segDur;\n' +
            '                bouncesNumber++;\n' +
            '            }\n' +
            '            if (bouncesNumber <= nMax) {\n' +
            '                delta = keyTime - tCur;\n' +
            '                return thisLayer.add(value, thisLayer.mul(direction, delta * (velocityLength - gravity * 1000 * delta / 2)));\n' +
            '            }\n' +
            '            else return value;\n' +
            '        }\n' +
            '        else return value;\n' +
            '    }\n' +
            '\n' +
            'var getKeyParameter = function (type, targetProperty, offsetIndex) {\n' +
            '        targetProperty = targetProperty || thisProperty;\n' +
            '        var keyNumber = targetProperty.numKeys;\n' +
            '        if (!isNaN(offsetIndex) || offsetIndex == "num") offsetIndex = (!isNaN(offsetIndex)) ? Number(offsetIndex) : keyNumber;\n' +
            '        else offsetIndex = offsetIndex || 0;\n' +
            '        var targetLayer = getLayerObject(targetProperty);\n' +
            '        var inTime = targetLayer.inPoint;\n' +
            '        var outTime = targetLayer.outPoint;\n' +
            '        var nearestKeyIndex = targetProperty.nearestKey(thisLayer.time).index;\n' +
            '        var nearestKeyTime = targetProperty.key(nearestKeyIndex).time;\n' +
            '        var lastKeyIndex = nearestKeyTime > thisLayer.time ? nearestKeyIndex - 1 : nearestKeyIndex;\n' +
            '        var nextKeyIndex = nearestKeyTime > thisLayer.time ? nearestKeyIndex : nearestKeyIndex + 1;\n' +
            '        var indexList = { last: lastKeyIndex, next: nextKeyIndex, nesrest: nearestKeyIndex, undefined: 0 };\n' +
            '        var keyIndex = indexList[type] + offsetIndex;\n' +
            '        if (keyIndex <= 0) keyIndex = 0;\n' +
            '        if (keyIndex > keyNumber) keyIndex = keyNumber + 1;\n' +
            '        if (keyIndex <= 0) keyTime = inTime;\n' +
            '        if (keyIndex > keyNumber) keyTime = outTime;\n' +
            '        if (keyIndex > 0 && keyIndex <= keyNumber) keyTime = targetProperty.key(keyIndex).time;\n' +
            '        keyValue = keyIndex > 0 && keyIndex <= keyNumber ? targetProperty.key(keyIndex).value : targetProperty.valueAtTime(keyTime);\n' +
            '        return {\n' +
            '            time: keyTime,\n' +
            '            frame: thisLayer.timeToFrames(keyTime),\n' +
            '            index: keyIndex,\n' +
            '            value: keyValue,\n' +
            '        };\n' +
            '    }\n' +
            '\n' +
            'var getLayerObject = function (targetObject) {\n' +
            '        targetObject = targetObject || thisProperty;\n' +
            '        countUp = 0\n' +
            '        while (++countUp) {\n' +
            '            if (isValidPropertyGroup(targetObject, countUp)) {\n' +
            '                targetLayer = targetObject.propertyGroup(countUp);\n' +
            '                if (getClassName(targetLayer) == "Layer") {\n' +
            '                    return targetLayer;\n' +
            '                }\n' +
            '            }\n' +
            '        }\n' +
            '    }\n' +
            '\n' +
            'var isValidPropertyGroup = function(targetProperty, countUp) {\n' +
            '    try { return !!targetProperty.propertyGroup(countUp); }\n' +
            '    catch (error) { return false; }\n' +
            '}\n' +
            '\n' +
            'function getClassName(targetObject) {\n' +
            '    var expressionEngine = getExpressionEngine();\n' +
            '    if (expressionEngine == "js") return targetObject.className.toString();\n' +
            '    if (expressionEngine == "es") return targetObject.constructor.name.toString();\n' +
            '}\n' +
            '\n' +
            'function getExpressionEngine() {\n' +
            '    var expressionEngine = this.toString() == "[object Object]" ? "js" : "es";\n' +
            '    return expressionEngine;\n' +
            '}\n' +
            '\n' +
            'bounceBack();\n'
        positionProperty.expression = exp;
        app.endUndoGroup()
    }

    button6.onClick = function () {
        // 获取当前选中的文字图层

        var activeLayer = (app.project.activeItem as CompItem).selectedLayers[0];

        if (activeLayer && activeLayer.matchName === "ADBE Text Layer") {
            activeLayer = activeLayer as TextLayer
            var color1 = activeLayer.property("Source Text").property("applyFill");
            alert(color1.toString());

        } else if (activeLayer && activeLayer.matchName === "ADBE Vector Layer") {
            var color2 = activeLayer.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vectors Group").property("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color") as Property
            alert(color2.value)
        }


        // var activeLayer = (app.project.activeItem as CompItem).selectedLayers[0];
        // var scriptFilePath = File($.fileName);
        // var scriptFolderPath = scriptFilePath.parent.fsName;


        // app.beginUndoGroup(this.text);
        // var presetFile = new File(scriptFolderPath + "//" + "Bounce.ffx")
        // activeLayer.applyPreset(presetFile);
        // app.endUndoGroup()
    }
    button7.onClick = function () {
        var activeLayer = (app.project.activeItem as CompItem).selectedLayers[0];



        app.beginUndoGroup(this.text);
        if (activeLayer instanceof ShapeLayer) {
            var curGroup = activeLayer.property("ADBE Root Vectors Group") as PropertyGroup;
            var dashes = prop_group_recursive(curGroup);
            if (dashes instanceof PropertyGroup) {
                var dash = dashes.addProperty("ADBE Vector Stroke Dash 1") as Property;
                var offset = dashes.addProperty("ADBE Vector Stroke Offset") as Property;
                dash.setValue(8)
                offset.setValue(0)
            }
        }
        app.endUndoGroup()
    }
    button8.onClick = function () {
        var activeLayer = (app.project.activeItem as CompItem).selectedLayers[0];

        let color;
        if (activeLayer && activeLayer.matchName === "ADBE Text Layer") {
            activeLayer = activeLayer;
            color = (activeLayer.property("Source Text") as Property).value.property("applyFill");
        }
        else if (activeLayer && activeLayer.matchName === "ADBE Vector Layer") {
            color = activeLayer.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vectors Group").property("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color");
        }

        var fillEffect = (activeLayer.property("ADBE Effect Parade") as PropertyGroup).addProperty("ADBE Fill");
        var colorProperty = (fillEffect.property("ADBE Fill-0002") as Property)

        var frameRate = activeLayer.containingComp.frameRate;
        var frameDuration = 1 / frameRate;

        colorProperty.setValueAtTime((app.project.activeItem as CompItem).time, color);
        colorProperty.setValueAtTime((app.project.activeItem as CompItem).time + frameDuration * 7, color);
        colorProperty.setValueAtTime((app.project.activeItem as CompItem).time + frameDuration * 7 + frameDuration * 50, color);
        colorProperty.setValueAtTime((app.project.activeItem as CompItem).time + frameDuration * 7 + frameDuration * 50 + frameDuration * 7, color);
    }


    function prop_group_recursive(curPropGroup: PropertyGroup): PropertyGroup | Property | null {
        for (var i = 1; i <= curPropGroup.numProperties; i++) {
            var curProp = curPropGroup.property(i);
            if (curProp.matchName === "ADBE Vector Stroke Dashes") {
                return curProp;
            }
            if (curProp instanceof PropertyGroup) {
                var result = prop_group_recursive(curProp); // 递归调用，并将返回值存储在变量中
                if (result) {
                    return result; // 如果找到属性，则将其返回到调用的函数中
                }
            }
        }
        return null; // 如果没有找到属性，则返回 null
    }



    palette.layout.layout(true);
    palette.layout.resize();
    palette.onResizing = palette.onResize = function () { this.layout.resize(); }

    if (palette instanceof Window) palette.show();

    return palette;

}());