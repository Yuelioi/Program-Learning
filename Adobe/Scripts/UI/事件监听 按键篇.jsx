// 源码:https://www.yuelili.com/?p=18102

var w = new Window('palette{ margins : 0 , spacing : 2 , properties : {},\
lb : ListBox{ alignment : ["fill","fill"] , preferredSize : [200,-1] , properties : { items : ["menu1","menu2","menu3"] } }\
}');

w.addEventListener("keydown", function (e) {
    if (e.keyName == "Escape") this.close();

});
w.show();
