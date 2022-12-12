// 根据选择器 打印li里的内容

function getListContent(selector) {
  let list = document.querySelector(selector);
  let childs = list.querySelectorAll("li");
  let out = "";

  childs.forEach(element => {
    out += element.innerText + "\n";
  });

  console.log(out);
}


// 根据选择器 打印li里的内容

function getListContent(selector) {
  let list = document.querySelector(selector);
  let childs = list.querySelectorAll("li");
  let out = "";

  childs.forEach(element => {
    // out += element.innerText + "\n";
    out += element.innerText.split("\n")[1]+ "\n"; // B站获取视频列表
  });

  console.log(out);
}

getListContent(".cur-list")
