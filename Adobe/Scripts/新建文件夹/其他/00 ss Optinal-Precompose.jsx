/*-------------------------------------
LayerColor-Precompose

Version History
1.0.0 beta  -  Oct 06, 2021
    Initial release
-------------------------------------*/
//______Files Path______
var thisFile = new File(this);
var thisFolderPath = thisFile.path; 
var imagePath = thisFolderPath + "/ss Optional-Precompose Resources";
//______Get user profile & path etc______
var os = $.os;
var app_os =  ( os.indexOf("Win") != -1 )  ?  "Win" : "Mac"
if ( app_os == "Win" ){
    var userProf = $.getenv("USERPROFILE");  
}else{
    var userProf = $.getenv("HOME");
}
var strAccessAlert = "Please allow to access network!\
Go to the\"Edit/Preferences/Scripting & Expressions\" panel and make sure that the \"Allow Scripts to Write Files and Access Network\" is checked."
var resourcePath = userProf +"/Documents/ss Scripts/Optional-Precompose Settings"
if (app.preferences.getPrefAsLong("Main Pref Section", "Pref_SCRIPTING_FILE_NETWORK_SECURITY") != 1){
    app.executeCommand(3131);
}else{
    var resourcePathFolder = new Folder(resourcePath);
    if(!resourcePathFolder.exists){  
        resourcePathFolder.create();
    }
    var settingsFile = new File(resourcePath + "/Optional-Precompose_Settings.txt");
    var nameFile = new File(resourcePath + "/Optional-Precompose_Name.txt");
    settingsFile.encoding = "UTF-8";
    var infoContent = "function getInfo(){\n	var info = {checkLeaveAttr:false, checkTrim:true, checkStartTime:true, checkLabel:true, checkForEach:false, checkForEachName:false, checkOpenComp:false}\n	return info;\n}\ngetInfo();";
    var nameContent = "var loadedName = \" Pre\"";
    if(!settingsFile.exists){
        settingsFile.open("w");
        writeFile(settingsFile, infoContent);
    }
    if(!nameFile.exists){
        nameFile.open("w");
        writeFile(nameFile, nameContent);
    }
}

