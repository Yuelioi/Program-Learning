// url 剔除参数
function getSourceUrl(url) {
  if (url.indexOf("?") === -1) {
    return url;
  } else {
    return url.substring(0, url.indexOf("?"));
  }
}



const url = new URL('http://xxx?type=list')
const paramsStr = url.search.slice(1)
const params = new URLSearchParams(paramsStr)
params.get('type') // list