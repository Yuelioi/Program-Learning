"use strict";

require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
var sayHi = function sayHi() {
  return [1, 2, 3];
};
alert(sayHi().includes(1).toString());