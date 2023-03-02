//取得缓存文件夹的位置（使用预设函数）
var CacheFilePath = app.preferences.getPrefAsString("Disk Cache Controls", "Folder 7") + "\\Adobe";

//将单斜杠转为双斜杠
var FullCacheFilePath = CacheFilePath.split('\\').join("\\\\");

removeFolder(FullCacheFilePath);

function removeFolder(path) {
    var folder = new Folder(path);
    var files = folder.getFiles();
    for (var i = 0; i < files.length; i++) {
        var f = files[i];

        //如果该数组位置指向的类型是文件就移除
        if (f instanceof File) {
            f.remove();
        }

        //如果该数组位置指向的类型是文件夹就进入文件夹判断
        else if (f instanceof Folder) {
            removeFolder(f.fullName, true);
        }
    }
}
