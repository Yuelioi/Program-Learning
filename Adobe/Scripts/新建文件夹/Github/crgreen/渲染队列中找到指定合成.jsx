/**
 * 名称：List_Renders_in_Queue .jsx
 * 功能：（提示：不要删除您的渲染项目。）在拥挤的渲染队列中找不到合成的渲染项目？此脚本将向您显示渲染项的位置。简单的。有帮助。或不。
 * 
 * 油管：http://www.crgreen.com/aescripts/
 * 日期：
 * 源码（中文）：https://www.yuelili.com/
 * 源码（英文）：http://www.crgreen.com/aescripts/actual_scripts/List_Renders_in_Queue.jsx
 * 其他：
 */
//"List Renders in Queue" by Christopher R. Green -- version 1
// (and really, would we ever need a version 2?)

if (app.project != null) {
	openComp = app.project.activeItem;
	
	//if the render queue is empty, stop and report:
	
	qLen = app.project.renderQueue.items.length;
	if (qLen == 0) {
	   alert("The Render Queue is empty.");
	} else {
	   
	   //script is designed to work with ONE comp (selected or active); report if openComp is nothing or array:
	   
	   if (openComp instanceof CompItem) {
		  
		  cmpName = openComp.name;
		  qItems = app.project.renderQueue.items;
		  qNumList = "";
				   
		  r = "\r";
		  
		  for (var i = 1; i <= qLen; i++) {
			 n = qItems[i].comp.name;
			 if (qItems[i].comp == openComp) {
				qNumList = (qNumList + i + r);
			 }
		  }
		  
		  if (qNumList == "") {
			 alert("\"" + cmpName + "\" has no items in the Queue.");
		  } else {
			 var dlg = new Window('palette', 'Queue List',[100,100,480-70,445]);
			 dlg.msgPnl = dlg.add('panel', [25,15,355-70,300], ('Queue Items for "' + cmpName + '":'));
			 dlg.msgPnl.msgEt = dlg.msgPnl.add('edittext', [15,25,315-70,265], qNumList, {multiline:true});
			 dlg.stopBtn = dlg.add('button', [70+24,310,190+24,310+20], 'Close', {name:'close'});
			 dlg.stopBtn.onClick = function () {this.parent.close(1)}
			 dlg.show();
		  }//if (qNumList == "")
		  
	   }//if (openComp instanceof CompItem)
	   else {
		  alert("You need to have one comp selected or active.");
	   }//if (openComp instanceof CompItem)
	   
	}//if (qLen == 0)
 }//(app.project != null)