///////////////////////////////////////////////////////////////////////
//______Main Scripting______
var proj = app.project;
var comp = proj.activeItem;
var slLayers = comp.selectedLayers;
//______Make New Comp Name______
function getPrecompName(target){
    //var compPreName = target + " Pre";
    $.evalFile(nameFile); //loadedName = 
    var compPreName = target + loadedName;
    var reg = new RegExp(compPreName);
    var matchCompArr = [];
    var matchCompArr2 = [];
    //アイテムの中で compPreName が含まれるものを探して配列に入れる
    for(i=1; i<=proj.items.length; i++){
        if(proj.items[i].name.match(compPreName)){
            matchCompArr.push(i);
        }
    }

    //それがコンポジションなら
    //且つ、comp.name + "Pre"以降が整数なら
        //comp.name + "Pre"を""(空白)にreplaceする。それが整数なら。
    //配列2にそのコンポ名を入れる
    for(i=0; i<matchCompArr.length; i++){
        var curItem = proj.item(matchCompArr[i]);
        var curItemRepName = curItem.name.replace(reg, "");
        if(curItem instanceof CompItem && isNumber(curItemRepName)){
            matchCompArr2.push(curItemRepName);
        }
    }

    //配列2の一番大きい数+1->プリコンポ名に入れる数値
    if(matchCompArr2.length>0){
        precompNum = Number(matchCompArr2[matchCompArr2.length-1]) + 1;
        if(precompNum<10){
            precompNum = "0"+precompNum;
        }
        defPrecompName = compPreName + precompNum;
    }else{
        defPrecompName = compPreName + "01";
    }

    return [defPrecompName, compPreName];
}
//______Get New Comp(Precomp) Name______
try{
    //何もレイヤー選択しないで発動させた時にエラーおこるのでtry
    if(slLayers.length>1){
        var getPrecompName = getPrecompName(comp.name);
    }else if(slLayers.length = 1){
        var getPrecompName = getPrecompName(slLayers[0].name);
    }
}catch(e){
}
//______Main Scripting______
function precompWin(){
    app.beginUndoGroup("lcPrecomp");
    
    //
    var comp = app.project.activeItem;
    var slLayers = comp.selectedLayers;
    var labelsArr = [];
    var compareArr = [0];
    var maxID;

    if(slLayers.length>=1){
        //_______Window_______
        var loadResult = $.evalFile(settingsFile);   //Load Previous Value from Settings File
        var precompWin = new Window("dialog", "预合成选项", [0, 0, 430, 470]);
        var group1 = precompWin.add("Group",[0, 10, 430, 140]);
        var group2 = precompWin.add("Group",[0, 144, 430, 220]);
        var group3 = precompWin.add("Group",[0, 210, 430, 310]);
        var headText = precompWin.add("staticText", [20, 20, 430, 40], "新合成名称:");
        var precompName = getPrecompName[0];
        var nameEdit = precompWin.add("editText", [20, 20, 280, 40]+[126,0,126,0], precompName);
        nameEdit.active = true;
        var stText1 = group1.add("statictext", [20, 70, 610, 90]-[0,28,0,28], "转移属性");
        var checkLeaveAttr = group1.add("radiobutton", [20, 70, 610, 90]-[0,12,0,12]+[0,6,0,6], "保留所有属性在 \"" + comp.name + "\"" + "合成中");
        var checkMoveAttr = group1.add("radiobutton", [20, 100, 610, 120]-[0,20,0,20]+[0,6,0,6], "移动所有属性到新合成");
        var checkTrim = group1.add("checkbox", [20, 100, 610, 120]+[16,16,16,16]-[0,16,0,16]+[0,6,0,6], "基于所选图层时间更改合成持续时间");
        var stText2 = group2.add("statictext", [20, 0, 610, 20], "起始时间");
        var checkStartTime = group2.add("radiobutton", [20, 100, 610, 120]+[0,16,0,16]-[0,12,0,12]+[0,28,0,28]-[0,110,0,110], "起始时间设置为0");
        var checkStartTime2 = group2.add("radiobutton", [20, 100, 610, 120]+[0,16,0,16]-[0,12,0,12]+[0,28,0,28]+[0,22,0,22]-[0,110,0,110], "起始时间设置为所选图层的起始时间");
        var stText3 = group3.add("statictext", [20, 8, 610, 28], "标签");
        var checkLabel = group3.add("radiobutton", [20, 100, 610, 120]+[0,16,0,16]+[0,38,0,38]+[0,30,0,30]-[0,152,0,152], "使用所选图层的标签颜色");
        var checkLabel2 = group3.add("radiobutton", [20, 100, 610, 120]+[0,16,0,16]+[0,38,0,38]+[0,30,0,30]+[0,22,0,22]-[0,152,0,152], "使用默认的合成标签颜色");
        var stText4 = precompWin.add("statictext", [20, 100, 610, 120]+[0,16,0,16]+[0,38,0,38]+[0,30,0,30]+[0,108,0,108], "批量");
        var checkForEach =  precompWin.add("checkbox", [20, 100, 610, 120]+[0,16,0,16]+[0,38,0,38]+[0,30,0,30]+[0,134,0,134], "批量预合成");
        var checkForEachName =  precompWin.add("checkbox", [20, 100, 610, 120]+[0,16,0,16]+[0,38,0,38]+[0,30,0,30]+[16,156,16,156], "名称根据选择图层自动更改");
        var checkOpenComp = precompWin.add("checkbox", [20, 100, 610, 120]+[0,16,0,16]+[0,38,0,38]+[0,30,0,30]+[0,190,0,190], "打开新合成");
        var okButton = precompWin.add("Button", [340, 395, 390, 415]-[178,-10,178,-10]+[0,20,0,24], "确定");
        var cancelButton = precompWin.add("Button", [340, 395, 390, 415]+[70,0,70,0]-[182,-10,182,-10]+[0,20,0,24], "取消");
        var settingButton = precompWin.add("iconbutton", [340, 395, 390, 415]+[70,0,70,0]-[180,-10,180,-10]+[149,0,119,0]+[-2,20,2,24]+[6,0,6,0], imagePath + "/Settings_Icon.png");
        precompWin.add("Panel", [20, 100, 406, 100]+[0,38,0,38]);   //Draw Line
        precompWin.add("Panel", [20, 100, 406, 100]+[0,112,0,112]);   //Draw Line
        precompWin.add("Panel", [20, 100, 406, 100]+[0,186,0,186]);   //Draw Line
        precompWin.add("Panel", [20, 100, 406, 100]+[0,260,0,260]);   //Draw Line
        precompWin.add("Panel", [20, 100, 406, 100]+[0,300,0,300]);   //Draw Line
      
        var yellow = precompWin.graphics.newPen(win.graphics.BrushType.SOLID_COLOR, [1,0.85,0], 1);
        stText1.graphics.foregroundColor = yellow;
        stText2.graphics.foregroundColor = yellow;
        stText3.graphics.foregroundColor = yellow;
        stText4.graphics.foregroundColor = yellow;
        checkLeaveAttr.value = false;    

        //_______Road Previous Value_______
        if(loadResult.checkLeaveAttr){
            checkLeaveAttr.value = true;
            checkMoveAttr.value = false;
        }else{
            checkLeaveAttr.value = false;
            checkMoveAttr.value = true;
        }
        if(loadResult.checkTrim){
            checkTrim.value = true;
        }else{
            checkTrim.value = false;
        }
        if(loadResult.checkStartTime){
            checkStartTime.value = true;
            checkStartTime2.value = false;
        }else{
            checkStartTime.value = false;
            checkStartTime2.value = true;
        }
        if(loadResult.checkLabel){
            checkLabel.value = true;
            checkLabel2.value = false;
        }else{
            checkLabel.value = false;
            checkLabel2.value = true;
        }
        if(loadResult.checkForEach){
            checkForEach.value = true;
        }else{
            checkForEach.value = false;
        }
        if(loadResult.checkForEachName){
            checkForEachName.value = true;
        }else{
            checkForEachName.value = false;
        }
        if(loadResult.checkOpenComp){
            checkOpenComp.value = true;
        }else{
            checkOpenComp.value = false;
        }

        //_______onClick Event etc_______
        checkLeaveAttr.onClick = function(){
            if(checkLeaveAttr.value){
                checkTrim.enabled = false;
            }
        }
        checkMoveAttr.onClick = function(){
            if(!checkLeaveAttr.value){
                checkTrim.enabled = true;
            }
        }
        if(slLayers.length>1 && !checkForEach.value){
            checkLeaveAttr.enabled = false;
            checkMoveAttr.value = true;
        }else{
            checkLeaveAttr.enabled = true;
        }
        if(!checkForEach.value){
            checkForEachName.enabled = false;
        }
        checkForEach.onClick = function(){
            if(slLayers.length>1 && !checkForEach.value){
                checkLeaveAttr.enabled = false;
            }else{
                checkLeaveAttr.enabled = true;
            }
            if(!checkForEach.value){
                checkForEachName.enabled = false;
            }else{
                checkTrim.enabled = true;
                checkForEachName.enabled = true;
            }

        }

        //_______Put Selected Layers in Array_______
        var layerList = [];
        for(i=0; i<slLayers.length; i++){
            layerList.push(slLayers[i].index);
        }

        okButton.onClick = function lcPrecompNCloseWin(){
            if(checkLabel.value && !checkForEach.value){
                var labelNum = getLayerLabel()[0];
            }else if(checkLabel.value && checkForEach.value){
                var labelNum = [];
                for(i=0; i<slLayers.length; i++){
                    labelNum.push(slLayers[i].label);
                }
            }else{
                var labelNum = comp.label;
            }
 
            //Execute Precompose
            if(!checkForEach.value){
                //Get Inpoint/OutPoint from Selected Layers
                if(checkTrim.value && !checkLeaveAttr.value){
                    var inOut = findInOut();
                }      
                //Move/Leave Attributes
                if(checkLeaveAttr.value){
                    comp.layers.precompose(layerList, nameEdit.text, false);
                }else{
                    comp.layers.precompose(layerList, nameEdit.text, true);
                }
                var slLayersRe = comp.selectedLayers;
                //Trim Precomposition Or Not
                if(checkTrim.value && !checkLeaveAttr.value){
                    trimPrecomp(slLayersRe[0],inOut[0],inOut[1]);
                }
                //Precomp's Start Time:0
                if(checkStartTime.value && !checkLeaveAttr.value){
                    slLayersRe[0].source.displayStartTime = 0;
                }
                slLayersRe[0].label = labelNum;
                slLayersRe[0].source.name = precompName;
            }else{
                //レイヤーそれぞれでプリコンポ作る場合
                var precompArr = [];
                var eachNameBase = Number(getPrecompName[0].slice(-2));                
                for(i=0; i<layerList.length; i++){
                    precompArr.push(layerList[i]);
                    var eachNameNum = eachNameBase+i;
                    if(eachNameNum<10){
                        var eachName = getPrecompName[1] +"0"+ eachNameNum;
                    }else{
                        var eachName = getPrecompName[1] + eachNameNum;
                    }
                    if(checkLeaveAttr.value){
                        if(checkForEachName.value){
                            comp.layers.precompose(precompArr, comp.layer(layerList[i]).name, false);
                        }else{
                            comp.layers.precompose(precompArr, eachName, false);
                        }
                    }else{
                        if(checkForEachName.value){
                            comp.layers.precompose(precompArr, comp.layer(layerList[i]).name, true);
                        }else{
                            comp.layers.precompose(precompArr, eachName, true);
                        }
                    }
                    precompArr.length = 0;
                }
                app.executeCommand(23);
                var slLayersRe = comp.selectedLayers;
                for(i=0; i<slLayersRe.length; i++){
                    if(checkTrim.value && !checkLeaveAttr.value){
                        var inOut = [];
                        var inPt = slLayersRe[i].source.layer(1).inPoint;
                        var outPt = slLayersRe[i].source.layer(1).outPoint;
                        trimPrecomp(slLayersRe[i],inPt,outPt);
                    }
                }
                for(i=0; i<slLayersRe.length; i++){
                    if(checkStartTime.value && !checkLeaveAttr.value){
                        slLayersRe[i].source.displayStartTime = 0;
                    }
                }
                for(i=0; i<slLayersRe.length; i++){
                    slLayersRe[i].label = labelNum[i];
                }
            }
            //Open New Comp or Not
            if(checkOpenComp.value && checkOpenComp.enabled){
                slLayersRe[0].source.openInViewer();
            }

            //Rewrite Settings File
            if(checkLeaveAttr.value){
                var editInfoContent1 = infoContent.replace(/checkLeaveAttr:false/g, "checkLeaveAttr:true");
            }else{
                var editInfoContent1 = infoContent.replace(/checkLeaveAttr:true/g, "checkLeaveAttr:false");
            }
            if(checkTrim.value){
                var editInfoContent2 = editInfoContent1.replace(/checkTrim:false/g, "checkTrim:true");
            }else{
                var editInfoContent2 = editInfoContent1.replace(/checkTrim:true/g, "checkTrim:false");
            }
            if(checkStartTime.value){
                var editInfoContent3 = editInfoContent2.replace(/checkStartTime:false/g, "checkStartTime:true");
            }else{
                var editInfoContent3 = editInfoContent2.replace(/checkStartTime:true/g, "checkStartTime:false");
            }
            if(checkLabel.value){
                var editInfoContent4 = editInfoContent3.replace(/checkLabel:false/g, "checkLabel:true");
            }else{
                var editInfoContent4 = editInfoContent3.replace(/checkLabel:true/g, "checkLabel:false");
            }
            /*
            //For Eachの設定が残ってると思わぬところでFor Eachやってしまってウザいので、設定上書きしない
            if(checkForEach.value){
                var editInfoContent5 = editInfoContent4.replace(/checkForEach:false/g, "checkForEach:true");
            }else{
                var editInfoContent5 = editInfoContent4.replace(/checkForEach:true/g, "checkForEach:false");
            }
            */
            if(checkForEachName.value){
                var editInfoContent6 = editInfoContent4.replace(/checkForEachName:false/g, "checkForEachName:true");
            }else{
                var editInfoContent6 = editInfoContent4.replace(/checkForEachName:true/g, "checkForEachName:false");
            }
            if(checkOpenComp.value){
                var editInfoContent7 = editInfoContent6.replace(/checkOpenComp:false/g, "checkOpenComp:true");
            }else{
                var editInfoContent7 = editInfoContent6.replace(/checkOpenComp:true/g, "checkOpenComp:false");
            }
            writeFile(settingsFile, editInfoContent7);

            //Close Window
            precompWin.close();
        }
        cancelButton.onClick = function closeWin(){
            precompWin.close();
        }
        //______Settings Panel______
        settingButton.onClick = function(){
            precompWin.close();
            
            if (app.preferences.getPrefAsLong("Main Pref Section", "Pref_SCRIPTING_FILE_NETWORK_SECURITY") != 1){
                alert(strAccessAlert);
                app.executeCommand(2359);
            }else{
                $.evalFile(nameFile);   // ex) "var loadedName = \" Pre\"";
                var winRect = [0, 0, 460, 138];
                var settingWin = new Window("palette", "额外设置", winRect);
                settingWin.add("statictext", [30, 16, 450, 36], "默认新合成名称:");
                settingWin.add("statictext", [30, 20, 450, 40] + [0,28,0,28], "当前合成名称 + ");
                var editName = settingWin.add("edittext", [184, 20, 370, 40] + [0,28,0,28], "" + loadedName);
                settingWin.add("statictext", [374, 20, 460, 40] + [0,28,0,28], " + 数字");
                var btnRect = [0,0,64,22];
                var okBtn = settingWin.add("Button", [winRect[2]/2-btnRect[2]/2, winRect[3]-btnRect[3]-16, winRect[2]/2+btnRect[2]/2, winRect[3]-16], "OK");

                settingWin.center();
                settingWin.show();
            }
            okBtn.onClick = function closePanel(){              
                writeFile(nameFile, "var loadedName = \"" + editName.text + "\";");
                settingWin.close();
            }
        }

        precompWin.center();
        precompWin.show();
    }

    app.endUndoGroup();
}
precompWin();
/////////////////////////////////////////////////////////////////////

