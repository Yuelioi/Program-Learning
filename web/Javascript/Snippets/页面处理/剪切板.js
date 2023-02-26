https://www.ruanyifeng.com/blog/2021/01/clipboard-api.html
- Document.execCommand()方法
    - 异步的 Clipboard API
        - copy事件和paste事件

// *直接创建调用 并删除

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    console.log('Text copied to clipboard');
}

// 调用函数复制文本到剪贴板
copyToClipboard('Hello World');


// *execCommand
document.execCommand('copy')（复制）
document.execCommand('cut')（剪切）
document.execCommand('paste')（粘贴）

const inputElement = document.querySelector('#input');
inputElement.select();
document.execCommand('copy');

const pasteText = document.querySelector('#output');
pasteText.focus();
document.execCommand('paste');

function copyWeb(selector) {
    let copyWrapper = document.querySelector(selector);
    const selection = window.getSelection();
    const range = document.createRange();
    if (selection.rangeCount > 0) selection.removeAllRanges();
    range.selectNode(copyWrapper);
    selection.addRange(range);
    document.execCommand("copy");
}


// *异步的 Clipboard API

(async () => {
    const text = await navigator.clipboard.readText();
    console.log(text);
})();


// *Clipboard 对象