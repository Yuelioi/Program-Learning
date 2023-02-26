/**
 * 名称：Get Installed Fonts.jsx
 * 功能：获取本机字体(需要ID导出的字体txt，不然也可以自己遍历字体文件夹文件)
 * 油管：https://www.youtube.com/watch?v=1rdQXSx6CgY&ab_channel=NTProductions
 * 日期：
 * 源码（中文）：https://www.yuelili.com/
 * 源码（英文）：https://github.com/NTProductions/jsx-get-installed-fonts/blob/main/Get%20Installed%20Fonts.jsx
 */

// get all fonts
var window = new Window("palette", "Installed Fonts", undefined);
var fontsDD = window.add("dropdownlist", undefined, []);
fontsDD.size = [220, 25];
var randomButton = window.add("button", undefined, "Random");

var bt = new BridgeTalk();
    
bt.target = "indesign";
bt.body = "var fonts = [];\
                var fontsFile = File('~/Desktop/fonts.txt');\
                if(!fontsFile.exists) {\
                fontsFile.open('w');\
                for(var i = 0; i < app.fonts.length; i++) { \
                fontsFile.writeln(app.fonts[i].postscriptName);\
                } \
                fontsFile.close();\
                }";
bt.onResult = function(res) {
// use eval to reconstruct the array
var arr = eval(res.body);
var fontFile = File("~/Desktop/fonts.txt");
fontFile.open("r");
do {
    fontsDD.add("item", fontFile.readln());
    } while(!fontFile.eof);
fontFile.close();
fontsDD.selection = 0;
}

bt.send();

randomButton.onClick = function() {
        fontsDD.selection = Math.floor(Math.random() * fontsDD.items.length);
    }

window.center();
window.show();