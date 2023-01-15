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


// 根据选择器(列表) 打印子元素里的内容

function getListContent(selector) {
  let list = document.querySelectorAll(selector);
  let out = "";
  list.forEach(element => {
    out += element.innerText + "\n";
  });

  console.log(out);
}

getListContent("#built-in-functions > div > table > tbody > tr > td:nth-child(n) > div > div:nth-child(n) > a > code > span")
