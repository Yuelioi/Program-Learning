    var scriptName = "Yueli";
    var scriptPath = File($.fileName).parent.fsName;  
    var lang = app.isoLanguage;
    var CN = true;
    if(lang == "zh_CN")
    {
        CN = true;
    }
    else
    {
        CN = false;
    }

/****************************************/

/*****************创建UI*****************/
function buildUI(thisObj) 
{ 
    var matchname = [
    "ADBE AUX CHANNEL EXTRACT",
    "ADBE DEPTH MATTE",
    "ADBE DEPTH FIELD",
    "EXtractoR",
    "ADBE FOG_3D",
    "ADBE ID MATTE",
    "IDentifier",                           //3D Channe
    ];
//////////////////////////////////////////////////////////////matchname/////////////////////////////////////////////////////////////////////
    var displaynameen = [
    "3D Channel Extract",
    "Depth Matte",
    "Depth of Field",
    "EXtractoR",
    "Fog 3D",
    "ID Matte",
    "IDentifier",                           //3D Channe
    ];
//////////////////////////////////////////////////////////////displaynameen/////////////////////////////////////////////////////////////////////    
    
    var displaynamecn = [
    "3D 通道提取",
    "深度遮罩",
    "场深度",
    "EXtractoR",
    "雾3D",
    "ID遮罩",
    "IDentifier",                           //3D Channe
    ];
//////////////////////////////////////////////////////////////displaynamecn/////////////////////////////////////////////////////////////////////


    var logo= createResourceFile("logo","\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\u0096\x00\x00\x00(\b\x06\x00\x00\x00\x1C\u00C1\x03\u00E7\x00\x00\x03\u00EFIDATx\u009C\u00ED\u009C=O*A\x14\u0086\x0F*\u00E2G\u0088\u00A1 \u00C4\u00C6\u00DE\x0FbbH46\u00FC\x04\x0B*\x7F\u0080\u0085\u00FA\x0F\u008C\u0095\u00AD\u0089\x05\u00FE\x01\x13{\x13\x1B\x13CB+\u0085\u00B5\u008D\u00BD\u00C6\x020j\u00FCVn\u00DE!\n\u00F7\u00B2\u00B3\u00EC\u00DD\u00EC\u00CE\u009C\x19\u00E6I\b,.;\x0B\u00FBr\u00CE\u0099\u00D73$\n\u0085B\u008B,\u00E6\u00FB\u00FB\u009B^__m~\u008B\u0081\x19\x1B\x1B\u00A3\u00A1\u00A1!%c\u00A9\x19E\x13\u00ADV\u008B\u00DE\u00DE\u00DEl~\u008B\u0081I\u00A5R\u00CADE6\x0B\x0B\u00A2B\u00A4\u00C2\u00FD\u00A03::J\u00C3\u00C3\u00C3J?\x05k\u0085\u00F5\u00FE\u00FE\u00EEDED###\u00E2\u00A6\x1A+\u0085\x05Q}}}18\x13\u00BD J!Z\u00E9\u00C0:a}||\u00D0\u00E7\u00E7'\u00833\u00D1\x0B\u00EA)\u00D4U\u00BA\u00B0JX\x10\x14\u00845\u00E8$\x12\t\u00AD\u00A2\"\u009B\u0084\u0085\u00D4\u0087\x148\u00E8\u00FC\u0088\n\u00F7:\u00B1BX\u00F0\u00AA\u009C\u00A8\u00DA\u00A0\u00A6Ri+\u00C8P?]\u0088\u0098\x1F\u00AFJ6\x03,\x16\u008B\u00B4\u00BD\u00BD\u00DDc\u0092&\u0093I:??\u00A7\u00A3\u00A3#\u00B1\u00BD\u00BB\u00BBK\u00B3\u00B3\u00B3\x7F\x15\u00FD\u00F8\u00D6c{gg\u0087nnn\u00C4sSSStpp .`\u00F7\u00988\u00DE\u00C5\u00C5\x05\u0095\u00CBem\u009F\u0085\x0E[A\u0086\u00D1\u00C2\u00EA'*\u0090\u00CDfi~~\u00DE\u00F3owww\u00BF\u008F\x17\x16\x16(\u009F\u00CF{\u00EE\u0097N\u00A7\x7F\x1F\u00E3\u00E2\u00AD\u00AC\u00ACx\u00EEw\x7F\x7F\u00FF\x1Fg\x1F-\x10\u00B6\x0E[A\u0086\u00D1\u00A9\x10\u00E9\x0Fi\u00D0\x0F?\u00DB\u00A1;\u008A\u00C9\u008A~\x1C\u00BF{\f?7_W:\u0086\u00A0 ,N\x18+,\u00E7U\u00B5\u00D1\u00E9U\u00F9a\u00A4\u00B0TzU\u0088P\\\x1D|\x14\u00E9\x1CEE&\n\u00CByUm\u00B8\u00D8\n2\u008C\x12\u0096\u00B3\x15:p\x16\x15\u0099$,\u00D7\x02\u00D3Au\x0BL\x18\u008C\x10\u0096k\u0081\u00E9\u00C0\u00C9\u00AB\u00F2\u00C3\ba\u00F5\u00F3\u00AA\x06\x05n^\u0095\x1F\u00EC\u0085\x05Q\u00F5\u00F3\u00AA\x06\x01D)n^\u0095\x1F\u00AC\u0085\u0085\u00D9\u009F\u00F3\u00AA\u00F4\u00B7\u00C0\u0084\u0081m\\\u008D\u00CAV\u00E0\u0092B!\u008E\u0099\u0099\x19!\u0090\u00DB\u00DB[zxx\b\u00F4:\x0E-0a`)\u00AC([`&&&\"9NX\u00F0?\u00C8\u00F5\u00F5u\u009A\u009E\u009E\u00A6\u00B9\u00B99\u0091\u00CE\u00F6\u00F6\u00F6\u00E8\u00F4\u00F4\u00B4\u00EF\x11!*\u00AC\u00AC\u00E1l+\u00C8`',\u00D4SQ\u00DA\n///\"j\u00A9\u00BE8\u0088P[[[\u00B4\u00B1\u00B1\u00D1Sp\x07\u00AD\u00950\x034QT\u00C4\u00AD\u00C6\u008A\u00C3\u00AB\u00AAT*\u00F4\u00F8\u00F8\x18\u00E91\u0083\u00B0\u00B8\u00B8H\u009B\u009B\u009B\u009E\u00B3\u00B8 \u00E9\u00D9\x14[A\x06\x1Ba\x05i\u0081\t\u00C3\u00D3\u00D3\x13\u00ED\u00EF\u00EFG:\u00B3\u0094\u0099\u0093\u00DD\u00D1emmM\u00FA\u00FA~Q\u00C8$[A\x06\u009B\u00B3\x0F\u00D2\x02\x13\u0096\u0093\u0093\x13\u0091\x12WWWiyy\u0099r\u00B9\u009C\x10G\u00D8\u00F1P\x03zE\u0093\u00EE\x19\u00EC\u00E4\u00E4\u00A4\u00F4\u00F8~_\x1E\u008E-0a`\u00B1\u00C4\x1E\u00A2R\u00D5\u00AD\u0090\u00C9dh||\\D\r\u0088\u00AD\u00D1h\u0088\u00E7\u008F\u008F\u008Fiii\u00A9g\x7F\u0088\u00A5T*\u00D1\u00F5\u00F5\u00B5\u00D8\u0086\u00A0 L\u00AF\u00A8\u00D3}<\u008C#\u009B84\u009BMz~~\u00EEy\x1E\u00C76q\x06\u00E8\u0085\u00F6\u0088\u00A5z\u00B9\x16.*nA\u0081\u00B0\u00EA\u00F5\u00FA\u00EF\u00DE\u00D8\u00FEiS\u008Er\x1C\u00CE-0a\u00D0Zc\u0099\u00D0\x02\u0083\u00B4\x15\u00B7\u00F0\u00B9\u00B7\u00C0\u0084A\u009B\u00B0LY\u00AEU\u00AB\u00D5D\u008A\u008B\x0B\x1BEE\u00BA\u0084\u0085(`J_\x15V\u00F1\u00C4\x19U\u00B9,\u00D7\u008A\x1A\u00E55\x16\u00D7\x16\u0098\x7F\u00A7\u00F7H\x7F\u0087\u0087\u0087tyy\x19\u00DB\u0098\u00A6{U~(\x17\x16\u00D7\x16\x18\x14\u00E4\u0098\u00C9\u00C1\"\u00A8V\u00ABtvvFWWW\u00B1\u008Dg\u0083W\u00E5\u0087R\u00BB\x01\u00A2r\u00DD\n\u00ED\u00E8h\u00D3\f\u00D0\x0Be\u00C9\u00DD-\u00D7jc\u009B\u00AD C\u0089\u00B0P\u00AF\u00B8\u009F\x162\u00B7\x05&\f\u00B1\x0B\u00CB\u00FD\nL\x1B\u0093[`\u00C2\x10\u00AB\u00B0\u00A2n\u00811\x19\x1B\u00BD*?b\x13\u0096[\u00AE\u00D5\u00C1\u0084\u00E5Z\u0091BD\x7F\x00\u0094=\u00DF\u00F1#\f\u00E8G\x00\x00\x00\x00IEND\u00AEB`\u0082",getUserDataFolder());
    var w = thisObj instanceof Panel ? thisObj : new Window("dialog", "Yueli", undefined, {resizeable: true,});
    w.orientation = "row";
    w.alignment = ["fill","fill"];
    w.alignChildrent = ["fill","fill"];
    var top = 5;
    var Lpanel = w.add ("group",undefined);
    Lpanel.orientation = "column";
    Lpanel.alignment =["fill","fill"];
    Lpanel.alignChildren = ["fill","fill"];
    var Rpanel = w.add ("group", [260,0,410,300]);
    var text1 = Lpanel.add ("edittext", undefined, "", {multiline: true, scrolling: true});
    text1.active = false;
    
    Rpanel.orientation = "column";
    Rpanel.alignment = ["right","fill"];
    Rpanel.alignChildren = ["right","top"];
    var web = Rpanel.add ("iconbutton", [5,top,145,top+40], logo); 
    var entry = Rpanel.add ("edittext", [5, top+45, 145, top+67]);
    entry.active = true;
    var list = Rpanel.add ("listbox", [5, top+72, 145, 260], displaynameen, {scrolling: true});
    var ef = Rpanel.add ("button", [5,270,145,300], "Effect Information");
    //var Rzone = Rpanel.add ("panel", [0,0,200,300]);
    list.selection = 0;
    entry.onChanging = function ()
    {
        var temp = this.text;
        if (temp.length>0){
            list.removeAll ();
        for (var i = 0; i < displaynameen.length; i++)
            if (displaynameen[i].toLowerCase().indexOf (temp)!= -1)
            list.add ("item", displaynameen[i]);
            }
        else {
            for (var i = 0; i < displaynameen.length; i++)
            list.add ("item", displaynameen[i]);
            
        }
        if (list.items.length > 0)
            list.selection = 0;
    }

   /* entry.onChange = function () 
    {
        w.close (1)
    }*/
    
    web.onClick = visityueli;         //////////////////////////////访问网页
    
    
    ef.onClick = function()
    {
        var mycomp = getActiveComp();
        var mylayers = getSelectedLayers(mycomp);
        var myprops = getSelectedProperties(mylayers[0]);
        var selecteffect = myprops[0].matchName;
        for(i=0;i<matchname.length;i++)
        {
            if(matchname[i]==selecteffect)
            {
                searchname = displaynameen[i];
                textupdate(searchname);
                break;
            };
        } 
     }
    
        list.onDoubleClick = function()
     {
        app.beginUndoGroup("effects");
        textupdate(list.selection.text);
        effectset(list.selection.text);
        app.endUndoGroup();
     }
 function textupdate(name)
{
        if(name==displaynameen[0]||name==displaynamecn[0])
                {
                    text1.text = "3D Channel - 3D 通道"+"\n"+
                    " * 3D Chanel Extract - 3D 通道提取"+"\n"+
                    " * Black Point - 黑场"+"\n"+
                    " * White Point - 白场 "+"\n"+
                    " * Anti-alias - 消除锯齿"+"\n"+
                    " * Clamp Output - 固定输出"+"\n"+
                    " * Invert Depth Map - 反转景深映射";
                };
            
        if(name==displaynameen[1]||name==displaynamecn[1])
                {
                    text1.text = "3D Channel - 3D 通道"+"\n"+
                    " * Depth - 深度"+"\n"+
                    " * Feather - 羽化"+"\n"+ 
                    " * Invert - 反转";
                };  
}

function effectset(diaplayname)
{
    var mycomp = getActiveComp();
    var mylayers = getSelectedLayers(mycomp);
    for(i = 0;i<matchname.length;i++)
    {
        if(diaplayname==displaynameen[i]||diaplayname==displaynamecn[i])
        {
            for (var j = 0; j < mylayers.length;j++) 
            {
                mylayers[j].Effects.addProperty(matchname[i]);
            }
        break;
        };
    }
}

     w.layout.layout(true);
	w.layout.resize();
	w.onResizing = w.onResize = function () 
    {
        var width = w.windowBounds.width;
        var height = w.windowBounds.height; 
        list.size = [140,height - 140];
       // text1.bounds = [0,0,width-165,height-20];
        //ef.location = [0,height-20];
        this.layout.resize();
     }
    return w;
}



