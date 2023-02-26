/**
 * 名称：Sp_toolbar
 * 功能：自定义快捷工具栏
 * 版本：V2.0.2
 * 
 * 
 * V 2.0.0  修复导入jsx文件撤销组问题  code318：自定义撤销列表
 * V 2.0.1  
 * V 2.0.2  新增一个小提示，如果新建按钮没名称，则会提醒 code1370
 * V 2.0.3  多写了一个alert 删掉了
 */


function OperatorOverload(call, operator) {
    var meta = [
        //Unary operator
        '+', '-', '~',
        //Binary operator
        '*', '/', '%', '^', '<', '<=', '==', '<<', '>>', '>>>', '&', '|', '==='
    ];
    var toObject = function () {
        for (var i = 0; i < arguments.length; i++)
            this[arguments[i]] = true;
        return this;
    }
    var metaObj = toObject.apply({}, meta);
    if (!metaObj.hasOwnProperty(operator))
        return alert('Operator not supported.');

    this.call = call;
    this[operator] = function (operand, rev) {
        return this.call(operand, rev);
    }
    return this;
}

var cout = $.global.cout = new OperatorOverload(function (operand, rev) {
    if (!rev)
        $.writeln(operand);
    else
        alert(operand);
}, '<<');



try {
    Sp_toolbar(this);
} catch (err) { alert(err.line.toString() + "\r" + err.toString()); }

