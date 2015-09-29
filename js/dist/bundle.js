(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var keys = require("./keys.js");

var DISTANCE = 2;

var Bullet = (function () {
  function Bullet(domElement, coordX) {
    _classCallCheck(this, Bullet);

    this.domElement = domElement;
    this.setCoordX(coordX);
  }

  _createClass(Bullet, [{
    key: "moveLeft",
    value: function moveLeft() {
      var coordX = this.getCoordX();
      if (coordX >= 5) {
        coordX = coordX -= DISTANCE;
      }
      this.setCoordX(coordX);
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      var coordX = this.getCoordX();
      coordX = coordX += DISTANCE;
      this.setCoordX(coordX);
    }
  }, {
    key: "moveUp",
    value: function moveUp() {
      var coordY = this.getCoordY();
      coordY = coordY += DISTANCE;
      this.setCoordY(coordY);
    }
  }, {
    key: "moveDown",
    value: function moveDown() {
      var coordY = this.getCoordY();
      coordY = coordY -= DISTANCE;
      this.setCoordY(coordY);
    }
  }, {
    key: "getCoordX",
    value: function getCoordX() {
      return this.domElement.style.left === "" ? 0 : parseInt(this.domElement.style.left);
    }
  }, {
    key: "setCoordX",
    value: function setCoordX(value) {
      this.domElement.style.left = value + "px";
    }
  }, {
    key: "getCoordY",
    value: function getCoordY() {
      return this.domElement.style.bottom === "" ? 0 : parseInt(this.domElement.style.bottom);
    }
  }, {
    key: "setCoordY",
    value: function setCoordY(value) {
      this.domElement.style.bottom = value + "px";
    }
  }, {
    key: "update",
    value: function update() {
      this.moveUp();
    }
  }]);

  return Bullet;
})();

module.exports = Bullet;

},{"./keys.js":5}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Rocket = require('./Rocket');
var Bullet = require('./Bullet');
var keys = require("./keys.js");

require("./ColorMode");

var FPS = 60;
var rocketDomID = "rocket";
var bulletDomID = "bullet";

/*
 * GameLoop Tutorial von
 * http://nokarma.org/2011/02/02/javascript-game-development-the-game-loop/
 */

