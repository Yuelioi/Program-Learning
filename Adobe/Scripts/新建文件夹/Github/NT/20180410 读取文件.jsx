// File Reader
// read from 3 file types [.txt, .json, .xml] to change properties of a composition

"object" != typeof JSON && (JSON = {}), function () { "use strict"; var rx_one = /^[\],:{}\s]*$/, rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, rx_four = /(?:^|:|,)(?:\s*\[)+/g, rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta, rep; function f(t) { return t < 10 ? "0" + t : t } function this_value() { return this.valueOf() } function quote(t) { return rx_escapable.lastIndex = 0, rx_escapable.test(t) ? '"' + t.replace(rx_escapable, function (t) { var e = meta[t]; return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + t + '"' } function str(t, e) { var r, n, o, u, f, a = gap, i = e[t]; switch (i && "object" == typeof i && "function" == typeof i.toJSON && (i = i.toJSON(t)), "function" == typeof rep && (i = rep.call(e, t, i)), typeof i) { case "string": return quote(i); case "number": return isFinite(i) ? String(i) : "null"; case "boolean": case "null": return String(i); case "object": if (!i) return "null"; if (gap += indent, f = [], "[object Array]" === Object.prototype.toString.apply(i)) { for (u = i.length, r = 0; r < u; r += 1)f[r] = str(r, i) || "null"; return o = 0 === f.length ? "[]" : gap ? "[\n" + gap + f.join(",\n" + gap) + "\n" + a + "]" : "[" + f.join(",") + "]", gap = a, o } if (rep && "object" == typeof rep) for (u = rep.length, r = 0; r < u; r += 1)"string" == typeof rep[r] && (o = str(n = rep[r], i)) && f.push(quote(n) + (gap ? ": " : ":") + o); else for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (o = str(n, i)) && f.push(quote(n) + (gap ? ": " : ":") + o); return o = 0 === f.length ? "{}" : gap ? "{\n" + gap + f.join(",\n" + gap) + "\n" + a + "}" : "{" + f.join(",") + "}", gap = a, o } } "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () { return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null }, Boolean.prototype.toJSON = this_value, Number.prototype.toJSON = this_value, String.prototype.toJSON = this_value), "function" != typeof JSON.stringify && (meta = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, JSON.stringify = function (t, e, r) { var n; if (indent = gap = "", "number" == typeof r) for (n = 0; n < r; n += 1)indent += " "; else "string" == typeof r && (indent = r); if ((rep = e) && "function" != typeof e && ("object" != typeof e || "number" != typeof e.length)) throw new Error("JSON.stringify"); return str("", { "": t }) }), "function" != typeof JSON.parse && (JSON.parse = function (text, reviver) { var j; function walk(t, e) { var r, n, o = t[e]; if (o && "object" == typeof o) for (r in o) Object.prototype.hasOwnProperty.call(o, r) && (void 0 !== (n = walk(o, r)) ? o[r] = n : delete o[r]); return reviver.call(t, e, o) } if (text = String(text), rx_dangerous.lastIndex = 0, rx_dangerous.test(text) && (text = text.replace(rx_dangerous, function (t) { return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4) })), rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({ "": j }, "") : j; throw new SyntaxError("JSON.parse") }) }();


// global vars
var file = new File;
var check = 0;

// UI
var mainWindow = new Window("palette", "File Reader", undefined);
mainWindow.orientatizzaaq1on = "column";

var groupOne = mainWindow.add("group", undefined, "groupOne");
groupOne.orientation = "row";
var fileLocBox = groupOne.add("edittext", undefined, "Selected File Location");
fileLocBox.size = [150, 20];
var getFileButton = groupOne.add("button", undefined, "File...");
getFileButton.helpTip = "Select a .txt, .json, or .xml file to change the comp";

var groupTwo = mainWindow.add("group", undefined, "groupTwo");
groupTwo.orientation = "row";
var applyButton = groupTwo.add("button", undefined, "Apply");

mainWindow.center();
mainWindow.show();

getFileButton.onClick = function () {
    file = file.openDlg("Open a file", "Acceptable Files:*.txt,*.json,*xml");
    fileLocBox.text = file.fsName;
    check = 1;
}

applyButton.onClick = function () {
    if (check == 0) {
        alert("Please select a file");
        return false;
    } else {
        //app.beginUndoGroup("Comp Changes");
        var fileExtension = fileLocBox.text;
        var fileData;

        if (fileExtension.substring(fileExtension.length - 4, fileExtension.length) == "json") {
            fileData = readJson();
        } else {
            switch (fileExtension.substring(fileExtension.length - 3, fileExtension.length)) {
                case "txt":
                    fileData = readTxt();
                    break;
                case "xml":
                    fileData = readXml();
                    break;
            }
        }
        changeComp(fileData);
    }
    alert("done");
}

function readTxt() {
    var txtArray = [];
    var currentLine;
    file.open("r");
    while (!file.eof) {
        currentLine = file.readln();
        txtArray.push(currentLine);
    }
    file.close();

    var txtObj = {
        compName: txtArray[0],
        bgColour: txtArray[1],
        lensFlare: txtArray[2]
    };

    return txtObj;
}

function readJson() {
    var currentLine;
    var jsonStuff = [];
    file.open("r");
    while (!file.eof) {
        currentLine = file.readln();
        jsonStuff.push(currentLine);
    }
    file.close();
    jsonStuff = jsonStuff.join("");
    var parsedJson = JSON.parse(jsonStuff);

    return parsedJson;
}

function readXml() {
    file.open("r");
    var xmlString = file.read();
    var myXml = new XML(xmlString);
    file.close();
    return myXml;
}

function changeComp(data) {
    var comp = app.project.activeItem;
    comp.name = data.compName;

    changeBgColour(comp, data.bgColour.toString());

    if (data.lensFlare == "Yes") {
        addLensFlare(comp);
    }
}

function changeBgColour(comp, colour) {
    colour = colour.substring(1, colour.length - 1);
    var colourArray = colour.split(", ");
    comp.bgColor = [colourArray[0], colourArray[1], colourArray[2]];
}

function addLensFlare(comp) {
    var lensFlare = comp.layers.addSolid([0, 0, 0], "OF", comp.width, comp.height, 1, comp.duration);
    lensFlare.Effects.addProperty("VIDEOCOPILOT OpticalFlares");
    var renderProp = lensFlare("Effects")("Optical Flares")("Render Mode");
    renderProp.setValue(2);
}