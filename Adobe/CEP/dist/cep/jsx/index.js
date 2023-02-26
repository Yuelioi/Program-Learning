(function (thisObj) {// ----- EXTENDSCRIPT INCLUDES ------ //"object"!=typeof JSON&&(JSON={}),function(){"use strict";var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta,rep;function f(t){return t<10?"0"+t:t}function this_value(){return this.valueOf()}function quote(t){return rx_escapable.lastIndex=0,rx_escapable.test(t)?'"'+t.replace(rx_escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var r,n,o,u,f,a=gap,i=e[t];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(t)),"function"==typeof rep&&(i=rep.call(e,t,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,f=[],"[object Array]"===Object.prototype.toString.apply(i)){for(u=i.length,r=0;r<u;r+=1)f[r]=str(r,i)||"null";return o=0===f.length?"[]":gap?"[\n"+gap+f.join(",\n"+gap)+"\n"+a+"]":"["+f.join(",")+"]",gap=a,o}if(rep&&"object"==typeof rep)for(u=rep.length,r=0;r<u;r+=1)"string"==typeof rep[r]&&(o=str(n=rep[r],i))&&f.push(quote(n)+(gap?": ":":")+o);else for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(o=str(n,i))&&f.push(quote(n)+(gap?": ":":")+o);return o=0===f.length?"{}":gap?"{\n"+gap+f.join(",\n"+gap)+"\n"+a+"}":"{"+f.join(",")+"}",gap=a,o}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value),"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(t,e,r){var n;if(gap="",indent="","number"==typeof r)for(n=0;n<r;n+=1)indent+=" ";else"string"==typeof r&&(indent=r);if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){var j;function walk(t,e){var r,n,o=t[e];if(o&&"object"==typeof o)for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(void 0!==(n=walk(o,r))?o[r]=n:delete o[r]);return reviver.call(t,e,o)}if(text=String(text),rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();// ---------------------------------- //// ----- EXTENDSCRIPT PONYFILLS -----function __objectFreeze(obj) { return obj; }function __isArray(arr) { try { return arr instanceof Array; } catch (e) { return false; } };// ---------------------------------- //var version = "0.0.1";

var config = {
  version: version,
  id: "com.bolt.cep",
  displayName: "Bolt CEP",
  symlink: "local",
  port: 3010,
  servePort: 5000,
  startingDebugPort: 8860,
  extensionManifestVersion: 6.0,
  requiredRuntimeVersion: 9.0,
  hosts: [{
    name: "AEFT",
    version: "[0.0,99.9]"
  }, {
    name: "PPRO",
    version: "[0.0,99.9]"
  }, {
    name: "ILST",
    version: "[0.0,99.9]"
  }, {
    name: "PHXS",
    version: "[0.0,99.9]"
  }, {
    name: "FLPR",
    version: "[0.0,99.9]"
  }],
  type: "Panel",
  iconDarkNormal: "./src/assets/light-icon.png",
  iconNormal: "./src/assets/dark-icon.png",
  iconDarkNormalRollOver: "./src/assets/light-icon.png",
  iconNormalRollOver: "./src/assets/dark-icon.png",
  parameters: ["--v=0", "--enable-nodejs", "--mixed-context"],
  width: 500,
  height: 550,
  panels: [{
    mainPath: "./main/index.html",
    name: "main",
    panelDisplayName: "Bolt CEP",
    autoVisible: true,
    width: 600,
    height: 650
  }],
  build: {
    jsxBin: "off",
    // "off" | "copy" | "replace";
    sourceMap: true
  },
  zxp: {
    country: "US",
    province: "CA",
    org: "MyCompany",
    password: "mypassword",
    tsa: "http://timestamp.digicert.com/",
    sourceMap: false,
    jsxBin: "off"
  },
  installModules: [],
  copyAssets: ["public"],
  copyZipAssets: []
};

var ns = config.id;

var helloError = function helloError(str) {
  // Intentional Error for Error Handling Demonstration
  
  strr;
};
var helloNum$1 = function helloNum(n) {
  alert("ExtendScript received a number: ".concat(n.toString()));
  return n;
};
var helloArrayStr = function helloArrayStr(arr) {
  alert("ExtendScript received an array of ".concat(arr.length, " strings: ").concat(arr.toString()));
  return arr;
};
var helloObj = function helloObj(obj) {
  alert("ExtendScript received an object: ".concat(JSON.stringify(obj)));
  return {
    y: obj.height,
    x: obj.width
  };
};

var helloWorld$4 = function helloWorld() {
  alert("Hello from After Effects!");
  app.project.activeItem;
};

var aeft = /*#__PURE__*/__objectFreeze({
  __proto__: null,
  helloError: helloError,
  helloNum: helloNum$1,
  helloArrayStr: helloArrayStr,
  helloObj: helloObj,
  helloWorld: helloWorld$4
});

var helloWorld$3 = function helloWorld() {
  alert("Hello from Illustrator");
  app.activeDocument.path;
};

var ilst = /*#__PURE__*/__objectFreeze({
  __proto__: null,
  helloError: helloError,
  helloNum: helloNum$1,
  helloArrayStr: helloArrayStr,
  helloObj: helloObj,
  helloWorld: helloWorld$3
});

var helloWorld$2 = function helloWorld() {
  alert("Hello from Animate");
};

var anim = /*#__PURE__*/__objectFreeze({
  __proto__: null,
  helloWorld: helloWorld$2
});

function _typeof$1(obj) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$1(obj); }

/**
 * @class SystemPath
 * Stores operating-system-specific location constants for use in the
 * \c #CSInterface.getSystemPath() method.
 * @return A new \c SystemPath object.
 */
function SystemPath() {}

/** The path to user data.  */
SystemPath.USER_DATA = "userData";

/** The path to common files for Adobe applications.  */
SystemPath.COMMON_FILES = "commonFiles";

/** The path to the user's default document folder.  */
SystemPath.MY_DOCUMENTS = "myDocuments";

/** @deprecated. Use \c #SystemPath.Extension.  */
SystemPath.APPLICATION = "application";

/** The path to current extension.  */
SystemPath.EXTENSION = "extension";

/** The path to hosting application's executable.  */
SystemPath.HOST_APPLICATION = "hostApplication";

/**
 * @class MenuItemStatus
 * Stores flyout menu item status
 *
 * Since 5.2.0
 *
 * @param menuItemLabel  The menu item label.
 * @param enabled        True if user wants to enable the menu item.
 * @param checked        True if user wants to check the menu item.
 *
 * @return MenuItemStatus object.
 */
function MenuItemStatus(menuItemLabel, enabled, checked) {
  this.menuItemLabel = menuItemLabel;
  this.enabled = enabled;
  this.checked = checked;
}

/**
 * @class ContextMenuItemStatus
 * Stores the status of the context menu item.
 *
 * Since 5.2.0
 *
 * @param menuItemID     The menu item id.
 * @param enabled        True if user wants to enable the menu item.
 * @param checked        True if user wants to check the menu item.
 *
 * @return MenuItemStatus object.
 */
function ContextMenuItemStatus(menuItemID, enabled, checked) {
  this.menuItemID = menuItemID;
  this.enabled = enabled;
  this.checked = checked;
}
//------------------------------ CSInterface ----------------------------------

/**
 * @class CSInterface
 * This is the entry point to the CEP extensibility infrastructure.
 * Instantiate this object and use it to:
 * <ul>
 * <li>Access information about the host application in which an extension is running</li>
 * <li>Launch an extension</li>
 * <li>Register interest in event notifications, and dispatch events</li>
 * </ul>
 *
 * @return A new \c CSInterface object
 */
function CSInterface() {}

/**
 * User can add this event listener to handle native application theme color changes.
 * Callback function gives extensions ability to fine-tune their theme color after the
 * global theme color has been changed.
 * The callback function should be like below:
 *
 * @example
 * // event is a CSEvent object, but user can ignore it.
 * function OnAppThemeColorChanged(event)
 * {
 *    // Should get a latest HostEnvironment object from application.
 *    var skinInfo = JSON.parse(window.__adobe_cep__.getHostEnvironment()).appSkinInfo;
 *    // Gets the style information such as color info from the skinInfo,
 *    // and redraw all UI controls of your extension according to the style info.
 * }
 */
CSInterface.THEME_COLOR_CHANGED_EVENT = "com.adobe.csxs.events.ThemeColorChanged";

/** The host environment data object. */
CSInterface.prototype.hostEnvironment = window.__adobe_cep__ ? JSON.parse(window.__adobe_cep__.getHostEnvironment()) : null;

/** Retrieves information about the host environment in which the
 *  extension is currently running.
 *
 *   @return A \c #HostEnvironment object.
 */
CSInterface.prototype.getHostEnvironment = function () {
  this.hostEnvironment = JSON.parse(window.__adobe_cep__.getHostEnvironment());
  return this.hostEnvironment;
};

/** Loads binary file created which is located at url asynchronously
 *
 *@param urlName url at which binary file is located. Local files should start with 'file://'
 *@param callback Optional. A callback function that returns after binary is loaded
 *@example
 * To create JS binary use command ./cep_compiler test.js test.bin
 * To load JS binary asyncronously
 *   var CSLib = new CSInterface();
 *   CSLib.loadBinAsync(url, function () { });
 */
CSInterface.prototype.loadBinAsync = function (urlName, callback) {
  try {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "arraybuffer"; // make response as ArrayBuffer
    xhr.open("GET", urlName, true);
    xhr.onerror = function () {
      console.log("Unable to load snapshot from given URL");
      return false;
    };
    xhr.send();
    xhr.onload = function () {
      window.__adobe_cep__.loadSnapshot(xhr.response);
      if (typeof callback === "function") {
        callback();
      } else if (typeof callback !== "undefined") {
        console.log("Provided callback is not a function");
      }
    };
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
};

/** Loads binary file created synchronously
 *
 *@param pathName the local path at which binary file is located
 *@example
 * To create JS binary use command ./cep_compiler test.js test.bin
 * To load JS binary syncronously
 *   var CSLib = new CSInterface();
 *   CSLib.loadBinSync(path);
 */
CSInterface.prototype.loadBinSync = function (pathName) {
  try {
    var OSVersion = this.getOSInformation();
    if (pathName.startsWith("file://")) {
      if (OSVersion.indexOf("Windows") >= 0) {
        pathName = pathName.replace("file:///", "");
      } else if (OSVersion.indexOf("Mac") >= 0) {
        pathName = pathName.replace("file://", "");
      }
      window.__adobe_cep__.loadSnapshot(pathName);
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
  //control should not come here
  return false;
};

/** Closes this extension. */
CSInterface.prototype.closeExtension = function () {
  window.__adobe_cep__.closeExtension();
};

/**
 * Retrieves a path for which a constant is defined in the system.
 *
 * @param pathType The path-type constant defined in \c #SystemPath ,
 *
 * @return The platform-specific system path string.
 */
CSInterface.prototype.getSystemPath = function (pathType) {
  var path = decodeURI(window.__adobe_cep__.getSystemPath(pathType));
  var OSVersion = this.getOSInformation();
  if (OSVersion.indexOf("Windows") >= 0) {
    path = path.replace("file:///", "");
  } else if (OSVersion.indexOf("Mac") >= 0) {
    path = path.replace("file://", "");
  }
  return path;
};

/**
 * Evaluates a JavaScript script, which can use the JavaScript DOM
 * of the host application.
 *
 * @param script    The JavaScript script.
 * @param callback  Optional. A callback function that receives the result of execution.
 *          If execution fails, the callback function receives the error message \c EvalScript_ErrMessage.
 */
CSInterface.prototype.evalScript = function (script, callback) {
  if (callback === null || callback === undefined) {
    callback = function callback(result) {};
  }
  window.__adobe_cep__.evalScript(script, callback);
};

/**
 * Retrieves the unique identifier of the application.
 * in which the extension is currently running.
 *
 * @return The unique ID string.
 */
CSInterface.prototype.getApplicationID = function () {
  var appId = this.hostEnvironment.appId;
  return appId;
};

/**
 * Retrieves host capability information for the application
 * in which the extension is currently running.
 *
 * @return A \c #HostCapabilities object.
 */
CSInterface.prototype.getHostCapabilities = function () {
  var hostCapabilities = JSON.parse(window.__adobe_cep__.getHostCapabilities());
  return hostCapabilities;
};

/**
 * Triggers a CEP event programmatically. Yoy can use it to dispatch
 * an event of a predefined type, or of a type you have defined.
 *
 * @param event A \c CSEvent object.
 */
CSInterface.prototype.dispatchEvent = function (event) {
  if (_typeof$1(event.data) == "object") {
    event.data = JSON.stringify(event.data);
  }
  window.__adobe_cep__.dispatchEvent(event);
};

/**
 * Registers an interest in a CEP event of a particular type, and
 * assigns an event handler.
 * The event infrastructure notifies your extension when events of this type occur,
 * passing the event object to the registered handler function.
 *
 * @param type     The name of the event type of interest.
 * @param listener The JavaScript handler function or method.
 * @param obj      Optional, the object containing the handler method, if any.
 *         Default is null.
 */
CSInterface.prototype.addEventListener = function (type, listener, obj) {
  window.__adobe_cep__.addEventListener(type, listener, obj);
};

/**
 * Removes a registered event listener.
 *
 * @param type      The name of the event type of interest.
 * @param listener  The JavaScript handler function or method that was registered.
 * @param obj       Optional, the object containing the handler method, if any.
 *          Default is null.
 */
CSInterface.prototype.removeEventListener = function (type, listener, obj) {
  window.__adobe_cep__.removeEventListener(type, listener, obj);
};

/**
 * Loads and launches another extension, or activates the extension if it is already loaded.
 *
 * @param extensionId       The extension's unique identifier.
 * @param startupParams     Not currently used, pass "".
 *
 * @example
 * To launch the extension "help" with ID "HLP" from this extension, call:
 * <code>requestOpenExtension("HLP", ""); </code>
 *
 */
CSInterface.prototype.requestOpenExtension = function (extensionId, params) {
  window.__adobe_cep__.requestOpenExtension(extensionId, params);
};

/**
 * Retrieves the list of extensions currently loaded in the current host application.
 * The extension list is initialized once, and remains the same during the lifetime
 * of the CEP session.
 *
 * @param extensionIds  Optional, an array of unique identifiers for extensions of interest.
 *          If omitted, retrieves data for all extensions.
 *
 * @return Zero or more \c #Extension objects.
 */
CSInterface.prototype.getExtensions = function (extensionIds) {
  var extensionIdsStr = JSON.stringify(extensionIds);
  var extensionsStr = window.__adobe_cep__.getExtensions(extensionIdsStr);
  var extensions = JSON.parse(extensionsStr);
  return extensions;
};

/**
 * Retrieves network-related preferences.
 *
 * @return A JavaScript object containing network preferences.
 */
CSInterface.prototype.getNetworkPreferences = function () {
  var result = window.__adobe_cep__.getNetworkPreferences();
  var networkPre = JSON.parse(result);
  return networkPre;
};

/**
 * Initializes the resource bundle for this extension with property values
 * for the current application and locale.
 * To support multiple locales, you must define a property file for each locale,
 * containing keyed display-string values for that locale.
 * See localization documentation for Extension Builder and related products.
 *
 * Keys can be in the
 * form <code>key.value="localized string"</code>, for use in HTML text elements.
 * For example, in this input element, the localized \c key.value string is displayed
 * instead of the empty \c value string:
 *
 * <code><input type="submit" value="" data-locale="key"/></code>
 *
 * @return An object containing the resource bundle information.
 */
CSInterface.prototype.initResourceBundle = function () {
  var resourceBundle = JSON.parse(window.__adobe_cep__.initResourceBundle());
  var resElms = document.querySelectorAll("[data-locale]");
  for (var n = 0; n < resElms.length; n++) {
    var resEl = resElms[n];
    // Get the resource key from the element.
    var resKey = resEl.getAttribute("data-locale");
    if (resKey) {
      // Get all the resources that start with the key.
      for (var key in resourceBundle) {
        if (key.indexOf(resKey) === 0) {
          var resValue = resourceBundle[key];
          if (key.length == resKey.length) {
            resEl.innerHTML = resValue;
          } else if ("." == key.charAt(resKey.length)) {
            var attrKey = key.substring(resKey.length + 1);
            resEl[attrKey] = resValue;
          }
        }
      }
    }
  }
  return resourceBundle;
};

/**
 * Writes installation information to a file.
 *
 * @return The file path.
 */
CSInterface.prototype.dumpInstallationInfo = function () {
  return window.__adobe_cep__.dumpInstallationInfo();
};

/**
 * Retrieves version information for the current Operating System,
 * See http://www.useragentstring.com/pages/Chrome/ for Chrome \c navigator.userAgent values.
 *
 * @return A string containing the OS version, or "unknown Operation System".
 * If user customizes the User Agent by setting CEF command parameter "--user-agent", only
 * "Mac OS X" or "Windows" will be returned.
 */
CSInterface.prototype.getOSInformation = function () {
  var userAgent = navigator.userAgent;
  if (navigator.platform == "Win32" || navigator.platform == "Windows") {
    var winVersion = "Windows";
    var winBit = "";
    if (userAgent.indexOf("Windows") > -1) {
      if (userAgent.indexOf("Windows NT 5.0") > -1) {
        winVersion = "Windows 2000";
      } else if (userAgent.indexOf("Windows NT 5.1") > -1) {
        winVersion = "Windows XP";
      } else if (userAgent.indexOf("Windows NT 5.2") > -1) {
        winVersion = "Windows Server 2003";
      } else if (userAgent.indexOf("Windows NT 6.0") > -1) {
        winVersion = "Windows Vista";
      } else if (userAgent.indexOf("Windows NT 6.1") > -1) {
        winVersion = "Windows 7";
      } else if (userAgent.indexOf("Windows NT 6.2") > -1) {
        winVersion = "Windows 8";
      } else if (userAgent.indexOf("Windows NT 6.3") > -1) {
        winVersion = "Windows 8.1";
      } else if (userAgent.indexOf("Windows NT 10") > -1) {
        winVersion = "Windows 10";
      }
      if (userAgent.indexOf("WOW64") > -1 || userAgent.indexOf("Win64") > -1) {
        winBit = " 64-bit";
      } else {
        winBit = " 32-bit";
      }
    }
    return winVersion + winBit;
  } else if (navigator.platform == "MacIntel" || navigator.platform == "Macintosh") {
    var result = "Mac OS X";
    if (userAgent.indexOf("Mac OS X") > -1) {
      result = userAgent.substring(userAgent.indexOf("Mac OS X"), userAgent.indexOf(")"));
      result = result.replace(/_/g, ".");
    }
    return result;
  }
  return "Unknown Operation System";
};

/**
 * Opens a page in the default system browser.
 *
 * Since 4.2.0
 *
 * @param url  The URL of the page/file to open, or the email address.
 * Must use HTTP/HTTPS/file/mailto protocol. For example:
 *   "http://www.adobe.com"
 *   "https://github.com"
 *   "file:///C:/log.txt"
 *   "mailto:test@adobe.com"
 *
 * @return One of these error codes:\n
 *      <ul>\n
 *          <li>NO_ERROR - 0</li>\n
 *          <li>ERR_UNKNOWN - 1</li>\n
 *          <li>ERR_INVALID_PARAMS - 2</li>\n
 *          <li>ERR_INVALID_URL - 201</li>\n
 *      </ul>\n
 */
CSInterface.prototype.openURLInDefaultBrowser = function (url) {
  return cep.util.openURLInDefaultBrowser(url);
};

/**
 * Retrieves extension ID.
 *
 * Since 4.2.0
 *
 * @return extension ID.
 */
CSInterface.prototype.getExtensionID = function () {
  return window.__adobe_cep__.getExtensionId();
};

/**
 * Retrieves the scale factor of screen.
 * On Windows platform, the value of scale factor might be different from operating system's scale factor,
 * since host application may use its self-defined scale factor.
 *
 * Since 4.2.0
 *
 * @return One of the following float number.
 *      <ul>\n
 *          <li> -1.0 when error occurs </li>\n
 *          <li> 1.0 means normal screen </li>\n
 *          <li> >1.0 means HiDPI screen </li>\n
 *      </ul>\n
 */
CSInterface.prototype.getScaleFactor = function () {
  return window.__adobe_cep__.getScaleFactor();
};

/**
 * Retrieves the scale factor of Monitor.
 *
 * Since 8.5.0
 *
 * @return value >= 1.0f
 * only available for windows machine
 */
if (navigator.appVersion.toLowerCase().indexOf("windows") >= 0) {
  CSInterface.prototype.getMonitorScaleFactor = function () {
    return window.__adobe_cep__.getMonitorScaleFactor();
  };
}

/**
 * Set a handler to detect any changes of scale factor. This only works on Mac.
 *
 * Since 4.2.0
 *
 * @param handler   The function to be called when scale factor is changed.
 *
 */
CSInterface.prototype.setScaleFactorChangedHandler = function (handler) {
  window.__adobe_cep__.setScaleFactorChangedHandler(handler);
};

/**
 * Retrieves current API version.
 *
 * Since 4.2.0
 *
 * @return ApiVersion object.
 *
 */
CSInterface.prototype.getCurrentApiVersion = function () {
  var apiVersion = JSON.parse(window.__adobe_cep__.getCurrentApiVersion());
  return apiVersion;
};

/**
 * Set panel flyout menu by an XML.
 *
 * Since 5.2.0
 *
 * Register a callback function for "com.adobe.csxs.events.flyoutMenuClicked" to get notified when a
 * menu item is clicked.
 * The "data" attribute of event is an object which contains "menuId" and "menuName" attributes.
 *
 * Register callback functions for "com.adobe.csxs.events.flyoutMenuOpened" and "com.adobe.csxs.events.flyoutMenuClosed"
 * respectively to get notified when flyout menu is opened or closed.
 *
 * @param menu     A XML string which describes menu structure.
 * An example menu XML:
 * <Menu>
 *   <MenuItem Id="menuItemId1" Label="TestExample1" Enabled="true" Checked="false"/>
 *   <MenuItem Label="TestExample2">
 *     <MenuItem Label="TestExample2-1" >
 *       <MenuItem Label="TestExample2-1-1" Enabled="false" Checked="true"/>
 *     </MenuItem>
 *     <MenuItem Label="TestExample2-2" Enabled="true" Checked="true"/>
 *   </MenuItem>
 *   <MenuItem Label="---" />
 *   <MenuItem Label="TestExample3" Enabled="false" Checked="false"/>
 * </Menu>
 *
 */
CSInterface.prototype.setPanelFlyoutMenu = function (menu) {
  if ("string" != typeof menu) {
    return;
  }
  window.__adobe_cep__.invokeSync("setPanelFlyoutMenu", menu);
};

/**
 * Updates a menu item in the extension window's flyout menu, by setting the enabled
 * and selection status.
 *
 * Since 5.2.0
 *
 * @param menuItemLabel The menu item label.
 * @param enabled       True to enable the item, false to disable it (gray it out).
 * @param checked       True to select the item, false to deselect it.
 *
 * @return false when the host application does not support this functionality (HostCapabilities.EXTENDED_PANEL_MENU is false).
 *         Fails silently if menu label is invalid.
 *
 * @see HostCapabilities.EXTENDED_PANEL_MENU
 */
CSInterface.prototype.updatePanelMenuItem = function (menuItemLabel, enabled, checked) {
  var ret = false;
  if (this.getHostCapabilities().EXTENDED_PANEL_MENU) {
    var itemStatus = new MenuItemStatus(menuItemLabel, enabled, checked);
    ret = window.__adobe_cep__.invokeSync("updatePanelMenuItem", JSON.stringify(itemStatus));
  }
  return ret;
};

/**
  * Set context menu by XML string.
  *
  * Since 5.2.0
  *
  * There are a number of conventions used to communicate what type of menu item to create and how it should be handled.
  * - an item without menu ID or menu name is disabled and is not shown.
  * - if the item name is "---" (three hyphens) then it is treated as a separator. The menu ID in this case will always be NULL.
  * - Checkable attribute takes precedence over Checked attribute.
  * - a PNG icon. For optimal display results please supply a 16 x 16px icon as larger dimensions will increase the size of the menu item.
      The Chrome extension contextMenus API was taken as a reference.
      https://developer.chrome.com/extensions/contextMenus
  * - the items with icons and checkable items cannot coexist on the same menu level. The former take precedences over the latter.
  *
  * @param menu      A XML string which describes menu structure.
  * @param callback  The callback function which is called when a menu item is clicked. The only parameter is the returned ID of clicked menu item.
  *
  * @description An example menu XML:
  * <Menu>
  *   <MenuItem Id="menuItemId1" Label="TestExample1" Enabled="true" Checkable="true" Checked="false" Icon="./image/small_16X16.png"/>
  *   <MenuItem Id="menuItemId2" Label="TestExample2">
  *     <MenuItem Id="menuItemId2-1" Label="TestExample2-1" >
  *       <MenuItem Id="menuItemId2-1-1" Label="TestExample2-1-1" Enabled="false" Checkable="true" Checked="true"/>
  *     </MenuItem>
  *     <MenuItem Id="menuItemId2-2" Label="TestExample2-2" Enabled="true" Checkable="true" Checked="true"/>
  *   </MenuItem>
  *   <MenuItem Label="---" />
  *   <MenuItem Id="menuItemId3" Label="TestExample3" Enabled="false" Checkable="true" Checked="false"/>
  * </Menu>
  */
CSInterface.prototype.setContextMenu = function (menu, callback) {
  if ("string" != typeof menu) {
    return;
  }
  window.__adobe_cep__.invokeAsync("setContextMenu", menu, callback);
};

/**
  * Set context menu by JSON string.
  *
  * Since 6.0.0
  *
  * There are a number of conventions used to communicate what type of menu item to create and how it should be handled.
  * - an item without menu ID or menu name is disabled and is not shown.
  * - if the item label is "---" (three hyphens) then it is treated as a separator. The menu ID in this case will always be NULL.
  * - Checkable attribute takes precedence over Checked attribute.
  * - a PNG icon. For optimal display results please supply a 16 x 16px icon as larger dimensions will increase the size of the menu item.
      The Chrome extension contextMenus API was taken as a reference.
  * - the items with icons and checkable items cannot coexist on the same menu level. The former take precedences over the latter.
      https://developer.chrome.com/extensions/contextMenus
  *
  * @param menu      A JSON string which describes menu structure.
  * @param callback  The callback function which is called when a menu item is clicked. The only parameter is the returned ID of clicked menu item.
  *
  * @description An example menu JSON:
  *
  * {
  *      "menu": [
  *          {
  *              "id": "menuItemId1",
  *              "label": "testExample1",
  *              "enabled": true,
  *              "checkable": true,
  *              "checked": false,
  *              "icon": "./image/small_16X16.png"
  *          },
  *          {
  *              "id": "menuItemId2",
  *              "label": "testExample2",
  *              "menu": [
  *                  {
  *                      "id": "menuItemId2-1",
  *                      "label": "testExample2-1",
  *                      "menu": [
  *                          {
  *                              "id": "menuItemId2-1-1",
  *                              "label": "testExample2-1-1",
  *                              "enabled": false,
  *                              "checkable": true,
  *                              "checked": true
  *                          }
  *                      ]
  *                  },
  *                  {
  *                      "id": "menuItemId2-2",
  *                      "label": "testExample2-2",
  *                      "enabled": true,
  *                      "checkable": true,
  *                      "checked": true
  *                  }
  *              ]
  *          },
  *          {
  *              "label": "---"
  *          },
  *          {
  *              "id": "menuItemId3",
  *              "label": "testExample3",
  *              "enabled": false,
  *              "checkable": true,
  *              "checked": false
  *          }
  *      ]
  *  }
  *
  */
CSInterface.prototype.setContextMenuByJSON = function (menu, callback) {
  if ("string" != typeof menu) {
    return;
  }
  window.__adobe_cep__.invokeAsync("setContextMenuByJSON", menu, callback);
};

/**
 * Updates a context menu item by setting the enabled and selection status.
 *
 * Since 5.2.0
 *
 * @param menuItemID    The menu item ID.
 * @param enabled       True to enable the item, false to disable it (gray it out).
 * @param checked       True to select the item, false to deselect it.
 */
CSInterface.prototype.updateContextMenuItem = function (menuItemID, enabled, checked) {
  var itemStatus = new ContextMenuItemStatus(menuItemID, enabled, checked);
  ret = window.__adobe_cep__.invokeSync("updateContextMenuItem", JSON.stringify(itemStatus));
};

/**
 * Get the visibility status of an extension window.
 *
 * Since 6.0.0
 *
 * @return true if the extension window is visible; false if the extension window is hidden.
 */
CSInterface.prototype.isWindowVisible = function () {
  return window.__adobe_cep__.invokeSync("isWindowVisible", "");
};

/**
 * Resize extension's content to the specified dimensions.
 * 1. Works with modal and modeless extensions in all Adobe products.
 * 2. Extension's manifest min/max size constraints apply and take precedence.
 * 3. For panel extensions
 *    3.1 This works in all Adobe products except:
 *        * Premiere Pro
 *        * Prelude
 *        * After Effects
 *    3.2 When the panel is in certain states (especially when being docked),
 *        it will not change to the desired dimensions even when the
 *        specified size satisfies min/max constraints.
 *
 * Since 6.0.0
 *
 * @param width  The new width
 * @param height The new height
 */
CSInterface.prototype.resizeContent = function (width, height) {
  window.__adobe_cep__.resizeContent(width, height);
};

/**
 * Register the invalid certificate callback for an extension.
 * This callback will be triggered when the extension tries to access the web site that contains the invalid certificate on the main frame.
 * But if the extension does not call this function and tries to access the web site containing the invalid certificate, a default error page will be shown.
 *
 * Since 6.1.0
 *
 * @param callback the callback function
 */
CSInterface.prototype.registerInvalidCertificateCallback = function (callback) {
  return window.__adobe_cep__.registerInvalidCertificateCallback(callback);
};

/**
  * Register an interest in some key events to prevent them from being sent to the host application.
  *
  * This function works with modeless extensions and panel extensions.
  * Generally all the key events will be sent to the host application for these two extensions if the current focused element
  * is not text input or dropdown,
  * If you want to intercept some key events and want them to be handled in the extension, please call this function
  * in advance to prevent them being sent to the host application.
  *
  * Since 6.1.0
  *
  * @param keyEventsInterest      A JSON string describing those key events you are interested in. A null object or
                                  an empty string will lead to removing the interest
  *
  * This JSON string should be an array, each object has following keys:
  *
  * keyCode:  [Required] represents an OS system dependent virtual key code identifying
  *           the unmodified value of the pressed key.
  * ctrlKey:  [optional] a Boolean that indicates if the control key was pressed (true) or not (false) when the event occurred.
  * altKey:   [optional] a Boolean that indicates if the alt key was pressed (true) or not (false) when the event occurred.
  * shiftKey: [optional] a Boolean that indicates if the shift key was pressed (true) or not (false) when the event occurred.
  * metaKey:  [optional] (Mac Only) a Boolean that indicates if the Meta key was pressed (true) or not (false) when the event occurred.
  *                      On Macintosh keyboards, this is the command key. To detect Windows key on Windows, please use keyCode instead.
  * An example JSON string:
  *
  * [
  *     {
  *         "keyCode": 48
  *     },
  *     {
  *         "keyCode": 123,
  *         "ctrlKey": true
  *     },
  *     {
  *         "keyCode": 123,
  *         "ctrlKey": true,
  *         "metaKey": true
  *     }
  * ]
  *
  */
CSInterface.prototype.registerKeyEventsInterest = function (keyEventsInterest) {
  return window.__adobe_cep__.registerKeyEventsInterest(keyEventsInterest);
};

/**
 * Set the title of the extension window.
 * This function works with modal and modeless extensions in all Adobe products, and panel extensions in Photoshop, InDesign, InCopy, Illustrator, Flash Pro and Dreamweaver.
 *
 * Since 6.1.0
 *
 * @param title The window title.
 */
CSInterface.prototype.setWindowTitle = function (title) {
  window.__adobe_cep__.invokeSync("setWindowTitle", title);
};

/**
 * Get the title of the extension window.
 * This function works with modal and modeless extensions in all Adobe products, and panel extensions in Photoshop, InDesign, InCopy, Illustrator, Flash Pro and Dreamweaver.
 *
 * Since 6.1.0
 *
 * @return The window title.
 */
CSInterface.prototype.getWindowTitle = function () {
  return window.__adobe_cep__.invokeSync("getWindowTitle", "");
};

// Abstracted built-in Node.js Modules


typeof window.cep !== "undefined" ? require("crypto") : {};
typeof window.cep !== "undefined" ? require("assert") : {};
typeof window.cep !== "undefined" ? require("buffer") : {};
typeof window.cep !== "undefined" ? require("child_process") : {};
typeof window.cep !== "undefined" ? require("cluster") : {};
typeof window.cep !== "undefined" ? require("dgram") : {};
typeof window.cep !== "undefined" ? require("dns") : {};
typeof window.cep !== "undefined" ? require("domain") : {};
typeof window.cep !== "undefined" ? require("events") : {};
typeof window.cep !== "undefined" ? require("fs") : {};
typeof window.cep !== "undefined" ? require("http") : {};
typeof window.cep !== "undefined" ? require("https") : {};
typeof window.cep !== "undefined" ? require("net") : {};
typeof window.cep !== "undefined" ? require("os") : {};
var path = typeof window.cep !== "undefined" ? require("path") : {};
typeof window.cep !== "undefined" ? require("punycode") : {};
typeof window.cep !== "undefined" ? require("querystring") : {};
typeof window.cep !== "undefined" ? require("readline") : {};
typeof window.cep !== "undefined" ? require("stream") : {};
typeof window.cep !== "undefined" ? require("string_decoder") : {};
typeof window.cep !== "undefined" ? require("timers") : {};
typeof window.cep !== "undefined" ? require("tls") : {};
typeof window.cep !== "undefined" ? require("tty") : {};
typeof window.cep !== "undefined" ? require("url") : {};
typeof window.cep !== "undefined" ? require("util") : {};
typeof window.cep !== "undefined" ? require("v8") : {};
typeof window.cep !== "undefined" ? require("vm") : {};
typeof window.cep !== "undefined" ? require("zlib") : {};

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var csi = new CSInterface();
var Yl_Tools = /*#__PURE__*/_createClass(function Yl_Tools() {
  var _this = this;
  _classCallCheck(this, Yl_Tools);
  _defineProperty(this, "name", "Yl_Pr_Tools");
  _defineProperty(this, "version", "2.0.0");
  _defineProperty(this, "ext_path", csi.getSystemPath(SystemPath.EXTENSION));
  _defineProperty(this, "data_path", path.join(this.ext_path, "data"));
  _defineProperty(this, "sub_path", path.join(this.ext_path, "sub"));
  _defineProperty(this, "pwd_path", path.join(this.data_path, "data.json"));
  _defineProperty(this, "open_sub_folder", function () {
    var _require = require('child_process'),
      exec = _require.exec;
    var path = require('path');
    exec("explorer.exe \"".concat(path.resolve(_this.sub_path), "\""), function (err) {
      if (err) {
        console.error("Failed to open folder \"".concat(_this.sub_path, "\". Error:"), err);
      } else {
        console.log("Folder \"".concat(_this.sub_path, "\" opened successfully."));
      }
    });
  });
});
new Yl_Tools();

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (__isArray(arr)) return arr; }
var yl_tools = new Yl_Tools();
if (!Array.prototype.filter) {
  Array.prototype.filter = function (callback, thisArg) {
    var filteredArray = [];
    for (var i = 0; i < this.length; i++) {
      if (callback.call(thisArg, this[i], i, this)) {
        filteredArray.push(this[i]);
      }
    }
    return filteredArray;
  };
}
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (searchElement, fromIndex) {
    var startIndex = fromIndex || 0;
    var currentIndex = startIndex < 0 ? this.length + startIndex : startIndex;
    while (currentIndex < this.length) {
      if (this[currentIndex] === searchElement) {
        return currentIndex;
      }
      currentIndex++;
    }
    return -1;
  };
}
var clipsRender = function clipsRender(p1, p2, p3, p4) {
  alert(p1.toString(), p2.toString());
  var time_list, name_list;
  var sequence = app.project.activeSequence || false;
  if (!sequence) {
    alert("请激活一个序列");
    return;
  }
  if (p1 === 0) {
    alert("输入要参考的轨道");
    return;
  }
  var folderObj = new Folder("");
  var trg_folder = folderObj.saveDlg("请选择一个文件夹，点右下角保存");
  if (!trg_folder) {
    alert("未成功选择文件夹，已停止");
    return;
  }
  app.encoder.launchEncoder();
  var _get_time_list = get_time_list(p1, p2, p3);
  var _get_time_list2 = _slicedToArray(_get_time_list, 2);
  time_list = _get_time_list2[0];
  name_list = _get_time_list2[1];
  if (time_list[0].length < 2) {
    alert("请选择一个有剪辑的视频/音频轨道");
    return;
  }
  if (p4.length < 1) {
    p4 = "";
  }
  add_to_ame(time_list, trg_folder, name_list, p4);
  alert("\u5DF2\u6210\u529F\u6DFB\u52A0".concat(time_list[0].length));
};
function get_time_list(p1, is_sel, is_connect) {
  var time_list = [[], []];
  var name_list = [];
  var sequence = app.project.activeSequence;
  var clips = p1 < 0 ? sequence.audioTracks[Math.abs(p1) - 1].clips : sequence.videoTracks[p1 - 1].clips;
  if (!clips) {
    return [[[0], [1]], [""]];
  }
  var stop = true;
  if (is_connect && !is_sel) {
    for (var i = 0; i < clips.numItems; i++) {
      var clip = clips[i];
      if (stop) {
        time_list[0].push(clip.start.seconds);
      }
      var jug = clip.name.lastIndexOf(".");
      var nname = jug + 1 ? clip.name.substring(0, jug) : clip.name;
      if (is_connect && i < clips.numItems - 1 && clip.end.seconds == clips[i + 1].start.seconds) {
        stop = false;
      } else {
        stop = true;
      }
      if (stop) {
        name_list.push(nname);
        time_list[1].push(clip.end.seconds);
      }
    }
  } else {
    for (var _i2 = 0; _i2 < clips.numItems; _i2++) {
      var _clip = clips[_i2];
      if (is_sel && !_clip.isSelected()) {
        continue;
      }
      time_list[0].push(_clip.start.seconds);
      var _jug = _clip.name.lastIndexOf(".") + 1;
      var _nname = _jug ? _clip.name.substring(0, _jug) : _clip.name;
      name_list.push(_nname);
      time_list[1].push(_clip.end.seconds);
    }
    if (is_connect) {
      var differenceA = time_list[0].filter(function (v) {
        return time_list[1].indexOf(v) === -1;
      });
      var differenceB = time_list[1].filter(function (v) {
        return time_list[0].indexOf(v) === -1;
      });
      name_list = name_list.filter(function (v, i) {
        return differenceA.indexOf(time_list[0][i]) + 1;
      });
      time_list = [differenceA, differenceB];
    }
  }
  return [time_list, name_list];
}
function add_to_ame(time_list, trg_folder, name_list, output_name) {
  var sequence = app.project.activeSequence;
  for (var i = 0; i < time_list[0].length; i++) {
    var start = time_list[0][i];
    var end = time_list[1][i];
    sequence.setInPoint(start);
    sequence.setOutPoint(end);
    var out_name = void 0;
    if (output_name) {
      out_name = output_name + "_" + PrefixZero(i + 1, 4);
    } else {
      out_name = name_list[i];
    }
    try {
      app.encoder.encodeSequence(sequence, "".concat(trg_folder.parent.fsName, "\\").concat(out_name), path.join(yl_tools.data_path, "\\MY Preset.epr", 1, 0));
    } catch (e) {
      alert(e);
    }
  }
}
function PrefixZero(num, n) {
  return (Array(n).join("0") + num).slice(-n);
}

var qeDomFunction = function qeDomFunction() {
  if (typeof qe === "undefined") {
    app.enableQE();
  }
  if (qe) {
    qe.name;
    qe.project.getVideoEffectByName("test");
  }
};
var helloWorld$1 = function helloWorld() {
  alert("Hello from Premiere Pro.");
};
var helloNum = function helloNum(num) {
  alert("Hello from Premiere Pro." + num);
};
var openProjFolder = function openProjFolder() {
  alert("Open Folder");
  Folder(File(app.project.path).parent.fsName).execute();
};

var ppro = /*#__PURE__*/__objectFreeze({
  __proto__: null,
  helloError: helloError,
  helloArrayStr: helloArrayStr,
  helloObj: helloObj,
  helloNum: helloNum,
  clipsRender: clipsRender,
  qeDomFunction: qeDomFunction,
  helloWorld: helloWorld$1,
  openProjFolder: openProjFolder
});

var helloWorld = function helloWorld() {
  app.activeDocument;
  alert("Hello from Photoshop");
};

var phxs = /*#__PURE__*/__objectFreeze({
  __proto__: null,
  helloError: helloError,
  helloNum: helloNum$1,
  helloArrayStr: helloArrayStr,
  helloObj: helloObj,
  helloWorld: helloWorld
});

var main;
switch (BridgeTalk.appName) {
  case "premierepro":
  case "premiereprobeta":
    main = ppro;
    break;
  case "aftereffects":
  case "aftereffectsbeta":
    main = aeft;
    break;
  case "illustrator":
  case "illustratorbeta":
    main = ilst;
    break;
  case "photoshop":
  case "photoshopbeta":
    main = phxs;
    break;
  default:
    
    if (app.appName === "Adobe Animate") {
      main = anim;
    }
    break;
}

var host = typeof $ !== "undefined" ? $ : window;
host[ns] = main;
})(this);//# sourceMappingURL=index.js.map
