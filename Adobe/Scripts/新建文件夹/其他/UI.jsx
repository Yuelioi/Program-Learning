
// 单击列表item 做出反应
// var w = new Window('dialog{ margins : 0 , spacing : 2 , properties : {},\
// lb : ListBox{ alignment : ["fill","fill"] , preferredSize : [200,-1] , properties : { items : ["menu1","menu2","menu3"] } }\
// }');

// w.lb.onChange = function () {
//     if (!this.selection) return; //選択がなかったら何もしない
//     w.close(); //実際のコマンド実行する前に閉じとく。
//     //好きな関数を実行
//     switch (this.selection.index) {
//         case 0: alert("I am menu1!!"); break;
//         case 1: alert("I am menu2!!"); break;
//         case 2: alert("I am menu3!!"); break;
//         default: alert("コマンドが定義されてません");
//     }
// }

// w.show();


// 快捷键隐藏面板 或者鼠标移除隐藏面板
var w = new Window('palette{ margins : 0 , spacing : 2 , properties : {},\
lb : ListBox{ alignment : ["fill","fill"] , preferredSize : [200,-1] , properties : { items : ["menu1","menu2","menu3"] } }\
}');

w.lb.onChange = function () {
    if (!this.selection) return; //選択がなかったら何もしない
    w.close(); //実際のコマンド実行する前に閉じとく。
    //好きな関数を実行
    switch (this.selection.index) {
        // case 0: alert("I am menu1!!"); break;
        case 1: alert("I am menu2!!"); break;
        case 2: alert("I am menu3!!"); break;
        default: alert("コマンドが定義されてません");
    }
}

// w.onDeactivate = function () {
//     this.close(); //開発中には邪魔なので今はコメントアウトしておく
//     $.writeln("onDeactivate"); //代わりにコンソールへの表示をする
// }


// https://extendscript.docsforadobe.dev/user-interface-tools/window-object.html?highlight=addEventListener#addeventlistener
// https://www.yuelili.com/?p=18102
w.addEventListener("keydown", function (e) {
    if (e.keyName == "Escape") this.close();
  
});

w.show();