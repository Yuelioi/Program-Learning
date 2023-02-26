var panelGlobal = this;
var palette = (function () {

    /*
    Code for Import https://scriptui.joonas.me — (Triple click to select): 
    {"activeId":4,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":null,"windowType":"Palette","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"Dialog","preferredSize":[0,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["center","top"]}},"item-1":{"id":1,"type":"Button","parentId":5,"style":{"enabled":true,"varName":"button1","text":"透明渐隐","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":"透明度出现和消失动画"}},"item-2":{"id":2,"type":"Button","parentId":5,"style":{"enabled":true,"varName":"button2","text":"缩放出现","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":"缩放出现 + 弹性动画"}},"item-3":{"id":3,"type":"Button","parentId":5,"style":{"enabled":true,"varName":"button4","text":"路径生长","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-4":{"id":4,"type":"Button","parentId":5,"style":{"enabled":true,"varName":"button3","text":"透明闪烁","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-5":{"id":5,"type":"Group","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-6":{"id":6,"type":"Group","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-7":{"id":7,"type":"Button","parentId":6,"style":{"enabled":true,"varName":"button5","text":"移动透明","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-8":{"id":8,"type":"Button","parentId":6,"style":{"enabled":true,"varName":"button6","text":"逐字跳动","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-9":{"id":9,"type":"Button","parentId":6,"style":{"enabled":true,"varName":"button7","text":"形状虚线","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":"现在图层描边变虚线"}},"item-10":{"id":10,"type":"Button","parentId":6,"style":{"enabled":true,"varName":"button8","text":"填充变色","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}}},"order":[0,5,1,2,4,3,6,7,8,9,10],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":true,"afterEffectsDockable":true,"itemReferenceList":"None"}}
    */

    // PALETTE
    // =======
    var palette = (panelGlobal instanceof Panel) ? panelGlobal : new Window("palette");
    if (!(panelGlobal instanceof Panel)) palette.text = "Dialog";

    function ToolCollection() {

    }


    palette.orientation = "column";
    palette.alignChildren = ["center", "top"];
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
    button1.onClick = function () {
        alert(123)
    }

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

    if (palette instanceof Window) palette.show();

    return palette;

}());