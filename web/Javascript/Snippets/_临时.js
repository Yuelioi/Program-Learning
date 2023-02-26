// 根据选择器 打印li里的内容

function getListContent(selector) {
  let list = document.querySelector(selector);
  let childs = list.querySelectorAll("li");
  let out = "";

  childs.forEach(element => {
    // out += element.innerText + "\n";
    out += filenameRepair(element.innerText.split("\n")[1])+ "\n"; // B站获取视频列表
  });

  console.log(out);
}

// 替换所有非法文件名字符
function filenameRepair(filename){
  banList = ['"',"*","|",">","?","\\","/",":"];
  banList.forEach(element => {
    filename = filename.replace(element," ")
  });
  return filename.trim();
}

getListContent(".cur-list")