/****************************************/


function  visityueli() {
                if (isSecurityPrefSet()) {
                    openURL("https://www.yuelili.com/en-ch/effect_en2zh2/.html");
                } else {
                    alertNoAcess();
                }
            }

    function openURL(url) {
            if ($.os.indexOf("Windows") != -1) {
                system.callSystem("cmd /c start \"q\" \"" + url + "\"")
            } else {
                var cmd = "open \"" + url + "\"";
                system.callSystem(cmd);
            }
        }

 function getOption(sectionTag, keyTag) {
        var optionValue = true;
        if (app.settings.haveSetting(sectionTag, keyTag)) {
            var optionValue = app.settings.getSetting(sectionTag, keyTag);
            switch (optionValue.toLowerCase()) {
                case "false":
                    optionValue = false;
                    break;
                case "true":
                    optionValue = true;
                    break;
            }
        } else {
                        optionValue = true;
                   }
        return optionValue;
    }




/*****************main*****************/
var w = buildUI(this);

if(w.toString() == "[object Panel]") 
{
    w;
} 
    else 
    {
    w.show();
    }
/****************************************/



/*****************创建资源*****************/
function getUserDataFolder() {
        var userDataFolder = Folder.userData;
        var aescriptsFolder = Folder(userDataFolder.toString() + "/Yuelili.com");
        if (!aescriptsFolder.exists) {
            var checkFolder = aescriptsFolder.create();
            if (!checkFolder) {
                if(CN)
                {
                alert("创建出错");
                }
                else
                {
                alert("Error creating ");
                }
                aescriptsFolder = Folder.temp;
            }
        }
        return aescriptsFolder.toString();
    }

    function createResourceFile(filename, binaryString, resourceFolder) {
        var myFile = new File(resourceFolder + "/" + filename+".png");
        if (!File(myFile).exists) {
            if (!isSecurityPrefSet()) {
                if(CN)
                {
                alert('此脚本需要访问权限才能写入文件。转到应用程序首选项的“常规”面板，确保选中“允许脚本写入文件和访问网络”。');
                }
                else
                {
                alert("This script requires access to write files. Go to the  General  panel of the application preferences and make sure  Allow Scripts to Write Files and Access Network  is checked.");
                }
                try {
                    app.executeCommand(2359);//////General... 
                } catch (e) {
                    alert(e);
                }
                if (!isSecurityPrefSet()) {
                    return null;
                }
            }
            myFile.encoding = "BINARY";
            myFile.open("w");
            myFile.write(binaryString);
            myFile.close();
        }
        return myFile;
    }

    function isSecurityPrefSet() {
        try {
            var securitySetting = app.preferences.getPrefAsLong("Main Pref Section", "Pref_SCRIPTING_FILE_NETWORK_SECURITY");
            return securitySetting == 1;
        } catch (e) {
            return securitySetting = 1;
        }
    }