//______Write settings file______
function writeFile(fileObj, fileContent, encoding) {
    encoding = encoding || "utf-8";
    fileObj = (fileObj instanceof File) ? fileObj : new File(fileObj);
    var parentFolder = fileObj.parent;
    if (!parentFolder.exists && !parentFolder.create())
        throw new Error("Cannot create file in path " + fileObj.fsName);
    fileObj.encoding = encoding;
    fileObj.open("w");
    fileObj.write(fileContent);
    fileObj.close();
    return fileObj;
}
//______数値かどうかチェック______
function isNumber(numVal){
  // チェック条件パターン
  var pattern = /^\d*$/;
  // 数値チェック
  return pattern.test(numVal);
}
//______Sort array______
function sortArr(arr){
    arr.sort(function(a,b){
        if( a < b ) return -1;
        if( a > b ) return 1;
        return 0;
    });
}
//______Find in-point/out-point______
function findInOut(){
    var inPArr = [];
    var outPArr = [];
    var inOut = [];
    var comp = app.project.activeItem;
    var slLayers = comp.selectedLayers;
    for(i=0; i<slLayers.length; i++){
        inP = slLayers[i].inPoint;
        inPArr.push(inP);
        outP = slLayers[i].outPoint;
        outPArr.push(outP);
    }
    sortArr(inPArr);
    sortArr(outPArr);
    inOut.push(inPArr[0]);
    inOut.push(outPArr[outPArr.length-1]);
    return inOut;
}
function findInOutOneLayer(){
    var inOut = [];
    inOut.push(target.inPoint);
    inOut.push(target.outPoint);
    return inOut;
}

