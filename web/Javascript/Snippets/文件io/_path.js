// const path = require("path");

function PurePath() {
  this.sep = "/";
  this.path = "";

  if (arguments.length == 0 ) {
    return this.path;
  } else if (arguments.length == 1) {
    arg = arguments[0];
    arg = arg?arg.toString():"";

  } else {
    let final = [];
    for (var i = 0, l = arguments.length; i < l; i++) {
      final.push(arguments[i]);
    }
    return final.join("\\");
  }

  this.purepath = replaceAll(arg, "\\", this.sep);
  this.name = this.purepath.split(this.sep)[this.purepath.split(this.sep).length - 1];

  this.suffix = this.name.indexOf(".")+1 ? "." + this.name.split(".")[this.name.split(".").length - 1] : "";
  this.suffixes = this.name.indexOf(".")+1 ? "." + this.name.split("."): "";
  this.stem = arg.split(".")[arg.split(".").length - 2];
  this.with_name = "";
  function joinpath() {}
  function replaceAll(text, src, toReplace) {
    while (text.indexOf(src) != "-1") {
      text = text.replace(src, toReplace);
    }
    return text;
  }

  return this;
}

const filepath = ["E:\\Project/_临时ro.iwq.41.js","Project/Snep","",124124,null,["Project/Sne",124124]]
for (const it of filepath) {
  const res = new PurePath(it);
  console.log(res.suffixes);
}


