/**
 * 名称：Consolidate_Sequence_Renders .jsx
 * 功能：为队列中的每个文件序列渲染项（和输出模块）创建单独的文件夹。例如，如果您有 10 个文件序列要渲染，则可以将它们全部设置为渲染到单个文件夹，
 * 然后运行此脚本；它将为每个文件序列创建单独的文件夹并自动设置输出模块。如果渲染队列中有电影和静止帧，它将忽略这些。新文件夹的名称基于队列项和输出模块（如“qi1_om1”、“qi2_om1”、“qi2_om2”等）。

 * 
 * 油管：http://www.crgreen.com/aescripts/
 * 日期：
 * 源码（中文）：https://www.yuelili.com/
 * 源码（英文）：http://www.crgreen.com/aescripts/actual_scripts/Consolidate_Sequence_Renders.jsx
 * 其他：
 */


 var confirmed = confirm("ALL QUEUED File Sequences in the Render Queue will be given their own folders " + 
 "based on their queue item numbers and output module numbers. Folder creation cannot be undone " +
 "(but any folder name conflicts are caught and will cancel entire script). Execute script?");
 
 if (confirmed) {
	var queueCount = app.project.renderQueue.numItems;
	var conflictFound = true;
	
	// the following boolean (false) is passed to the function to run it in 'trial run' mode
	// (which checks for folder name conflicts)
	conflictFound = (consolomatic(false));
	
	if (conflictFound) {
	   alert("Sorry! Folder name conflict. Script not executed.");
	} else {
	   // we didn't find a conflict, so we can run in 'real' mode:
	   consolomatic(true);
	}
 }
 
 function consolomatic(realRun) {
	var foundConflict = false;
	var curOM = null;
	var oldLocation = null;
	var itsASeq = false;
	var alreadyFolder;
	
	// outer loop for render queue items:
	for (i = 1; i <= queueCount; ++i) {
	   var curItem = app.project.renderQueue.item(i);
	   
	   if (app.project.renderQueue.item(i).status == RQItemStatus.QUEUED) {
		  var itemComp = curItem.comp;
		  var compName = itemComp.name;
		  // inner loop for output modules (per queue item):
		  for (m = 1; m <= curItem.numOutputModules; ++m) {
			 
			 curOM = curItem.outputModule(m);
			 oldLocation = curOM.file;
			 itsASeq = false;
			 
			 fileOut = curOM.file;
			 fileOutStr = curOM.file.toString();
			 fileOutStrLen = fileOutStr.length;
			 
			 fileOutNameStr = fileOut.name.toString();
			 nameLen = fileOutNameStr.length;
			 
			 foEnd = fileOutNameStr.slice((nameLen - 4), nameLen);
			 foHead  = fileOutStr.slice(0, (fileOutStrLen - nameLen));
			 
			 // use function to see if it's a file sequence
			 itsASeq = testForSequence(fileOutNameStr);
			 
			 alreadyFolder = false;
			 // make file path of new folder
			 newFolderPath = (foHead + "qi" + i + "_" + "om" + m);
			 
			 if (itsASeq) {
				if (realRun) {
				   // talk about overkill ...
				   // if this is a real run, we have already checked for existing folders; no need to do it again
				   alreadyFolder = false
				} else {
				   alreadyFolder = ( Folder(newFolderPath).exists );
				}
				// only fails on trial run if special folder exists
				// (which would mean we've run the script but didn't render, then reverted to original render queue locations, or something like that)
				if (alreadyFolder) {
				   foundConflict = true;
				   i = (queueCount + 1); // kill outer loop,
				   break; // kill this inner loop
				} else {
				   if (realRun) {
					  // create the new folder
					  Folder(newFolderPath).create();
					  // set the output module to this new folder
					  curOM.file = new File(newFolderPath + "/" + fileOutNameStr);
				   }
				}
			 } else {
				// DO NOTHING; IT'S NOT A FILE SEQ.
			 }
		  }
	   }
	}
	if (! realRun) {
	   return foundConflict;
	}
 }
 
 function testForSequence(fileOutEndString){
	//  regular expressions:
	//  looks for various movie file extensions, beginning with '.'
	var movieREx = new RegExp (/[:.:]mov|MOV|avi|AVI|mpg|MPG|wmv|WMV$/);
	
	//  looks for [(#, ... )]-type afx numbering scheme in file name ( where (#, ... ) is any number of #s between [ and ] )
	//  (URL equivalents of [ and ] are used)
	var seqREx = new RegExp (/%5B#+%5D/);
	
	var returnedBoolean = movieREx.exec(fileOutEndString);
	if (returnedBoolean == null) {returnedBoolean = true;}
	
	//alert(returnedBoolean.toSource());
	var returnedBoolean = seqREx.exec(fileOutEndString);
	if (returnedBoolean == null) {returnedBoolean = false;}
	
	return returnedBoolean;
 }
 