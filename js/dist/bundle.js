(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var color = {
  dark: {
    bg: "#282C34",
    font: "#ACB2BE",
    links: "#ACB2BE",
    impressum: "#A2BD78"
  },
  light: {
    bg: "#FFFFFF",
    links: "#8AB377",
    impressum: "#BC5142",
    font: "#282C34"
  }
};

var darkMode = false;

function toggle() {
  if (darkMode) {
    setMode("lightmode");
    darkMode = false;
  } else {
    setMode("darkmode");
    darkMode = true;
  }
}

function setMode(mode) {
  var colorScheme;
  if (mode === "darkmode") {
    setDebug("lightmode");
    colorScheme = color.dark;
  } else {
    setDebug("darkmode");
    colorScheme = color.light;
  }

  document.getElementById("impressum").style.color = colorScheme.impressum;
  document.body.style.backgroundColor = colorScheme.bg;
  document.body.style.color = colorScheme.font;
}

function setDebug(message) {
  document.getElementById("debug").innerText = message;
}

var persistent = false;
var clicked = 0;

document.getElementById("debug").addEventListener("click", function () {
  clicked = new Date().getHours();
  persistent = true;
  toggle();
});

setInterval(function () {

  var hours = new Date().getHours();

  /* Don't do anything if user has clicked switch manually */
  if (persistent === true) return;

  if (hours >= 20 || hours < 8) {
    setMode("darkmode");
  } else {
    setMode("lightmode");
  }
}, 1000);

module.exports = true;

},{}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Rocket = require('./Rocket');

require("./ColorMode");

var FPS = 60;
var rocketDomID = "rocket";

/*
 * GameLoop Tutorial von
 * http://nokarma.org/2011/02/02/javascript-game-development-the-game-loop/
 */

var Game = (function () {
  function Game() {
    _classCallCheck(this, Game);

    this.fps = FPS;
    this.rocket = new Rocket(document.getElementById(rocketDomID));
    this.interval = setInterval(this.run.bind(this), 1000 / this.fps);
  }

  /* start game */

  _createClass(Game, [{
    key: 'update',
    value: function update() {
      this.rocket.update();
    }
  }, {
    key: 'stop',
    value: function stop() {
      clearInterval(this.interval);
    }
  }, {
    key: 'run',
    value: function run() {
      this.update();
    }
  }]);

  return Game;
})();

new Game();

},{"./ColorMode":1,"./Rocket":3}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var keys = require("./keys.js");

var DISTANCE = 2;

var Rocket = (function () {
  function Rocket(domElement) {
    _classCallCheck(this, Rocket);

    this.domElement = domElement;
  }

  _createClass(Rocket, [{
    key: "moveLeft",
    value: function moveLeft() {
      var coordX = this.getXCoord();
      if (coordX >= 5) {
        coordX = coordX -= DISTANCE;
      }
      this.setCoordX(coordX);
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      var coordX = this.getXCoord();
      coordX = coordX += DISTANCE;
      this.setCoordX(coordX);
    }
  }, {
    key: "getXCoord",
    value: function getXCoord() {
      return this.domElement.style.left === "" ? 0 : parseInt(this.domElement.style.left);
    }
  }, {
    key: "setCoordX",
    value: function setCoordX(value) {
      this.domElement.style.left = value + "px";
    }
  }, {
    key: "update",
    value: function update() {
      if (keys.isPressed("left")) {
        this.moveLeft();
      } else if (keys.isPressed("right")) {
        this.moveRight();
      }
    }
  }]);

  return Rocket;
})();

