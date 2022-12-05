// 某些网页pre没有code, 因此在一键翻译时,代码也被翻译了
let pres = document.querySelectorAll("pre");
for (let pe of pres) {
    pe.innerHTML = "<code>" + pe.innerHTML +"</code>"
}
