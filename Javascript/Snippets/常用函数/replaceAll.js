function replaceAll(text, src, toReplace) {
  // 全部替换
  while (text.indexOf(src) != "-1") {
    text = text.replace(src, toReplace);
  }
  return text;
}