var Game = (function () {
  function Game() {
    _classCallCheck(this, Game);

    this.fps = FPS;
    this.rocket = new Rocket(document.getElementById(rocketDomID));
    this.bullets = new Map();
    this.interval = setInterval(this.run.bind(this), 1000 / this.fps);
  }

  /* start game */

  _createClass(Game, [{
    key: 'update',
    value: function update() {
      if (keys.isPressed("space")) {
        var coordX = this.rocket.getCoordX();
        this.bullets.set(bulletDomID, new Bullet(document.getElementById(bulletDomID), coordX));
      }
      this.rocket.update();
      this.bullets.forEach(function (bullet) {
        return bullet.update();
      });
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

},{"./Bullet":1,"./ColorMode":2,"./Rocket":4,"./keys.js":5}],4:[function(require,module,exports){
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
      var coordX = this.getCoordX();
      if (coordX >= 5) {
        coordX = coordX -= DISTANCE;
      }
      this.setCoordX(coordX);
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      var coordX = this.getCoordX();
      coordX = coordX += DISTANCE;
      this.setCoordX(coordX);
    }
  }, {
    key: "getCoordX",
    value: function getCoordX() {
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

},{"./keys.js":5}],5:[function(require,module,exports){
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

},{"keycode":6}],6:[function(require,module,exports){
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

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZmxvcmlhbnNjaG1pZHQvRGV2ZWxvcG1lbnQvZmxvcmlhbnNjaG1pZHQuY28udWsvanMvc3JjL0J1bGxldC5qcyIsIi9Vc2Vycy9mbG9yaWFuc2NobWlkdC9EZXZlbG9wbWVudC9mbG9yaWFuc2NobWlkdC5jby51ay9qcy9zcmMvQ29sb3JNb2RlLmpzIiwiL1VzZXJzL2Zsb3JpYW5zY2htaWR0L0RldmVsb3BtZW50L2Zsb3JpYW5zY2htaWR0LmNvLnVrL2pzL3NyYy9HYW1lLmpzIiwiL1VzZXJzL2Zsb3JpYW5zY2htaWR0L0RldmVsb3BtZW50L2Zsb3JpYW5zY2htaWR0LmNvLnVrL2pzL3NyYy9Sb2NrZXQuanMiLCIvVXNlcnMvZmxvcmlhbnNjaG1pZHQvRGV2ZWxvcG1lbnQvZmxvcmlhbnNjaG1pZHQuY28udWsvanMvc3JjL2tleXMuanMiLCJub2RlX21vZHVsZXMva2V5Y29kZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7Ozs7O0FBRWIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUVoQyxJQUFNLFFBQVEsR0FBRyxDQUFDLENBQUM7O0lBRWIsTUFBTTtBQUNDLFdBRFAsTUFBTSxDQUNFLFVBQVUsRUFBRSxNQUFNLEVBQUU7MEJBRDVCLE1BQU07O0FBRVIsUUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7QUFDN0IsUUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztHQUN4Qjs7ZUFKRyxNQUFNOztXQU1GLG9CQUFHO0FBQ1QsVUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQzlCLFVBQUcsTUFBTSxJQUFJLENBQUMsRUFBRTtBQUNkLGNBQU0sR0FBRyxNQUFNLElBQUksUUFBUSxDQUFDO09BQzdC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O0NBQ0Y7OztBQ3pCRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBrZXlzID0gcmVxdWlyZShcIi4va2V5cy5qc1wiKTtcblxuY29uc3QgRElTVEFOQ0UgPSAyO1xuXG5jbGFzcyBCdWxsZXQge1xuICBjb25zdHJ1Y3Rvcihkb21FbGVtZW50LCBjb29yZFgpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb21FbGVtZW50O1xuICAgIHRoaXMuc2V0Q29vcmRYKGNvb3JkWCk7XG4gIH1cblxuICBtb3ZlTGVmdCgpIHtcbiAgICB2YXIgY29vcmRYID0gdGhpcy5nZXRDb29yZFgoKTtcbiAgICBpZihjb29yZFggPj0gNSkge1xuICAgICAgY29vcmRYID0gY29vcmRYIC09IERJU1RBTkNFO1xuICAgIH1cbiAgICB0aGlzLnNldENvb3JkWChjb29yZFgpO1xuICB9XG5cbiAgbW92ZVJpZ2h0KCkge1xuICAgIHZhciBjb29yZFggPSB0aGlzLmdldENvb3JkWCgpO1xuICAgIGNvb3JkWCA9IGNvb3JkWCArPSBESVNUQU5DRTtcbiAgICB0aGlzLnNldENvb3JkWChjb29yZFgpO1xuICB9XG5cbiAgbW92ZVVwKCkge1xuICAgIHZhciBjb29yZFkgPSB0aGlzLmdldENvb3JkWSgpO1xuICAgIGNvb3JkWSA9IGNvb3JkWSArPSBESVNUQU5DRTtcbiAgICB0aGlzLnNldENvb3JkWShjb29yZFkpO1xuICB9XG5cbiAgbW92ZURvd24oKSB7XG4gICAgdmFyIGNvb3JkWSA9IHRoaXMuZ2V0Q29vcmRZKCk7XG4gICAgY29vcmRZID0gY29vcmRZIC09IERJU1RBTkNFO1xuICAgIHRoaXMuc2V0Q29vcmRZKGNvb3JkWSk7XG4gIH1cblxuICBnZXRDb29yZFgoKSB7XG4gICAgcmV0dXJuICh0aGlzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCA9PT0gXCJcIik/IDAgOiBwYXJzZUludCh0aGlzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCk7XG4gIH1cblxuICBzZXRDb29yZFgodmFsdWUpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCA9IHZhbHVlK1wicHhcIjtcbiAgfVxuXG4gIGdldENvb3JkWSgpIHtcbiAgICByZXR1cm4gKHRoaXMuZG9tRWxlbWVudC5zdHlsZS5ib3R0b20gPT09IFwiXCIpPyAwIDogcGFyc2VJbnQodGhpcy5kb21FbGVtZW50LnN0eWxlLmJvdHRvbSk7XG4gIH1cblxuICBzZXRDb29yZFkodmFsdWUpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUuYm90dG9tID0gdmFsdWUrXCJweFwiO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgICAgdGhpcy5tb3ZlVXAoKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1bGxldDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNvbG9yID0ge1xuICBkYXJrOiB7XG4gICAgYmc6IFwiIzI4MkMzNFwiLFxuICAgIGZvbnQ6IFwiI0FDQjJCRVwiLFxuICAgIGxpbmtzOiBcIiNBQ0IyQkVcIixcbiAgICBpbXByZXNzdW06IFwiI0EyQkQ3OFwiXG4gIH0sXG4gIGxpZ2h0IDoge1xuICAgICAgYmc6IFwiI0ZGRkZGRlwiLFxuICAgICAgbGlua3M6IFwiIzhBQjM3N1wiLFxuICAgICAgaW1wcmVzc3VtOiBcIiNCQzUxNDJcIixcbiAgICAgIGZvbnQ6IFwiIzI4MkMzNFwiXG4gIH1cbn07XG5cbnZhciBkYXJrTW9kZSA9IGZhbHNlO1xuXG5mdW5jdGlvbiB0b2dnbGUoKSB7XG4gIGlmKGRhcmtNb2RlKSB7XG4gICAgc2V0TW9kZShcImxpZ2h0bW9kZVwiKTtcbiAgICBkYXJrTW9kZSA9IGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHNldE1vZGUoXCJkYXJrbW9kZVwiKTtcbiAgICBkYXJrTW9kZSA9IHRydWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0TW9kZShtb2RlKSB7XG4gIHZhciBjb2xvclNjaGVtZTtcbiAgaWYobW9kZSA9PT0gXCJkYXJrbW9kZVwiKSB7XG4gICAgc2V0RGVidWcoXCJsaWdodG1vZGVcIik7XG4gICAgY29sb3JTY2hlbWUgPSBjb2xvci5kYXJrO1xuICB9IGVsc2Uge1xuICAgIHNldERlYnVnKFwiZGFya21vZGVcIik7XG4gICAgY29sb3JTY2hlbWUgPSBjb2xvci5saWdodDtcbiAgfVxuXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW1wcmVzc3VtXCIpLnN0eWxlLmNvbG9yID0gY29sb3JTY2hlbWUuaW1wcmVzc3VtO1xuICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yU2NoZW1lLmJnO1xuICBkb2N1bWVudC5ib2R5LnN0eWxlLmNvbG9yID0gY29sb3JTY2hlbWUuZm9udDtcbn1cblxuZnVuY3Rpb24gc2V0RGVidWcobWVzc2FnZSkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlYnVnXCIpLmlubmVyVGV4dCA9IG1lc3NhZ2U7XG59XG5cbnZhciBwZXJzaXN0ZW50ID0gZmFsc2U7XG52YXIgY2xpY2tlZCA9IDA7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVidWdcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgY2xpY2tlZCA9IG5ldyBEYXRlKCkuZ2V0SG91cnMoKTtcbiAgcGVyc2lzdGVudCA9IHRydWU7XG4gIHRvZ2dsZSgpO1xufSk7XG5cbnNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcblxuICB2YXIgaG91cnMgPSBuZXcgRGF0ZSgpLmdldEhvdXJzKCk7XG5cbiAgLyogRG9uJ3QgZG8gYW55dGhpbmcgaWYgdXNlciBoYXMgY2xpY2tlZCBzd2l0Y2ggbWFudWFsbHkgKi9cbiAgaWYocGVyc2lzdGVudCA9PT0gdHJ1ZSkgcmV0dXJuO1xuXG4gIGlmKGhvdXJzID49IDIwIHx8wqBob3VycyA8IDgpIHtcbiAgICBzZXRNb2RlKFwiZGFya21vZGVcIik7XG4gIH0gZWxzZSB7XG4gICAgc2V0TW9kZShcImxpZ2h0bW9kZVwiKTtcbiAgfVxufSwgMTAwMCk7XG5cbm1vZHVsZS5leHBvcnRzID0gdHJ1ZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFJvY2tldCA9IHJlcXVpcmUoJy4vUm9ja2V0Jyk7XG52YXIgQnVsbGV0ID0gcmVxdWlyZSgnLi9CdWxsZXQnKTtcbnZhciBrZXlzID0gcmVxdWlyZShcIi4va2V5cy5qc1wiKTtcblxucmVxdWlyZShcIi4vQ29sb3JNb2RlXCIpO1xuXG5jb25zdCBGUFMgPSA2MDtcbmNvbnN0IHJvY2tldERvbUlEID0gXCJyb2NrZXRcIjtcbmNvbnN0IGJ1bGxldERvbUlEID0gXCJidWxsZXRcIjtcblxuLypcbiAqIEdhbWVMb29wIFR1dG9yaWFsIHZvblxuICogaHR0cDovL25va2FybWEub3JnLzIwMTEvMDIvMDIvamF2YXNjcmlwdC1nYW1lLWRldmVsb3BtZW50LXRoZS1nYW1lLWxvb3AvXG4gKi9cbmNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmZwcyA9IEZQUztcbiAgICB0aGlzLnJvY2tldCA9IG5ldyBSb2NrZXQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocm9ja2V0RG9tSUQpKTtcbiAgICB0aGlzLmJ1bGxldHMgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMucnVuLmJpbmQodGhpcyksIDEwMDAgLyB0aGlzLmZwcyk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgaWYoa2V5cy5pc1ByZXNzZWQoXCJzcGFjZVwiKSkge1xuICAgICAgdmFyIGNvb3JkWCA9IHRoaXMucm9ja2V0LmdldENvb3JkWCgpO1xuICAgICAgdGhpcy5idWxsZXRzLnNldChidWxsZXREb21JRCwgbmV3IEJ1bGxldChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChidWxsZXREb21JRCksIGNvb3JkWCkpO1xuICAgIH1cbiAgICB0aGlzLnJvY2tldC51cGRhdGUoKTtcbiAgICB0aGlzLmJ1bGxldHMuZm9yRWFjaChidWxsZXQgPT4gYnVsbGV0LnVwZGF0ZSgpKTtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgfVxuXG4gIHJ1bigpIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbn1cblxuLyogc3RhcnQgZ2FtZSAqL1xubmV3IEdhbWUoKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleXMgPSByZXF1aXJlKFwiLi9rZXlzLmpzXCIpO1xuXG5jb25zdCBESVNUQU5DRSA9IDI7XG5cbmNsYXNzIFJvY2tldCB7XG4gIGNvbnN0cnVjdG9yKGRvbUVsZW1lbnQpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb21FbGVtZW50O1xuICB9XG5cbiAgbW92ZUxlZnQoKSB7XG4gICAgdmFyIGNvb3JkWCA9IHRoaXMuZ2V0Q29vcmRYKCk7XG4gICAgaWYoY29vcmRYID49IDUpIHtcbiAgICAgIGNvb3JkWCA9IGNvb3JkWCAtPSBESVNUQU5DRTtcbiAgICB9XG4gICAgdGhpcy5zZXRDb29yZFgoY29vcmRYKTtcbiAgfVxuXG4gIG1vdmVSaWdodCgpIHtcbiAgICB2YXIgY29vcmRYID0gdGhpcy5nZXRDb29yZFgoKTtcbiAgICBjb29yZFggPSBjb29yZFggKz0gRElTVEFOQ0U7XG4gICAgdGhpcy5zZXRDb29yZFgoY29vcmRYKTtcbiAgfVxuXG4gIGdldENvb3JkWCgpIHtcbiAgICByZXR1cm4gKHRoaXMuZG9tRWxlbWVudC5zdHlsZS5sZWZ0ID09PSBcIlwiKT8gMCA6IHBhcnNlSW50KHRoaXMuZG9tRWxlbWVudC5zdHlsZS5sZWZ0KTtcbiAgfVxuXG4gIHNldENvb3JkWCh2YWx1ZSkge1xuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS5sZWZ0ID0gdmFsdWUrXCJweFwiO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGlmIChrZXlzLmlzUHJlc3NlZChcImxlZnRcIikpIHtcbiAgICAgIHRoaXMubW92ZUxlZnQoKTtcbiAgICB9IGVsc2UgaWYgKGtleXMuaXNQcmVzc2VkKFwicmlnaHRcIikpIHtcbiAgICAgIHRoaXMubW92ZVJpZ2h0KCk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm9ja2V0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIga2V5Y29kZSA9IHJlcXVpcmUoXCJrZXljb2RlXCIpO1xuXG5tb2R1bGUuZXhwb3J0cy5pc1ByZXNzZWQgPSBmdW5jdGlvbiAobmFtZSkge1xuICB2YXIgY29kZSA9IGtleWNvZGUobmFtZSk7XG4gIHJldHVybiBpc1ByZXNzZWQoY29kZSk7XG59XG5cbnZhciBkb3duS2V5cyA9IG5ldyBNYXAoKTtcblxuZG9jdW1lbnQub25rZXlkb3duID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgZG93bktleXMuc2V0KGV2ZW50LmtleUNvZGUsIHRydWUpO1xufTtcblxuZG9jdW1lbnQub25rZXl1cCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGRvd25LZXlzLnNldChldmVudC5rZXlDb2RlLCBmYWxzZSk7XG59O1xuXG5mdW5jdGlvbiBpc1ByZXNzZWQoa2V5KSB7XG4gIGlmKGRvd25LZXlzLmhhcyhrZXkpKSB7XG4gICAgcmV0dXJuIGRvd25LZXlzLmdldChrZXkpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiLy8gU291cmNlOiBodHRwOi8vanNmaWRkbGUubmV0L3ZXeDhWL1xuLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81NjAzMTk1L2Z1bGwtbGlzdC1vZi1qYXZhc2NyaXB0LWtleWNvZGVzXG5cblxuXG4vKipcbiAqIENvbmVuaWVuY2UgbWV0aG9kIHJldHVybnMgY29ycmVzcG9uZGluZyB2YWx1ZSBmb3IgZ2l2ZW4ga2V5TmFtZSBvciBrZXlDb2RlLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IGtleUNvZGUge051bWJlcn0gb3Iga2V5TmFtZSB7U3RyaW5nfVxuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHNlYXJjaElucHV0KSB7XG4gIC8vIEtleWJvYXJkIEV2ZW50c1xuICBpZiAoc2VhcmNoSW5wdXQgJiYgJ29iamVjdCcgPT09IHR5cGVvZiBzZWFyY2hJbnB1dCkge1xuICAgIHZhciBoYXNLZXlDb2RlID0gc2VhcmNoSW5wdXQud2hpY2ggfHwgc2VhcmNoSW5wdXQua2V5Q29kZSB8fCBzZWFyY2hJbnB1dC5jaGFyQ29kZVxuICAgIGlmIChoYXNLZXlDb2RlKSBzZWFyY2hJbnB1dCA9IGhhc0tleUNvZGVcbiAgfVxuXG4gIC8vIE51bWJlcnNcbiAgaWYgKCdudW1iZXInID09PSB0eXBlb2Ygc2VhcmNoSW5wdXQpIHJldHVybiBuYW1lc1tzZWFyY2hJbnB1dF1cblxuICAvLyBFdmVyeXRoaW5nIGVsc2UgKGNhc3QgdG8gc3RyaW5nKVxuICB2YXIgc2VhcmNoID0gU3RyaW5nKHNlYXJjaElucHV0KVxuXG4gIC8vIGNoZWNrIGNvZGVzXG4gIHZhciBmb3VuZE5hbWVkS2V5ID0gY29kZXNbc2VhcmNoLnRvTG93ZXJDYXNlKCldXG4gIGlmIChmb3VuZE5hbWVkS2V5KSByZXR1cm4gZm91bmROYW1lZEtleVxuXG4gIC8vIGNoZWNrIGFsaWFzZXNcbiAgdmFyIGZvdW5kTmFtZWRLZXkgPSBhbGlhc2VzW3NlYXJjaC50b0xvd2VyQ2FzZSgpXVxuICBpZiAoZm91bmROYW1lZEtleSkgcmV0dXJuIGZvdW5kTmFtZWRLZXlcblxuICAvLyB3ZWlyZCBjaGFyYWN0ZXI/XG4gIGlmIChzZWFyY2gubGVuZ3RoID09PSAxKSByZXR1cm4gc2VhcmNoLmNoYXJDb2RlQXQoMClcblxuICByZXR1cm4gdW5kZWZpbmVkXG59XG5cbi8qKlxuICogR2V0IGJ5IG5hbWVcbiAqXG4gKiAgIGV4cG9ydHMuY29kZVsnZW50ZXInXSAvLyA9PiAxM1xuICovXG5cbnZhciBjb2RlcyA9IGV4cG9ydHMuY29kZSA9IGV4cG9ydHMuY29kZXMgPSB7XG4gICdiYWNrc3BhY2UnOiA4LFxuICAndGFiJzogOSxcbiAgJ2VudGVyJzogMTMsXG4gICdzaGlmdCc6IDE2LFxuICAnY3RybCc6IDE3LFxuICAnYWx0JzogMTgsXG4gICdwYXVzZS9icmVhayc6IDE5LFxuICAnY2FwcyBsb2NrJzogMjAsXG4gICdlc2MnOiAyNyxcbiAgJ3NwYWNlJzogMzIsXG4gICdwYWdlIHVwJzogMzMsXG4gICdwYWdlIGRvd24nOiAzNCxcbiAgJ2VuZCc6IDM1LFxuICAnaG9tZSc6IDM2LFxuICAnbGVmdCc6IDM3LFxuICAndXAnOiAzOCxcbiAgJ3JpZ2h0JzogMzksXG4gICdkb3duJzogNDAsXG4gICdpbnNlcnQnOiA0NSxcbiAgJ2RlbGV0ZSc6IDQ2LFxuICAnY29tbWFuZCc6IDkxLFxuICAncmlnaHQgY2xpY2snOiA5MyxcbiAgJ251bXBhZCAqJzogMTA2LFxuICAnbnVtcGFkICsnOiAxMDcsXG4gICdudW1wYWQgLSc6IDEwOSxcbiAgJ251bXBhZCAuJzogMTEwLFxuICAnbnVtcGFkIC8nOiAxMTEsXG4gICdudW0gbG9jayc6IDE0NCxcbiAgJ3Njcm9sbCBsb2NrJzogMTQ1LFxuICAnbXkgY29tcHV0ZXInOiAxODIsXG4gICdteSBjYWxjdWxhdG9yJzogMTgzLFxuICAnOyc6IDE4NixcbiAgJz0nOiAxODcsXG4gICcsJzogMTg4LFxuICAnLSc6IDE4OSxcbiAgJy4nOiAxOTAsXG4gICcvJzogMTkxLFxuICAnYCc6IDE5MixcbiAgJ1snOiAyMTksXG4gICdcXFxcJzogMjIwLFxuICAnXSc6IDIyMSxcbiAgXCInXCI6IDIyMixcbn1cblxuLy8gSGVscGVyIGFsaWFzZXNcblxudmFyIGFsaWFzZXMgPSBleHBvcnRzLmFsaWFzZXMgPSB7XG4gICd3aW5kb3dzJzogOTEsXG4gICfih6cnOiAxNixcbiAgJ+KMpSc6IDE4LFxuICAn4oyDJzogMTcsXG4gICfijJgnOiA5MSxcbiAgJ2N0bCc6IDE3LFxuICAnY29udHJvbCc6IDE3LFxuICAnb3B0aW9uJzogMTgsXG4gICdwYXVzZSc6IDE5LFxuICAnYnJlYWsnOiAxOSxcbiAgJ2NhcHMnOiAyMCxcbiAgJ3JldHVybic6IDEzLFxuICAnZXNjYXBlJzogMjcsXG4gICdzcGMnOiAzMixcbiAgJ3BndXAnOiAzMyxcbiAgJ3BnZG4nOiAzMyxcbiAgJ2lucyc6IDQ1LFxuICAnZGVsJzogNDYsXG4gICdjbWQnOiA5MVxufVxuXG5cbi8qIVxuICogUHJvZ3JhbWF0aWNhbGx5IGFkZCB0aGUgZm9sbG93aW5nXG4gKi9cblxuLy8gbG93ZXIgY2FzZSBjaGFyc1xuZm9yIChpID0gOTc7IGkgPCAxMjM7IGkrKykgY29kZXNbU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpIC0gMzJcblxuLy8gbnVtYmVyc1xuZm9yICh2YXIgaSA9IDQ4OyBpIDwgNTg7IGkrKykgY29kZXNbaSAtIDQ4XSA9IGlcblxuLy8gZnVuY3Rpb24ga2V5c1xuZm9yIChpID0gMTsgaSA8IDEzOyBpKyspIGNvZGVzWydmJytpXSA9IGkgKyAxMTFcblxuLy8gbnVtcGFkIGtleXNcbmZvciAoaSA9IDA7IGkgPCAxMDsgaSsrKSBjb2Rlc1snbnVtcGFkICcraV0gPSBpICsgOTZcblxuLyoqXG4gKiBHZXQgYnkgY29kZVxuICpcbiAqICAgZXhwb3J0cy5uYW1lWzEzXSAvLyA9PiAnRW50ZXInXG4gKi9cblxudmFyIG5hbWVzID0gZXhwb3J0cy5uYW1lcyA9IGV4cG9ydHMudGl0bGUgPSB7fSAvLyB0aXRsZSBmb3IgYmFja3dhcmQgY29tcGF0XG5cbi8vIENyZWF0ZSByZXZlcnNlIG1hcHBpbmdcbmZvciAoaSBpbiBjb2RlcykgbmFtZXNbY29kZXNbaV1dID0gaVxuXG4vLyBBZGQgYWxpYXNlc1xuZm9yICh2YXIgYWxpYXMgaW4gYWxpYXNlcykge1xuICBjb2Rlc1thbGlhc10gPSBhbGlhc2VzW2FsaWFzXVxufVxuIl19
