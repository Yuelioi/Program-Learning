// 字符串全部替换
function replaceAll(text, src, toReplace) {
  while (text.indexOf(src) != "-1") {
    text = text.replace(src, toReplace);
  }
  return text;
}
