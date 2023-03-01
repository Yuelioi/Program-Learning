/**
 * 名称：Selected_Comps_Changer .jsx
 * 功能：批量更改合成信息。选择一堆合成并一次更改它们的一些设置：名称搜索和替换或添加、宽度、高度、帧率、长度、像素纵横比、快门角度/相位、嵌套时保留帧率/分辨率-它（几乎）都在这里！
 * 油管：http://www.crgreen.com/aescripts/
 * 日期：2013.1.12
 * 源码（中文）：https://www.yuelili.com/
 * 源码（英文）：http://www.crgreen.com/aescripts/actual_scripts/Selected_Layers_Renamer.jsx
 * 其他：
 */




//globals: ////
var vers = "2.6";
var weCanCloseWindow = true;
var win = new Window('dialog', 'Change Selected Comps (v' + vers + ')',[300,100,800,560+50+40]);
var w = buildUI();
var probStr = "";
/////////////

start();

function bigHelp() {
    var bigHelpTxt = "Perhaps I can help ...\rIf you want to change a setting in your selected comps, enter something in a field, or click a \"Do\" checkbox. " + 
    "All fields after the first two must be numbers.\rRegarding name changing:\rFor search and replace, enter text in both of the top two fields; " +
    "If you want to add text to the beginning or end of the comp names, uncheck the \"do search\" checkbox, enter the text to be added in the " +
    "second field, and choose the appropriate radio button to the right.\rNon-numbers in fields which require numbers will result in that comp setting " + 
    "being ignored, and those errors are reported.";
    alert(bigHelpTxt);
}

function doAbout() {
    var aboutTxt = "Selected_Comps_Changer (version " + vers + ")\rThis script was written for Yorgo Alexopoulos by Christopher R. Green, at Yorgo's request for something more-or-less like it. " +
    "It is one of many scripts available from crgreen.com. Feel free to give Chris feedback.";
    alert(aboutTxt);
}

function splitReplace(st, ss, rs) {
    var stArray = st.split(ss);
    var patchedString = "";
    var i = 0;
    while (i < (stArray.length)) {
        if (i == (stArray.length-1)) {rs = "";}
        patchedString = (patchedString + (stArray[i] + rs) );
        i = (i + 1);
    }
    return patchedString
}


function start() {
    if (app.project != null) {
        if (app.project.items.length < 2) {
            alert("Please select at least two comps.");
        } else {
            var everyItem = app.project.items;                                          
            var thisManySelComps = 0;
            for (var i = everyItem.length; i >= 1; i--) {
                item = everyItem[i];
                if ((item instanceof CompItem) && item.selected) {
                    thisManySelComps++;
                }
            }//for (var i = items.length; i >= 1; i--)
            //finally ... 
            if ( (w != null) && (thisManySelComps > 1) ) {
                // everything is controlled by the dialog at this point ...
                w.show();
                
            } else {
                alert("Please select at least two comps.");
            }
        }
    }
    
}