/*****************各种获得数据及判断*****************/

function getselectproptieswithoutpath(dosomething) 
{
    var mycomp = getActiveComp();
    var mylayers = getSelectedLayers(mycomp);
    for (var i = 0; i < mylayers.length; i += 1) 
    {
        var myprops = getSelectedProperties(mylayers[i]);
        if (myprops != null) 
        {
            var myprops = removeProps(myprops);
            for (var j = 0; j < myprops.length; j += 1) 
            {
                if(myprops[j].canSetExpression)
                {
                removeEffect(mylayers[i], myprops[j]);
                dosomething(myprops[j]);
                }
            }
        };
    }
}


function getselectpropties(dosomething) 
{
    var mycomp = getActiveComp();
    var mylayers = getSelectedLayers(mycomp);
    for (var i = 0; i < mylayers.length; i += 1) 
    {
        var myprops = getSelectedProperties(mylayers[i]);
        if (myprops != null) 
        {
            for (var j = 0; j < myprops.length; j += 1) 
            {
                if(myprops[j].canSetExpression)
                {
                return dosomething(myprops[j]);
                };
            }
        }; 
    }
}

function getselectproptiesnoreturn(dosomething) 
{
    var mycomp = getActiveComp();
    var mylayers = getSelectedLayers(mycomp);
    for (var i = 0; i < mylayers.length; i += 1) 
    {
        var myprops = getSelectedProperties(mylayers[i]);
        if (myprops != null) 
        {
            for (var j = 0; j < myprops.length; j += 1) 
            {
                if(myprops[j].canSetExpression)
                {
                 dosomething(myprops[j]);
                };
            }
        }; 
    }
}


