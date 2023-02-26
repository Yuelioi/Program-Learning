function replaceAll(text, src, toReplace) {
  while (text.indexOf(src) != "-1") {
    text = text.replace(src, toReplace);
  }
  return text;
}

function format_file_name(name, to_replace) {
  // 格式化文件路径
  dist = ['/', '\\', ':', '*', "?", '"', '<', '>', '|'];
  for (let chara of dist) {
    name = replaceAll(name, chara, to_replace);
  }
  return name;
}


console.log(format_file_name("新建:?文件:.md","_")) // 新建__文件_.md