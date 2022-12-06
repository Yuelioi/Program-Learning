// 字符串全部替换
function replaceAll(text, src, toReplace) {
  while (text.indexOf(src) != "-1") {
    text = text.replace(src, toReplace);
  }
  return text;
}


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
