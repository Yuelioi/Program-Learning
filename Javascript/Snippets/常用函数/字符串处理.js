// 字符串全部替换
function replaceAll(text, src, toReplace) {
  while (text.indexOf(src) != "-1") {
    text = text.replace(src, toReplace);
  }
  return text;
}


// 字符串正则替换 使用函数处理
function replaceWithFun(str,reg){
  // 前置: replaceAll函数
  function dealSign() {
    // 对所有匹配内容进行处理
    // 示例为匹配内容 空格换为html符号
    var args = arguments;
    let res = replaceAll(args[0]," ","&nbsp;")
    return res;
  }
  return str.replace(reg, dealSign);
}

// 替换所有非法文件名字符
function filenameRepair(filename){
  banList = ['"',"*","|",">","?","\\","/",":"];
  banList.forEach(element => {
    filename = filename.replace(element," ")
  });
  return filename.trim();
}