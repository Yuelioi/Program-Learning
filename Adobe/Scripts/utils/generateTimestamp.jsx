function getTime() {
    var myDate = new Date();
    var thisYear = myDate.getFullYear();//获取当前年份(2位)
    var thisMonth = myDate.getMonth();
    var thisDate = myDate.getDate(); //获取当前日(1-31)
    var thisHours = myDate.getHours(); //获取当前小时数(0-23)
    var thisMinutes = myDate.getMinutes(); //获取当前分钟数(0-59)
    var thisSeconds = myDate.getSeconds(); //获取当前秒数(0-59)
    var thisTime = thisYear + "/" + (parseInt(thisMonth) + 1) + "/" + thisDate + "/" + thisHours + ":" + thisMinutes;//+":"+thisSeconds;
    return thisTime;
}
alert(getTime())