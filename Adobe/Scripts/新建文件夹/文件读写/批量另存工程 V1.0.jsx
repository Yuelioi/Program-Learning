/**
  * 名称：批量另存工程
  * 版本：1.0
  * 
  * 介绍：
  * 在项目面板选择一个合成，比如：主合成
  * 设置好起始数字与结束数字
  * 则会另存一堆工程，并且工程当前选择的合成也会自动改名
  * 主合成 001.aep  对应的主合成名称也会变成  主合成 001
  * https://www.yuelili.com/?p=18020
  */
 var panelGlobal = this;
 var main = (function () {
 
     /*
     Code for Import https://scriptui.joonas.me — (Triple click to select): 
     {"activeId":4,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":"main","windowType":"Palette","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"批量另存合成并改名","preferredSize":[0,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["center","top"]}},"item-1":{"id":1,"type":"Button","parentId":0,"style":{"enabled":true,"varName":"copy_btn","text":"一键另存","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-2":{"id":2,"type":"EditText","parentId":3,"style":{"enabled":true,"varName":"start_num","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":true,"text":"1","justify":"left","preferredSize":[35,0],"alignment":null,"helpTip":null}},"item-3":{"id":3,"type":"Group","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-4":{"id":4,"type":"EditText","parentId":3,"style":{"enabled":true,"varName":"end_num","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":true,"text":"5","justify":"left","preferredSize":[35,0],"alignment":null,"helpTip":null}},"item-5":{"id":5,"type":"StaticText","parentId":3,"style":{"enabled":true,"varName":"static01","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"起始","justify":"left","preferredSize":[0,0],"alignment":"center","helpTip":null}},"item-7":{"id":7,"type":"StaticText","parentId":3,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"结束","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}}},"order":[0,3,5,2,7,4,1],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":true,"afterEffectsDockable":true,"itemReferenceList":"None"}}
     */
 
     // MAIN
     // ====
     var main = (panelGlobal instanceof Panel) ? panelGlobal : new Window("palette");
     if (!(panelGlobal instanceof Panel)) main.text = "批量另存合成并改名";
     main.orientation = "column";
     main.alignChildren = ["center", "top"];
     main.spacing = 10;
     main.margins = 16;
 
     // GROUP1
     // ======
     var group1 = main.add("group", undefined, { name: "group1" });
     group1.orientation = "row";
     group1.alignChildren = ["left", "center"];
     group1.spacing = 10;
     group1.margins = 0;
 
     var static01 = group1.add("group");
     static01.orientation = "column";
     static01.alignChildren = ["left", "center"];
     static01.margins = [0, 0, 0, 25];
 
     static01.alignment = ["left", "center"];
 
     static01.add("statictext", undefined, "", { name: "static01" });
     static01.add("statictext", undefined, "起始", { name: "static01" });
 
     var start_num = group1.add('edittext {properties: {name: "start_num"}}');
     start_num.text = "1";
 
     start_num.preferredSize.width = 35;
 
     var statictext1 = group1.add("group");
     statictext1.orientation = "column";
     statictext1.alignChildren = ["left", "center"];
     statictext1.spacing = 0;
     statictext1.margins = [0, 0, 0, 15];
 
     statictext1.add("statictext", undefined, "", { name: "statictext1" });
     statictext1.add("statictext", undefined, "结束", { name: "statictext1" });
 
     var end_num = group1.add('edittext {properties: {name: "end_num"}}');
     end_num.text = "5";
     end_num.preferredSize.width = 35;
 
     // MAIN
     // ====
     var copy_btn = main.add("button", undefined, undefined, { name: "copy_btn" });
     copy_btn.text = "一键另存";
     copy_btn.onClick = copy_it
 
     // 主函数功能区
     function copy_it() {
         start = parseInt(start_num.text)
         end = parseInt(end_num.text)
 
         var myProjectFile = app.project.file
 
         // 项目面板选择的第一项
         var selComp = app.project.selection[0]
 
         // 判断是不是合成
         if (selComp instanceof CompItem) {
             trg_name = selComp.name
 
             // 循环
             for (var i = start; i <= end; i++) {
 
                 // 命名规则
                 final_name = trg_name + ' ' + formatZero(i, 3)
                 // trg_name ：选择的合成名
                 //   + ' ' ： 加一个空格
                 // formatZero(i, 3) + ".aep" ：3位格式化的数字，比如005（2位，就把3改成2）
                 // 最终结果：比如原始合成为 QWE，则返回 QWE 001
 
 
                 // 构建新工程路径
                 trg_path = myProjectFile.path + '/' + final_name + ".aep"
 
                 // 由路径创建新文件
                 var trg_file = File(trg_path)
 
                 if (!trg_file.exists) {
                     // 项目另存
                     app.project.save(new File(trg_file))
 
                     // 选择的合成改名
                     app.project.selection[0].name = final_name
                 }
             }
         } else {
             alert("请选择要改名的主合成")
         }
     }
 
     // 不够N位的 补0
     function formatZero(num, len) {
         if (String(num).length > len) return num;
         return (Array(len).join(0) + num).slice(-len);
     }
 
 
     main.layout.layout(true);
     main.layout.resize();
     main.onResizing = main.onResize = function () { this.layout.resize(); }
 
     if (main instanceof Window) main.show();
 
     return main;
 
 }());