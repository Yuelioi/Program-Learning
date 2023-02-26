/**
 * 名称：批量修改合成信息
 * 用途：选择一个合成，里面子合成信息也一起修改* 
 * V1.2 ：帧速率可以填小数
 * V1.1 ：增加了一些提示
 * 作者：yueli
 * 链接：https://www.yuelili.com/?p=18007
 * AE脚本 合成篇：https://www.yuelili.com/docs/ae-script/ae-script-compitem/
 * 使用条件：必须选择一个合成
 * 缺点：如果修改分辨率，不可能自适应！这种跨世纪难题请自己解决
 */
 var panelGlobal = this;
 var main = (function () {
 
     // MAIN
     var main = (panelGlobal instanceof Panel) ? panelGlobal : new Window("palette", undefined, undefined, { closeButton: true });
     if (!(panelGlobal instanceof Panel)) main.text = "批量修改合成信息";
     main.orientation = "column";
     main.alignChildren = ["center", "top"];
     main.spacing = 10;
     main.margins = 16;
 
     // GP_SIZE
     // =======
     var gp_size = main.add("group", undefined, { name: "gp_size" });
     gp_size.orientation = "row";
     gp_size.alignChildren = ["left", "center"];
     gp_size.spacing = 10;
     gp_size.margins = 0;
 
     var t_width = gp_size.add('edittext {properties: {name: "t_width"}}');
     t_width.text = "1920";
     t_width.helpTip = "宽度"
 
     var t_height = gp_size.add('edittext {properties: {name: "t_height"}}');
     t_height.text = "1080";
     t_height.helpTip = "高度"
 
     var t_resolution = gp_size.add('edittext {properties: {name: "t_resolution"}}');
     t_resolution.preferredSize.width = 50
     t_resolution.text = "25";
     t_resolution.helpTip = "帧速率，可以填小数"
 
     // GP_TIME
     // =======
     var gp_time = main.add("group", undefined, { name: "gp_time" });
     gp_time.orientation = "row";
     gp_time.alignChildren = ["left", "center"];
     gp_time.spacing = 10;
     gp_time.margins = 0;
 
     var hh = gp_time.add('edittext {properties: {name: "hh"}}');
         hh.text = "00";
         hh.helpTip = "小时"
 
     var mm = gp_time.add('edittext {properties: {name: "mm"}}');
     mm.text = "00";
     mm.helpTip = "分钟"
 
     var ss = gp_time.add('edittext {properties: {name: "ss"}}');
     ss.text = "10";
     ss.helpTip = "秒"
 
     var ff = gp_time.add('edittext {properties: {name: "ff"}}');
     ff.text = "00";
     ff.helpTip = "帧"
 
     // GP_BTN
     // ======
     var gp_btn = main.add("group", undefined, { name: "gp_btn" });
     gp_btn.orientation = "row";
     gp_btn.alignChildren = ["left", "center"];
     gp_btn.spacing = 10;
     gp_btn.margins = 0;
 
     var resolution_list_array = ["Full", "Half", "Third", "Quarter"];
     var resolution_list = gp_btn.add("dropdownlist", undefined, undefined, { name: "resolution_list", items: resolution_list_array });
     resolution_list.selection = 0;
 
     var change = gp_btn.add("button", undefined, undefined, { name: "change" });
     change.text = "修改";
     change.onClick = change_it
 
  
     function comp_recursive(comp) {
         // 循环合成内的图层与子合成
         for (var i = 1; i <= comp.numLayers; i++) {
             var layer = comp.layer(i);
             
             // 检查图层是否有源 并且类型为合成
             if (layer.source && layer.source instanceof CompItem) {
                 layer.resolutionFactor = [4,4]
                 do_some_change(layer.source)
                 // 检查是否遍历过该合成
                 check = checkPreviousComps(layer.source.id);
 
                 if (check == null) {
                     // 存储原合成id 用于校对
                     var sourceID = layer.source.id;
 
                     // 再次遍历
                     comp_recursive(layer.source)
                     // 存储新合成id 用于校正
                     var destID = layer.source.id;
                     // 添加校正id到数组
                     previousComps[sourceID] = destID;
                 } else {
 
                 }
             }
         }
         // 为了递归，返回复制后的合成
         return comp;
     }
 
     // 检查以前的复制，确保一个合成不会复制两次
     function checkPreviousComps(checkID) {
         if (previousComps[checkID]) {
             return getItemWithID(previousComps[checkID]);
         }
         return null;
     }
 
     // 返回具有指定 ID 的项目
     function getItemWithID(id) {
         for (x = 1; x <= app.project.numItems; x++) {
             if (app.project.item(x).id == id) {
                 return app.project.item(x);
             }
         }
         return null;
     }
 
     // 对合成进行修改
     function do_some_change(comp) {      
         comp.width = parseInt(t_width.text)
         comp.height = parseInt(t_height.text)
         comp.resolutionFactor = [resolution_list.selection.index + 1, resolution_list.selection.index + 1]
         comp.frameRate =parseFloat(t_resolution.text)      
         comp.duration = parseInt(hh.text) *3600 + parseInt(mm.text) *60 + parseInt(ss.text) + parseInt(ff.text) / parseInt(t_resolution.text)
 
     }
 
     // 主函数
     function change_it() {
         mainComp = app.project.activeItem;
         if (mainComp && mainComp instanceof CompItem) {
             do_some_change(mainComp)
             app.beginUndoGroup("Comp Recursive");
             previousComps = [];
             comp_recursive(mainComp);
             app.endUndoGroup();
 
         } else if (!mainComp) {
             alert("请选择一个合成.");
         } else {
             alert("ERROR: 没有选择合成.\n	请重新选择.");
         }
     }
 
 
     main.layout.layout(true);
     main.layout.resize();
     main.onResizing = main.onResize = function () { this.layout.resize(); }
 
     if (main instanceof Window) main.show();
 
     return main;
 
 }());
 
 
 