module.exports = Rocket;

},{"./keys.js":4}],4:[function(require,module,exports){
'use strict';

var keycode = require("keycode");

module.exports.isPressed = function (name) {
  var code = keycode(name);
  return isPressed(code);
};

var downKeys = new Map();

document.onkeydown = function (event) {
  downKeys.set(event.keyCode, true);
};

document.onkeyup = function (event) {
  downKeys.set(event.keyCode, false);
};

function isPressed(key) {
  if (downKeys.has(key)) {
    return downKeys.get(key);
  } else {
    return false;
  }
}

},{"keycode":5}],5:[function(require,module,exports){
// Source: http://jsfiddle.net/vWx8V/
// http://stackoverflow.com/questions/5603195/full-list-of-javascript-keycodes



/**
 * Conenience method returns corresponding value for given keyName or keyCode.
 *
 * @param {Mixed} keyCode {Number} or keyName {String}
 * @return {Mixed}
 * @api public
 */

exports = module.exports = function(searchInput) {
  // Keyboard Events
  if (searchInput && 'object' === typeof searchInput) {
    var hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode
    if (hasKeyCode) searchInput = hasKeyCode
  }

  // Numbers
  if ('number' === typeof searchInput) return names[searchInput]

  // Everything else (cast to string)
  var search = String(searchInput)

  // check codes
  var foundNamedKey = codes[search.toLowerCase()]
  if (foundNamedKey) return foundNamedKey

  // check aliases
  var foundNamedKey = aliases[search.toLowerCase()]
  if (foundNamedKey) return foundNamedKey

  // weird character?
  if (search.length === 1) return search.charCodeAt(0)

  return undefined
}

/**
 * Get by name
 *
 *   exports.code['enter'] // => 13
 */

var codes = exports.code = exports.codes = {
  'backspace': 8,
  'tab': 9,
  'enter': 13,
  'shift': 16,
  'ctrl': 17,
  'alt': 18,
  'pause/break': 19,
  'caps lock': 20,
  'esc': 27,
  'space': 32,
  'page up': 33,
  'page down': 34,
  'end': 35,
  'home': 36,
  'left': 37,
  'up': 38,
  'right': 39,
  'down': 40,
  'insert': 45,
  'delete': 46,
  'command': 91,
  'right click': 93,
  'numpad *': 106,
  'numpad +': 107,
  'numpad -': 109,
  'numpad .': 110,
  'numpad /': 111,
  'num lock': 144,
  'scroll lock': 145,
  'my computer': 182,
  'my calculator': 183,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
  "'": 222,
}

// Helper aliases

var aliases = exports.aliases = {
  'windows': 91,
  '⇧': 16,
  '⌥': 18,
  '⌃': 17,
  '⌘': 91,
  'ctl': 17,
  'control': 17,
  'option': 18,
  'pause': 19,
  'break': 19,
  'caps': 20,
  'return': 13,
  'escape': 27,
  'spc': 32,
  'pgup': 33,
  'pgdn': 33,
  'ins': 45,
  'del': 46,
  'cmd': 91
}


/*!
 * Programatically add the following
 */

// lower case chars
for (i = 97; i < 123; i++) codes[String.fromCharCode(i)] = i - 32

// numbers
for (var i = 48; i < 58; i++) codes[i - 48] = i

// function keys
for (i = 1; i < 13; i++) codes['f'+i] = i + 111

// numpad keys
for (i = 0; i < 10; i++) codes['numpad '+i] = i + 96

/**
 * Get by code
 *
 *   exports.name[13] // => 'Enter'
 */

var names = exports.names = exports.title = {} // title for backward compat

// Create reverse mapping
for (i in codes) names[codes[i]] = i

// Add aliases
for (var alias in aliases) {
  codes[alias] = aliases[alias]
}

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZmxvcmlhbnNjaG1pZHQvRGV2ZWxvcG1lbnQvZmxvcmlhbnNjaG1pZHQuY28udWsvanMvc3JjL0NvbG9yTW9kZS5qcyIsIi9Vc2Vycy9mbG9yaWFuc2NobWlkdC9EZXZlbG9wbWVudC9mbG9yaWFuc2NobWlkdC5jby51ay9qcy9zcmMvR2FtZS5qcyIsIi9Vc2Vycy9mbG9yaWFuc2NobWlkdC9EZXZlbG9wbWVudC9mbG9yaWFuc2NobWlkdC5jby51ay9qcy9zcmMvUm9ja2V0LmpzIiwiL1VzZXJzL2Zsb3JpYW5zY2htaWR0L0RldmVsb3BtZW50L2Zsb3JpYW5zY2htaWR0LmNvLnVrL2pzL3NyYy9rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2tleWNvZGUvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7O0FBRWIsSUFBSSxLQUFLLEdBQUc7QUFDVixNQUFJLEVBQUU7QUFDSixNQUFFLEVBQUUsU0FBUztBQUNiLFFBQUksRUFBRSxTQUFTO0FBQ2YsU0FBSyxFQUFFLFNBQVM7QUFDaEIsYUFBUyxFQUFFLFNBQVM7R0FDckI7QUFDRCxPQUFLLEVBQUc7QUFDSixNQUFFLEVBQUUsU0FBUztBQUNiLFNBQUssRUFBRSxTQUFTO0FBQ2hCLGFBQVMsRUFBRSxTQUFTO0FBQ3BCLFFBQUksRUFBRSxTQUFTO0dBQ2xCO0NBQ0YsQ0FBQzs7QUFFRixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7O0FBRXJCLFNBQVMsTUFBTSxHQUFHO0FBQ2hCLE1BQUcsUUFBUSxFQUFFO0FBQ1gsV0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3JCLFlBQVEsR0FBRyxLQUFLLENBQUM7R0FDbEIsTUFBTTtBQUNMLFdBQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNwQixZQUFRLEdBQUcsSUFBSSxDQUFDO0dBQ2pCO0NB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY29sb3IgPSB7XG4gIGRhcms6IHtcbiAgICBiZzogXCIjMjgyQzM0XCIsXG4gICAgZm9udDogXCIjQUNCMkJFXCIsXG4gICAgbGlua3M6IFwiI0FDQjJCRVwiLFxuICAgIGltcHJlc3N1bTogXCIjQTJCRDc4XCJcbiAgfSxcbiAgbGlnaHQgOiB7XG4gICAgICBiZzogXCIjRkZGRkZGXCIsXG4gICAgICBsaW5rczogXCIjOEFCMzc3XCIsXG4gICAgICBpbXByZXNzdW06IFwiI0JDNTE0MlwiLFxuICAgICAgZm9udDogXCIjMjgyQzM0XCJcbiAgfVxufTtcblxudmFyIGRhcmtNb2RlID0gZmFsc2U7XG5cbmZ1bmN0aW9uIHRvZ2dsZSgpIHtcbiAgaWYoZGFya01vZGUpIHtcbiAgICBzZXRNb2RlKFwibGlnaHRtb2RlXCIpO1xuICAgIGRhcmtNb2RlID0gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgc2V0TW9kZShcImRhcmttb2RlXCIpO1xuICAgIGRhcmtNb2RlID0gdHJ1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXRNb2RlKG1vZGUpIHtcbiAgdmFyIGNvbG9yU2NoZW1lO1xuICBpZihtb2RlID09PSBcImRhcmttb2RlXCIpIHtcbiAgICBzZXREZWJ1ZyhcImxpZ2h0bW9kZVwiKTtcbiAgICBjb2xvclNjaGVtZSA9IGNvbG9yLmRhcms7XG4gIH0gZWxzZSB7XG4gICAgc2V0RGVidWcoXCJkYXJrbW9kZVwiKTtcbiAgICBjb2xvclNjaGVtZSA9IGNvbG9yLmxpZ2h0O1xuICB9XG5cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbXByZXNzdW1cIikuc3R5bGUuY29sb3IgPSBjb2xvclNjaGVtZS5pbXByZXNzdW07XG4gIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3JTY2hlbWUuYmc7XG4gIGRvY3VtZW50LmJvZHkuc3R5bGUuY29sb3IgPSBjb2xvclNjaGVtZS5mb250O1xufVxuXG5mdW5jdGlvbiBzZXREZWJ1ZyhtZXNzYWdlKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVidWdcIikuaW5uZXJUZXh0ID0gbWVzc2FnZTtcbn1cblxudmFyIHBlcnNpc3RlbnQgPSBmYWxzZTtcbnZhciBjbGlja2VkID0gMDtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZWJ1Z1wiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICBjbGlja2VkID0gbmV3IERhdGUoKS5nZXRIb3VycygpO1xuICBwZXJzaXN0ZW50ID0gdHJ1ZTtcbiAgdG9nZ2xlKCk7XG59KTtcblxuc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuXG4gIHZhciBob3VycyA9IG5ldyBEYXRlKCkuZ2V0SG91cnMoKTtcblxuICAvKiBEb24ndCBkbyBhbnl0aGluZyBpZiB1c2VyIGhhcyBjbGlja2VkIHN3aXRjaCBtYW51YWxseSAqL1xuICBpZihwZXJzaXN0ZW50ID09PSB0cnVlKSByZXR1cm47XG5cbiAgaWYoaG91cnMgPj0gMjAgfHzCoGhvdXJzIDwgOCkge1xuICAgIHNldE1vZGUoXCJkYXJrbW9kZVwiKTtcbiAgfSBlbHNlIHtcbiAgICBzZXRNb2RlKFwibGlnaHRtb2RlXCIpO1xuICB9XG59LCAxMDAwKTtcblxubW9kdWxlLmV4cG9ydHMgPSB0cnVlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUm9ja2V0ID0gcmVxdWlyZSgnLi9Sb2NrZXQnKTtcblxucmVxdWlyZShcIi4vQ29sb3JNb2RlXCIpO1xuXG5jb25zdCBGUFMgPSA2MDtcbmNvbnN0IHJvY2tldERvbUlEID0gXCJyb2NrZXRcIjtcblxuLypcbiAqIEdhbWVMb29wIFR1dG9yaWFsIHZvblxuICogaHR0cDovL25va2FybWEub3JnLzIwMTEvMDIvMDIvamF2YXNjcmlwdC1nYW1lLWRldmVsb3BtZW50LXRoZS1nYW1lLWxvb3AvXG4gKi9cbmNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmZwcyA9IEZQUztcbiAgICB0aGlzLnJvY2tldCA9IG5ldyBSb2NrZXQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocm9ja2V0RG9tSUQpKTtcbiAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwodGhpcy5ydW4uYmluZCh0aGlzKSwgMTAwMCAvIHRoaXMuZnBzKTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICB0aGlzLnJvY2tldC51cGRhdGUoKTtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgfVxuXG4gIHJ1bigpIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbn1cblxuLyogc3RhcnQgZ2FtZSAqL1xubmV3IEdhbWUoKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleXMgPSByZXF1aXJlKFwiLi9rZXlzLmpzXCIpO1xuXG5jb25zdCBESVNUQU5DRSA9IDI7XG5cbmNsYXNzIFJvY2tldCB7XG4gIGNvbnN0cnVjdG9yKGRvbUVsZW1lbnQpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb21FbGVtZW50O1xuICB9XG5cbiAgbW92ZUxlZnQoKSB7XG4gICAgdmFyIGNvb3JkWCA9IHRoaXMuZ2V0WENvb3JkKCk7XG4gICAgaWYoY29vcmRYID49IDUpIHtcbiAgICAgIGNvb3JkWCA9IGNvb3JkWCAtPSBESVNUQU5DRTtcbiAgICB9XG4gICAgdGhpcy5zZXRDb29yZFgoY29vcmRYKTtcbiAgfVxuXG4gIG1vdmVSaWdodCgpIHtcbiAgICB2YXIgY29vcmRYID0gdGhpcy5nZXRYQ29vcmQoKTtcbiAgICBjb29yZFggPSBjb29yZFggKz0gRElTVEFOQ0U7XG4gICAgdGhpcy5zZXRDb29yZFgoY29vcmRYKTtcbiAgfVxuXG4gIGdldFhDb29yZCgpIHtcbiAgICByZXR1cm4gKHRoaXMuZG9tRWxlbWVudC5zdHlsZS5sZWZ0ID09PSBcIlwiKT8gMCA6IHBhcnNlSW50KHRoaXMuZG9tRWxlbWVudC5zdHlsZS5sZWZ0KTtcbiAgfVxuXG4gIHNldENvb3JkWCh2YWx1ZSkge1xuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS5sZWZ0ID0gdmFsdWUrXCJweFwiO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGlmIChrZXlzLmlzUHJlc3NlZChcImxlZnRcIikpIHtcbiAgICAgIHRoaXMubW92ZUxlZnQoKTtcbiAgICB9IGVsc2UgaWYgKGtleXMuaXNQcmVzc2VkKFwicmlnaHRcIikpIHtcbiAgICAgIHRoaXMubW92ZVJpZ2h0KCk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm9ja2V0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIga2V5Y29kZSA9IHJlcXVpcmUoXCJrZXljb2RlXCIpO1xuXG5tb2R1bGUuZXhwb3J0cy5pc1ByZXNzZWQgPSBmdW5jdGlvbiAobmFtZSkge1xuICB2YXIgY29kZSA9IGtleWNvZGUobmFtZSk7XG4gIHJldHVybiBpc1ByZXNzZWQoY29kZSk7XG59XG5cbnZhciBkb3duS2V5cyA9IG5ldyBNYXAoKTtcblxuZG9jdW1lbnQub25rZXlkb3duID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgZG93bktleXMuc2V0KGV2ZW50LmtleUNvZGUsIHRydWUpO1xufTtcblxuZG9jdW1lbnQub25rZXl1cCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGRvd25LZXlzLnNldChldmVudC5rZXlDb2RlLCBmYWxzZSk7XG59O1xuXG5mdW5jdGlvbiBpc1ByZXNzZWQoa2V5KSB7XG4gIGlmKGRvd25LZXlzLmhhcyhrZXkpKSB7XG4gICAgcmV0dXJuIGRvd25LZXlzLmdldChrZXkpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiLy8gU291cmNlOiBodHRwOi8vanNmaWRkbGUubmV0L3ZXeDhWL1xuLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81NjAzMTk1L2Z1bGwtbGlzdC1vZi1qYXZhc2NyaXB0LWtleWNvZGVzXG5cblxuXG4vKipcbiAqIENvbmVuaWVuY2UgbWV0aG9kIHJldHVybnMgY29ycmVzcG9uZGluZyB2YWx1ZSBmb3IgZ2l2ZW4ga2V5TmFtZSBvciBrZXlDb2RlLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IGtleUNvZGUge051bWJlcn0gb3Iga2V5TmFtZSB7U3RyaW5nfVxuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHNlYXJjaElucHV0KSB7XG4gIC8vIEtleWJvYXJkIEV2ZW50c1xuICBpZiAoc2VhcmNoSW5wdXQgJiYgJ29iamVjdCcgPT09IHR5cGVvZiBzZWFyY2hJbnB1dCkge1xuICAgIHZhciBoYXNLZXlDb2RlID0gc2VhcmNoSW5wdXQud2hpY2ggfHwgc2VhcmNoSW5wdXQua2V5Q29kZSB8fCBzZWFyY2hJbnB1dC5jaGFyQ29kZVxuICAgIGlmIChoYXNLZXlDb2RlKSBzZWFyY2hJbnB1dCA9IGhhc0tleUNvZGVcbiAgfVxuXG4gIC8vIE51bWJlcnNcbiAgaWYgKCdudW1iZXInID09PSB0eXBlb2Ygc2VhcmNoSW5wdXQpIHJldHVybiBuYW1lc1tzZWFyY2hJbnB1dF1cblxuICAvLyBFdmVyeXRoaW5nIGVsc2UgKGNhc3QgdG8gc3RyaW5nKVxuICB2YXIgc2VhcmNoID0gU3RyaW5nKHNlYXJjaElucHV0KVxuXG4gIC8vIGNoZWNrIGNvZGVzXG4gIHZhciBmb3VuZE5hbWVkS2V5ID0gY29kZXNbc2VhcmNoLnRvTG93ZXJDYXNlKCldXG4gIGlmIChmb3VuZE5hbWVkS2V5KSByZXR1cm4gZm91bmROYW1lZEtleVxuXG4gIC8vIGNoZWNrIGFsaWFzZXNcbiAgdmFyIGZvdW5kTmFtZWRLZXkgPSBhbGlhc2VzW3NlYXJjaC50b0xvd2VyQ2FzZSgpXVxuICBpZiAoZm91bmROYW1lZEtleSkgcmV0dXJuIGZvdW5kTmFtZWRLZXlcblxuICAvLyB3ZWlyZCBjaGFyYWN0ZXI/XG4gIGlmIChzZWFyY2gubGVuZ3RoID09PSAxKSByZXR1cm4gc2VhcmNoLmNoYXJDb2RlQXQoMClcblxuICByZXR1cm4gdW5kZWZpbmVkXG59XG5cbi8qKlxuICogR2V0IGJ5IG5hbWVcbiAqXG4gKiAgIGV4cG9ydHMuY29kZVsnZW50ZXInXSAvLyA9PiAxM1xuICovXG5cbnZhciBjb2RlcyA9IGV4cG9ydHMuY29kZSA9IGV4cG9ydHMuY29kZXMgPSB7XG4gICdiYWNrc3BhY2UnOiA4LFxuICAndGFiJzogOSxcbiAgJ2VudGVyJzogMTMsXG4gICdzaGlmdCc6IDE2LFxuICAnY3RybCc6IDE3LFxuICAnYWx0JzogMTgsXG4gICdwYXVzZS9icmVhayc6IDE5LFxuICAnY2FwcyBsb2NrJzogMjAsXG4gICdlc2MnOiAyNyxcbiAgJ3NwYWNlJzogMzIsXG4gICdwYWdlIHVwJzogMzMsXG4gICdwYWdlIGRvd24nOiAzNCxcbiAgJ2VuZCc6IDM1LFxuICAnaG9tZSc6IDM2LFxuICAnbGVmdCc6IDM3LFxuICAndXAnOiAzOCxcbiAgJ3JpZ2h0JzogMzksXG4gICdkb3duJzogNDAsXG4gICdpbnNlcnQnOiA0NSxcbiAgJ2RlbGV0ZSc6IDQ2LFxuICAnY29tbWFuZCc6IDkxLFxuICAncmlnaHQgY2xpY2snOiA5MyxcbiAgJ251bXBhZCAqJzogMTA2LFxuICAnbnVtcGFkICsnOiAxMDcsXG4gICdudW1wYWQgLSc6IDEwOSxcbiAgJ251bXBhZCAuJzogMTEwLFxuICAnbnVtcGFkIC8nOiAxMTEsXG4gICdudW0gbG9jayc6IDE0NCxcbiAgJ3Njcm9sbCBsb2NrJzogMTQ1LFxuICAnbXkgY29tcHV0ZXInOiAxODIsXG4gICdteSBjYWxjdWxhdG9yJzogMTgzLFxuICAnOyc6IDE4NixcbiAgJz0nOiAxODcsXG4gICcsJzogMTg4LFxuICAnLSc6IDE4OSxcbiAgJy4nOiAxOTAsXG4gICcvJzogMTkxLFxuICAnYCc6IDE5MixcbiAgJ1snOiAyMTksXG4gICdcXFxcJzogMjIwLFxuICAnXSc6IDIyMSxcbiAgXCInXCI6IDIyMixcbn1cblxuLy8gSGVscGVyIGFsaWFzZXNcblxudmFyIGFsaWFzZXMgPSBleHBvcnRzLmFsaWFzZXMgPSB7XG4gICd3aW5kb3dzJzogOTEsXG4gICfih6cnOiAxNixcbiAgJ+KMpSc6IDE4LFxuICAn4oyDJzogMTcsXG4gICfijJgnOiA5MSxcbiAgJ2N0bCc6IDE3LFxuICAnY29udHJvbCc6IDE3LFxuICAnb3B0aW9uJzogMTgsXG4gICdwYXVzZSc6IDE5LFxuICAnYnJlYWsnOiAxOSxcbiAgJ2NhcHMnOiAyMCxcbiAgJ3JldHVybic6IDEzLFxuICAnZXNjYXBlJzogMjcsXG4gICdzcGMnOiAzMixcbiAgJ3BndXAnOiAzMyxcbiAgJ3BnZG4nOiAzMyxcbiAgJ2lucyc6IDQ1LFxuICAnZGVsJzogNDYsXG4gICdjbWQnOiA5MVxufVxuXG5cbi8qIVxuICogUHJvZ3JhbWF0aWNhbGx5IGFkZCB0aGUgZm9sbG93aW5nXG4gKi9cblxuLy8gbG93ZXIgY2FzZSBjaGFyc1xuZm9yIChpID0gOTc7IGkgPCAxMjM7IGkrKykgY29kZXNbU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpIC0gMzJcblxuLy8gbnVtYmVyc1xuZm9yICh2YXIgaSA9IDQ4OyBpIDwgNTg7IGkrKykgY29kZXNbaSAtIDQ4XSA9IGlcblxuLy8gZnVuY3Rpb24ga2V5c1xuZm9yIChpID0gMTsgaSA8IDEzOyBpKyspIGNvZGVzWydmJytpXSA9IGkgKyAxMTFcblxuLy8gbnVtcGFkIGtleXNcbmZvciAoaSA9IDA7IGkgPCAxMDsgaSsrKSBjb2Rlc1snbnVtcGFkICcraV0gPSBpICsgOTZcblxuLyoqXG4gKiBHZXQgYnkgY29kZVxuICpcbiAqICAgZXhwb3J0cy5uYW1lWzEzXSAvLyA9PiAnRW50ZXInXG4gKi9cblxudmFyIG5hbWVzID0gZXhwb3J0cy5uYW1lcyA9IGV4cG9ydHMudGl0bGUgPSB7fSAvLyB0aXRsZSBmb3IgYmFja3dhcmQgY29tcGF0XG5cbi8vIENyZWF0ZSByZXZlcnNlIG1hcHBpbmdcbmZvciAoaSBpbiBjb2RlcykgbmFtZXNbY29kZXNbaV1dID0gaVxuXG4vLyBBZGQgYWxpYXNlc1xuZm9yICh2YXIgYWxpYXMgaW4gYWxpYXNlcykge1xuICBjb2Rlc1thbGlhc10gPSBhbGlhc2VzW2FsaWFzXVxufVxuIl19
