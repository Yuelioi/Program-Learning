// 名称：复制信息到系统剪切板
// 作者: Adobe 社区
// 源码：https://www.yuelili.com/?p=10424

// from Adobe 社区
function copyToClipboard(string) {
    var cmd, isWindows;
    // 判断是不是字符串
    string = (typeof string === 'string') ? string : string.toString();
    isWindows = $.os.indexOf('Windows') !== -1;

    //OS的命令
    cmd = 'echo "' + string + '" | pbcopy';
    //windows的cmd命令
    if (isWindows) {
        cmd = 'cmd.exe /c start /min /b cmd.exe /c "echo ' + string + ' | clip"';
    }

    system.callSystem(cmd);
}
// 比如 把AE版本名复制到粘贴板
copyToClipboard("hello world!")

