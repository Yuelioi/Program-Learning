/**
 * 名称：取消代理
 * 功能：在项目面板选择一个或多个素材，单击取消代理按钮，即可取消代理（
 * 源码：太简单 无源码
 * 版本：1.0
 */

 var panelGlobal = this;
 var palette = (function () {
 
 
     // UI 界面
     var palette = (panelGlobal instanceof Panel) ? panelGlobal : new Window("palette");
     if (!(panelGlobal instanceof Panel)) palette.text = "取消代理";
     palette.orientation = "row";
     palette.alignChildren = ["center", "top"];
     palette.spacing = 10;
     palette.margins = 16;
 
 
     var remap_btn = palette.add("button", undefined, undefined, { name: "remap_btn" });
     remap_btn.helpTip = "在项目面板选择一个或多个素材，单击取消代理按钮，即可取消代理";
     remap_btn.text = "取消代理";
     remap_btn.preferredSize.width = 80;
     remap_btn.onClick = _it
 
     // 主函数
     function _it() {
        app.beginUndoGroup("XXX");

        var selItems = app.project.selection
        for (var i = 0;i < selItems.length; i++){
            selItems[i].setProxyToNone()
        }
        app.endUndoGroup();
     }
  
     palette.layout.layout(true);
     palette.layout.resize();
     palette.onResizing = palette.onResize = function () { this.layout.resize(); }
 
     if (palette instanceof Window) palette.show(); 
     return palette;
 
 }());