function Sp_toolbar(thisObj) {

    var version = '1.4';
    var typeArr = ['EFFECT', 'EXPRESSION', 'ANIMATION PRESET', 'SCRIPTLAUCHER', 'MENU', 'JAVASCRIPT', 'OS'];

    File.prototype.writee = File.prototype.writee || function (str) {    //写文件操作
        this.open("w");
        this.write(str);
        this.close();
    }
    File.prototype.readd = File.prototype.readd || function () {      //读文件操作
        this.open("r");
        var temp = this.read();
        this.close();
        return temp;
    }
    Array.prototype.getId = Array.prototype.getId || function (str) {
        for (var i in this) {
            if (this[i] == str)
                return i;
        }
        return -1;
    }

    if (app.settings.haveSetting("Sp_toolbar", "winLocation") == false) {
        app.settings.saveSetting("Sp_toolbar", "winLocation", "200,500");
    }
    if (app.settings.haveSetting("Sp_toolbar", "winSize") == false) {
        app.settings.saveSetting("Sp_toolbar", "winSize", "300,500");
    }
    if (app.settings.haveSetting("Sp_toolbar", "buttonSize") == false) {
        app.settings.saveSetting("Sp_toolbar", "buttonSize", "30,30");
    }
    if (app.settings.haveSetting("Sp_toolbar", "buttonSpacing") == false) {
        app.settings.saveSetting("Sp_toolbar", "buttonSpacing", "0,0");
    }
    if (app.settings.haveSetting("Sp_toolbar", "dropSelection") == false) {
        app.settings.saveSetting("Sp_toolbar", "dropSelection", "0");
    }
    if (app.settings.haveSetting("Sp_toolbar", "language") == false) {
        app.settings.saveSetting("Sp_toolbar", "language", "ch");
    }


    var thisFolder = Folder(Folder.userData.fullName + "/Aescripts/Sp_toolbar");
    if (!thisFolder.exists)
        thisFolder.create();
    var str = $.fileName.split("/")[$.fileName.split("/").length - 1].replace(".jsxbin", "").replace(".jsx", "");
    var special_file = File(thisFolder.toString() + "/" + str + ".xml");
    var tempJsxFile = File(thisFolder.toString() + "/tempJsx.jsx");
    var backupFile = File(thisFolder.toString() + "/backup.xml");
    if (!special_file.exists) {
        var xml = new XML("<Config><general><version>" + version + "</version></general><Group></Group></Config>");
        xml.Group = "";
        special_file.writee(xml);
    }

    var sp_toolbar = {
        typeArr: typeArr,
        close: 0,
        lang: 0,
        ip: "139.129.132.60",
        downloadLink: "http://139.129.132.60/script/Sp_toolbar",
        weiboLink: "http://weibo.com/u/3893928357",

        regExp: new RegExp("\"", "g"),
        newDraw: function () {
            // var WH = view.itemSize;
            //     var wh = this.image.size;//获取图像的尺寸
            //  var k = [(WH[0]/wh[0]), (WH[1]/wh[1])];
            // wh = [k[0]*wh[0],k[1]*wh[1]];
            // var xy = [ (WH[0]-wh[0])/2, (WH[1]-wh[1])/2 ];
            // this.graphics.drawImage(this.image,xy[0],xy[1],wh[0],wh[1]);
            this.graphics.drawImage(this.image, sp_toolbar.xy[0], sp_toolbar.xy[1], sp_toolbar.wh[0], sp_toolbar.wh[1]);
        },
        swap: function (a, b) {
            var c = b.text;
            b.text = a.text;
            a.text = c;
        },
        openLink: function (url) {
            var cmd = "";
            if ($.os.indexOf("Win") != -1) {
                cmd += "explorer " + url;
            } else {
                cmd += "open \"" + url + "\"";
            }
            try {
                system.callSystem(cmd);
            } catch (e) { }
        },
        getLastGroupId: function (name) {
            var xml = new XML(special_file.readd());
            return xml.Group.children().length();
        },
        addGroup: function (name) {
            var xml = new XML(special_file.readd());
            var newXml = new XML("<group></group>");
            newXml.@groupName = name;
            xml.Group.appendChild(newXml);
            special_file.writee(xml);
        },
        delGroup: function (id) {
            var xml = new XML(special_file.readd());
            xml.Group.child(id).setLocalName("WaitToDelete");
            delete xml.Group.WaitToDelete;
            special_file.writee(xml);
        },
        upGroup: function (id) {
            var xml = new XML(special_file.readd());
            var newXml = new XML(xml.Group.child(id));
            xml.Group.insertChildBefore(xml.Group.child(id - 1), newXml);
            xml.Group.child(id + 1).setLocalName("WaitToDelete");
            delete xml.Group.WaitToDelete;
            special_file.writee(xml);
        },
        downGroup: function (id) {
            var xml = new XML(special_file.readd());
            var newXml = new XML(xml.Group.child(id));
            xml.Group.insertChildAfter(xml.Group.child(id + 1), newXml);
            xml.Group.child(id).setLocalName("WaitToDelete");
            delete xml.Group.WaitToDelete;
            special_file.writee(xml);
        },
        renameGroup: function (id, name) {
            var xml = new XML(special_file.readd());
            xml.Group.child(id).@groupName =name;
            special_file.writee(xml);
        },
        parseButton: function (groupId, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u) {
            var xml = new XML(special_file.readd());
            var newXml = XML("<button><buttonName/><activeModifiers/><click/><ctrl/><shift/><alt/><ctrlShift/><ctrlAlt/><shiftAlt/><ctrlShiftAlt/><helpTip/><icon/><lastModifier/></button>");
            newXml.buttonName = a.toString();
            newXml.activeModifiers = b;
            newXml.click.cmd = c;
            newXml.click.type = d;
            newXml.ctrl.cmd = e;
            newXml.ctrl.type = f;
            newXml.shift.cmd = g;
            newXml.shift.type = h;
            newXml.alt.cmd = i;
            newXml.alt.type = j;
            newXml.ctrlShift.cmd = k;
            newXml.ctrlShift.type = l;
            newXml.ctrlAlt.cmd = m;
            newXml.ctrlAlt.type = n;
            newXml.shiftAlt.cmd = o;
            newXml.shiftAlt.type = p;
            newXml.ctrlShiftAlt.cmd = q;
            newXml.ctrlShiftAlt.type = r;
            newXml.lastModifier = s.toString();
            newXml.helpTip = t.toString();
            newXml.icon = u;
            xml.Group.child(groupId).appendChild(newXml);
            special_file.writee(xml);
        },
        addButton: function (groupId, buttonName) {
            var xml = new XML(special_file.readd());
            var newXml = new XML("<button><buttonName/><activeModifiers/><click/><ctrl/><shift/><alt/><ctrlShift/><ctrlAlt/><shiftAlt/><ctrlShiftAlt/><helpTip/><icon/><lastModifier/></button>");
            newXml.buttonName = buttonName;
            newXml.activeModifiers = "1";
            newXml.click.cmd = "";
            newXml.click.type = typeArr[0];
            newXml.ctrl.cmd = "";
            newXml.ctrl.type = typeArr[0];
            newXml.shift.cmd = "";
            newXml.shift.type = typeArr[0];
            newXml.alt.cmd = "";
            newXml.alt.type = typeArr[0];
            newXml.ctrlShift.cmd = "";
            newXml.ctrlShift.type = typeArr[0];
            newXml.ctrlAlt.cmd = "";
            newXml.ctrlAlt.type = typeArr[0];
            newXml.shiftAlt.cmd = "";
            newXml.shiftAlt.type = typeArr[0];
            newXml.ctrlShiftAlt.cmd = "";
            newXml.ctrlShiftAlt.type = typeArr[0];
            newXml.lastModifier = "0";
            newXml.helpTip = "";
            newXml.icon = "";
            xml.Group.child(groupId).appendChild(newXml);
            special_file.writee(xml);
        },

        delButton: function (groupId, buttonId) {
            var xml = new XML(special_file.readd());
            xml.Group.child(groupId).child(buttonId).setLocalName("WaitToDelete");
            delete xml.Group.child(groupId).WaitToDelete;
            special_file.writee(xml);
        },

        upButton: function (groupId, buttonId) {
            var xml = new XML(special_file.readd());
            var newXml = new XML(xml.Group.child(groupId).child(buttonId));
            xml.Group.child(groupId).insertChildBefore(xml.Group.child(groupId).child(buttonId - 1), newXml);
            xml.Group.child(groupId).child(buttonId + 1).setLocalName("WaitToDelete");
            delete xml.Group.child(groupId).WaitToDelete;
            special_file.writee(xml);
        },

        downButton: function (groupId, buttonId) {
            var xml = new XML(special_file.readd());
            var newXml = new XML(xml.Group.child(groupId).child(buttonId));
            xml.Group.child(groupId).insertChildAfter(xml.Group.child(groupId).child(buttonId + 1), newXml);
            xml.Group.child(groupId).child(buttonId).setLocalName("WaitToDelete");
            delete xml.Group.child(groupId).WaitToDelete;
            special_file.writee(xml);
        },

        getButtonInfo: function (groupId, buttonId) {
            var xml = new XML(special_file.readd());
            return xml.Group.child(groupId).child(buttonId);
        },

        saveButton: function (list1, list2, ed2, activeModifers, ed3, clickDrop, ed4, ed5) {
            if (ed2.text == "") return;
            if (list1.selection == null) return;
            if (list2.selection == null) return;
            var xml = new XML(special_file.readd());
            var newXml = xml.Group.child(list1.selection.index).child(list2.selection.index);
            newXml.buttonName = ed2.text;
            newXml.activeModifiers = (activeModifers.value == true) ? "1" : "0";
            newXml.click.cmd = ed3.text0.toString();
            newXml.click.subName = ed3.subName0.toString();
            newXml.click.type = typeArr[parseInt(ed3.type0)];
            newXml.ctrl.cmd = ed3.text1;
            newXml.ctrl.subName = ed3.subName1.toString();
            newXml.ctrl.type = typeArr[parseInt(ed3.type1)];
            newXml.shift.cmd = ed3.text2;
            newXml.shift.subName = ed3.subName2.toString();
            newXml.shift.type = typeArr[parseInt(ed3.type2)];
            newXml.alt.cmd = ed3.text3;
            newXml.alt.subName = ed3.subName3.toString();
            newXml.alt.type = typeArr[parseInt(ed3.type3)];
            newXml.ctrlShift.cmd = ed3.text4;
            newXml.ctrlShift.subName = ed3.subName4.toString();
            newXml.ctrlShift.type = typeArr[parseInt(ed3.type4)];
            newXml.ctrlAlt.cmd = ed3.text5;
            newXml.ctrlAlt.subName = ed3.subName5.toString();
            newXml.ctrlAlt.type = typeArr[parseInt(ed3.type5)];
            newXml.shiftAlt.cmd = ed3.text6;
            newXml.shiftAlt.subName = ed3.subName6.toString();
            newXml.shiftAlt.type = typeArr[parseInt(ed3.type6)];
            newXml.ctrlShiftAlt.cmd = ed3.text7;
            newXml.ctrlShiftAlt.subName = ed3.subName7.toString();
            newXml.ctrlShiftAlt.type = typeArr[parseInt(ed3.type7)];
            newXml.lastModifier = clickDrop.selection.index.toString();
            newXml.helpTip = ed4.text;
            if (ed5 instanceof StaticText) {

            } else {
                newXml.icon = ed5;
            }
            special_file.writee(xml);
        },
        handler: function (cmd, type) {
            var comp = app.project.activeItem;
            var id = typeArr.getId(type);
            if (cmd == "") return;
            if (id == -1) return;
            try {

                function isInArray(arr, value) {
                    for (var i = 0; i < arr.length; i++) {
                        if (value === arr[i]) {
                            return true;
                        }
                    }
                    return false;
                }

                // 定义需要撤销组的id列表
                undo_list = [0, 1, 2, 4, 5, 6]

                if (isInArray(undo_list, id)) {
                    app.beginUndoGroup("Sp_toolbar Undo");
                }
                if (id == 0) {
                    if (!(comp instanceof CompItem)) return;
                    var sl = comp.selectedLayers;
                    for (var j = 0; j < sl.length; j++) {
                        sl[j].property("ADBE Effect Parade").addProperty(cmd);
                    }
                } else if (id == 1) {
                    if (!(comp instanceof CompItem)) return;
                    var sl = comp.selectedProperties;
                    for (var i = 0; i < sl.length; i++) {
                        sl[i].expression = cmd;
                    }
                } else if (id == 2) {
                    if (!(comp instanceof CompItem)) return;
                    var sl = comp.selectedLayers;
                    for (var i = 0; i < sl.length; i++) {
                        sl[i].applyPreset(File(cmd));
                    }
                } else if (id == 3) {
                    (function () { $.evalFile(cmd); })()
                } else if (id == 4) {
                    app.executeCommand(app.findMenuCommandId(cmd));
                } else if (id == 5) {
                    tempJsxFile.writee(cmd);
                    (function () { $.evalFile(tempJsxFile.toString()); })();
                } else if (id == 6) {
                    alert(cmd)
                    system.callSystem("cmd.exe /c \"" + cmd + "\"");
                }
                if (isInArray(undo_list, id)) {
                    app.endUndoGroup();
                }

            } catch (err) { alert(err.line.toString() + "\r" + err.toString()) }
        },
    };










    var special_loc = $.global.special_loc = new OperatorOverload(function (str) {
        if (sp_toolbar.lang == 0) {
            sp_toolbar.lang = app.settings.getSetting("Sp_toolbar", "language");
        }
        return str[sp_toolbar.lang];
    }, '>>');



    var special_str = {
        general: { en: 'General', ch: '一般' },
        toolbar: { en: 'Toolbar', ch: '工具栏' },
        buttonSize: { en: 'Buttons size', ch: '按钮大小' },
        buttonSpacing: { en: 'Buttons spacing', ch: '按钮间隔' },
        handleXmlFIle: { en: 'Configuration XML File', ch: '配置文件' },
        importFile: { en: 'Import Config File', ch: '导入文件' },
        exportFile: { en: 'Export Config File', ch: '导出文件' },
        internetText: { en: 'Internet', ch: '网络' },
        checkForUpdate: { en: 'Check for update', ch: '检查更新' },
        weibo: { en: 'Weibo', ch: '微博' },
        parse: { en: 'Parse', ch: '转移' },
        parseButton: { en: 'Parse Ft_toolbar config to Sp_toolbar', ch: '从Ft_toolbar文件读取配置' },
        language: { en: 'Language', ch: '语言' },
        nameText: { en: 'Name:', ch: '名称:' },
        subName: { en: 'Sub name:', ch: '右键菜单中子元素的名称:' },
        command: { en: 'Command:', ch: '命令:' },
        activeModifiers: { en: 'Active modifiers', ch: '允许右键菜单与键盘监听' },
        getEffect: { en: 'Get Effect Name', ch: '获得被选中的插件' },
        getEffectWith: { en: 'Get Effect with parameters', ch: '获得被选中的插件(保留所有参数)' },
        getPresets: { en: 'Browse Animation Presets', ch: '选择预设文件' },
        getScripts: { en: 'Browse Scripts', ch: '选择脚本文件' },
        ok: { en: 'Ok', ch: '确定' },
        can: { en: 'Cancel', ch: '取消' },
        changeScriptType: { en: 'The script is a Panel script\rDo you want to change script to Menu ?', ch: '此脚本为Panel型脚本,是否保留Panel窗口特性?' },
        toolbars: { en: 'Toolbars', ch: '工具栏' },
        buttons: { en: 'Buttons', ch: '按钮' },
        quit: { en: 'Are you sure to quit without saving?', ch: '直接取消将不会保留你的修改,确定退出吗?' },
        save: { en: 'Do you want to save your changes?', ch: '是否保存你的更改?' },
        importOk: { en: 'Import successfully!Please restart script', ch: '导入成功!请重启脚本' },
        newVersionFind: { en: 'New version found,please download the new version', ch: '发现新版本,版本号为:' },
        whatUpdate: { en: 'Do you want to download new version right now?', ch: '是否下载最新版本?' },
        noNew: { en: 'No new version', ch: '版本已为最新版' },
        notFt: { en: 'This special_file is Not a Ft_toolbar config special_file,please select the correct json', ch: '此文件不是Ft_toolbar的配置文件' },
        buttonsParameters: { en: 'Buttons Parameters', ch: '按钮参数' },
        type: { en: 'Type:', ch: '类型:' },
        typeArr: { en: "['EFFECT','EXPRESSION','ANIMATION PRESET','SCRIPTLAUCHER','MENU','JAVASCRIPT','OS']", ch: "['插件','表达式','预设文件','脚本文件','菜单元素名称','JavaScript代码','系统级命令']" },
        helpTip: { en: 'HelpTip:', ch: '按钮帮助信息:' },
        icon: { en: 'Icon:', ch: '图片:' },
    }



    var win = (thisObj instanceof Panel) ? thisObj : new Window('palette', 'Sp_toolbar', undefined, { resizeable: 1 });
    win.margins = win.spacing = 0;
    var gr = win.add("Group");
    var scrollbar = win.add("scrollbar", [0, 0, 5, 200], 0, 0, 100);
    var droplist = win.add("dropdownlist");
    sp_toolbar.drop = droplist;
    win.addEventListener("mouseup", function (event) { if (event.button == 2 && event.detail == 2 && event.ctrlKey) SettingWin(0, gr); })
    scrollbar.stepdelta = scrollbar.jumpdelta = 20;
    droplist.visible = 0;
    gr.margins = 0;


    droplist.onChange = function () {
        if (!droplist.selection) return;
        app.settings.saveSetting("Sp_toolbar", "dropSelection", droplist.selection.index);
        var l = gr.children.length;
        for (var i = 0; i < l; i++) {
            gr.remove(l - 1 - i);
        }
        var xml = new XML(special_file.readd());
        var thisXml = xml.Group.child(droplist.selection.index);
        for (var i = 0; i < thisXml.children().length(); i++) {
            var ic = gr.add("iconbutton");
            ic.size = view.itemSize;
            ic.text = thisXml.child(i).buttonName;
            var xml = thisXml.child(i);
            if (xml.ctrl.cmd != "" || xml.shift.cmd != "" || xml.alt.cmd != "" || xml.ctrlShift.cmd != "" || xml.ctrlAlt.cmd != "" || xml.shiftAlt.cmd != "" || xml.ctrlShiftAlt.cmd != "") {
                ic.hasMulti = 1;
            } else {
                ic.hasMulti = 0;
            }
            ic.index = i;
            ic.helpTip = thisXml.child(i).helpTip.toString();
            if (thisXml.child(i).icon.toString() != "") {
                try {
                    ic.image = decodeURIComponent(thisXml.child(i).icon.toString());
                    ic.onDraw = sp_toolbar.newDraw;
                } catch (err) { }
            }
            ic.addEventListener("mouseup", function (k) {
                if (k.button == 2 && this.hasMulti == 1) {
                    var newWin = new Window("palette", "", undefined, { borderless: 1 });
                    sp_toolbar.newWin = newWin;
                    var thisBtn = newWin.add("button");
                    thisBtn.preferredSize.width = 150;
                    thisBtn.preferredSize.height = 22;
                    thisBtn.text = "Close";
                    thisBtn.onClick = function () {
                        sp_toolbar.newWin.close();
                    }
                    newWin.newDrop = newWin.add("listbox");
                    newWin.spacing = 0;
                    newWin.margins = 0;

                    var thisDrop = sp_toolbar.newWin.newDrop;
                    thisDrop.preferredSize = [150, 180];
                    thisDrop.removeAll();
                    var xml = sp_toolbar.getButtonInfo(droplist.selection.index, this.index);
                    {
                        if (xml.click.subName != "")
                            thisDrop.add("item", xml.click.subName);
                        else
                            thisDrop.add("item", xml.buttonName);
                        if (xml.ctrl.subName != "")
                            thisDrop.add("item", xml.ctrl.subName);
                        else
                            thisDrop.add("item", xml.ctrl.cmd);
                        if (xml.shift.subName != "")
                            thisDrop.add("item", xml.shift.subName);
                        else
                            thisDrop.add("item", xml.shift.cmd);
                        if (xml.alt.subName != "")
                            thisDrop.add("item", xml.alt.subName);
                        else
                            thisDrop.add("item", xml.alt.cmd);
                        if (xml.ctrlShift.subName != "")
                            thisDrop.add("item", xml.ctrlShift.subName);
                        else
                            thisDrop.add("item", xml.ctrlShift.cmd);
                        if (xml.ctrlAlt.subName != "")
                            thisDrop.add("item", xml.ctrlAlt.subName);
                        else
                            thisDrop.add("item", xml.ctrlAlt.cmd);
                        if (xml.shiftAlt.subName != "")
                            thisDrop.add("item", xml.shiftAlt.subName);
                        else
                            thisDrop.add("item", xml.shiftAlt.cmd);
                        if (xml.ctrlShiftAlt.subName != "")
                            thisDrop.add("item", xml.ctrlShiftAlt.subName);
                        else
                            thisDrop.add("item", xml.ctrlShiftAlt.cmd);
                        thisDrop.onChange = function (k) {
                            sp_toolbar.newWin.hide();
                            if (!this.selection) return;
                            if (this.selection.index == 0) {
                                sp_toolbar.handler(xml.click.cmd, xml.click.type);
                            } else if (this.selection.index == 1) {
                                sp_toolbar.handler(xml.ctrl.cmd, xml.ctrl.type);
                            } else if (this.selection.index == 2) {
                                sp_toolbar.handler(xml.shift.cmd, xml.shift.type);
                            } else if (this.selection.index == 3) {
                                sp_toolbar.handler(xml.alt.cmd, xml.alt.type);
                            } else if (this.selection.index == 4) {
                                sp_toolbar.handler(xml.ctrlShift.cmd, xml.ctrlShift.type);
                            } else if (this.selection.index == 5) {
                                sp_toolbar.handler(xml.ctrlAlt.cmd, xml.ctrlAlt.type);
                            } else if (this.selection.index == 6) {
                                sp_toolbar.handler(xml.shiftAlt.cmd, xml.shiftAlt.type);
                            } else if (this.selection.index == 7) {
                                sp_toolbar.handler(xml.ctrlShiftAlt.cmd, xml.ctrlShiftAlt.type);
                            }//end of ctrlKey
                        }//end of activModifiers
                    }
                    sp_toolbar.newWin.preferredSize.width = 150;
                    sp_toolbar.newWin.frameLocation = [k.screenX, k.screenY];
                    sp_toolbar.newWin.show();
                    //sp_toolbar.newWin.addEventListener ("keydown",function(k){sp_toolbar.newWin.close();});
                    sp_toolbar.newWin.addEventListener("blur", function () { sp_toolbar.newWin.close(); });
                    sp_toolbar.newWin.onDeactivate = function () {
                        sp_toolbar.newWin.close();
                    }
                }
            });
            ic.onClick = function () {
                var keyBoard = ScriptUI.environment.keyboardState;
                var xml = sp_toolbar.getButtonInfo(droplist.selection.index, this.index);
                if (xml.activeModifiers == "0") {
                    sp_toolbar.handler(xml.click.cmd, xml.click.type);
                } else {
                    if (keyBoard.ctrlKey == false && keyBoard.altKey == false && keyBoard.shiftKey == false) {
                        sp_toolbar.handler(xml.click.cmd, xml.click.type);
                    } else if (keyBoard.ctrlKey == true && keyBoard.altKey == false && keyBoard.shiftKey == false) {
                        sp_toolbar.handler(xml.ctrl.cmd, xml.ctrl.type);
                    } else if (keyBoard.ctrlKey == false && keyBoard.altKey == false && keyBoard.shiftKey == true) {
                        sp_toolbar.handler(xml.shift.cmd, xml.shift.type);
                    } else if (keyBoard.ctrlKey == false && keyBoard.altKey == true && keyBoard.shiftKey == false) {
                        sp_toolbar.handler(xml.alt.cmd, xml.alt.type);
                    } else if (keyBoard.ctrlKey == true && keyBoard.altKey == false && keyBoard.shiftKey == true) {
                        sp_toolbar.handler(xml.ctrlShift.cmd, xml.ctrlShift.type);
                    } else if (keyBoard.ctrlKey == true && keyBoard.altKey == true && keyBoard.shiftKey == false) {
                        sp_toolbar.handler(xml.ctrlAlt.cmd, xml.ctrlAlt.type);
                    } else if (keyBoard.ctrlKey == false && keyBoard.altKey == true && keyBoard.shiftKey == true) {
                        sp_toolbar.handler(xml.shiftAlt.cmd, xml.shiftAlt.type);
                    } else if (keyBoard.ctrlKey == true && keyBoard.altKey == true && keyBoard.shiftKey == true) {
                        sp_toolbar.handler(xml.ctrlShiftAlt.cmd, xml.ctrlShiftAlt.type);
                    }//end of ctrlKey
                }//end of activModifiers
            }//end of onClick function
        }//end of loop i
        var ic = gr.add("iconbutton");
        ic.text = "Edit";
        ic.size = view.itemSize;
        ic.index = i;
        ic.onClick = function () {
            try {
                //~                                     alert(special_loc(special_str.buttonSize));
                SettingWin(sp_toolbar.drop.selection.index, gr);
            } catch (err) { alert(err.line.toString() + err.toString()) }
        }
        win.onResize();
    }//end of onChange function






    var xml = new XML(special_file.readd());
    for (var i = 0; i < xml.Group.children().length(); i++) {
        droplist.add("item", xml.Group.child(i).@groupName);
    }
    if (droplist.items.length == 0) {
        sp_toolbar.addGroup('Default');
        var item = sp_toolbar.drop.add("item", 'Default');
    }
    var str = app.settings.getSetting("Sp_toolbar", "buttonSize");
    var stra = app.settings.getSetting("Sp_toolbar", "buttonSpacing");
    var view = { hasDroplist: 0, hasScrollbar: 0, itemSize: [42, 45], itemSpacing: [0, 0], fillColor: [50 / 255, 190 / 255, 236 / 255] }
    sp_toolbar.view = view;
    view.itemSize = [parseInt(str.split(",")[0]), parseInt(str.split(",")[1])];
    view.itemSpacing = [parseInt(stra.split(",")[0]), parseInt(stra.split(",")[1])];

    if (droplist.items.length > 1) view.hasDroplist = 1 else view.hasDroplist = 0;
    if (droplist.items.length != 0) {
        droplist.selection = parseInt(app.settings.getSetting("Sp_toolbar", "dropSelection"));
        if (!droplist.selection) droplist.selection = 0;
    }
    if (droplist.items.length == 1)
        droplist.selection = 0;

    var triDraw = function (k) {
        //  if(this.image) return;
        // var gfx = this.graphics;
        // gfx.newPath();
        // gfx.rectPath(0,0,this.size[0],this.size[1]);
        // if(!k.mouseOver){
        // gfx.fillPath (this.bgBrush1);
        // }else{
        //    gfx.fillPath (this.bgBrush2); 
        //     }
        // gfx.newPath();
        // gfx.moveTo((view.itemSize[0]),(view.itemSize[1]-3));
        // gfx.lineTo((view.itemSize[0])/10*9,(view.itemSize[1]-3));
        // gfx.lineTo((view.itemSize[0]),(view.itemSize[1]-3)/10*9);
        // var brush = gfx.newBrush(gfx.BrushType.SOLID_COLOR,view.fillColor);
        // if(this.hasMulti){
        //     if(!k.leftButtonPressed||!k.mouseOver){
        //         gfx.fillPath(this.bgBrush3);
        //     }else{
        //         gfx.fillPath(brush);
        //         }
        // }
        // if(!this.image){
        // var thisDim = gfx.measureString (this.text);
        // if(!k.leftButtonPressed ||!k.mouseOver){
        // gfx.drawString (this.text+" ", this.drawPen1, this.size[0]/2-thisDim.width/2+1,this.size[1]/2-thisDim.height/2 );
        // }else{
        //     gfx.drawString (this.text+" ", this.drawPen2, this.size[0]/2-thisDim.width/2+1,this.size[1]/2-thisDim.height/2 );
        //     }
        // }
        this.graphics.drawString(this.text + " ", this.drawPen1, this.size[0] / 2 - this.graphics.measureString(this.text).width / 2, this.size[0] / 2 - this.graphics.measureString(this.text).height / 2);
    };


    win.onResize = win.onResizing = function () {
        gr.size = (sp_toolbar.drop.items.length <= 1) ? win.size : [win.size[0], win.size[1] - 20];
        gr.location = (sp_toolbar.drop.items.length > 1) ? [0, 23] : [0, 0];
        sp_toolbar.drop.size = [win.size[0], 20];
        sp_toolbar.drop.location = [0, 0];
        sp_toolbar.drop.itemSize.width = sp_toolbar.drop.size[0] - 31;
        var numWidth = Math.floor(gr.size[0] / view.itemSize[0]);
        if (numWidth == 0) numWidth = 1;
        for (var i = 0; i < gr.children.length; i++) {
            gr.children[i].size = view.itemSize;
            gr.children[i].location = [view.itemSpacing[0] + i % numWidth * (view.itemSize[0] + view.itemSpacing[0]),
            view.itemSpacing[1] + Math.floor(i / numWidth) * (view.itemSize[1] + view.itemSpacing[1])];
        }
        for (var i = 0; i < gr.children.length; i++) {
            if (!gr.children[i].image) {
                gr.children[i].drawPen1 = gr.children[i].graphics.newPen(gr.children[i].graphics.PenType.SOLID_COLOR, [0.85, 0.85, 0.85, 1], 1);
                gr.children[i].drawPen2 = gr.children[i].graphics.newPen(gr.children[i].graphics.PenType.SOLID_COLOR, sp_toolbar.view.fillColor, 1);
                gr.children[i].bgBrush1 = gr.children[i].graphics.newBrush(gr.children[i].graphics.BrushType.SOLID_COLOR, [0.137, 0.137, 0.137, 1]);
                gr.children[i].bgBrush2 = gr.children[i].graphics.newBrush(gr.children[i].graphics.BrushType.SOLID_COLOR, [0.023, 0.023, 0.023, 1]);
                gr.children[i].bgBrush3 = gr.children[i].graphics.newBrush(gr.children[i].graphics.BrushType.SOLID_COLOR, [0.85, 0.85, 0.85, 1]);
                gr.children[i].onDraw = triDraw;
            }
        }
        if (sp_toolbar.drop.items.length > 1) { sp_toolbar.drop.visible = 1; } else { sp_toolbar.drop.visible = 0; }
        if (gr.children.length == 0) { scrollbar.visible = 0; return };
        var distance = gr.children[gr.children.length - 1].location[1] + view.itemSize[1] + view.itemSpacing[1] - gr.size[1];
        if (distance > 0) {
            scrollbar.size[0] = 20;
            scrollbar.size[1] = gr.size[1];
            scrollbar.location[0] = gr.size[0] - scrollbar.size[0];
            scrollbar.location[1] = gr.location[1];
            scrollbar.visible = 1;
            for (var i = 0; i < gr.children.length; i++) {
                gr.children[i].location[1] = gr.children[i].location[1] - ((scrollbar.value / 100) * (distance + view.itemSize[1] + view.itemSpacing[1]));
            }
        } else {
            scrollbar.visible = 0;
        }
        var WH = view.itemSize;
        var wh = view.itemSize;//获取图像的尺寸
        var k = [(WH[0] / wh[0]), (WH[1] / wh[1])];
        wh = [k[0] * wh[0], k[1] * wh[1]];
        var xy = [(WH[0] - wh[0]) / 2, (WH[1] - wh[1]) / 2];
        sp_toolbar.xy = xy;
        sp_toolbar.wh = wh;
    }

    scrollbar.onChange = scrollbar.onChanging = function () {
        win.onResize();
    }

    if (thisObj instanceof Panel) {
        win.layout.layout(true);
    } else {
        win.location = app.settings.getSetting("Sp_toolbar", "winLocation").split(",");
        win.show();
        win.size = app.settings.getSetting("Sp_toolbar", "winSize").split(",");
        win.onClose = function () {
            var thisStr = win.size[0].toString() + "," + win.size[1].toString();
            app.settings.saveSetting("Sp_toolbar", "winSize", thisStr);
            thisStr = win.location[0].toString() + "," + win.location[1].toString();
            app.settings.saveSetting("Sp_toolbar", "winLocation", thisStr);
        }
    }
    win.onResize();





    function SettingWin(groupIndex, group) {
        var keepRf = this;
        var typeArr = sp_toolbar.typeArr;
        special_file.copy(backupFile);
        sp_toolbar.drop.enabled = 0;



        /************************窗口创建***************************************/
        {
            this.w = new Window('palette', 'Sp_toolbar');
            this.w.tab = this.w.add("tabbedpanel");
            this.w.tab1 = this.w.tab.add("tab", undefined, special_loc >> special_str.general);
            this.w.tab1.alignChildren = ["fill", "top"];
            this.w.tab2 = this.w.tab.add("tab", undefined, special_loc >> special_str.toolbar);


            var res0 = """Panel{
            text: '"""+(special_loc>>special_str.buttonSize)+"""',
                orientation: 'row',
                    gr1:Group{
                orientation: 'column', alignment: ['fill', 'fill'], alignChildren: ['center', 'fill'],
                    st1:StaticText{ text: '"""+(special_loc>>special_str.buttonSize)+"""' },
                st2:StaticText{ text: '"""+(special_loc>>special_str.buttonSpacing)+"""' },
            },
            gr2:Group{
                orientation: 'column', alignment: ['fill', 'fill'], alignChildren: ['fill', 'fill'],
                    sl1:Slider{ startValue: 0, endValue: 200, value: 30, size: [200, 10] },
                sl2:Slider{ startValue: 0, endValue: 200, value: 30, size: [200, 10] },
                sl3:Slider{ startValue: 0, endValue: 105, value: 5, size: [200, 10] },
                sl4:Slider{ startValue: 0, endValue: 105, value: 5, size: [200, 10] },

            },
            gr3:Group{
                orientation: 'column', alignment: ['fill', 'fill'], alignChildren: ['fill', 'fill'],
                    ed1:EditText{ characters: 3 },
                ed2:EditText{ characters: 3 },
                ed3:EditText{ characters: 3 },
                ed4:EditText{ characters: 3 },
            }
        } """;
        this.w.res0 = this.w.tab1.add(res0);

        var resTemp = """Panel{
        text: '"""+(special_loc>>special_str.handleXmlFIle)+"""',
            orientation: 'column',
                gr1:Group{
            orientation: 'row', alignment: ['fill', 'fill'], alignChildren: ['fill', 'fill'],
                imports:Button{ text: '"""+(special_loc>>special_str.importFile)+"""' },
            exports:Button{ text: '"""+(special_loc>>special_str.exportFile)+"""' }
        }
    } """;
    this.w.res2 = this.w.tab1.add(resTemp);

    var resTemp = """Panel{
    text: '"""+(special_loc>>special_str.internetText)+"""',
        orientation: 'column',
            gr1:Group{
        orientation: 'row', alignment: ['fill', 'fill'], alignChildren: ['fill', 'fill'],
            update:Button{ text: '"""+(special_loc>>special_str.checkForUpdate)+"""' },
        weibo:Button{ text: '"""+(special_loc>>special_str.weibo)+"""' }
    }
} """;
this.w.res3 = this.w.tab1.add(resTemp);

var resTemp = """Panel{
text: '"""+(special_loc>>special_str.parse)+"""',
    orientation: 'column',
        gr1:Group{
    orientation: 'row', alignment: ['fill', 'fill'], alignChildren: ['fill', 'fill'],
        parse:Button{ text: '"""+(special_loc>>special_str.parseButton)+"""' }
}
                }""";
this.w.res35 = this.w.tab1.add(resTemp);

var resTemp = """Panel{
text: '"""+(special_loc>>special_str.language)+"""',
    orientation: 'column',
        gr1:Group{
    orientation: 'row', alignment: ['fill', 'fill'], alignChildren: ['fill', 'fill'],
        en:Button{ text: 'English' },
    ch:Button{ text: '中文' }
}
                }""";
this.w.res36 = this.w.tab1.add(resTemp);



var resTemp = """Panel{
text: 'What can I say here :)',
    orientation: 'column',
        gr1:Group{
    orientation: 'row', alignment: ['fill', 'fill'], alignChildren: ['fill', 'fill'],
        ed:EditText{ justify: 'center', text: '', properties: { multiline: 1, readonly: 1, scrolling : 0 }, size: [undefined, 150] }
}
                }""";
this.w.res4 = this.w.tab1.add(resTemp);
this.w.res4.gr1.ed.text = "Have a nice day~\n\nBy:Smallpath\nEmail:smallpath2013@gmail.com";



var res1 = """Group{
orientation: 'column', alignment: ['fill', 'fill'], alignChildren: ['fill', 'fill'],
    gr1:Group{
    alignment: ['fill', 'fill'], alignChildren: ['fill', 'fill'],
        gr1:Panel{
        text: '"""+(special_loc>>special_str.toolbars)+"""',
            gr1:Group{
            orientation: 'row', alignment: ['fill', 'fill'], alignChildren: ['right', 'buttom'], magins: 1, spacing: 3,
                create:IconButton{ text: 'Add', size: [20, 20] },
            del:IconButton{ text: 'Del', size: [20, 20] },
            up:IconButton{ text: 'Up', size: [20, 20] },
            down:IconButton{ text: 'Down', size: [20, 20] }
        },
        gr2:Group{
            alignment: ['fill', 'fill'], alignChildren: ['fill', 'fill'],
                st:StaticText{ text: '"""+(special_loc>>special_str.nameText)+"""' },
            ed:EditText{ text: '', characters: 8 },
        },
        gr3:ListBox{ alignment: ['fill', 'fill'], alignChildren: ['fill', 'fill'], size: [undefined, '150'] }
    },
    gr2:Panel{
        text: '"""+(special_loc>>special_str.buttons)+"""',
            gr1:Group{
            orientation: 'row', alignment: ['fill', 'fill'], alignChildren: ['right', 'buttom'], magins: 1, spacing: 3,
                create:IconButton{ text: 'Add', size: [20, 20] },
            del:IconButton{ text: 'Del', size: [20, 20] },
            up:IconButton{ text: 'Up', size: [20, 20] },
            down:IconButton{ text: 'Down', size: [20, 20] }
        },
        gr2:Group{
            alignment: ['fill', 'fill'], alignChildren: ['fill', 'fill'],
                st:StaticText{ text: '"""+(special_loc>>special_str.nameText)+"""' },
            ed:EditText{ text: '', characters: 8 },
        },
        gr3:ListBox{ alignment: ['fill', 'fill'], alignChildren: ['fill', 'fill'], size: [undefined, '150'] }
    }
}


var gui = new Object();
gui.sl1 = this.w.res0.gr2.sl1;
gui.sl2 = this.w.res0.gr2.sl2;
gui.sl3 = this.w.res0.gr2.sl3;
gui.sl4 = this.w.res0.gr2.sl4;
gui.ed01 = this.w.res0.gr3.ed1;
gui.ed02 = this.w.res0.gr3.ed2;
gui.ed03 = this.w.res0.gr3.ed3;
gui.ed04 = this.w.res0.gr3.ed4;
gui.ok = this.w.res1.gr3.ok;
gui.can = this.w.res1.gr3.can;
gui.list1 = this.w.res1.gr1.gr1.gr3;
gui.list2 = this.w.res1.gr1.gr2.gr3;
gui.create1 = this.w.res1.gr1.gr1.gr1.create;
gui.create2 = this.w.res1.gr1.gr2.gr1.create;
gui.del1 = this.w.res1.gr1.gr1.gr1.del;
gui.del2 = this.w.res1.gr1.gr2.gr1.del;
gui.up1 = this.w.res1.gr1.gr1.gr1.up;
gui.up2 = this.w.res1.gr1.gr2.gr1.up;
gui.down1 = this.w.res1.gr1.gr1.gr1.down;
gui.down2 = this.w.res1.gr1.gr2.gr1.down;
gui.ed1 = this.w.res1.gr1.gr1.gr2.ed;
gui.ed2 = this.w.res1.gr1.gr2.gr2.ed;
gui.dyGroup = this.w.res1.gr2.gr3;
gui.typeDrop = this.w.res1.gr2.gr1.drop;
gui.getEffectName = this.w.res1.gr2.gr3.gr1.bt1;
gui.getEffectPara = this.w.res1.gr2.gr3.gr1.bt2;
gui.browseAnimation = this.w.res1.gr2.gr3.gr2.bt1;
gui.browseScript = this.w.res1.gr2.gr3.gr3.bt1;
gui.ed3 = this.w.res1.gr2.ed;
gui.ed4 = this.w.res1.gr2.gr4.ed;
gui.modifiers = this.w.res1.gr2.gr2.chk;
gui.clickDrop = this.w.res1.gr2.gr2.drop;
gui.icon = this.w.res1.gr2.gr5.bt;
gui.ed5 = this.w.res1.gr2.gr5.ed;
gui.delPic = this.w.res1.gr2.gr5.bt1;
gui.imports = this.w.res2.gr1.imports;
gui.exports = this.w.res2.gr1.exports;
gui.update = this.w.res3.gr1.update;
gui.weibo = this.w.res3.gr1.weibo;
gui.parse = this.w.res35.gr1.parse;
gui.en = this.w.res36.gr1.en;
gui.ch = this.w.res36.gr1.ch;
gui.subName = this.w.res1.gr2.gr11.ed;

gui.ed3.text0 = gui.ed3.text1 = gui.ed3.text2 = gui.ed3.text3 = gui.ed3.text4 = gui.ed3.text5 = gui.ed3.text6 = gui.ed3.text7 = "";
gui.ed3.type0 = gui.ed3.type1 = gui.ed3.type2 = gui.ed3.type3 = gui.ed3.type4 = gui.ed3.type5 = gui.ed3.type6 = gui.ed3.type7 = 0;
gui.ed3.subName0 = gui.ed3.subName1 = gui.ed3.subName2 = gui.ed3.subName3 = gui.ed3.subName4 = gui.ed3.subName5 = gui.ed3.subName6 = gui.ed3.subName7 = "";

gui.en.onClick = function () {
    app.settings.saveSetting('Sp_toolbar', 'language', 'en');
    alert('Please restart script,the language has been translated to English.');
}
gui.ch.onClick = function () {
    app.settings.saveSetting('Sp_toolbar', 'language', 'ch');
    alert('请重启脚本,语言已改变为中文');
}


gui.list2.onChange = function () {
    if (!gui.list1.selection) return;
    if (gui.list2.selection) {
        gui.ed2.text = this.selection.text;
        if (gui.list2.selection.index != 0) gui.up2.enabled = 1; else gui.up2.enabled = 0;
        if (gui.list2.selection.index != gui.list2.children.length - 1) gui.down2.enabled = 1; else gui.down2.enabled = 0;
        gui.ed3.parent.enabled = true;
    } else {
        gui.ed3.parent.enabled = false;
    }
    if (!gui.list2.selection) return;
    var xml = sp_toolbar.getButtonInfo(gui.list1.selection.index, gui.list2.selection.index);
    gui.ed2.text = xml.buttonName;
    gui.modifiers.value = parseInt(xml.activeModifiers);
    sp_toolbar.notSaveButton = -1;
    gui.modifiers.onClick();
    gui.typeDrop.selection = typeArr.getId(xml.click.type);
    gui.typeDrop.notify("onChange");
    sp_toolbar.notSaveButton = 0;
    gui.ed3.text = xml.click.cmd;
    gui.ed4.text = xml.helpTip;
    if (xml.icon.toString() != "")
        gui.ed5.text = "Has Icon~";
    else
        gui.ed5.text = "";

    gui.ed3.text0 = xml.click.cmd;
    gui.ed3.subName0 = xml.click.subName;
    gui.ed3.type0 = typeArr.getId(xml.click.type);
    gui.ed3.text1 = xml.ctrl.cmd;
    gui.ed3.subName1 = xml.ctrl.subName;
    gui.ed3.type1 = typeArr.getId(xml.ctrl.type);
    gui.ed3.text2 = xml.shift.cmd;
    gui.ed3.subName2 = xml.shift.subName;
    gui.ed3.type2 = typeArr.getId(xml.shift.type);
    gui.ed3.text3 = xml.alt.cmd;
    gui.ed3.subName3 = xml.alt.subName;
    gui.ed3.type3 = typeArr.getId(xml.alt.type);
    gui.ed3.text4 = xml.ctrlShift.cmd;
    gui.ed3.subName4 = xml.ctrlShift.subName;
    gui.ed3.type4 = typeArr.getId(xml.ctrlShift.type);
    gui.ed3.text5 = xml.ctrlAlt.cmd;
    gui.ed3.subName5 = xml.ctrlAlt.subName;
    gui.ed3.type5 = typeArr.getId(xml.ctrlAlt.type);
    gui.ed3.text6 = xml.shiftAlt.cmd;
    gui.ed3.subName6 = xml.shiftAlt.subName;
    gui.ed3.type6 = typeArr.getId(xml.shiftAlt.type);
    gui.ed3.text7 = xml.ctrlShiftAlt.cmd;
    gui.ed3.subName7 = xml.ctrlShiftAlt.subName;
    gui.ed3.type7 = typeArr.getId(xml.ctrlShiftAlt.type);
    if (gui.modifiers.value == true) {
        gui.clickDrop.selection = parseInt(xml.lastModifier);
        gui.subName.text = eval("gui.ed3.subName" + gui.clickDrop.selection.index);
        gui.ed3.text = eval("gui.ed3.text" + gui.clickDrop.selection.index);
        gui.typeDrop.selection = parseInt(eval("gui.ed3.type" + gui.clickDrop.selection.index));
    }
}

gui.subName.onChanging = function () {
    eval("gui.ed3.subName" + gui.clickDrop.selection.index + "=\"" + gui.subName.text + "\"");
    if (sp_toolbar.notSaveButton != -1) {
        sp_toolbar.saveButton(gui.list1, gui.list2, gui.ed2, gui.modifiers, gui.ed3, gui.clickDrop, gui.ed4, gui.ed5)
    }
}

gui.list1.onChange = function () {
    if (gui.list1.selection) {
        gui.ed1.text = this.selection.text;
        if (gui.list1.selection.index != 0) gui.up1.enabled = 1; else gui.up1.enabled = 0;
        if (gui.list1.selection.index != gui.list1.children.length - 1) gui.down1.enabled = 1; else gui.down1.enabled = 0;
        gui.list2.parent.enabled = true;
        var xml = new XML(special_file.readd());
        var thisXml = xml.Group.child(gui.list1.selection.index);
        gui.list2.removeAll();
        for (var i = 0; i < thisXml.children().length(); i++) {
            gui.list2.add("item", thisXml.child(i).buttonName);
        }
        if (!gui.list2.selection) gui.ed3.parent.enabled = false;
    } else {
        gui.list2.parent.enabled = false;
        gui.ed3.parent.enabled = false;
    }
    sp_toolbar.drop.selection = this.selection.index;
}

gui.ed3.onChange = function () {
    if (!gui.typeDrop.selection) return;
    if (!gui.clickDrop.selection) return;
    eval("gui.ed3.text" + gui.clickDrop.selection.index + "=gui.ed3.text;");
    eval("gui.ed3.type" + gui.clickDrop.selection.index + "=gui.typeDrop.selection.index;");
    if (sp_toolbar.notSaveButton != -1) {
        sp_toolbar.saveButton(gui.list1, gui.list2, gui.ed2, gui.modifiers, gui.ed3, gui.clickDrop, gui.ed4, gui.ed5)
    }
}

gui.clickDrop.onChange = function () {
    gui.ed3.text = eval("gui.ed3.text" + this.selection.index);
    gui.typeDrop.selection = parseInt(eval("gui.ed3.type" + this.selection.index));
    gui.subName.text = eval("gui.ed3.subName" + this.selection.index);
    sp_toolbar.notSaveButton = -1;
    gui.ed3.notify("onChange");
    sp_toolbar.notSaveButton = 0;
    if (sp_toolbar.notSaveButton != -1) {
        sp_toolbar.saveButton(gui.list1, gui.list2, gui.ed2, gui.modifiers, gui.ed3, gui.clickDrop, gui.ed4, gui.ed5)
    }
}

gui.modifiers.onClick = function () {
    if (this.value) {
        this.parent.drop.enabled = 1;
    } else {
        this.parent.drop.enabled = 0;
        this.parent.drop.selection = 0;
        this.parent.drop.notify("onChange");
    }

    if (sp_toolbar.notSaveButton != -1) {
        sp_toolbar.saveButton(gui.list1, gui.list2, gui.ed2, gui.modifiers, gui.ed3, gui.clickDrop, gui.ed4, gui.ed5)
    }
}
sp_toolbar.notSaveButton = -1;
gui.modifiers.onClick();
sp_toolbar.notSaveButton = 0;

gui.browseAnimation.onClick = function () {
    var special_file = File.openDialog("Select animation preset", ["*.ffx"]);
    if (!special_file) return;
    gui.ed3.text = decodeURIComponent(special_file.toString());
    gui.ed4.text = decodeURIComponent(special_file.toString().split("/")[special_file.toString().split("/").length - 1]);
    sp_toolbar.notSaveButton = -1;
    gui.ed3.notify("onChange");
    sp_toolbar.notSaveButton = 0;
    if (sp_toolbar.notSaveButton != -1) {
        sp_toolbar.saveButton(gui.list1, gui.list2, gui.ed2, gui.modifiers, gui.ed3, gui.clickDrop, gui.ed4, gui.ed5)
    }
}

gui.browseScript.onClick = function () {
    var special_file = File.openDialog("Select script preset");
    if (!special_file) return;
    gui.ed3.text = decodeURIComponent(special_file.toString());
    gui.ed4.text = decodeURIComponent(special_file.toString().split("/")[special_file.toString().split("/").length - 1]);
    if (decodeURIComponent(special_file.toString().split("/")[special_file.toString().split("/").length - 2]) == "ScriptUI Panels") {
        var conf = confirm(special_loc >> special_str.changeScriptType);
        if (conf) {
            gui.typeDrop.selection = 4;
            gui.typeDrop.notify("onChange");
            gui.ed3.text = gui.ed4.text;
        }
    }
    sp_toolbar.notSaveButton = -1;
    gui.ed3.notify("onChange");
    sp_toolbar.notSaveButton = 0;
    if (sp_toolbar.notSaveButton != -1) {
        sp_toolbar.saveButton(gui.list1, gui.list2, gui.ed2, gui.modifiers, gui.ed3, gui.clickDrop, gui.ed4, gui.ed5)
    }
}

gui.getEffectName.onClick = function () {
    try {
        var comp = app.project.activeItem;
        var selectProp = comp.selectedProperties[0];
        gui.ed3.text = selectProp.matchName;
        gui.ed4.text = selectProp.name;
    } catch (err) { alert(err) }
    sp_toolbar.notSaveButton = -1;
    gui.ed3.notify("onChange");
    sp_toolbar.notSaveButton = 0;
    if (sp_toolbar.notSaveButton != -1) {
        sp_toolbar.saveButton(gui.list1, gui.list2, gui.ed2, gui.modifiers, gui.ed3, gui.clickDrop, gui.ed4, gui.ed5)
    }
}



gui.getEffectPara.onClick = function () {
    try {
        var comp = app.project.activeItem;
        var selectProp = comp.selectedProperties[0];

        var str1 = """var comp = app.project.activeItem;
        if (comp && comp.selectedLayers.length > 0) {
            for (var i = 0; i < comp.selectedLayers.length; i++) {
                var layer = comp.selectedLayers[i];
                var fx = layer.Effects.addProperty('"""+selectProp.matchName+"""');
                fx.name = '"""+selectProp.name+"""';
                """;
                for (var i = 0; i < selectProp.numProperties; i++) {
                    var prop = selectProp.property(i + 1);
                    try {
                        var str = "try{fx.property(String('" + prop.matchName + "')).setValue(" + prop.valueAtTime(0, false).toSource() + ");}catch(err){}\r";
                        str1 += str;
                        if (prop.canSetExpression && prop.expression) {
                            str = "try{fx.property(String('" + prop.matchName + "')).expression='" + prop.expression + "';fx.property(String('" + prop.matchName + "')).expressionEnabled=" + prop.expressionEnabled + ";}catch(err){}\r";
                            str1 += str;
                        }
                    } catch (err) { }
                }
                str1 += "}}";
                gui.typeDrop.selection = 5;
                sp_toolbar.notSaveButton = -1;
                gui.typeDrop.notify("onChange");
                sp_toolbar.notSaveButton = 0;
                gui.ed3.text = str1;
                gui.ed4.text = selectProp.name;
                sp_toolbar.notSaveButton = -1;
                gui.ed3.notify("onChange");
                sp_toolbar.notSaveButton = 0;
                if (sp_toolbar.notSaveButton != -1) {
                    sp_toolbar.saveButton(gui.list1, gui.list2, gui.ed2, gui.modifiers, gui.ed3, gui.clickDrop, gui.ed4, gui.ed5)
                }
            }catch (err) { alert(err) }
        }

        gui.delPic.onClick = function () {
            if (!sp_toolbar.drop.selection) return;
            gui.ed5.text = "";
            var preIndex = sp_toolbar.drop.selection.index;
            if (sp_toolbar.notSaveButton != -1) {
                sp_toolbar.saveButton(gui.list1, gui.list2, gui.ed2, gui.modifiers, gui.ed3, gui.clickDrop, gui.ed4, "")
            }
            try {
                sp_toolbar.drop.removeAll();
                var xml = new XML(special_file.readd());
                for (var i = 0; i < xml.Group.children().length(); i++) {
                    droplist.add("item", xml.Group.child(i).@groupName);
                }
                sp_toolbar.drop.selection = preIndex;
            } catch (err) { }
        }

        gui.icon.onClick = function () {
            try {
                var files = File.openDialog("Select icon");
                if (!files) return;
                if (files.toString().indexOf(".jpg") == -1 && files.toString().indexOf(".png") == -1) return;
                if (!gui.list2.selection) return;
                gui.ed5.text = "Has Icon~";
                files.open("r");
                files.encoding = "BINARY";
                var content = encodeURIComponent(files.read());
                files.close();
                group.children[gui.list2.selection.index].image = decodeURIComponent(content);
                group.children[gui.list2.selection.index].onDraw = sp_toolbar.newDraw;
                if (sp_toolbar.notSaveButton != -1) {
                    sp_toolbar.saveButton(gui.list1, gui.list2, gui.ed2, gui.modifiers, gui.ed3, gui.clickDrop, gui.ed4, content);
                }
            } catch (err) { alert(err.line.toString() + "\r" + err.toString()) }
            sp_toolbar.drop.onChange();
        }


        gui.typeDrop.onChange = function () {
            eval("gui.ed3.type" + gui.clickDrop.selection.index + "=gui.typeDrop.selection.index;");
            if (sp_toolbar.notSaveButton != -1) {
                sp_toolbar.saveButton(gui.list1, gui.list2, gui.ed2, gui.modifiers, gui.ed3, gui.clickDrop, gui.ed4, gui.ed5)
            }
            if (this.selection.index == 0) {
                gui.dyGroup.gr1.visible = 1;
                gui.dyGroup.gr2.visible = 0;
                gui.dyGroup.gr3.visible = 0;
            } else if (this.selection.index == 1) {
                gui.dyGroup.gr1.visible = 0;
                gui.dyGroup.gr2.visible = 0;
                gui.dyGroup.gr3.visible = 0;
            } else if (this.selection.index == 2) {
                gui.dyGroup.gr1.visible = 0;
                gui.dyGroup.gr2.visible = 1;
                gui.dyGroup.gr3.visible = 0;
            } else if (this.selection.index == 3) {
                gui.dyGroup.gr1.visible = 0;
                gui.dyGroup.gr2.visible = 0;
                gui.dyGroup.gr3.visible = 1;
            } else if (this.selection.index == 4) {
                gui.dyGroup.gr1.visible = 0;
                gui.dyGroup.gr2.visible = 0;
                gui.dyGroup.gr3.visible = 0;
            } else if (this.selection.index == 5) {
                gui.dyGroup.gr1.visible = 0;
                gui.dyGroup.gr2.visible = 0;
                gui.dyGroup.gr3.visible = 0;
            } else if (this.selection.index == 6) {
                gui.dyGroup.gr1.visible = 0;
                gui.dyGroup.gr2.visible = 0;
                gui.dyGroup.gr3.visible = 0;
            }
        }

        gui.create1.onClick = function () {
            if (gui.ed1.text != "") {
                var item = gui.list1.add("item", gui.ed1.text);
                sp_toolbar.addGroup(gui.ed1.text);
                gui.list1.selection = item;
                if (gui.list1.items.length == 1) sp_toolbar.view.hasDroplist = 0; else sp_toolbar.view.hasDroplist = 1;
                var item = sp_toolbar.drop.add("item", gui.ed1.text);
                sp_toolbar.drop.selection = item;
            }
        }

        gui.del1.onClick = function () {
            if (gui.list1.items.length <= 1) return;
            if (gui.list1.selection) {
                sp_toolbar.delGroup(gui.list1.selection.index);
                sp_toolbar.drop.remove(gui.list1.selection.index);
                gui.list1.remove(gui.list1.selection);
                sp_toolbar.drop.selection = 0;
                gui.ed3.parent.enabled = false;
            }
            if (gui.list1.items.length == 0) {
                var l = group.children.length;
                for (var i = 0; i < l; i++) {
                    group.remove(l - 1 - i);
                }
                gui.list2.parent.enabled = 0;
            }

            group.parent.onResize();
        }
        gui.ed4.onChange = function () {
            try {
                group.children[gui.list2.selection.index].helpTip = this.text;
            } catch (err) { alert(err) }
            sp_toolbar.notSaveButton = -1;
            gui.ed3.notify("onChange");
            sp_toolbar.notSaveButton = 0;
            if (sp_toolbar.notSaveButton != -1) {
                sp_toolbar.saveButton(gui.list1, gui.list2, gui.ed2, gui.modifiers, gui.ed3, gui.clickDrop, gui.ed4, gui.ed5)
            }
        }

        gui.ed1.onChange = gui.ed2.onChange = function () {
            if (this.text == "") return;
            if (!this.parent.parent.gr3.selection) return;
            var preIndex = this.parent.parent.gr3.selection.index;
            this.parent.parent.gr3.selection.text = this.text;
            sp_toolbar.saveButton(gui.list1, gui.list2, gui.ed2, gui.modifiers, gui.ed3, gui.clickDrop, gui.ed4, gui.ed5);
            this.parent.parent.gr3.notify("onChange");
            this.parent.parent.gr3.selection = preIndex;
            sp_toolbar.drop.onChange();
            if (this.parent.parent.text == (special_loc >> special_str.toolbars)) {
                sp_toolbar.drop.selection.text = this.text;
                sp_toolbar.renameGroup(this.parent.parent.gr3.selection.index, this.text);
            } else {
                group.children[gui.list2.selection.index].text = this.text;
            }
        }

        gui.up1.onClick = function () {
            if (!gui.list1.selection) return;
            if (gui.list1.selection.index == 0) return;
            sp_toolbar.upGroup(gui.list1.selection.index);
            var preIndex = gui.list1.selection.index;
            var xml = new XML(special_file.readd());
            gui.list1.removeAll();
            for (var i = 0; i < xml.Group.children().length(); i++) {
                gui.list1.add("item", xml.Group.child(i).@groupName);
            }
            gui.list1.selection = preIndex - 1;
            gui.list1.notify("onChange");
            sp_toolbar.drop.onChange();
            sp_toolbar.swap(sp_toolbar.drop.items[preIndex - 1], sp_toolbar.drop.items[preIndex]);
            if (gui.list1.selection.index == 0) this.enabled = 0;
            if (gui.list1.selection.index != 0) gui.up1.enabled = 1;
            if (gui.list1.selection.index != gui.list1.children.length - 1) gui.down1.enabled = 1;
        }

        gui.down1.onClick = function () {
            if (!gui.list1.selection) return;
            if (gui.list1.selection.index == gui.list1.items.length - 1) return;
            var preIndex = gui.list1.selection.index;
            sp_toolbar.downGroup(gui.list1.selection.index);
            var xml = new XML(special_file.readd());
            gui.list1.removeAll();
            for (var i = 0; i < xml.Group.children().length(); i++) {
                gui.list1.add("item", xml.Group.child(i).@groupName);
            }
            gui.list1.selection = preIndex + 1;
            gui.list1.notify("onChange");
            sp_toolbar.drop.onChange();
            sp_toolbar.swap(sp_toolbar.drop.items[preIndex + 1], sp_toolbar.drop.items[preIndex]);
            if (gui.list1.selection.index == gui.list1.children.length - 1) this.enabled = 0;
            if (gui.list1.selection.index != 0) gui.up1.enabled = 1;
            if (gui.list1.selection.index != gui.list1.children.length - 1) gui.down1.enabled = 1;
        }

        gui.create2.onClick = function () {

            if (!gui.list1.selection) return;
            if (gui.ed2.text == "") alert("请先给按钮设置名称\n新建按钮下方的'名称'框");
            var item = gui.list2.add("item", gui.ed2.text);
            sp_toolbar.addButton(gui.list1.selection.index, gui.ed2.text);
            gui.list2.selection = item;
            sp_toolbar.drop.onChange();
        }

        gui.del2.onClick = function () {
            if (!gui.list1.selection) return;
            if (!gui.list2.selection) return;
            var preIndex = gui.list2.selection.index;
            sp_toolbar.delButton(gui.list1.selection.index, gui.list2.selection.index);
            gui.list2.remove(gui.list2.selection);
            sp_toolbar.drop.onChange();
            if (preIndex - 1 >= 0) {
                gui.list2.selection = preIndex - 1;
                gui.ed3.parent.enabled = false;
            }
        }

        gui.up2.onClick = function () {
            if (!gui.list1.selection) return;
            if (!gui.list2.selection) return;
            if (gui.list2.selection.index == 0) return;
            sp_toolbar.upButton(gui.list1.selection.index, gui.list2.selection.index);
            var preIndex = gui.list2.selection.index;
            var tempText = gui.list2.items[preIndex - 1].text;
            gui.list2.items[preIndex - 1].text = gui.list2.selection.text;
            gui.list2.selection.text = tempText;
            gui.list2.selection = gui.list2.items[preIndex - 1];
            gui.list2.notify("onChange");
            sp_toolbar.drop.onChange();
            if (gui.list2.selection.index == 0) this.enabled = 0;
            if (gui.list2.selection.index != 0) gui.up2.enabled = 1;
            if (gui.list2.selection.index != gui.list2.children.length - 1) gui.down2.enabled = 1;
        }

        gui.down2.onClick = function () {
            if (!gui.list1.selection) return;
            if (!gui.list2.selection) return;
            if (gui.list2.selection.index == gui.list2.items.length - 1) return;
            sp_toolbar.downButton(gui.list1.selection.index, gui.list2.selection.index);
            var preIndex = gui.list2.selection.index;
            var tempText = gui.list2.items[preIndex + 1].text;
            gui.list2.items[preIndex + 1].text = gui.list2.selection.text;
            gui.list2.selection.text = tempText;
            gui.list2.selection = gui.list2.items[preIndex + 1];
            gui.list2.notify("onChange");
            sp_toolbar.drop.onChange();
            if (gui.list2.selection.index == gui.list2.children.length - 1) this.enabled = 0;
            if (gui.list2.selection.index != 0) gui.up2.enabled = 1;
            if (gui.list2.selection.index != gui.list2.children.length - 1) gui.down2.enabled = 1;
        }

        gui.sl1.onChange = gui.sl1.onChanging = function () {
            gui.ed01.text = parseInt(this.value);
            view.itemSize[0] = parseInt(this.value);
            win.onResize();
        }

        gui.sl2.onChange = gui.sl2.onChanging = function () {
            gui.ed02.text = parseInt(this.value);
            view.itemSize[1] = parseInt(this.value);
            win.onResize();
        }

        gui.sl3.onChange = gui.sl3.onChanging = function () {
            gui.ed03.text = parseInt(this.value - 5);
            view.itemSpacing[0] = parseInt(this.value - 5);
            win.onResize();
        }

        gui.sl4.onChange = gui.sl4.onChanging = function () {
            gui.ed04.text = parseInt(this.value - 5);
            view.itemSpacing[1] = parseInt(this.value - 5);
            win.onResize();
        }

        gui.ok.onClick = function () {
            var str = parseInt(view.itemSize[0]) + "," + parseInt(view.itemSize[1]);
            app.settings.saveSetting("Sp_toolbar", "buttonSize", str);
            var str = parseInt(view.itemSpacing[0]) + "," + parseInt(view.itemSpacing[1]);
            app.settings.saveSetting("Sp_toolbar", "buttonSpacing", str);
            sp_toolbar.close = -1;
            keepRf.w.close();
            sp_toolbar.close = 0;
            sp_toolbar.drop.onChange();
        }

        gui.can.onClick = function () {
            var conf = confirm(special_loc >> special_str.quit);
            if (conf == true) {
                backupFile.copy(special_file);
                /******拷贝回来*********/
                try {
                    sp_toolbar.drop.removeAll();
                    var xml = new XML(special_file.readd());
                    for (var i = 0; i < xml.Group.children().length(); i++) {
                        droplist.add("item", xml.Group.child(i).@groupName);
                    }
                    sp_toolbar.drop.selection = 0;
                } catch (err) { }
                /*****************/
                var str = app.settings.getSetting("Sp_toolbar", "buttonSize");
                var stra = app.settings.getSetting("Sp_toolbar", "buttonSpacing");
                view.itemSize = [parseInt(str.split(",")[0]), parseInt(str.split(",")[1])];
                view.itemSpacing = [parseInt(stra.split(",")[0]), parseInt(stra.split(",")[1])];
                win.onResize();
                sp_toolbar.close = -1;
                keepRf.w.close();
                sp_toolbar.close = 0;
            }
        }

        keepRf.w.onClose = function () {
            sp_toolbar.drop.enabled = 1;
            if (sp_toolbar.close == -1) return;
            var conf = confirm(special_loc >> special_str.save);
            if (conf == true) {
                var str = parseInt(view.itemSize[0]) + "," + parseInt(view.itemSize[1]);
                app.settings.saveSetting("Sp_toolbar", "buttonSize", str);
                var str = parseInt(view.itemSpacing[0]) + "," + parseInt(view.itemSpacing[1]);
                app.settings.saveSetting("Sp_toolbar", "buttonSpacing", str);
            } else {
                backupFile.copy(special_file);
                /******拷贝回来*********/
                try {
                    sp_toolbar.drop.removeAll();
                    var xml = new XML(special_file.readd());
                    for (var i = 0; i < xml.Group.children().length(); i++) {
                        droplist.add("item", xml.Group.child(i).@groupName);
                    }
                    sp_toolbar.drop.selection = 0;
                } catch (err) { }
                /*****************/
                var str = app.settings.getSetting("Sp_toolbar", "buttonSize");
                var stra = app.settings.getSetting("Sp_toolbar", "buttonSpacing");
                view.itemSize = [parseInt(str.split(",")[0]), parseInt(str.split(",")[1])];
                view.itemSpacing = [parseInt(stra.split(",")[0]), parseInt(stra.split(",")[1])];
                win.onResize();
            }
        }

        gui.ed01.onChange = function () {
            this.text = parseInt(this.text);
            gui.sl1.value = parseInt(this.text);
            gui.sl1.notify("onChange");
        }

        gui.ed02.onChange = function () {
            this.text = parseInt(this.text);
            gui.sl2.value = parseInt(this.text);
            gui.sl2.notify("onChange");
        }
        gui.ed03.onChange = function () {
            this.text = parseInt(this.text);
            gui.sl3.value = parseInt(this.text) + 5;
            gui.sl3.notify("onChange");
        }
        gui.ed04.onChange = function () {
            this.text = parseInt(this.text);
            gui.sl4.value = parseInt(this.text) + 5;
            gui.sl4.notify("onChange");
        }

        gui.exports.onClick = function () {
            var thisFile = Folder.selectDialog("Select your folder");
            if (!thisFile) return;
            special_file.copy(thisFile.toString() + "/Sp_toolbar_config.xml");
        }

        gui.imports.onClick = function () {
            var thisFile = File.openDialog("Select your config", ["*.xml"]);
            if (!thisFile) return;
            thisFile.copy(special_file);
            alert((special_loc >> special_str.importOk));
            gui.ok.notify("onClick");
            try {
                win.close();
            } catch (err) { }
        }

        gui.update.onClick = function () {
            try {
                var GetVersion = function (scriptname) { // eg expression-toolbox
                    var url = sp_toolbar.ip + "/script/" + scriptname + ".txt";

                    var port = 80;
                    var domain = url.split("/")[0] + ":" + port;
                    var fileName = url.substr(url.lastIndexOf("/") + 1);
                    var call = "GET ";
                    if (url.indexOf("/") < 0) {
                        call += "/";
                    } else {
                        call += url.substr(url.indexOf("/"));
                    }
                    call += " HTTP/1.1\n";
                    call += "Host: " + domain + "\n\n";
                    call += "Connection: close\n\n";

                    var reply = new String();
                    var special_file = new File();
                    special_file.encoding = "binary";
                    special_file.open("w");
                    var conn = new Socket();
                    conn.encoding = "binary";
                    if (conn.open(domain, "binary")) {
                        conn.write(call);
                        reply = conn.read(300);
                        var contentLengthHeader = String(reply.match(/Content-Length: [0-9]*/));
                        var contentLength = contentLengthHeader.substr(16);
                        var headerLength = reply.indexOf("\n\n") + 2;
                        reply += conn.read(contentLength + headerLength - 300);
                        var recievedVersion = reply.toString().substring(reply.toString().lastIndexOf("BeginVersion") + 12, reply.toString().lastIndexOf("EndVersion"));

                        conn.close();
                    } else {
                        reply = "";
                    }

                    return recievedVersion;
                }
                var latest = parseFloat(GetVersion("Sp_toolbar"));
                var nowVersion = parseFloat(version);
                if (latest > nowVersion) {
                    alert((special_loc >> special_str.newVersionFind) + latest.toString());
                    var a = confirm(special_loc >> special_str.whatUpdate);
                    if (a == true) {
                        sp_toolbar.openLink(sp_toolbar.downloadLink + ".jsxbin");
                    }
                } else {
                    alert(special_loc >> special_str.noNew);
                }
            } catch (err) { alert(err.line.toString() + err.toString()) }
        }

        gui.weibo.onClick = function () {
            sp_toolbar.openLink(sp_toolbar.weiboLink);
        }

        gui.parse.onClick = function () {
            try {
                var inFile = File.openDialog("Please select xml", ["*.json"]);
                if (inFile == null) return;
                var content = inFile.readd();
                try {
                    var index = content.indexOf("\"editBtn\":");
                    if (index == -1) return alert(special_loc >> special_str.notFt);
                    var string = content;
                    //~                     var string = content.substring (0,index)+"}}";
                } catch (err) { alert(err) }


                var wowObj = eval('(' + string + ')');


                var jsonToXml = function (json) {
                    var level = 0;
                    var str = '';
                    str += createXml(json, 'xml', level);
                    return str;

                    function createXml(json, name, level) {
                        if (name == 'properties') return '';
                        var str = '';
                        var space = getSpace(level);
                        //如果json为数字或者字符串
                        if (typeof (json) == 'number' || typeof (json) == 'string') {
                            str += space + '<' + name + '>';
                            str += space + '	' + json;
                            str += space + '</' + name + '>';
                        }
                        //如果为数组
                        else if (json instanceof Array) {
                            str += arrayTo(json, name, level);
                        }
                        //如果为json对象
                        else if (json instanceof Object) {
                            str += objectTo(json, name, level);
                        }
                        return str;
                    }//end of createXml
                    function arrayTo(array, name, level) {
                        var str = '';
                        var space = getSpace(level);
                        var len = array.length;
                        for (var i = 0; i < len; i++) {
                            //added for another script
                            //if(array[i].properties){
                            //	name = array[i].properties.type;
                            //}
                            //
                            str += createXml(array[i], name, level);
                        }
                        return str;
                    }//end of arrayTo
                    function objectTo(obj, name, level) {
                        var str = '';
                        var space = getSpace(level);
                        str += space + '<' + name;
                        var cmdContent = [];
                        for (var i in obj) {
                            if (typeof (obj[i]) == 'number' || typeof (obj[i]) == 'string') {
                                if (i == 'cmd') {
                                    cmdContent.push(obj[i].replace(/\"/g, "\'").toString());
                                    continue;
                                }
                                var attr = i;
                                if (i[0] == '_') attr = i.slice(1);
                                if (typeof (obj[i]) == 'string')
                                    str += ' ' + attr.toString() + '=\"' + obj[i].replace(sp_toolbar.regExp, "\'").toString() + '\"';
                                else
                                    str += ' ' + attr.toString() + '=\"' + obj[i].toString() + '\"';
                            }
                        }
                        str += '>';
                        for (var i in obj) {
                            if (typeof (obj[i]) == 'number' || typeof (obj[i]) == 'string' && cmdContent.length == 0) {
                                continue;
                            }
                            if (cmdContent.length == 0)
                                str += createXml(obj[i], i, level + 1);
                            else
                                str += encodeURIComponent(cmdContent.pop());
                        }
                        str += space + '</' + name + '>';
                        return str;
                    }//end of objectTo
                    function getSpace(level) {
                        var space = '\n';
                        for (var k = 0; k < level; k++) {
                            space += '	';
                        }
                        return space;
                    }//end of getSpace
                }

                var str = jsonToXml(wowObj);
                var xmlL = new XML(str);


                /*转换完毕*/
                view.itemSize = [parseInt(xmlL.general.btnsSettings.size.@x), parseInt(xmlL.general.btnsSettings.size.@y)];
                view.itemSpacing = [parseInt(xmlL.general.btnsSettings.spacing.@x), parseInt(xmlL.general.btnsSettings.spacing.@y)];
                gui.sl1.value = view.itemSize[0];
                gui.sl2.value = view.itemSize[1];
                gui.sl3.value = view.itemSpacing[0] + 5;
                gui.sl4.value = view.itemSpacing[1] + 5;
                gui.ed01.text = view.itemSize[0];
                gui.ed02.text = view.itemSize[1];
                gui.ed03.text = view.itemSpacing[0];
                gui.ed04.text = view.itemSpacing[1];
                for (var jj = 0; jj < xmlL.children().length() - 1; jj++) {
                    if (xmlL.child(jj).localName() != "toolbars")
                        break;
                    sp_toolbar.addGroup(xmlL.child(jj).@name.toString());
                    var id = sp_toolbar.getLastGroupId() - 1;
                    for (var ii = 0; ii < xmlL.child(jj).children().length(); ii++) {
                        var xml = xmlL.child(jj).child(ii);
                        var a = xml.@shortName.toString();
                        var b = "1";
                        var c = decodeURIComponent(xml.cmdDefault.toString());
                        var d = xml.cmdDefault.@type.toString();
                        var e = decodeURIComponent(xml.cmdCtrl.toString());
                        var f = xml.cmdCtrl.@type.toString();
                        var g = decodeURIComponent(xml.cmdShift.toString());
                        var h = xml.cmdShift.@type.toString();
                        var i = decodeURIComponent(xml.cmdAlt.toString());
                        var j = xml.cmdAlt.@type.toString();
                        var k = decodeURIComponent(xml.cmdCtrlShift.toString());
                        var l = xml.cmdCtrlShift.@type.toString();
                        var m = decodeURIComponent(xml.cmdCtrlAlt.toString());
                        var n = xml.cmdCtrlAlt.@type.toString();
                        var o = decodeURIComponent(xml.cmdShiftAlt.toString());
                        var p = xml.cmdShiftAlt.@type.toString();
                        var q = decodeURIComponent(xml.cmdCtrlShiftAlt.toString());
                        var r = xml.cmdCtrlShiftAlt.@type.toString();
                        var s = xml.@lastModifier.toString();
                        var t = xml.@longName.toString();
                        var u = xml.@icon.toString();
                        try {
                            if (u != "")
                                u = encodeURIComponent(unescape(wowObj.icons[u].bin));
                        } catch (err) { u = ""; }
                        sp_toolbar.parseButton(id, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u);
                    }
                }
                try {
                    sp_toolbar.drop.removeAll();
                    var xml = new XML(special_file.readd());
                    for (var i = 0; i < xml.Group.children().length(); i++) {
                        droplist.add("item", xml.Group.child(i).@groupName);
                    }
                    sp_toolbar.drop.selection = sp_toolbar.drop.items.length - 1;
                } catch (err) { }
                var xml = new XML(special_file.readd());
                gui.list1.removeAll();
                for (var i = 0; i < xml.Group.children().length(); i++) {
                    gui.list1.add("item", xml.Group.child(i).@groupName);
                }
                if (gui.list1.items.length != 0) {
                    gui.list1.selection = 0;
                    gui.list1.notify("onChange");
                }
                win.onResize();
                alert("Parse complete!");
            } catch (err) { alert(err.toString() + err.line.toString()) }
        }



        var xml = new XML(special_file.readd());
        for (var i = 0; i < xml.Group.children().length(); i++) {
            gui.list1.add("item", xml.Group.child(i).@groupName);
        }

        gui.sl1.value = view.itemSize[0];
        gui.sl2.value = view.itemSize[1];
        gui.sl3.value = view.itemSpacing[0] + 5;
        gui.sl4.value = view.itemSpacing[1] + 5;
        gui.ed01.text = view.itemSize[0];
        gui.ed02.text = view.itemSize[1];
        gui.ed03.text = view.itemSpacing[0];
        gui.ed04.text = view.itemSpacing[1];

        if (groupIndex != -1) {
            gui.list1.selection = groupIndex;
            gui.list2.notify("onChange");
            gui.list2.selection = 0;
            gui.list2.notify("onChange");
        } else {
            gui.list2.parent.enabled = 0;
            gui.ed3.parent.enabled = 0;
        }

        this.w.center();
        this.w.show();

    }   //SettingWin function end

}  // Sp_toolbar function end