function getActiveComp() 
{
    var theComp = app.project.activeItem;
    if (theComp == undefined) 
    {
        if(CN)
        {
        alert( "错误: 请选择一个合成。");
        }
        else
        {
        alert( "Error: Please select a composition.");
        }
        return null;
    }
    return theComp;
}


function getSelectedLayers(targetComp) 
{
    var targetLayers = targetComp.selectedLayers;
    return targetLayers;
}


function createNull(targetComp) 
{
    return targetComp.layers.addNull();
}


function getSelectedProperties(targetLayer) 
{
    var props = targetLayer.selectedProperties;
    if (props.length < 1) 
    {
        return null;
    }
    return props;
}


function forEachLayer(targetLayerArray, doSomething) 
{
    var ii = targetLayerArray.length;
    for (var i = 0; i < ii; i++) 
    {
        doSomething(targetLayerArray[i]);
    }
}


function forEachProperty(targetProps, doSomething) 
{
    var ii = targetProps.length;
    for (var i = 0;i < ii; i++) 
    {
        doSomething(targetProps[i]);
    }
}


function forEachEffect(targetLayer, doSomething) 
{
    var ii = targetLayer.property("ADBE Effect Parade").numProperties;
    for (var i = 1;i <= ii; i++) 
    {
        doSomething(targetLayer.property("ADBE Effect Parade").property(i));
    }
}


function matchMatchName(targetEffect, matchNameString) 
{
    if (targetEffect != null && targetEffect.matchName === matchNameString) 
    {
        return targetEffect;
    } else {
        return null;
    }
}






function removeProps(props) 
{
    propsLen = props.length;
    for (var j = 0; j < props.length; j += 1) 
    {
        if (judgepath(props[j])) 
        {
            props.splice(j, 1);
            j--;
        }
    }
            if (props.length != propsLen) 
            {
                if(CN)
                {
                alert("无法用在路径上。请确认选择的属性中没有路径或蒙版。", "警告");
                }
                else
                {
                alert("Can't used on Path!Make sure no PATH or MASK in selected property！", "Warning");
                }
            }
    return props;
}



/****************************************/





/*****************主要函数*****************/
