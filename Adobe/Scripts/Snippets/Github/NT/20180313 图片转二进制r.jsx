
/**
 * 名称：binary image encoder.jsx
 * 功能：图片转二进制
 * 油管：https://www.youtube.com/watch?v=CVvdykFNXAY&ab_channel=NTProductions
 * 日期：20180313
 * 源码（中文）：https://www.yuelili.com/
 * 源码（英文）：https://github.com/NTProductions/ui-image-testing
 */


var path = '/c/test/';
var f = File(path+"thumb.png");
f.encoding = 'BINARY'
f.open('e');

var binary;
binary = f.read().toSource();

var myFile = new File("/c/test/binary.txt");
        myFile.open("w");
        myFile.encoding = "UTF-8";
        myFile.write(binary);
        myFile.close();

$.writeln(binary);

f.close();