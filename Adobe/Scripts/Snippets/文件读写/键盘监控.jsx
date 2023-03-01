/**
 * 名称：检测键盘状态，并弹出按键名称
 * source:https://www.youtube.com/watch?v=UBqdWdDmvao
 * web:https://www.yuelili.com/?p=18460
**/
var window = new Window("palette", "", undefined);
var text = window.add("statictext", undefined, "Detect keyboard input");

window.center();
window.show();

var inUI = true;

function inside() {
    inUI = true;
}

function outside() {
    inUI = false;
}

window.addEventListener('mouseover', inside);
window.addEventListener('mouseout', outside);
window.addEventListener('keydown', alertKey);

function alertKey() {
    var myKeyState = ScriptUI.environment.keyboardState;

    var pressedString = myKeyState.keyName;

    if (myKeyState.altKey) {
        pressedString = "Alt + " + pressedString;
    }

    if (myKeyState.ctrlKey) {
        pressedString = "Ctrl + " + pressedString;
    }

    if (myKeyState.shiftKey) {
        pressedString = "Shift + " + pressedString;
    }

    if (myKeyState.keyName == "F" && myKeyState.shiftKey == true) {
        alert("You pressed Shift + F");
    }

    if (myKeyState.keyName) {
        alert("You pressed " + pressedString);
    }

}