function trimPrecomp(target,inP,outP){
    target.source.displayStartTime = inP;
    target.source.duration = outP-inP;
    for(j=1; j<=target.source.numLayers; j++){
        target.source.layer(j).startTime = target.source.layer(j).startTime - inP;
    }
    target.startTime = inP;
}
//______Get Label Color from the Selected Layers______
function getLayerLabel(){
    //選択レイヤーが1枚の時はそのレイヤーのラベル色に/選択レイヤーが一枚以上の場合は一番多いラベル色に
    var comp = app.project.activeItem;
    var slLayers = comp.selectedLayers;
    var labelsArr = [];
    var compareArr = [0];
    var tempArr = [];
    var maxVal = 1;
    if(slLayers.length != 1){
        //まず選択レイヤー全てのラベルカラーを配列に入れる
        for(i=0; i<slLayers.length; i++){
            labelsArr.push(slLayers[i].label);
        }
        //ソートする
        sortArr(labelsArr);
        //カラーごとに何レイヤー分あるか調べる
        for(i=0; i<labelsArr.length-1; i++){
            if(labelsArr[i] - labelsArr[i+1] != 0){
                compareArr.push(i+1);
            }
        }
        compareArr.push(labelsArr.length);
        
        //一番多く存在しているカラーを調べる
        for(i=0; i<compareArr.length-1; i++){
            if(maxVal < compareArr[i+1]-compareArr[i]){
                maxVal = compareArr[i+1]-compareArr[i];
                maxID = labelsArr[compareArr[i]];
            }
        }
        for(i=0; i<compareArr.length-2; i++){
            if(compareArr[i+1]-compareArr[i] == compareArr[i+2]-compareArr[i+1]){
                tempArr.push(i);
            }
        }
        
        //他と比較して多く使われているカラーがある場合はその色に。
        if(maxVal != 1 && tempArr.length != compareArr.length-2){
            var labelNum = maxID;
        }else{
            var labelNum = slLayers[0].label;
        }

    }else{
        var labelNum = slLayers[0].label;
    }
    return [labelNum,maxVal];
}