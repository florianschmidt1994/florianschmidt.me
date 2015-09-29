'use strict';

var keycode = require("keycode");

module.exports.isPressed = function (name) {
  var code = keycode(name);
  return isPressed(code);
}

var downKeys = new Map();

document.onkeydown = function(event) {
  downKeys.set(event.keyCode, true);
};

document.onkeyup = function(event) {
  downKeys.set(event.keyCode, false);
};

function isPressed(key) {
  if(downKeys.has(key)) {
    return downKeys.get(key);
  } else {
    return false;
  }
}
