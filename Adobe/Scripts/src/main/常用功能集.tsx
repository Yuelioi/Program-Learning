const search_prop = function (curPropGroup: PropertyGroup, propName: string): PropertyGroup | Property | null {
    for (var i = 1; i <= curPropGroup.numProperties; i++) {
        var curProp = curPropGroup.property(i);
        if (curProp.matchName === propName) {
            return curProp;
        }
        if (curProp instanceof PropertyGroup) {
            var result = search_prop(curProp, propName); // 递归调用，并将返回值存储在变量中
            if (result) {
                return result; // 如果找到属性，则将其返回到调用的函数中
            }
        }
    }
    return null; // 如果没有找到属性，则返回 null
};

var panelGlobal: any = this;

(function () {
    var palette: any = panelGlobal instanceof Panel ? panelGlobal : new Window("palette");
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

    // GROUP2
    // ======
    var group2 = palette.add("group");
    group2.orientation = "row";
    group2.alignChildren = ["left", "center"];
    group2.spacing = 10;
    group2.margins = 0;

    var group3 = palette.add("group");
    group2.orientation = "row";
    group2.alignChildren = ["left", "center"];
    group2.spacing = 10;
    group2.margins = 0;

    var button1 = group1.add("button");
    button1.text = "透明渐显";
    var button11 = group1.add("button");
    button11.text = "透明渐隐";
    var button2 = group1.add("button", undefined, "缩放出现");
    button2.helpTip = "缩放出现 + 弹性动画";
    var button3 = group2.add("button");
    button3.text = "透明闪烁";
    button3.helpTip = "左键变为0 右键变为10";
    var button4 = group2.add("button");
    button4.text = "路径生长";

    var button5 = group2.add("button");
    button5.text = "移动透明";
    var button6 = group3.add("button");
    button6.text = "逐字跳动";
    var button7 = group3.add("button");
    button7.helpTip = "现在图层描边变虚线";
    button7.text = "形状虚线";
    var button8 = group3.add("button");
    button8.text = "填充变色";

    palette.layout.layout(true);
    palette.layout.resize();
    palette.onResizing = palette.onResize = function () {
        this.layout.resize();
    };

    /**
     * 透明显隐
     */

    button1.onClick = function () {
        // 获取当前选中的活动图层
        var activeLayer = (app.project.activeItem as CompItem).selectedLayers[0];
        var opacityProperty: Property = activeLayer.property("Opacity") as Property;
        var currentOpacity = opacityProperty.value;
        var frameRate = activeLayer.containingComp.frameRate;
        var frameDuration = 1 / frameRate;
        var fadeInDurationFrames = 7;
        var fadeInDurationSeconds = fadeInDurationFrames * frameDuration;
        var tStart = activeLayer.time;
        app.beginUndoGroup(this.text);

        opacityProperty.setValueAtTime(tStart, 0);
        opacityProperty.setValueAtTime(tStart + fadeInDurationSeconds, currentOpacity);

        opacityProperty.setInterpolationTypeAtKey(opacityProperty.nearestKeyIndex(tStart), KeyframeInterpolationType.BEZIER);
        opacityProperty.setInterpolationTypeAtKey(opacityProperty.nearestKeyIndex(tStart + fadeInDurationSeconds), KeyframeInterpolationType.BEZIER);
        opacityProperty.setInterpolationTypeAtKey(
            opacityProperty.nearestKeyIndex((tStart + tStart + fadeInDurationSeconds) / 2),
            KeyframeInterpolationType.BEZIER
        );

        app.endUndoGroup();
    };

    button11.onClick = function () {
        // 获取当前选中的活动图层
        var activeLayer = (app.project.activeItem as CompItem).selectedLayers[0];
        // 设置透明度从0到70%的关键帧
        var opacityProperty: Property = activeLayer.property("Opacity") as Property;
        var currentOpacity = opacityProperty.value;
        var frameRate = activeLayer.containingComp.frameRate;
        var frameDuration = 1 / frameRate;
        var fadeInDurationFrames = 7;
        var fadeInDurationSeconds = fadeInDurationFrames * frameDuration;
        var tStart = activeLayer.time;
        app.beginUndoGroup(this.text);

        opacityProperty.setValueAtTime(tStart, currentOpacity);
        opacityProperty.setValueAtTime(tStart + fadeInDurationSeconds, 0);

        opacityProperty.setInterpolationTypeAtKey(opacityProperty.nearestKeyIndex(tStart), KeyframeInterpolationType.BEZIER);
        opacityProperty.setInterpolationTypeAtKey(opacityProperty.nearestKeyIndex(tStart + fadeInDurationSeconds), KeyframeInterpolationType.BEZIER);
        opacityProperty.setInterpolationTypeAtKey(
            opacityProperty.nearestKeyIndex((tStart + tStart + fadeInDurationSeconds) / 2),
            KeyframeInterpolationType.BEZIER
        );

        app.endUndoGroup();
    };

    /**
     * 缩放出现
     */
    button2.onClick = function () {
        // 获取当前选中的活动图层
        var activeLayer = (app.project.activeItem as CompItem).selectedLayers[0];

        // 设置缩放动画
        var scaleProperty: Property = activeLayer.property("Scale") as Property;
        var currentScale = scaleProperty.value;
        var frameRate = activeLayer.containingComp.frameRate;
        var frameDuration = 1 / frameRate;
        var fadeInDurationFrames = 5;
        var fadeInDurationSeconds = fadeInDurationFrames * frameDuration;

        var tStart = activeLayer.time;
        app.beginUndoGroup(this.text);

        scaleProperty.setValueAtTime(tStart, [0, 0, 0]);
        scaleProperty.setValueAtTime(tStart + fadeInDurationSeconds, currentScale);

        var amp = (activeLayer.property("Effects") as PropertyGroup).addProperty("ADBE Slider Control"); // 添加表达式控件 slider control
        amp.name = "amp";
        (amp.property("Slider") as Property).setValue(20);
        var freq = (activeLayer.property("Effects") as PropertyGroup).addProperty("ADBE Slider Control"); // 添加表达式控件 slider control
        freq.name = "freq";
        (freq.property("Slider") as Property).setValue(40);
        var decay = (activeLayer.property("Effects") as PropertyGroup).addProperty("ADBE Slider Control"); // 添加表达式控件 slider control
        decay.name = "decay";
        (decay.property("Slider") as Property).setValue(60);

        var exp =
            "try {\n" +
            'amp = effect("amp")("ADBE Slider Control-0001") / 200;\n' +
            'freq = effect("freq")("ADBE Slider Control-0001") / 30;\n' +
            'decay = effect("decay")("ADBE Slider Control-0001")/ 10;\n' +
            "n = 0;\n" +
            "if (numKeys > 0){\n" +
            "n = nearestKey(time).index;\n" +
            "if (key(n).time > time){\n" +
            "n--;\n" +
            "}\n" +
            "}\n" +
            "if (n == 0){\n" +
            "t = 0;\n" +
            "} else {\n" +
            "t = time - key(n).time;\n" +
            "}\n" +
            "\n" +
            "if (n > 0){\n" +
            "v = velocityAtTime(key(n).time - thisComp.frameDuration/10);\n" +
            "value + v*amp*Math.sin(freq*t*2*Math.PI)/Math.exp(decay*t);\n" +
            "} else {\n" +
            "value;\n" +
            "}\n" +
            "}catch (e$$4) {\n" +
            "value = value;\n" +
            "}\n";
        scaleProperty.expression = exp;
        app.endUndoGroup();
    };

    /**
     * 透明闪烁
     */

    button3.addEventListener("mousedown", button3Handler);
    function button3Handler(event: any) {
        // 获取当前选中的图层
        var activeLayer = (app.project.activeItem as CompItem).selectedLayers[0];
        // 设置缩放动画
        var opacityProperty: Property = activeLayer.property("Opacity") as Property;

        var currentOpacity = opacityProperty.value;
        var frameRate = activeLayer.containingComp.frameRate;
        var frameDuration = 1 / frameRate;
        var durationSeconds = 6 * frameDuration;

        var tStart = activeLayer.time;
        app.beginUndoGroup(event.target.text);

        let tarOpacity = 0;
        if (event.button == 2) {
            tarOpacity = 10;
        }

        for (var i = 0; i <= 4; i++) {
            var opacity = i % 2 == 1 ? tarOpacity : currentOpacity;
            var currentTime = tStart + i * durationSeconds;
            opacityProperty.setValueAtTime(currentTime, opacity);
            // opacityProperty.setInterpolationTypeAtKey(opacityProperty.nearestKeyIndex(currentTime), KeyframeInterpolationType.HOLD);
        }
        app.endUndoGroup();
    }

    /**
     * 路径生长
     */
    button4.onClick = function () {
        // 获取当前选中的形状图层
        var activeLayer = (app.project.activeItem as CompItem).selectedLayers[0];
        var tStart = activeLayer.time;

        var frameRate = activeLayer.containingComp.frameRate;
        var frameDuration = 1 / frameRate;
        var durationSeconds = 20 * frameDuration;

        // 添加 Trim Paths 属性并设置初始值
        var tStart = activeLayer.time;
        app.beginUndoGroup(this.text);

        var shapeGroup = activeLayer.property("Contents") as PropertyGroup;

        var trimPaths = shapeGroup.addProperty("ADBE Vector Filter - Trim");
        var endProperty = trimPaths.property("End") as Property;
        endProperty.setValueAtTime(tStart, 0);
        endProperty.setValueAtTime(tStart + durationSeconds, 100);

        app.endUndoGroup();
    };

    /**
     * 移动透明 + 弹性
     */
    button5.onClick = function () {
        // 获取当前选中的形状图层
        var activeLayer = (app.project.activeItem as CompItem).selectedLayers[0];

        var frameRate = activeLayer.containingComp.frameRate;
        var frameDuration = 1 / frameRate;
        var durationSeconds = 5 * frameDuration;

        var opacityProperty: Property = activeLayer.property("Opacity") as Property;
        var positionProperty: Property = activeLayer.property("Position") as Property;
        var currentOpacity = opacityProperty.value;
        var currentPosition = positionProperty.value;

        app.beginUndoGroup(this.text);

        // 添加表达式
        var amp = (activeLayer.property("Effects") as PropertyGroup).addProperty("ADBE Slider Control"); // 添加表达式控件 slider control
        amp.name = "amp";
        (amp.property("ADBE Slider Control-0001") as Property).setValue(20);
        var freq = (activeLayer.property("Effects") as PropertyGroup).addProperty("ADBE Slider Control"); // 添加表达式控件 slider control
        freq.name = "freq";
        (freq.property("ADBE Slider Control-0001") as Property).setValue(40);
        var decay = (activeLayer.property("Effects") as PropertyGroup).addProperty("ADBE Slider Control"); // 添加表达式控件 slider control
        decay.name = "decay";
        (decay.property("ADBE Slider Control-0001") as Property).setValue(60);

        var tStart = activeLayer.time;

        opacityProperty.setValueAtTime(tStart, 0);
        opacityProperty.setValueAtTime(tStart + durationSeconds, currentOpacity);

        positionProperty.setValueAtTime(tStart, [currentPosition[0], currentPosition[1] - 100]);
        positionProperty.setValueAtTime(tStart + durationSeconds, currentPosition);
        var exp =
            "try {\n" +
            'amp = effect("amp")("ADBE Slider Control-0001") / 200;\n' +
            'freq = effect("freq")("ADBE Slider Control-0001") / 30;\n' +
            'decay = effect("decay")("ADBE Slider Control-0001") / 10;\n' +
            "n = 0;\n" +
            "if (numKeys > 0){\n" +
            "n = nearestKey(time).index;\n" +
            "if (key(n).time > time){\n" +
            "n--;\n" +
            "}\n" +
            "}\n" +
            "if (n == 0){\n" +
            "t = 0;\n" +
            "} else {\n" +
            "t = time - key(n).time;\n" +
            "}\n" +
            "\n" +
            "if (n > 0){\n" +
            "v = velocityAtTime(key(n).time - thisComp.frameDuration/10);\n" +
            "value + v*amp*Math.sin(freq*t*2*Math.PI)/Math.exp(decay*t);\n" +
            "} else {\n" +
            "value;\n" +
            "}\n" +
            "}catch (e$$4) {\n" +
            "value = value;\n" +
            "}\n";
        positionProperty.expression = exp;
        app.endUndoGroup();
    };

    /**
     * 逐字跳动
     */
    button6.onClick = function () {
        // 获取当前选中的文字图层

        var activeLayer = (app.project.activeItem as CompItem).selectedLayers[0];
        app.beginUndoGroup(this.text);
        const ani = (activeLayer.property("ADBE Text Properties").property("ADBE Text Animators") as PropertyGroup).addProperty("ADBE Text Animator");
        var pos = (ani.property("ADBE Text Animator Properties") as PropertyGroup).addProperty("ADBE Text Position 3D") as Property;
        var selecotr = (ani.property("ADBE Text Selectors") as PropertyGroup).addProperty("ADBE Text Expressible Selector");
        var amount = selecotr.property("ADBE Text Expressible Amount") as Property;

        // 添加表达式
        var textRange = (activeLayer.property("Effects") as PropertyGroup).addProperty("ADBE Slider Control");
        textRange.name = "Text Range";
        (textRange.property("ADBE Slider Control-0001") as Property).setValue(2);

        var textHight = (activeLayer.property("Effects") as PropertyGroup).addProperty("ADBE Slider Control");
        textHight.name = "Text Height";
        (textHight.property("ADBE Slider Control-0001") as Property).setValue(-50);

        const exp =
            "textRange = effect('Text Range')('ADBE Slider Control-0001'); // 文字受影响的范围\n" +
            "\n" +
            "\n" +
            "// 处理选择器生效程度\n" +
            "function rangeHandle(a,b,tClip){\n" +
            "	// return Math.sin(linear(Math.abs(a-b),0,tClip,0,Math.PI/2)); // 圆形选择器\n" +
            "	return clamp(Math.abs(a-b)/tClip,0,textRange); // 三角形选择器\n" +
            "}\n" +
            "\n" +
            "// 如果没有关键帧 则跳过\n" +
            "if (thisProperty.numKeys >=2){\n" +
            "	tStart = thisProperty.key(1).time;\n" +
            "	tEnd = thisProperty.key(2).time;\n" +
            "	tTotal = tEnd - tStart;\n" +
            "	tClip = tTotal/(textTotal+1) // 结尾动画结束 所以间距要+1\n" +
            "	\n" +
            "	// 区间外直接跳过\n" +
            "	if (time < tStart || time > tEnd){\n" +
            "		[0,0,0]\n" +
            "	}else{\n" +
            "		(textRange - rangeHandle(time, tStart + tClip * textIndex,tClip))/tTotal * [100,100,100]\n" +
            "	}\n" +
            "}else{\n" +
            "	[0,0,0]\n" +
            "}";
        amount.expression = exp;
        amount.addKey(activeLayer.time);
        amount.addKey(activeLayer.time + 1);
        const exp2 = "textHeight = effect('Text Height')('ADBE Slider Control-0001'); // 文字受影响的范围\n" + "[0 , textHeight, 0]";

        pos.expression = exp2;
        app.endUndoGroup();
    };

    /**
     * 形状虚线
     */
    button7.onClick = function () {
        var activeLayer = (app.project.activeItem as CompItem).selectedLayers[0];

        app.beginUndoGroup(this.text);
        if (activeLayer instanceof ShapeLayer) {
            var curGroup = activeLayer.property("ADBE Root Vectors Group") as PropertyGroup;
            var dashes = search_prop(curGroup, "ADBE Vector Stroke Dashes");
            if (dashes instanceof PropertyGroup) {
                var dash = dashes.addProperty("ADBE Vector Stroke Dash 1") as Property;
                var offset = dashes.addProperty("ADBE Vector Stroke Offset") as Property;
                dash.setValue(8);
                offset.setValue(0);
            }
        }
        app.endUndoGroup();
    };

    /**
     * 添加Fill
     */
    button8.onClick = function () {
        var activeLayer = (app.project.activeItem as CompItem).selectedLayers[0];

        let color;
        if (activeLayer && activeLayer.matchName === "ADBE Text Layer") {
            color = (activeLayer.property("Source Text") as Property).value.fillColor;
        } else if (activeLayer && activeLayer.matchName === "ADBE Vector Layer") {
            color = (
                activeLayer
                    .property("ADBE Root Vectors Group")
                    .property("ADBE Vector Group")
                    .property("ADBE Vectors Group")
                    .property("ADBE Vector Graphic - Fill")
                    .property("ADBE Vector Fill Color") as Property
            ).value;
        }

        var fillEffect = (activeLayer.property("ADBE Effect Parade") as PropertyGroup).addProperty("ADBE Fill");
        var colorProperty = fillEffect.property("ADBE Fill-0002") as Property;

        var frameRate = activeLayer.containingComp.frameRate;
        var frameDuration = 1 / frameRate;

        colorProperty.setValueAtTime((app.project.activeItem as CompItem).time, color);
        colorProperty.setValueAtTime((app.project.activeItem as CompItem).time + frameDuration * 7, color);
        colorProperty.setValueAtTime((app.project.activeItem as CompItem).time + frameDuration * 7 + frameDuration * 50, color);
        colorProperty.setValueAtTime((app.project.activeItem as CompItem).time + frameDuration * 7 + frameDuration * 50 + frameDuration * 7, color);
    };

    palette.layout.layout(true);
    palette.layout.resize();
    palette.onResizing = palette.onResize = function () {
        this.layout.resize();
    };

    if (palette instanceof Window) palette.show();

    return palette;
})();