function buildUI() {
    if (win != null) {
        win.basicPnl = win.add('statictext', [20,26,480,48], '------------------- "Basic": -------------------------');
        win.addHeadRad = win.add('radiobutton', [317,108,453,130], 'add to head');
        win.addHeadRad.enabled = false;
        win.addTailRad = win.add('radiobutton', [317,131,453,153], 'add to tail');
        win.addTailRad.value = true;
        win.addTailRad.enabled = false;
        win.advPnl = win.add('statictext', [20,303,480,325], '------------------- "Advanced": ---------------------');
        
        win.nameSearchLabel = win.add('statictext', [54,48,232,70], 'Search in comp names for:');
        win.nameSearchT = win.add('edittext', [65,73,305,95], '');
        
        win.nameDoSearchCheck = win.add('checkbox', [310,73,465,95], 'do search (off = add)');
        win.nameReplaceLabel = win.add('statictext', [54,100,260,122], ' ... and replace with:');
        
        win.nameDoSearchCheck.value = true;
        win.nameDoSearchCheck.onClick = function () {
            doLinkedEmpty(this, win.nameSearchT);
            doLinkedEnabled(this, win.nameSearchT);
            doOppositeEnabled(this, win.addHeadRad);
            doOppositeEnabled(this, win.addTailRad);
            doLinkedEnabled(this, win.nameSearchLabel);
            doLinkedEnabled(this, win.nameSearchLabel);
            doLinkedNewText(this, win.nameSearchLabel, "Search in comp names for:", "(Search Off)");
            doLinkedNewText(this, win.nameReplaceLabel, " ... and replace with:", "Add this to comp names:");
        };
        
        win.nameReplaceT = win.add('edittext', [65,123,305,145], '');
        // at least in version 6.5, there seems to be a bug in the implementation of 'name' for control objects
        //(unless i'm missing something);
        // docs say that every control object can be given a 'name' when '.add'ing, but it seems only buttons can be given names
        // in this way; everything else (or, at least an edittext object) has to be given a name after '.add'ing
        win.nameReplaceT.name = "nameReplaceT";
        //now this edittext field can be tested for by name, below
        // well, you see ... i originally had coded this differently; now i don't need the names, but i'm keeping them
        // here, just in case ...
        win.widthLabel = win.add('statictext', [41,179,86,201], 'Width:');
        win.widthT = win.add('edittext', [89,177,166,199], '');
        win.widthT.name = "widthT";
        win.heightLabel = win.add('statictext', [41,203,86,225], 'Height:');
        win.heightT = win.add('edittext', [89,201,166,223], '');
        win.heightT.name = "heightT";
        win.reCenterCheck = win.add('checkbox', [41,226,166,248], ' re-center layers');
        win.reCenterCheck.value = true;
        win.reCenterHuhBtn = win.add('button', [170,226,200,246], '?');
        win.reCenterHuhBtn.onClick = reCenterHelp;
        
        win.frRLabel = win.add('statictext', [187,179,256,201], 'Framerate:');
        win.frRT = win.add('edittext', [259,177,329,199], '');
        win.frRT.name = "frRT";
        
        win.lenFormatLabel = win.add('statictext', [396,160,472,174], '(in frames!)');
        win.lenLabel = win.add('statictext', [339,179,384,201], 'Length:');
        win.lenT = win.add('edittext', [388,177,464,199], '');
        win.lenT.name = "lenT";
        
        win.layerExtendCheck = win.add('checkbox', [347,201,474,223], 'extend');
        win.layerExtendLabel = win.add('statictext', [347,225,474,247], 'comp-ending layer');
        win.layerExtendLabel2 = win.add('statictext', [347,245,474,267], 'outpoints to new length');
        win.layerExtendCheck.value = true;
        
        win.ratioLabel = win.add('statictext', [268,278,384,300], 'Pixel Aspect Ratio:');
        win.ratioT = win.add('edittext', [388,276,428,298], '');
        win.ratioT.name = "ratioT";
        win.ratioHuhBtn = win.add('button', [438,276,468,296], '?');
        win.ratioHuhBtn.onClick = paRatioHelp;
        win.okBtn = win.add('button', [398,467+40,478,489+40], 'OK', {name:'ok'});
        win.okBtn.onClick = function () { doMain(this.parent);this.parent.close(1); };
        win.cancBtn = win.add('button', [298,467+40,378,489+40], 'Cancel', {name:'cancel'});
        win.cancBtn.onClick = function () {this.parent.close(0)};
        win.helpBtn = win.add('button', [111,467+40,191,489+40], 'Help!', {name:'help'});
        win.helpBtn.onClick = bigHelp;
        win.aboutBtn = win.add('button', [21,467+40,101,489+40], 'About', {name:'about'});
        win.aboutBtn.onClick = doAbout;
        win.angleLbl = win.add('statictext', [34,337,177,359], 'Shutter Angle (max. 720):');
        win.phaseLbl = win.add('statictext', [245,337,425,359], 'Shutter Phase (-360 to 360):');
        win.angleT = win.add('edittext', [185,335,225,357], '');
        win.angleT.name = "angleT";
        win.phaseT = win.add('edittext', [426,335,466,357], '');
        win.phaseT.name = "phaseT";
        win.doPresFRCheck = win.add('checkbox', [66,392,106,414], 'Do:');
        win.doPresFRCheck.value = false;
        win.presFRCheck = win.add('checkbox', [107,392,437,414], 'Preserve framerate when nested or in render queue');
        win.presFRCheck.enabled=false;
        win.doPresFRCheck.onClick = function () {doLinkedEnabled(this, win.presFRCheck)};
        win.doPresRezCheck = win.add('checkbox', [66,416,106,438], 'Do:');
        win.doPresRezCheck.value = false;
        win.presRezCheck = win.add('checkbox', [107,416,437,438], 'Preserve resolution when nested');
        win.presRezCheck.enabled = false;
        win.doPresRezCheck.onClick = function () {doLinkedEnabled(this, win.presRezCheck)};
        win.explainEmptiesLbl = win.add('statictext', [10,4,490,22], '(BLANK FIELDS MEAN IGNORE SETTINGS)');
        win.explainEmptiesLbl.justify = 'center';
        win.explainDoLbl = win.add('statictext', [54,370,446,390], '(An unchecked "Do" checkbox means ignore setting)');
        
        win.doRendererCheck = win.add('checkbox', [66,416+29,106,438+29], 'Do:');
        win.doRendererCheck.value = false;
        win.doRendererCheck.onClick = function () {doLinkedEnabled(this, win.rendererPop)};
        win.rendererPop = win.add('dropdownlist', [66+60,416+26,186+60,438+26], ["Classic 3D", "Ray-Traced 3D"]);
        win.rendererPop.selection = 0;
        win.rendererPop.enabled = false;
            }
    return win
}

