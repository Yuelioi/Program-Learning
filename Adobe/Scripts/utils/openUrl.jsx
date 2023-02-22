// https://www.yuelili.com/?p=13025

function urlOpen(url) {
    $.writeln(system.osName);
    if ($.os.indexOf("Windows") != -1) {
        //Windows系统
        system.callSystem("cmd.exe /c\"start " + url + "\"");
    } else {
        //MAC系统
        system.callSystem("open http://" + url + "\"");
    }
}
//调用
urlOpen('https://baidu.com')


AE脚本、 AE脚本实战