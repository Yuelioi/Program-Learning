https://blog.csdn.net/handsomeAndHero/article/details/125315491

```javascript
;window.addEventListener("load", function () {
  let searchID = localStorage.getItem("searchID");

  if (searchID) {
    document.querySelector("#" + searchID).click();
  };
  let tp = document.querySelector("#search-list > div.search-group.group-a.s-current > ul");
  tp.addEventListener("click", function (e) {
    localStorage.setItem("searchID", e.target.id);
  })
})
```
