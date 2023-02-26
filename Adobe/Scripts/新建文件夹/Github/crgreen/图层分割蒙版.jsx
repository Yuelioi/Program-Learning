/**
 * 名称：Separate_Masks_in_Layers .jsx
 * 功能：选择一个图层。会自动把所有蒙版转为多个图层，并且锚点更改为每个蒙版中心的选项，从而保持外观整洁。
 * 油管：http://www.crgreen.com/aescripts/
 * 日期：2007.3.15
 * 源码（中文）：https://www.yuelili.com/
 * 源码（英文）：http://www.crgreen.com/aescripts/actual_scripts/Separate_Masks_in_Layers.jsx
 * 其他：
 */

//Separate Masks in Layers
// by Christopher R. Green
// version 2 adds the ability to name masks quickly using user-given string and delimiter
// Comments? Suggestions? Praise? Post on aenhancers.com, or send me an email via the crgreen website
// left to do: try faster version ...
///////////////////////////
mainMaskSep();
///////////////////////////
function compareNums(a, b) {return a - b;}

function getAndSortVerts(newLayer, thisAxis)
{
	v_Array = new Array;
	vv = newLayer.mask(1).property("ADBE Mask Shape").value.vertices;
	for (v = 0; v < vv.length; v++) {
		thisVert = vv[v];
		v_Array[v_Array.length] = thisVert[thisAxis];
	}
	// sort that mutha
	sortedArray = v_Array.sort(compareNums);
	return sortedArray;
}

function getNewCenter(vx_Array, vy_Array)
{
	//discover 'bounding box' and its center:
	xLen = vx_Array[vx_Array.length-1] - vx_Array[0];
	yLen = vy_Array[vy_Array.length-1] - vy_Array[0];
	return [ (vx_Array[0]+(xLen/2) ), (vy_Array[0]+(yLen/2)) ];
}

function recenterMask(theL) {
	// checks for position and anchor point difference, and
	// adds offset for that
	startingPos = theL.position.value;
	startingAP = theL.anchorPoint.value;
	posOffset = [0, 0];
	
	if (startingPos != startingAP) { posOffset = -1 * (startingAP - startingPos); }
	
	vx_Array = getAndSortVerts(theL, 0);
	vy_Array = getAndSortVerts(theL, 1);
	newCenter = getNewCenter(vx_Array, vy_Array);
	theL.anchorPoint.setValue(newCenter);
	theL.position.setValue(newCenter + posOffset);	
}

function mainMaskSep()
{
	// make sure a comp is selected
	var activeItem = app.project.activeItem;
	if (activeItem == null || !(activeItem instanceof CompItem)){
		alert("You need to select one layer first.");
	} else {
		
		// make sure just one layer is selected
		var selectedLayers = activeItem.selectedLayers;
		var selNum = activeItem.selectedLayers.length;
		if (!(selNum == 1)) {
			if (selNum == 0) {selNum = "No"} 
			alert(selNum + " layers selected. You need to select one layer.");
		} else {
			
			// make sure it is not a light, camera; must be solid or footage item
			if (selectedLayers[0].adjustmentLayer == undefined) {
				alert("Selected layer not valid (camera or light?).");
				
			} else {
				
				//final check: how many masks?
				baseLayer = selectedLayers[0];
				mm = baseLayer.Masks.numProperties;
				
				if (mm < 2) {
					alert("Selected layer must have at least two masks.");
				} else {
					
					app.beginUndoGroup("Mask-separation");
					var reCenterMs = (confirm("Give each layer new anchor point based on its mask?"));
					s = prompt("If you want to give each layer a name, enter text strings separated by a character. " +
						"Start what you enter here with\n" +
						"this character (make sure the character is only used as a separator (not in your layer name strings).\n\n" +
							"Example:\n\n" + "/name1/name2/slash/is/separator\n\n" +
							"will result in the layers named as:\n\n" +
							"name1\nname2\nslash\nis\nseparator\n\n" + 
							"Leave blank or hit Cancel to use existing mask names.", "");
					userNameFlag = false;
					if (s != null && ( s.length > 3 ) ) {
						sepr = s.charAt(0);
						// make array by splitting string using user-supplied delimiter
						// keep in mind the zero-th element should be ignored (it will be nothing); start with nameArray[1]
						nameArray = s.split(sepr);
						nameCount = nameArray.length;
						userNameFlag = true;
					}
					vx_Array = new Array;
					vy_Array = new Array;
					
					for (i = 1; i < mm; i++) {
						clearOutput();
							writeLn("Layer #" + i + " of " + mm + ":");
							writeLn("Removing redundant masks ... ");
						newLayer = baseLayer.duplicate();
						for (m = mm; m > 0; m--) {
							if (i != m) { newLayer.mask(m).remove(); }
						}
						
						if (reCenterMs) {recenterMask(newLayer);}
						newLayer.mask(1).maskMode = MaskMode.ADD;
						
						///////////////new naming scheme////////////////
						// ignores empty names (sepr immediately followed by sepr).
						// mismatched counts of user-given names and masks/layers are taken care of by
						//   simply using existing mask names or ignoring user-given name overflow						
						if ( (userNameFlag) && (i <= (nameCount-1)) && (nameArray[i] != "") ) {
							newLayer.name = nameArray[i];
						} else {
							newLayer.name = newLayer.mask(1).name;
						}
						////////////////////////////////////////////////
					}
						clearOutput();
					//////   now do the original layer:
					for (m = mm; m > 0; m--) {
						if (m != mm) {baseLayer.mask(m).remove();}
					}
					
					if (reCenterMs) {recenterMask(baseLayer);}
					baseLayer.mask(1).maskMode = MaskMode.ADD;
					
					///////////////new naming scheme////////////////
					if ( (userNameFlag) && (i <= (nameCount-1)) && (nameArray[i] != "") ) {
						//alert(i);
						baseLayer.name = nameArray[i];
					} else {
						baseLayer.name = baseLayer.mask(1).name;
					}
					////////////////////////////////////////////////
					app.endUndoGroup();
					
				}
			}
		}
	}
}