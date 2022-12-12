// url 剔除参数
function getSourceUrl(url) {
  if (url.indexOf("?") === -1) {
    return url;
  } else {
    return url.substring(0, url.indexOf("?"));
  }
}

// 某些网页pre没有code, 因此在一键翻译时,代码也被翻译了
let pres = document.querySelectorAll("pre");
for (let pe of pres) {
    pe.innerHTML = "<code>" + pe.innerHTML +"</code>"
}



const url = new URL('http://xxx?type=list')
const paramsStr = url.search.slice(1)
const params = new URLSearchParams(paramsStr)
params.get('type') // list