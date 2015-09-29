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
    this.bullets = new Set();
    this.interval = setInterval(this.run.bind(this), 1000 / this.fps);
  }

  /* start game */

  _createClass(Game, [{
    key: 'update',
    value: function update() {
      if (keys.isPressed("space")) {
        var coordX = this.rocket.getCoordX();
        this.bullets.add(new Bullet(document.getElementById(bulletDomID), coordX));
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZmxvcmlhbnNjaG1pZHQvRGV2ZWxvcG1lbnQvZmxvcmlhbnNjaG1pZHQuY28udWsvanMvc3JjL0J1bGxldC5qcyIsIi9Vc2Vycy9mbG9yaWFuc2NobWlkdC9EZXZlbG9wbWVudC9mbG9yaWFuc2NobWlkdC5jby51ay9qcy9zcmMvQ29sb3JNb2RlLmpzIiwiL1VzZXJzL2Zsb3JpYW5zY2htaWR0L0RldmVsb3BtZW50L2Zsb3JpYW5zY2htaWR0LmNvLnVrL2pzL3NyYy9HYW1lLmpzIiwiL1VzZXJzL2Zsb3JpYW5zY2htaWR0L0RldmVsb3BtZW50L2Zsb3JpYW5zY2htaWR0LmNvLnVrL2pzL3NyYy9Sb2NrZXQuanMiLCIvVXNlcnMvZmxvcmlhbnNjaG1pZHQvRGV2ZWxvcG1lbnQvZmxvcmlhbnNjaG1pZHQuY28udWsvanMvc3JjL2tleXMuanMiLCJub2RlX21vZHVsZXMva2V5Y29kZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7Ozs7O0FBRWIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUVoQyxJQUFNLFFBQVEsR0FBRyxDQUFDLENBQUM7O0lBRWIsTUFBTTtBQUNDLFdBRFAsTUFBTSxDQUNFLFVBQVUsRUFBRSxNQUFNLEVBQUU7MEJBRDVCLE1BQU07O0FBRVIsUUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7QUFDN0IsUUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztHQUN4Qjs7ZUFKRyxNQUFNOztXQU1GLG9CQUFHO0FBQ1QsVUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQzlCLFVBQUcsTUFBTSxJQUFJLENBQUMsRUFBRTtBQUNkLGNBQU0sR0FBRyxNQUFNLElBQUksUUFBUSxDQUFDO09BQzdC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ekJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleXMgPSByZXF1aXJlKFwiLi9rZXlzLmpzXCIpO1xuXG5jb25zdCBESVNUQU5DRSA9IDI7XG5cbmNsYXNzIEJ1bGxldCB7XG4gIGNvbnN0cnVjdG9yKGRvbUVsZW1lbnQsIGNvb3JkWCkge1xuICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvbUVsZW1lbnQ7XG4gICAgdGhpcy5zZXRDb29yZFgoY29vcmRYKTtcbiAgfVxuXG4gIG1vdmVMZWZ0KCkge1xuICAgIHZhciBjb29yZFggPSB0aGlzLmdldENvb3JkWCgpO1xuICAgIGlmKGNvb3JkWCA+PSA1KSB7XG4gICAgICBjb29yZFggPSBjb29yZFggLT0gRElTVEFOQ0U7XG4gICAgfVxuICAgIHRoaXMuc2V0Q29vcmRYKGNvb3JkWCk7XG4gIH1cblxuICBtb3ZlUmlnaHQoKSB7XG4gICAgdmFyIGNvb3JkWCA9IHRoaXMuZ2V0Q29vcmRYKCk7XG4gICAgY29vcmRYID0gY29vcmRYICs9IERJU1RBTkNFO1xuICAgIHRoaXMuc2V0Q29vcmRYKGNvb3JkWCk7XG4gIH1cblxuICBtb3ZlVXAoKSB7XG4gICAgdmFyIGNvb3JkWSA9IHRoaXMuZ2V0Q29vcmRZKCk7XG4gICAgY29vcmRZID0gY29vcmRZICs9IERJU1RBTkNFO1xuICAgIHRoaXMuc2V0Q29vcmRZKGNvb3JkWSk7XG4gIH1cblxuICBtb3ZlRG93bigpIHtcbiAgICB2YXIgY29vcmRZID0gdGhpcy5nZXRDb29yZFkoKTtcbiAgICBjb29yZFkgPSBjb29yZFkgLT0gRElTVEFOQ0U7XG4gICAgdGhpcy5zZXRDb29yZFkoY29vcmRZKTtcbiAgfVxuXG4gIGdldENvb3JkWCgpIHtcbiAgICByZXR1cm4gKHRoaXMuZG9tRWxlbWVudC5zdHlsZS5sZWZ0ID09PSBcIlwiKT8gMCA6IHBhcnNlSW50KHRoaXMuZG9tRWxlbWVudC5zdHlsZS5sZWZ0KTtcbiAgfVxuXG4gIHNldENvb3JkWCh2YWx1ZSkge1xuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS5sZWZ0ID0gdmFsdWUrXCJweFwiO1xuICB9XG5cbiAgZ2V0Q29vcmRZKCkge1xuICAgIHJldHVybiAodGhpcy5kb21FbGVtZW50LnN0eWxlLmJvdHRvbSA9PT0gXCJcIik/IDAgOiBwYXJzZUludCh0aGlzLmRvbUVsZW1lbnQuc3R5bGUuYm90dG9tKTtcbiAgfVxuXG4gIHNldENvb3JkWSh2YWx1ZSkge1xuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS5ib3R0b20gPSB2YWx1ZStcInB4XCI7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgICB0aGlzLm1vdmVVcCgpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQnVsbGV0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY29sb3IgPSB7XG4gIGRhcms6IHtcbiAgICBiZzogXCIjMjgyQzM0XCIsXG4gICAgZm9udDogXCIjQUNCMkJFXCIsXG4gICAgbGlua3M6IFwiI0FDQjJCRVwiLFxuICAgIGltcHJlc3N1bTogXCIjQTJCRDc4XCJcbiAgfSxcbiAgbGlnaHQgOiB7XG4gICAgICBiZzogXCIjRkZGRkZGXCIsXG4gICAgICBsaW5rczogXCIjOEFCMzc3XCIsXG4gICAgICBpbXByZXNzdW06IFwiI0JDNTE0MlwiLFxuICAgICAgZm9udDogXCIjMjgyQzM0XCJcbiAgfVxufTtcblxudmFyIGRhcmtNb2RlID0gZmFsc2U7XG5cbmZ1bmN0aW9uIHRvZ2dsZSgpIHtcbiAgaWYoZGFya01vZGUpIHtcbiAgICBzZXRNb2RlKFwibGlnaHRtb2RlXCIpO1xuICAgIGRhcmtNb2RlID0gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgc2V0TW9kZShcImRhcmttb2RlXCIpO1xuICAgIGRhcmtNb2RlID0gdHJ1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXRNb2RlKG1vZGUpIHtcbiAgdmFyIGNvbG9yU2NoZW1lO1xuICBpZihtb2RlID09PSBcImRhcmttb2RlXCIpIHtcbiAgICBzZXREZWJ1ZyhcImxpZ2h0bW9kZVwiKTtcbiAgICBjb2xvclNjaGVtZSA9IGNvbG9yLmRhcms7XG4gIH0gZWxzZSB7XG4gICAgc2V0RGVidWcoXCJkYXJrbW9kZVwiKTtcbiAgICBjb2xvclNjaGVtZSA9IGNvbG9yLmxpZ2h0O1xuICB9XG5cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbXByZXNzdW1cIikuc3R5bGUuY29sb3IgPSBjb2xvclNjaGVtZS5pbXByZXNzdW07XG4gIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3JTY2hlbWUuYmc7XG4gIGRvY3VtZW50LmJvZHkuc3R5bGUuY29sb3IgPSBjb2xvclNjaGVtZS5mb250O1xufVxuXG5mdW5jdGlvbiBzZXREZWJ1ZyhtZXNzYWdlKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVidWdcIikuaW5uZXJUZXh0ID0gbWVzc2FnZTtcbn1cblxudmFyIHBlcnNpc3RlbnQgPSBmYWxzZTtcbnZhciBjbGlja2VkID0gMDtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZWJ1Z1wiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICBjbGlja2VkID0gbmV3IERhdGUoKS5nZXRIb3VycygpO1xuICBwZXJzaXN0ZW50ID0gdHJ1ZTtcbiAgdG9nZ2xlKCk7XG59KTtcblxuc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuXG4gIHZhciBob3VycyA9IG5ldyBEYXRlKCkuZ2V0SG91cnMoKTtcblxuICAvKiBEb24ndCBkbyBhbnl0aGluZyBpZiB1c2VyIGhhcyBjbGlja2VkIHN3aXRjaCBtYW51YWxseSAqL1xuICBpZihwZXJzaXN0ZW50ID09PSB0cnVlKSByZXR1cm47XG5cbiAgaWYoaG91cnMgPj0gMjAgfHzCoGhvdXJzIDwgOCkge1xuICAgIHNldE1vZGUoXCJkYXJrbW9kZVwiKTtcbiAgfSBlbHNlIHtcbiAgICBzZXRNb2RlKFwibGlnaHRtb2RlXCIpO1xuICB9XG59LCAxMDAwKTtcblxubW9kdWxlLmV4cG9ydHMgPSB0cnVlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUm9ja2V0ID0gcmVxdWlyZSgnLi9Sb2NrZXQnKTtcbnZhciBCdWxsZXQgPSByZXF1aXJlKCcuL0J1bGxldCcpO1xudmFyIGtleXMgPSByZXF1aXJlKFwiLi9rZXlzLmpzXCIpO1xuXG5yZXF1aXJlKFwiLi9Db2xvck1vZGVcIik7XG5cbmNvbnN0IEZQUyA9IDYwO1xuY29uc3Qgcm9ja2V0RG9tSUQgPSBcInJvY2tldFwiO1xuY29uc3QgYnVsbGV0RG9tSUQgPSBcImJ1bGxldFwiO1xuXG4vKlxuICogR2FtZUxvb3AgVHV0b3JpYWwgdm9uXG4gKiBodHRwOi8vbm9rYXJtYS5vcmcvMjAxMS8wMi8wMi9qYXZhc2NyaXB0LWdhbWUtZGV2ZWxvcG1lbnQtdGhlLWdhbWUtbG9vcC9cbiAqL1xuY2xhc3MgR2FtZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZnBzID0gRlBTO1xuICAgIHRoaXMucm9ja2V0ID0gbmV3IFJvY2tldChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChyb2NrZXREb21JRCkpO1xuICAgIHRoaXMuYnVsbGV0cyA9IG5ldyBTZXQoKTtcbiAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwodGhpcy5ydW4uYmluZCh0aGlzKSwgMTAwMCAvIHRoaXMuZnBzKTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBpZihrZXlzLmlzUHJlc3NlZChcInNwYWNlXCIpKSB7XG4gICAgICB2YXIgY29vcmRYID0gdGhpcy5yb2NrZXQuZ2V0Q29vcmRYKCk7XG4gICAgICB0aGlzLmJ1bGxldHMuYWRkKG5ldyBCdWxsZXQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYnVsbGV0RG9tSUQpLCBjb29yZFgpKTtcbiAgICB9XG4gICAgdGhpcy5yb2NrZXQudXBkYXRlKCk7XG4gICAgdGhpcy5idWxsZXRzLmZvckVhY2goYnVsbGV0ID0+IGJ1bGxldC51cGRhdGUoKSk7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gIH1cblxuICBydW4oKSB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG59XG5cbi8qIHN0YXJ0IGdhbWUgKi9cbm5ldyBHYW1lKCk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBrZXlzID0gcmVxdWlyZShcIi4va2V5cy5qc1wiKTtcblxuY29uc3QgRElTVEFOQ0UgPSAyO1xuXG5jbGFzcyBSb2NrZXQge1xuICBjb25zdHJ1Y3Rvcihkb21FbGVtZW50KSB7XG4gICAgdGhpcy5kb21FbGVtZW50ID0gZG9tRWxlbWVudDtcbiAgfVxuXG4gIG1vdmVMZWZ0KCkge1xuICAgIHZhciBjb29yZFggPSB0aGlzLmdldENvb3JkWCgpO1xuICAgIGlmKGNvb3JkWCA+PSA1KSB7XG4gICAgICBjb29yZFggPSBjb29yZFggLT0gRElTVEFOQ0U7XG4gICAgfVxuICAgIHRoaXMuc2V0Q29vcmRYKGNvb3JkWCk7XG4gIH1cblxuICBtb3ZlUmlnaHQoKSB7XG4gICAgdmFyIGNvb3JkWCA9IHRoaXMuZ2V0Q29vcmRYKCk7XG4gICAgY29vcmRYID0gY29vcmRYICs9IERJU1RBTkNFO1xuICAgIHRoaXMuc2V0Q29vcmRYKGNvb3JkWCk7XG4gIH1cblxuICBnZXRDb29yZFgoKSB7XG4gICAgcmV0dXJuICh0aGlzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCA9PT0gXCJcIik/IDAgOiBwYXJzZUludCh0aGlzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCk7XG4gIH1cblxuICBzZXRDb29yZFgodmFsdWUpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCA9IHZhbHVlK1wicHhcIjtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBpZiAoa2V5cy5pc1ByZXNzZWQoXCJsZWZ0XCIpKSB7XG4gICAgICB0aGlzLm1vdmVMZWZ0KCk7XG4gICAgfSBlbHNlIGlmIChrZXlzLmlzUHJlc3NlZChcInJpZ2h0XCIpKSB7XG4gICAgICB0aGlzLm1vdmVSaWdodCgpO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvY2tldDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleWNvZGUgPSByZXF1aXJlKFwia2V5Y29kZVwiKTtcblxubW9kdWxlLmV4cG9ydHMuaXNQcmVzc2VkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgdmFyIGNvZGUgPSBrZXljb2RlKG5hbWUpO1xuICByZXR1cm4gaXNQcmVzc2VkKGNvZGUpO1xufVxuXG52YXIgZG93bktleXMgPSBuZXcgTWFwKCk7XG5cbmRvY3VtZW50Lm9ua2V5ZG93biA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGRvd25LZXlzLnNldChldmVudC5rZXlDb2RlLCB0cnVlKTtcbn07XG5cbmRvY3VtZW50Lm9ua2V5dXAgPSBmdW5jdGlvbihldmVudCkge1xuICBkb3duS2V5cy5zZXQoZXZlbnQua2V5Q29kZSwgZmFsc2UpO1xufTtcblxuZnVuY3Rpb24gaXNQcmVzc2VkKGtleSkge1xuICBpZihkb3duS2V5cy5oYXMoa2V5KSkge1xuICAgIHJldHVybiBkb3duS2V5cy5nZXQoa2V5KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsIi8vIFNvdXJjZTogaHR0cDovL2pzZmlkZGxlLm5ldC92V3g4Vi9cbi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTYwMzE5NS9mdWxsLWxpc3Qtb2YtamF2YXNjcmlwdC1rZXljb2Rlc1xuXG5cblxuLyoqXG4gKiBDb25lbmllbmNlIG1ldGhvZCByZXR1cm5zIGNvcnJlc3BvbmRpbmcgdmFsdWUgZm9yIGdpdmVuIGtleU5hbWUgb3Iga2V5Q29kZS5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSBrZXlDb2RlIHtOdW1iZXJ9IG9yIGtleU5hbWUge1N0cmluZ31cbiAqIEByZXR1cm4ge01peGVkfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzZWFyY2hJbnB1dCkge1xuICAvLyBLZXlib2FyZCBFdmVudHNcbiAgaWYgKHNlYXJjaElucHV0ICYmICdvYmplY3QnID09PSB0eXBlb2Ygc2VhcmNoSW5wdXQpIHtcbiAgICB2YXIgaGFzS2V5Q29kZSA9IHNlYXJjaElucHV0LndoaWNoIHx8IHNlYXJjaElucHV0LmtleUNvZGUgfHwgc2VhcmNoSW5wdXQuY2hhckNvZGVcbiAgICBpZiAoaGFzS2V5Q29kZSkgc2VhcmNoSW5wdXQgPSBoYXNLZXlDb2RlXG4gIH1cblxuICAvLyBOdW1iZXJzXG4gIGlmICgnbnVtYmVyJyA9PT0gdHlwZW9mIHNlYXJjaElucHV0KSByZXR1cm4gbmFtZXNbc2VhcmNoSW5wdXRdXG5cbiAgLy8gRXZlcnl0aGluZyBlbHNlIChjYXN0IHRvIHN0cmluZylcbiAgdmFyIHNlYXJjaCA9IFN0cmluZyhzZWFyY2hJbnB1dClcblxuICAvLyBjaGVjayBjb2Rlc1xuICB2YXIgZm91bmROYW1lZEtleSA9IGNvZGVzW3NlYXJjaC50b0xvd2VyQ2FzZSgpXVxuICBpZiAoZm91bmROYW1lZEtleSkgcmV0dXJuIGZvdW5kTmFtZWRLZXlcblxuICAvLyBjaGVjayBhbGlhc2VzXG4gIHZhciBmb3VuZE5hbWVkS2V5ID0gYWxpYXNlc1tzZWFyY2gudG9Mb3dlckNhc2UoKV1cbiAgaWYgKGZvdW5kTmFtZWRLZXkpIHJldHVybiBmb3VuZE5hbWVkS2V5XG5cbiAgLy8gd2VpcmQgY2hhcmFjdGVyP1xuICBpZiAoc2VhcmNoLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHNlYXJjaC5jaGFyQ29kZUF0KDApXG5cbiAgcmV0dXJuIHVuZGVmaW5lZFxufVxuXG4vKipcbiAqIEdldCBieSBuYW1lXG4gKlxuICogICBleHBvcnRzLmNvZGVbJ2VudGVyJ10gLy8gPT4gMTNcbiAqL1xuXG52YXIgY29kZXMgPSBleHBvcnRzLmNvZGUgPSBleHBvcnRzLmNvZGVzID0ge1xuICAnYmFja3NwYWNlJzogOCxcbiAgJ3RhYic6IDksXG4gICdlbnRlcic6IDEzLFxuICAnc2hpZnQnOiAxNixcbiAgJ2N0cmwnOiAxNyxcbiAgJ2FsdCc6IDE4LFxuICAncGF1c2UvYnJlYWsnOiAxOSxcbiAgJ2NhcHMgbG9jayc6IDIwLFxuICAnZXNjJzogMjcsXG4gICdzcGFjZSc6IDMyLFxuICAncGFnZSB1cCc6IDMzLFxuICAncGFnZSBkb3duJzogMzQsXG4gICdlbmQnOiAzNSxcbiAgJ2hvbWUnOiAzNixcbiAgJ2xlZnQnOiAzNyxcbiAgJ3VwJzogMzgsXG4gICdyaWdodCc6IDM5LFxuICAnZG93bic6IDQwLFxuICAnaW5zZXJ0JzogNDUsXG4gICdkZWxldGUnOiA0NixcbiAgJ2NvbW1hbmQnOiA5MSxcbiAgJ3JpZ2h0IGNsaWNrJzogOTMsXG4gICdudW1wYWQgKic6IDEwNixcbiAgJ251bXBhZCArJzogMTA3LFxuICAnbnVtcGFkIC0nOiAxMDksXG4gICdudW1wYWQgLic6IDExMCxcbiAgJ251bXBhZCAvJzogMTExLFxuICAnbnVtIGxvY2snOiAxNDQsXG4gICdzY3JvbGwgbG9jayc6IDE0NSxcbiAgJ215IGNvbXB1dGVyJzogMTgyLFxuICAnbXkgY2FsY3VsYXRvcic6IDE4MyxcbiAgJzsnOiAxODYsXG4gICc9JzogMTg3LFxuICAnLCc6IDE4OCxcbiAgJy0nOiAxODksXG4gICcuJzogMTkwLFxuICAnLyc6IDE5MSxcbiAgJ2AnOiAxOTIsXG4gICdbJzogMjE5LFxuICAnXFxcXCc6IDIyMCxcbiAgJ10nOiAyMjEsXG4gIFwiJ1wiOiAyMjIsXG59XG5cbi8vIEhlbHBlciBhbGlhc2VzXG5cbnZhciBhbGlhc2VzID0gZXhwb3J0cy5hbGlhc2VzID0ge1xuICAnd2luZG93cyc6IDkxLFxuICAn4oenJzogMTYsXG4gICfijKUnOiAxOCxcbiAgJ+KMgyc6IDE3LFxuICAn4oyYJzogOTEsXG4gICdjdGwnOiAxNyxcbiAgJ2NvbnRyb2wnOiAxNyxcbiAgJ29wdGlvbic6IDE4LFxuICAncGF1c2UnOiAxOSxcbiAgJ2JyZWFrJzogMTksXG4gICdjYXBzJzogMjAsXG4gICdyZXR1cm4nOiAxMyxcbiAgJ2VzY2FwZSc6IDI3LFxuICAnc3BjJzogMzIsXG4gICdwZ3VwJzogMzMsXG4gICdwZ2RuJzogMzMsXG4gICdpbnMnOiA0NSxcbiAgJ2RlbCc6IDQ2LFxuICAnY21kJzogOTFcbn1cblxuXG4vKiFcbiAqIFByb2dyYW1hdGljYWxseSBhZGQgdGhlIGZvbGxvd2luZ1xuICovXG5cbi8vIGxvd2VyIGNhc2UgY2hhcnNcbmZvciAoaSA9IDk3OyBpIDwgMTIzOyBpKyspIGNvZGVzW1N0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaSAtIDMyXG5cbi8vIG51bWJlcnNcbmZvciAodmFyIGkgPSA0ODsgaSA8IDU4OyBpKyspIGNvZGVzW2kgLSA0OF0gPSBpXG5cbi8vIGZ1bmN0aW9uIGtleXNcbmZvciAoaSA9IDE7IGkgPCAxMzsgaSsrKSBjb2Rlc1snZicraV0gPSBpICsgMTExXG5cbi8vIG51bXBhZCBrZXlzXG5mb3IgKGkgPSAwOyBpIDwgMTA7IGkrKykgY29kZXNbJ251bXBhZCAnK2ldID0gaSArIDk2XG5cbi8qKlxuICogR2V0IGJ5IGNvZGVcbiAqXG4gKiAgIGV4cG9ydHMubmFtZVsxM10gLy8gPT4gJ0VudGVyJ1xuICovXG5cbnZhciBuYW1lcyA9IGV4cG9ydHMubmFtZXMgPSBleHBvcnRzLnRpdGxlID0ge30gLy8gdGl0bGUgZm9yIGJhY2t3YXJkIGNvbXBhdFxuXG4vLyBDcmVhdGUgcmV2ZXJzZSBtYXBwaW5nXG5mb3IgKGkgaW4gY29kZXMpIG5hbWVzW2NvZGVzW2ldXSA9IGlcblxuLy8gQWRkIGFsaWFzZXNcbmZvciAodmFyIGFsaWFzIGluIGFsaWFzZXMpIHtcbiAgY29kZXNbYWxpYXNdID0gYWxpYXNlc1thbGlhc11cbn1cbiJdfQ==
