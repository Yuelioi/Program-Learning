
/**
 * 名称：saveFrameToPng.jsx
 * 功能：
 * 油管：https://www.youtube.com/watch?v=C8N_J7rYPZo&ab_channel=NTProductions
 * 日期：20210325
 * 源码（中文）：https://www.yuelili.com/
 * 源码（英文）：https://github.com/NTProductions/ae-saveFrameToPng
 */

//  app.project.activeItem.saveFrameToPng(time, fileObject);
// var a = app.project.activeItem.saveFrameToPng(1, File("~/Desktop/1.png"))
var pngPath = File("~/Desktop/12.png");
var curComp = app.project.activeItem;
var comp = app.project.activeItem;
var outputFolderName = Folder.desktop.fsName;
for (var t = 0; t < 2; t+=comp.frameDuration)
{
	comp.saveFrameToPng(t, File(outputFolderName + "/1/test_" + t + ".png"));
}