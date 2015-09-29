(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var keys = require("./keys.js");

var DISTANCE = 2;

var Bullet = (function () {
  function Bullet(container, coordX) {
    _classCallCheck(this, Bullet);

    this.domElement = document.createElement("div");
    this.domElement.setAttribute("class", "bullet");
    var icon = document.createTextNode("*");
    this.domElement.appendChild(icon);
    this.domElement.style.bottom = "30px";
    container.appendChild(this.domElement);
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
var bulletDomID = "bulletContainer";

var bulletCounter = 0;
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
      if (keys.gotClicked("space")) {
        var coordX = this.rocket.getCoordX();
        this.bullets.set("bullet" + bulletCounter, new Bullet(document.getElementById(bulletDomID), coordX + 25));
        bulletCounter++;
      }
      this.rocket.update();
      this.bullets.forEach(function (value, key) {
        value.update();
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
  return isPressedKey(code);
};

module.exports.gotClicked = function (name) {
  var code = keycode(name);
  return gotClickedKey(code);
};

var downKeys = new Map();
var clickedKeys = new Map();

document.onkeydown = function (event) {
  downKeys.set(event.keyCode, true);
  clickedKeys.set(event.keyCode, true);
};

document.onkeyup = function (event) {
  downKeys.set(event.keyCode, false);
};

function isPressedKey(key) {
  if (downKeys.has(key)) {
    return downKeys.get(key);
  } else {
    return false;
  }
}

function gotClickedKey(key) {
  if (clickedKeys.has(key)) {
    var value = clickedKeys.get(key);
    clickedKeys.set(key, false);
    return value;
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZmxvcmlhbnNjaG1pZHQvRGV2ZWxvcG1lbnQvZmxvcmlhbnNjaG1pZHQuY28udWsvanMvc3JjL0J1bGxldC5qcyIsIi9Vc2Vycy9mbG9yaWFuc2NobWlkdC9EZXZlbG9wbWVudC9mbG9yaWFuc2NobWlkdC5jby51ay9qcy9zcmMvQ29sb3JNb2RlLmpzIiwiL1VzZXJzL2Zsb3JpYW5zY2htaWR0L0RldmVsb3BtZW50L2Zsb3JpYW5zY2htaWR0LmNvLnVrL2pzL3NyYy9HYW1lLmpzIiwiL1VzZXJzL2Zsb3JpYW5zY2htaWR0L0RldmVsb3BtZW50L2Zsb3JpYW5zY2htaWR0LmNvLnVrL2pzL3NyYy9Sb2NrZXQuanMiLCIvVXNlcnMvZmxvcmlhbnNjaG1pZHQvRGV2ZWxvcG1lbnQvZmxvcmlhbnNjaG1pZHQuY28udWsvanMvc3JjL2tleXMuanMiLCJub2RlX21vZHVsZXMva2V5Y29kZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7Ozs7O0FBRWIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUVoQyxJQUFNLFFBQVEsR0FBRyxDQUFDLENBQUM7O0lBRWIsTUFBTTtBQUNDLFdBRFAsTUFBTSxDQUNFLFNBQVMsRUFBRSxNQUFNLEVBQUU7MEJBRDNCLE1BQU07O0FBR1IsUUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2hELFFBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNoRCxRQUFJLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hDLFFBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleXMgPSByZXF1aXJlKFwiLi9rZXlzLmpzXCIpO1xuXG5jb25zdCBESVNUQU5DRSA9IDI7XG5cbmNsYXNzIEJ1bGxldCB7XG4gIGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgY29vcmRYKSB7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMuZG9tRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImJ1bGxldFwiKTtcbiAgICB2YXIgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiKlwiKTtcbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLmJvdHRvbSA9IFwiMzBweFwiO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmRvbUVsZW1lbnQpO1xuICAgIHRoaXMuc2V0Q29vcmRYKGNvb3JkWCk7XG4gIH1cblxuICBtb3ZlTGVmdCgpIHtcbiAgICB2YXIgY29vcmRYID0gdGhpcy5nZXRDb29yZFgoKTtcbiAgICBpZihjb29yZFggPj0gNSkge1xuICAgICAgY29vcmRYID0gY29vcmRYIC09IERJU1RBTkNFO1xuICAgIH1cbiAgICB0aGlzLnNldENvb3JkWChjb29yZFgpO1xuICB9XG5cbiAgbW92ZVJpZ2h0KCkge1xuICAgIHZhciBjb29yZFggPSB0aGlzLmdldENvb3JkWCgpO1xuICAgIGNvb3JkWCA9IGNvb3JkWCArPSBESVNUQU5DRTtcbiAgICB0aGlzLnNldENvb3JkWChjb29yZFgpO1xuICB9XG5cbiAgbW92ZVVwKCkge1xuICAgIHZhciBjb29yZFkgPSB0aGlzLmdldENvb3JkWSgpO1xuICAgIGNvb3JkWSA9IGNvb3JkWSArPSBESVNUQU5DRTtcbiAgICB0aGlzLnNldENvb3JkWShjb29yZFkpO1xuICB9XG5cbiAgbW92ZURvd24oKSB7XG4gICAgdmFyIGNvb3JkWSA9IHRoaXMuZ2V0Q29vcmRZKCk7XG4gICAgY29vcmRZID0gY29vcmRZIC09IERJU1RBTkNFO1xuICAgIHRoaXMuc2V0Q29vcmRZKGNvb3JkWSk7XG4gIH1cblxuICBnZXRDb29yZFgoKSB7XG4gICAgcmV0dXJuICh0aGlzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCA9PT0gXCJcIik/IDAgOiBwYXJzZUludCh0aGlzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCk7XG4gIH1cblxuICBzZXRDb29yZFgodmFsdWUpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCA9IHZhbHVlK1wicHhcIjtcbiAgfVxuXG4gIGdldENvb3JkWSgpIHtcbiAgICByZXR1cm4gKHRoaXMuZG9tRWxlbWVudC5zdHlsZS5ib3R0b20gPT09IFwiXCIpPyAwIDogcGFyc2VJbnQodGhpcy5kb21FbGVtZW50LnN0eWxlLmJvdHRvbSk7XG4gIH1cblxuICBzZXRDb29yZFkodmFsdWUpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUuYm90dG9tID0gdmFsdWUrXCJweFwiO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgICAgdGhpcy5tb3ZlVXAoKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1bGxldDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNvbG9yID0ge1xuICBkYXJrOiB7XG4gICAgYmc6IFwiIzI4MkMzNFwiLFxuICAgIGZvbnQ6IFwiI0FDQjJCRVwiLFxuICAgIGxpbmtzOiBcIiNBQ0IyQkVcIixcbiAgICBpbXByZXNzdW06IFwiI0EyQkQ3OFwiXG4gIH0sXG4gIGxpZ2h0IDoge1xuICAgICAgYmc6IFwiI0ZGRkZGRlwiLFxuICAgICAgbGlua3M6IFwiIzhBQjM3N1wiLFxuICAgICAgaW1wcmVzc3VtOiBcIiNCQzUxNDJcIixcbiAgICAgIGZvbnQ6IFwiIzI4MkMzNFwiXG4gIH1cbn07XG5cbnZhciBkYXJrTW9kZSA9IGZhbHNlO1xuXG5mdW5jdGlvbiB0b2dnbGUoKSB7XG4gIGlmKGRhcmtNb2RlKSB7XG4gICAgc2V0TW9kZShcImxpZ2h0bW9kZVwiKTtcbiAgICBkYXJrTW9kZSA9IGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHNldE1vZGUoXCJkYXJrbW9kZVwiKTtcbiAgICBkYXJrTW9kZSA9IHRydWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0TW9kZShtb2RlKSB7XG4gIHZhciBjb2xvclNjaGVtZTtcbiAgaWYobW9kZSA9PT0gXCJkYXJrbW9kZVwiKSB7XG4gICAgc2V0RGVidWcoXCJsaWdodG1vZGVcIik7XG4gICAgY29sb3JTY2hlbWUgPSBjb2xvci5kYXJrO1xuICB9IGVsc2Uge1xuICAgIHNldERlYnVnKFwiZGFya21vZGVcIik7XG4gICAgY29sb3JTY2hlbWUgPSBjb2xvci5saWdodDtcbiAgfVxuXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW1wcmVzc3VtXCIpLnN0eWxlLmNvbG9yID0gY29sb3JTY2hlbWUuaW1wcmVzc3VtO1xuICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yU2NoZW1lLmJnO1xuICBkb2N1bWVudC5ib2R5LnN0eWxlLmNvbG9yID0gY29sb3JTY2hlbWUuZm9udDtcbn1cblxuZnVuY3Rpb24gc2V0RGVidWcobWVzc2FnZSkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlYnVnXCIpLmlubmVyVGV4dCA9IG1lc3NhZ2U7XG59XG5cbnZhciBwZXJzaXN0ZW50ID0gZmFsc2U7XG52YXIgY2xpY2tlZCA9IDA7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVidWdcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgY2xpY2tlZCA9IG5ldyBEYXRlKCkuZ2V0SG91cnMoKTtcbiAgcGVyc2lzdGVudCA9IHRydWU7XG4gIHRvZ2dsZSgpO1xufSk7XG5cbnNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcblxuICB2YXIgaG91cnMgPSBuZXcgRGF0ZSgpLmdldEhvdXJzKCk7XG5cbiAgLyogRG9uJ3QgZG8gYW55dGhpbmcgaWYgdXNlciBoYXMgY2xpY2tlZCBzd2l0Y2ggbWFudWFsbHkgKi9cbiAgaWYocGVyc2lzdGVudCA9PT0gdHJ1ZSkgcmV0dXJuO1xuXG4gIGlmKGhvdXJzID49IDIwIHx8wqBob3VycyA8IDgpIHtcbiAgICBzZXRNb2RlKFwiZGFya21vZGVcIik7XG4gIH0gZWxzZSB7XG4gICAgc2V0TW9kZShcImxpZ2h0bW9kZVwiKTtcbiAgfVxufSwgMTAwMCk7XG5cbm1vZHVsZS5leHBvcnRzID0gdHJ1ZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFJvY2tldCA9IHJlcXVpcmUoJy4vUm9ja2V0Jyk7XG52YXIgQnVsbGV0ID0gcmVxdWlyZSgnLi9CdWxsZXQnKTtcbnZhciBrZXlzID0gcmVxdWlyZShcIi4va2V5cy5qc1wiKTtcblxucmVxdWlyZShcIi4vQ29sb3JNb2RlXCIpO1xuXG5jb25zdCBGUFMgPSA2MDtcbmNvbnN0IHJvY2tldERvbUlEID0gXCJyb2NrZXRcIjtcbmNvbnN0IGJ1bGxldERvbUlEID0gXCJidWxsZXRDb250YWluZXJcIjtcblxubGV0IGJ1bGxldENvdW50ZXIgPSAwO1xuLypcbiAqIEdhbWVMb29wIFR1dG9yaWFsIHZvblxuICogaHR0cDovL25va2FybWEub3JnLzIwMTEvMDIvMDIvamF2YXNjcmlwdC1nYW1lLWRldmVsb3BtZW50LXRoZS1nYW1lLWxvb3AvXG4gKi9cbmNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmZwcyA9IEZQUztcbiAgICB0aGlzLnJvY2tldCA9IG5ldyBSb2NrZXQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocm9ja2V0RG9tSUQpKTtcbiAgICB0aGlzLmJ1bGxldHMgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMucnVuLmJpbmQodGhpcyksIDEwMDAgLyB0aGlzLmZwcyk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgaWYoa2V5cy5nb3RDbGlja2VkKFwic3BhY2VcIikpIHtcbiAgICAgIHZhciBjb29yZFggPSB0aGlzLnJvY2tldC5nZXRDb29yZFgoKTtcbiAgICAgIHRoaXMuYnVsbGV0cy5zZXQoXCJidWxsZXRcIitidWxsZXRDb3VudGVyLCBuZXcgQnVsbGV0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGJ1bGxldERvbUlEKSwgY29vcmRYKzI1KSk7XG4gICAgICBidWxsZXRDb3VudGVyKys7XG4gICAgfVxuICAgIHRoaXMucm9ja2V0LnVwZGF0ZSgpO1xuICAgIHRoaXMuYnVsbGV0cy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICB2YWx1ZS51cGRhdGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgfVxuXG4gIHJ1bigpIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG59XG5cbi8qIHN0YXJ0IGdhbWUgKi9cbm5ldyBHYW1lKCk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBrZXlzID0gcmVxdWlyZShcIi4va2V5cy5qc1wiKTtcblxuY29uc3QgRElTVEFOQ0UgPSAyO1xuXG5jbGFzcyBSb2NrZXQge1xuICBjb25zdHJ1Y3Rvcihkb21FbGVtZW50KSB7XG4gICAgdGhpcy5kb21FbGVtZW50ID0gZG9tRWxlbWVudDtcbiAgfVxuXG4gIG1vdmVMZWZ0KCkge1xuICAgIHZhciBjb29yZFggPSB0aGlzLmdldENvb3JkWCgpO1xuICAgIGlmKGNvb3JkWCA+PSA1KSB7XG4gICAgICBjb29yZFggPSBjb29yZFggLT0gRElTVEFOQ0U7XG4gICAgfVxuICAgIHRoaXMuc2V0Q29vcmRYKGNvb3JkWCk7XG4gIH1cblxuICBtb3ZlUmlnaHQoKSB7XG4gICAgdmFyIGNvb3JkWCA9IHRoaXMuZ2V0Q29vcmRYKCk7XG4gICAgY29vcmRYID0gY29vcmRYICs9IERJU1RBTkNFO1xuICAgIHRoaXMuc2V0Q29vcmRYKGNvb3JkWCk7XG4gIH1cblxuICBnZXRDb29yZFgoKSB7XG4gICAgcmV0dXJuICh0aGlzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCA9PT0gXCJcIik/IDAgOiBwYXJzZUludCh0aGlzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCk7XG4gIH1cblxuICBzZXRDb29yZFgodmFsdWUpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCA9IHZhbHVlK1wicHhcIjtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBpZiAoa2V5cy5pc1ByZXNzZWQoXCJsZWZ0XCIpKSB7XG4gICAgICB0aGlzLm1vdmVMZWZ0KCk7XG4gICAgfSBlbHNlIGlmIChrZXlzLmlzUHJlc3NlZChcInJpZ2h0XCIpKSB7XG4gICAgICB0aGlzLm1vdmVSaWdodCgpO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvY2tldDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleWNvZGUgPSByZXF1aXJlKFwia2V5Y29kZVwiKTtcblxubW9kdWxlLmV4cG9ydHMuaXNQcmVzc2VkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgdmFyIGNvZGUgPSBrZXljb2RlKG5hbWUpO1xuICByZXR1cm4gaXNQcmVzc2VkS2V5KGNvZGUpO1xufTtcblxubW9kdWxlLmV4cG9ydHMuZ290Q2xpY2tlZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHZhciBjb2RlID0ga2V5Y29kZShuYW1lKTtcbiAgcmV0dXJuIGdvdENsaWNrZWRLZXkoY29kZSk7XG59O1xuXG52YXIgZG93bktleXMgPSBuZXcgTWFwKCk7XG52YXIgY2xpY2tlZEtleXMgPSBuZXcgTWFwKCk7XG5cbmRvY3VtZW50Lm9ua2V5ZG93biA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGRvd25LZXlzLnNldChldmVudC5rZXlDb2RlLCB0cnVlKTtcbiAgY2xpY2tlZEtleXMuc2V0KGV2ZW50LmtleUNvZGUsIHRydWUpO1xufTtcblxuZG9jdW1lbnQub25rZXl1cCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGRvd25LZXlzLnNldChldmVudC5rZXlDb2RlLCBmYWxzZSk7XG59O1xuXG5mdW5jdGlvbiBpc1ByZXNzZWRLZXkoa2V5KSB7XG4gIGlmKGRvd25LZXlzLmhhcyhrZXkpKSB7XG4gICAgcmV0dXJuIGRvd25LZXlzLmdldChrZXkpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnb3RDbGlja2VkS2V5KGtleSkge1xuICBpZihjbGlja2VkS2V5cy5oYXMoa2V5KSkge1xuICAgIHZhciB2YWx1ZSA9IGNsaWNrZWRLZXlzLmdldChrZXkpO1xuICAgIGNsaWNrZWRLZXlzLnNldChrZXksIGZhbHNlKTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iLCIvLyBTb3VyY2U6IGh0dHA6Ly9qc2ZpZGRsZS5uZXQvdld4OFYvXG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU2MDMxOTUvZnVsbC1saXN0LW9mLWphdmFzY3JpcHQta2V5Y29kZXNcblxuXG5cbi8qKlxuICogQ29uZW5pZW5jZSBtZXRob2QgcmV0dXJucyBjb3JyZXNwb25kaW5nIHZhbHVlIGZvciBnaXZlbiBrZXlOYW1lIG9yIGtleUNvZGUuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0ga2V5Q29kZSB7TnVtYmVyfSBvciBrZXlOYW1lIHtTdHJpbmd9XG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc2VhcmNoSW5wdXQpIHtcbiAgLy8gS2V5Ym9hcmQgRXZlbnRzXG4gIGlmIChzZWFyY2hJbnB1dCAmJiAnb2JqZWN0JyA9PT0gdHlwZW9mIHNlYXJjaElucHV0KSB7XG4gICAgdmFyIGhhc0tleUNvZGUgPSBzZWFyY2hJbnB1dC53aGljaCB8fCBzZWFyY2hJbnB1dC5rZXlDb2RlIHx8IHNlYXJjaElucHV0LmNoYXJDb2RlXG4gICAgaWYgKGhhc0tleUNvZGUpIHNlYXJjaElucHV0ID0gaGFzS2V5Q29kZVxuICB9XG5cbiAgLy8gTnVtYmVyc1xuICBpZiAoJ251bWJlcicgPT09IHR5cGVvZiBzZWFyY2hJbnB1dCkgcmV0dXJuIG5hbWVzW3NlYXJjaElucHV0XVxuXG4gIC8vIEV2ZXJ5dGhpbmcgZWxzZSAoY2FzdCB0byBzdHJpbmcpXG4gIHZhciBzZWFyY2ggPSBTdHJpbmcoc2VhcmNoSW5wdXQpXG5cbiAgLy8gY2hlY2sgY29kZXNcbiAgdmFyIGZvdW5kTmFtZWRLZXkgPSBjb2Rlc1tzZWFyY2gudG9Mb3dlckNhc2UoKV1cbiAgaWYgKGZvdW5kTmFtZWRLZXkpIHJldHVybiBmb3VuZE5hbWVkS2V5XG5cbiAgLy8gY2hlY2sgYWxpYXNlc1xuICB2YXIgZm91bmROYW1lZEtleSA9IGFsaWFzZXNbc2VhcmNoLnRvTG93ZXJDYXNlKCldXG4gIGlmIChmb3VuZE5hbWVkS2V5KSByZXR1cm4gZm91bmROYW1lZEtleVxuXG4gIC8vIHdlaXJkIGNoYXJhY3Rlcj9cbiAgaWYgKHNlYXJjaC5sZW5ndGggPT09IDEpIHJldHVybiBzZWFyY2guY2hhckNvZGVBdCgwKVxuXG4gIHJldHVybiB1bmRlZmluZWRcbn1cblxuLyoqXG4gKiBHZXQgYnkgbmFtZVxuICpcbiAqICAgZXhwb3J0cy5jb2RlWydlbnRlciddIC8vID0+IDEzXG4gKi9cblxudmFyIGNvZGVzID0gZXhwb3J0cy5jb2RlID0gZXhwb3J0cy5jb2RlcyA9IHtcbiAgJ2JhY2tzcGFjZSc6IDgsXG4gICd0YWInOiA5LFxuICAnZW50ZXInOiAxMyxcbiAgJ3NoaWZ0JzogMTYsXG4gICdjdHJsJzogMTcsXG4gICdhbHQnOiAxOCxcbiAgJ3BhdXNlL2JyZWFrJzogMTksXG4gICdjYXBzIGxvY2snOiAyMCxcbiAgJ2VzYyc6IDI3LFxuICAnc3BhY2UnOiAzMixcbiAgJ3BhZ2UgdXAnOiAzMyxcbiAgJ3BhZ2UgZG93bic6IDM0LFxuICAnZW5kJzogMzUsXG4gICdob21lJzogMzYsXG4gICdsZWZ0JzogMzcsXG4gICd1cCc6IDM4LFxuICAncmlnaHQnOiAzOSxcbiAgJ2Rvd24nOiA0MCxcbiAgJ2luc2VydCc6IDQ1LFxuICAnZGVsZXRlJzogNDYsXG4gICdjb21tYW5kJzogOTEsXG4gICdyaWdodCBjbGljayc6IDkzLFxuICAnbnVtcGFkIConOiAxMDYsXG4gICdudW1wYWQgKyc6IDEwNyxcbiAgJ251bXBhZCAtJzogMTA5LFxuICAnbnVtcGFkIC4nOiAxMTAsXG4gICdudW1wYWQgLyc6IDExMSxcbiAgJ251bSBsb2NrJzogMTQ0LFxuICAnc2Nyb2xsIGxvY2snOiAxNDUsXG4gICdteSBjb21wdXRlcic6IDE4MixcbiAgJ215IGNhbGN1bGF0b3InOiAxODMsXG4gICc7JzogMTg2LFxuICAnPSc6IDE4NyxcbiAgJywnOiAxODgsXG4gICctJzogMTg5LFxuICAnLic6IDE5MCxcbiAgJy8nOiAxOTEsXG4gICdgJzogMTkyLFxuICAnWyc6IDIxOSxcbiAgJ1xcXFwnOiAyMjAsXG4gICddJzogMjIxLFxuICBcIidcIjogMjIyLFxufVxuXG4vLyBIZWxwZXIgYWxpYXNlc1xuXG52YXIgYWxpYXNlcyA9IGV4cG9ydHMuYWxpYXNlcyA9IHtcbiAgJ3dpbmRvd3MnOiA5MSxcbiAgJ+KHpyc6IDE2LFxuICAn4oylJzogMTgsXG4gICfijIMnOiAxNyxcbiAgJ+KMmCc6IDkxLFxuICAnY3RsJzogMTcsXG4gICdjb250cm9sJzogMTcsXG4gICdvcHRpb24nOiAxOCxcbiAgJ3BhdXNlJzogMTksXG4gICdicmVhayc6IDE5LFxuICAnY2Fwcyc6IDIwLFxuICAncmV0dXJuJzogMTMsXG4gICdlc2NhcGUnOiAyNyxcbiAgJ3NwYyc6IDMyLFxuICAncGd1cCc6IDMzLFxuICAncGdkbic6IDMzLFxuICAnaW5zJzogNDUsXG4gICdkZWwnOiA0NixcbiAgJ2NtZCc6IDkxXG59XG5cblxuLyohXG4gKiBQcm9ncmFtYXRpY2FsbHkgYWRkIHRoZSBmb2xsb3dpbmdcbiAqL1xuXG4vLyBsb3dlciBjYXNlIGNoYXJzXG5mb3IgKGkgPSA5NzsgaSA8IDEyMzsgaSsrKSBjb2Rlc1tTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGkgLSAzMlxuXG4vLyBudW1iZXJzXG5mb3IgKHZhciBpID0gNDg7IGkgPCA1ODsgaSsrKSBjb2Rlc1tpIC0gNDhdID0gaVxuXG4vLyBmdW5jdGlvbiBrZXlzXG5mb3IgKGkgPSAxOyBpIDwgMTM7IGkrKykgY29kZXNbJ2YnK2ldID0gaSArIDExMVxuXG4vLyBudW1wYWQga2V5c1xuZm9yIChpID0gMDsgaSA8IDEwOyBpKyspIGNvZGVzWydudW1wYWQgJytpXSA9IGkgKyA5NlxuXG4vKipcbiAqIEdldCBieSBjb2RlXG4gKlxuICogICBleHBvcnRzLm5hbWVbMTNdIC8vID0+ICdFbnRlcidcbiAqL1xuXG52YXIgbmFtZXMgPSBleHBvcnRzLm5hbWVzID0gZXhwb3J0cy50aXRsZSA9IHt9IC8vIHRpdGxlIGZvciBiYWNrd2FyZCBjb21wYXRcblxuLy8gQ3JlYXRlIHJldmVyc2UgbWFwcGluZ1xuZm9yIChpIGluIGNvZGVzKSBuYW1lc1tjb2Rlc1tpXV0gPSBpXG5cbi8vIEFkZCBhbGlhc2VzXG5mb3IgKHZhciBhbGlhcyBpbiBhbGlhc2VzKSB7XG4gIGNvZGVzW2FsaWFzXSA9IGFsaWFzZXNbYWxpYXNdXG59XG4iXX0=
