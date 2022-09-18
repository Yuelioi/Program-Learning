

s1 = "#sidebar-quicklinks > div > div:nth-child(3) > ol > li:nth-child(3) > details > ol > li:nth-child(n) > a > code"
s2 = "#sidebar-quicklinks > div > div:nth-child(3) > ol > li:nth-child(4) > details > ol > li:nth-child(n) > a > code"
const selector = [s1,s2];
let out = ""
let list = document.querySelectorAll(selector);
selector.forEach(s=>{
  let list = document.querySelectorAll(s);
  list.forEach(element => {
    out +=element.innerHTML +"\n";
  })
})

console.log(out)


