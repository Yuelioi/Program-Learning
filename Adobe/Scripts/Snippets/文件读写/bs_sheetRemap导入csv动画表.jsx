/*
=========================================================================================================
bs_sheetRemap.jsx

CLIP STUDIO PAINTからタイムシート出力したcsvデータを読み込んで、AEのタイムリマップに変換するスクリプトです。
使い方はこちらをご覧ください→ https://youtu.be/umE-cs-RD0w

for Adobe After Effects CC2014
Author: BANNO Yuki
=========================================================================================================
*/

var undoStr = "bs_sheetRemap";
var activeComp = app.project.activeItem;


function showDialog() {
    var w = new Window("dialog", "bs_sheetRemap", [0, 0, 300, 500]);
    w.center();
    var list = w.add("listbox", [10, 10, 300 - 10, 380]);
    for (var i = 1; i < Csv_Data[1].split(",").length; i++) {
        var celName = Csv_Data[1].replace(/"/g, "").split(",")[i];
        list.add("item", celName);
    }
    var btnOK = w.add("button", [10, 400, 300 - 10, 440], "OK", { name: 'ok' });
    var btnCancel = w.add("button", [10, 450, 300 - 10, 490], "cancel", { name: 'cancel' });
    list.selection = 0;
    alert(this.name)
    this.listItems = function () { return (list.items); }
    alert(this.listItems)
    this.result = function () { return (list.selection.index); }
    this.content = function () { return (list.selection.text); }
    this.numCells = function () { return (list.items.length); }
    this.show = function () { return (w.show() < 2); }
}

function get_data() {

    frArr = []
    celArr = []
    karaArr = []

    var firstCel = Csv_Data[2].replace(/"/g, "").split(",");
    if (firstCel[celID + 1] == "") { //一コマ目が空セルの場合
        frArr.push(0);
        celArr.push(0);
        karaArr.push(0);
    }

    for (i = 2; i < Csv_Data.length; i++) {
        var CKcel = Csv_Data[i].replace(/"/g, "").split(",");
    }

    var errFlag = 0;
    if (CKcel[celID + 1] != "") {
        frArr.push((CKcel[0] - 1) / 24);
        if (CKcel[celID + 1] == "×") {//空セルの場合
            celArr.push(0);
            karaArr.push(frArr.length - 1);
        }
        else if (isFinite(CKcel[celID + 1])) {
            celArr.push((CKcel[celID + 1] - 1) / 24);
        } else {
            errFlag = 1;
            // break;
        }
    }


}



function apply_data() {

    if (errFlag == 0) {
        if (Math.max.apply(null, celArr) < Lay.source.duration) { //セル指定の最大値が、レイヤーソースの尺を越えていないことを確認

            Lay.timeRemapEnabled = true;
            Lay.timeRemap.removeKey(2);
            Lay.timeRemap.setValuesAtTimes(frArr, celArr);
            for (i = 1; i <= Lay.timeRemap.numKeys; i++) {
                Lay.timeRemap.setInterpolationTypeAtKey(i, KeyframeInterpolationType.LINEAR, KeyframeInterpolationType.HOLD);
            }

            //空セルの分をブラインドエフェクトで非表示にする-------------------------------------------------------------------


            if (karaArr != "") {
                var karaEF = Lay.effect.addProperty("ADBE Venetian Blinds");
                karaEF(1).setValueAtTime(0, 0);
                for (i = 0; i <= karaArr.length - 1; i++) {
                    karaEF(1).setValueAtTime(frArr[karaArr[i]], 100);
                    if (frArr[karaArr[i] + 1]) {
                        karaEF(1).setValueAtTime(frArr[karaArr[i] + 1], 0);
                    }
                }
                for (i = 1; i <= karaEF(1).numKeys; i++) {
                    karaEF(1).setInterpolationTypeAtKey(i, KeyframeInterpolationType.LINEAR, KeyframeInterpolationType.HOLD);
                }
            }

            //レイヤーのイン点とアウト点の処理-------------------------------------------------------------------

            Lay.outPoint = activeComp.duration;
            if (karaArr[0] == 0) {
                Lay.inPoint = frArr[1];
            }
            if (karaArr[karaArr.length - 1] == frArr.length - 1) {
                Lay.outPoint = frArr[frArr.length - 1]
            };


        } else {
            alert("レイヤーのソースの長さが、セルの枚数に対して足りません");
        }
    } else {
        alert("セル指定に、数値、空セル（×）以外のものが含まれています。タイムシートを確認してください");
    }
}

if (activeComp instanceof CompItem) {

    var Lay = activeComp.selectedLayers[0];


    var fileName = File.openDialog("Select csv file", "");
    if (fileName) {
        var myFile = new File(fileName);
        if (myFile.open("r")) {
            var Csv_Data = new Array();

            while (!myFile.eof) {
                Csv_Data.push(myFile.readln());
            }


            var dlg = new showDialog;
            if (dlg.show() == true) {
                app.beginUndoGroup(undoStr);

                var celID = dlg.result();
                var celNAME = dlg.content()

                var frArr = new Array();
                var celArr = new Array();
                var karaArr = new Array();
                var ITEMS = dlg.listItems()

                var shiftHeld = ScriptUI.environment.keyboardState.shiftKey;
                // //キー情報の配列をとる-------------------------------------------------------------------
                alert(dlg.numCells())
                if (shiftHeld) {
                    for (var i = 0; i < dlg.numCells(); i++) {
                        celID = i

                        for (var j = 1; j <= activeComp.layers.length; j++) {
                            if (activeComp.layers[j].name == ITEMS[i].text) {
                                Lay = activeComp.layers[j]

                            }
                        }
                        alert(Lay.name)
                        get_data()
                        // apply_data()
                    }

                } else {
                    get_data()
                    apply_data()
                }

                app.endUndoGroup();
            } else {
                //alert("リスト表示時にキャンセルされました");
            }
        }
    } else {
        //alert("csv選択時にキャンセルされました");
    }
}