function paRatioHelp() {
    alert("The \"known and accurate\" sets (please use these number formats):\r\r" +
        "****** Based on \"old\" AE presets ******\r" +
        "1	   (Square Pixel)\r.9	   (D1/DV NTSC)\r1.2	   (D1/DV NTSC Widescreen)\r1.07	   (D1/DV PAL)\r" +
        "1.42	   (D1/DV PAL Widescreen)\r2	   (Anamorphic 2:1)\r.95	   (D4/D16 Sandard)\r1.9	   (D4/D16 Anamorphic)\r\r" +
        "****** Based on \"newer\" AE presets ******\r" +
        "1	   (Square Pixel)\r.91	   (D1/DV NTSC)\r1.21	   (D1/DV NTSC Widescreen)\r1.09	   (D1/DV PAL)\r" +
        "1.46	   (D1/DV PAL Widescreen)\r2	   (Anamorphic 2:1)\r1.33	   (HDV 1080/DVCPRO HD 720)\r" +
        "1.5	   (DVCPRO HD 1080)\r\rPlease consult AE documentation if you are unsure about these numbers.");
    
}

function reCenterHelp() {
    alert("Recentering is meant primarily for 2D layers: you may see unexpected results if you have complex 3D at work in the comps. " +
        "This operation will UNLOCK all locked layers!\r\r" + 
        "This button is only meaningful if you are changing comp dimensions.");
}

function makeParentLayerOfAllUnparented(theComp, newParent)
{
    for (var i = 1; i <= theComp.numLayers; i++) {
        var curLayer = theComp.layer(i);
        if (curLayer.locked) {curLayer.locked = false;}
        if (curLayer != newParent && curLayer.parent == null) {
            curLayer.parent = newParent;
        }
    }
}

function extendLayers(theComp, newEnd)
{
    for (var i = 1; i <= theComp.numLayers; i++) {
        var curLayer = theComp.layer(i);
        var compEnd = theComp.duration;
        // don't have to worry about comps, surprisingly (but i am worried about future AE versions)
        if (curLayer) {
            if (curLayer.outPoint >= compEnd) {
                lockedOne = false;
                if (curLayer.locked) {lockedOne = true;curLayer.locked = false;}
                curLayer.outPoint = newEnd;
                if (lockedOne) {curLayer.locked = true;}
                lockedOne = false;
            }
        }
    }
}

function moveParent(pa, axis, amt) {
    //null is at 000 anyway, so no math needed
    newPos = [0, 0, 0];
    newPos[axis] = amt;
    pa.position.setValue(newPos);
}

