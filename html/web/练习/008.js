(function () {
    let currentUrl = window.location.href;
    if (currentUrl.indexOf("bilibili") !== -1) {
        let bar = document.querySelector(".toolbar-left");
        let btn = document.createElement("button");
        btn.id = "mybtn";
        btn.innerHTML = "Click me";
        btn.onclick = function () {
            alert("Hello");
        };
        let collect = document.querySelector(".collect");

        bar.addEventListener("DOMNodeInserted", function (e) {
            collect.parentElement.insertBefore(btn, collect);
        });
    } else if (currentUrl.indexOf("freecodecamp") !== -1) {
        var restart = document.querySelector(".restart-step-tab");
        let btn = document.createElement("button");
        btn.id = "mybtn";
        btn.innerHTML = "Click me";
        btn.onclick = function () {
            alert("Hello");
        };


        // function build() {
        //     restart.parentElement.insertBefore(btn, restart);
        // }
 

        setTimeout("restart.parentElement.insertBefore(btn, restart);", 5000);
    
})();