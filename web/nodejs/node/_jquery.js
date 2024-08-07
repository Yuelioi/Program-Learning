jQuery 语法是通过选取 HTML 元素，并对选取的元素执行某些操作。

基础语法： $(selector).action()

美元符号定义 jQuery
选择符（selector）"查询"和"查找" HTML 元素
jQuery 的 action() 执行对元素的操作


$(this).hide() - 隐藏当前元素

$("p").hide() - 隐藏所有 <p> 元素

$("p.test").hide() - 隐藏所有 class="test" 的 <p> 元素

$("#test").hide() - 隐藏 id="test" 的元素




$(document).ready(function(){
    // 执行代码
});

// OR
$(function(){
    // 执行代码
});
// 相当于原生的DOMConetentLoaded


JavaScript 入口函数:


window.onload = function () {
    // 执行代码
}



- DOMContentLoaded

	interactive.当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完成加载。

- load

	complete.当一个资源及其依赖资源已完成加载时，将触发load事件。