function doMain(theDialog) {
    //alert("doing main");
    
    var everyItem = app.project.items;
    //      first we build the comp collection so that renaming doesn't mess up because comps
    //      jump to new positions with new names!!
    selectedComps = new Array();
    for (var i = everyItem.length; i >= 1; i--) {
        eyeTem = everyItem[i];
        if ((eyeTem instanceof CompItem) && eyeTem.selected) {
            selectedComps[selectedComps.length] = eyeTem;
        }
    }
    app.beginUndoGroup("Change Selected Comps");
    for (var n = (selectedComps.length-1); n >= 0; n--) {
        item = selectedComps[n];
        // in order of options:
        // 1-comp names:
        //       if both are "", ignore, if search empty and replace not, do add to start or end
        //       if both are not empty, do search and replace
        ////// first name stuff
        if (theDialog.nameSearchT.text != "") {
            oldName = item.name;
            sear = theDialog.nameSearchT.text;
            repl = theDialog.nameReplaceT.text
            newName = oldName;
            
            newName = splitReplace(newName, sear, repl);
            
            //now we check for pre-cs4 app version, for which we truncate:
            if ((parseFloat(app.version) < 9.0)) {newName=(newName.substr(0,31));}
            item.name = newName;
        } else {
            if ( (!theDialog.nameDoSearchCheck.value) && (theDialog.nameReplaceT.text != "") ) {
                oldName = item.name;
                if (theDialog.addTailRad.value) {
                    newName = (oldName + theDialog.nameReplaceT.text);
                } else {
                    newName = (theDialog.nameReplaceT.text + oldName);
                }
                //now we check for pre-cs4 app version, for which we truncate:
                if ((parseFloat(app.version) < 9.0)) {newName = (newName.substr(0,31));}
                item.name = newName;
            }
        }
        ///// 2- width
        //////////////////////////////   now with re-center   ////////////
        // limit=30000
        if (theDialog.widthT.text != "") {
            if (isNaN(parseFloat(theDialog.widthT.text))) {
                probStr = (probStr + "Not a number value for Width\r");
                theDialog.widthT.text = "";//empty field if it is bad so we don't try anymore
            } else {
                oldWidth = item.width;
                newWidth = Math.floor(parseFloat(theDialog.widthT.text));
                if ( (newWidth > 30000) || (newWidth < 4) ) {
                    probStr = (probStr + "Value out of range for Width\r");
                    theDialog.widthT.text = "";//empty field if it is bad so we don't try anymore
                } else {
                    if (oldWidth != newWidth) {
                        item.width = newWidth;
                        // if 'recenter' checkbox is checked:
                        if (theDialog.reCenterCheck.value) {
                            thisMuch = (-1 * (oldWidth - newWidth)) *.5;
                            null3DLayer = item.layers.addNull();
                            null3DLayer.threeDLayer = true;
                            doomedNullSrc = null3DLayer.source;
                            null3DLayer.position.setValue([0,0,0]);
                            // Set null3DLayer as parent of all layers that don't have parents.  
                            makeParentLayerOfAllUnparented(item, null3DLayer);
                            //null, axis, amt
                            moveParent(null3DLayer, 0, thisMuch);
                            null3DLayer.remove();
                            doomedNullSrc.remove();
                        }
                    }
                }
            }
        }
        ///// 3- height
        // limit=30000
        if (theDialog.heightT.text != "") {
            if (isNaN(parseFloat(theDialog.heightT.text))) {
                probStr = (probStr + "Not a number value for Height\r");
                theDialog.heightT.text = "";//empty field if it is bad so we don't try anymore
            } else {
                oldHeight = item.height;
                newHeight = Math.floor(parseFloat(theDialog.heightT.text));
                if ( (newHeight > 30000) || (newHeight < 4) ) {
                    probStr = (probStr + "Value out of range for Height\r");
                    theDialog.heightT.text = "";//empty field if it is bad so we don't try anymore
                } else {
                    if (oldHeight != newHeight) {
                        item.height = newHeight;
                        // if 'recenter' checkbox is checked:
                        if (theDialog.reCenterCheck.value) {
                            thisMuch = (-1 * (oldHeight - newHeight)) *.5;
                            null3DLayer = item.layers.addNull();
                            null3DLayer.threeDLayer = true;
                            doomedNullSrc = null3DLayer.source;
                            null3DLayer.position.setValue([0,0,0]);
                            // Set null3DLayer as parent of all layers that don't have parents.  
                            makeParentLayerOfAllUnparented(item, null3DLayer);
                            //null, axis, amt
                            moveParent(null3DLayer, 1, thisMuch);
                            null3DLayer.remove();
                            doomedNullSrc.remove();
                        }
                    }
                }
            }
        }
        //////////////////////////////////////////
        ///// 4- pixel aspect ratio
        if (theDialog.ratioT.text != "") {
            if (isNaN(parseFloat(theDialog.ratioT.text))) {
                probStr = (probStr + "Not a number value for Pixel Aspect Ratio\r");
                theDialog.ratioT.text = "";//empty field if it is bad so we don't try anymore
            } else {
                item.pixelAspect = parseFloat(theDialog.ratioT.text);
            }
        }
        ///// 5- framerate
        // limit = 1-99
        newFR = item.frameRate;
        if (theDialog.frRT.text != "") {
            if (isNaN(parseFloat(theDialog.frRT.text))) {
                probStr = (probStr + "Not a number value for Framerate\r");
                theDialog.frRT.text = "";//empty field if it is bad so we don't try anymore
            } else {
                maybeNewFR = parseFloat(theDialog.frRT.text);
                if ( (maybeNewFR > 99) || (maybeNewFR < 1) ) {
                    probStr = (probStr + "Value out of range for Framerate\r");
                    theDialog.frRT.text = "";//empty field if it is bad so we don't try anymore
                } else {
                    newFR = maybeNewFR;
                    item.frameRate = newFR;
                }
            }
        } else {
            newFR = item.frameRate;
        }
        ///// 6- length
        // limit=323676
        if (theDialog.lenT.text != "") {
            if (isNaN(parseFloat(theDialog.lenT.text))) {
                probStr = (probStr + "Not a number value for Length\r");
                theDialog.lenT.text = "";//empty field if it is bad so we don't try anymore
            } else {
                newDur = parseFloat(theDialog.lenT.text);
                durCalc = newDur/newFR;
                
                if ( (durCalc > 323676) || (durCalc <= 0) ) {
                    probStr = (probStr + "Value out of range for Length\r");
                    theDialog.frRT.text = "";//empty field if it is bad so we don't try anymore
                } else {
                    if (theDialog.layerExtendCheck.value) {
                        // only do this if user is making comp LONGER
                        if (newDur > item.duration) {extendLayers(item, durCalc);}
                    }
                    item.duration = durCalc;
                }
            }
        }
        ///// 7- shutter angle
        if (theDialog.angleT.text != "") {
            if (isNaN(parseFloat(theDialog.angleT.text))) {
                probStr = (probStr + "Not a number value for Shutter Angle\r");
                theDialog.angleT.text = "";//empty field if it is bad so we don't try anymore
            } else {
                newValue = parseFloat(theDialog.angleT.text);
                
                if (newValue > 720) {
                    probStr = (probStr + "Number given for Shutter Angle too high\r");
                    theDialog.angleT.text = "";//empty field if it is bad so we don't try anymore
                } else if (newValue < 0) {
                    probStr = (probStr + "Number given for Shutter Angle too low\r");
                    theDialog.angleT.text = "";//empty field if it is bad so we don't try anymore
                } else {
                    item.shutterAngle = newValue;
                }
            }
        }
        ///// 8- shutter phase
        if (theDialog.phaseT.text != "") {
            if (isNaN(parseFloat(theDialog.phaseT.text))) {
                probStr = (probStr + "Not a number value for Shutter Phase\r");
                theDialog.phaseT.text = "";//empty field if it is bad so we don't try anymore
            } else {
                newValue = parseFloat(theDialog.phaseT.text);
                if (newValue < -360) {
                    probStr = (probStr + "Number given for Shutter Phase too low\r");
                    theDialog.phaseT.text = "";//empty field if it is bad so we don't try anymore
                } else if (newValue > 360) {
                    probStr = (probStr + "Number given for Shutter Phase too high\r");
                    theDialog.phaseT.text = "";//empty field if it is bad so we don't try anymore
                } else {
                    item.shutterPhase = newValue;
                }
            }
        }
        ///// 9- preserve fr
        if (theDialog.doPresFRCheck.value) {
            item.preserveNestedFrameRate = (theDialog.presFRCheck.value);
        }
        ///// 10- preserve rez
        if (theDialog.doPresRezCheck.value) {
            item.preserveNestedResolution = (theDialog.presRezCheck.value);
        }
        ///// 11-3D renderer
        if (theDialog.doRendererCheck.value) {
          //  item.preserveNestedResolution = (theDialog.presRezCheck.value);
          ///rendererOptions = new Array(  ["Classic 3D", "Ray-Traced 3D"]  );
            if (theDialog.rendererPop.selection == 0) {
                 item.renderer = "ADBE Advanced 3d";
                }else{
                 item.renderer = "ADBE Picasso";
                }
            
        }
    
    }
    app.endUndoGroup();
    if (probStr != "") {alert("The following problems were found (these settings were not changed!):\r" + probStr);}
}
function doLinkedEmpty(clickedThing, target) {
    if (clickedThing.value == false) { target.text = ""; }
}
function doLinkedNewText(clickedThing, target, trueText, falseText) {
    if (clickedThing.value == true) {target.text = trueText;}else{target.text = falseText;}
}
function doLinkedEnabled(clickedThing, target) {
    target.enabled = clickedThing.value;
}
function doOppositeEnabled(clickedThing, target) {
    target.enabled = !clickedThing.value;
}