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
    this.domElement.style.color = getRandomColor();
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

function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

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

/**
 * http://stackoverflow.com/a/5062698
 * recursively get all text nodes as an array for a given element
 */
function getTextNodes(node) {
  var childTextNodes = [];

  if (!node.hasChildNodes()) {
    return;
  }

  var childNodes = node.childNodes;
  for (var i = 0; i < childNodes.length; i++) {
    if (childNodes[i].nodeType == Node.TEXT_NODE) {
      childTextNodes.push(childNodes[i]);
    } else if (childNodes[i].nodeType == Node.ELEMENT_NODE) {
      Array.prototype.push.apply(childTextNodes, getTextNodes(childNodes[i]));
    }
  }

  return childTextNodes;
}

/**
 * given a text node, wrap each character in the
 * given tag.
 */
function wrapEachCharacter(textNode, tag) {
  var text = textNode.nodeValue;
  var parent = textNode.parentNode;

  var characters = text.split('');
  characters.forEach(function (character) {
    var element = document.createElement(tag);
    var characterNode = document.createTextNode(character);
    element.appendChild(characterNode);

    parent.insertBefore(element, textNode);
  });

  parent.removeChild(textNode);
}

function modifyHTML() {
  var allTextNodes = getTextNodes(document.getElementById("targetContainer"));
  allTextNodes.forEach(function (textNode) {
    return wrapEachCharacter(textNode, 'span');
  });
}

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZmxvcmlhbnNjaG1pZHQvRGV2ZWxvcG1lbnQvZmxvcmlhbnNjaG1pZHQuY28udWsvanMvc3JjL0J1bGxldC5qcyIsIi9Vc2Vycy9mbG9yaWFuc2NobWlkdC9EZXZlbG9wbWVudC9mbG9yaWFuc2NobWlkdC5jby51ay9qcy9zcmMvQ29sb3JNb2RlLmpzIiwiL1VzZXJzL2Zsb3JpYW5zY2htaWR0L0RldmVsb3BtZW50L2Zsb3JpYW5zY2htaWR0LmNvLnVrL2pzL3NyYy9HYW1lLmpzIiwiL1VzZXJzL2Zsb3JpYW5zY2htaWR0L0RldmVsb3BtZW50L2Zsb3JpYW5zY2htaWR0LmNvLnVrL2pzL3NyYy9Sb2NrZXQuanMiLCIvVXNlcnMvZmxvcmlhbnNjaG1pZHQvRGV2ZWxvcG1lbnQvZmxvcmlhbnNjaG1pZHQuY28udWsvanMvc3JjL2tleXMuanMiLCJub2RlX21vZHVsZXMva2V5Y29kZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7Ozs7O0FBRWIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUVoQyxJQUFNLFFBQVEsR0FBRyxDQUFDLENBQUM7O0lBRWIsTUFBTTtBQUNDLFdBRFAsTUFBTSxDQUNFLFNBQVMsRUFBRSxNQUFNLEVBQUU7MEJBRDNCLE1BQU07O0FBR1IsUUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2hELFFBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNoRCxRQUFJLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hDLFFBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBrZXlzID0gcmVxdWlyZShcIi4va2V5cy5qc1wiKTtcblxuY29uc3QgRElTVEFOQ0UgPSAyO1xuXG5jbGFzcyBCdWxsZXQge1xuICBjb25zdHJ1Y3Rvcihjb250YWluZXIsIGNvb3JkWCkge1xuXG4gICAgdGhpcy5kb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLmRvbUVsZW1lbnQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJidWxsZXRcIik7XG4gICAgdmFyIGljb24gPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIipcIik7XG4gICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKGljb24pO1xuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS5ib3R0b20gPSBcIjMwcHhcIjtcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUuY29sb3IgPSBnZXRSYW5kb21Db2xvcigpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmRvbUVsZW1lbnQpO1xuICAgIHRoaXMuc2V0Q29vcmRYKGNvb3JkWCk7XG4gIH1cblxuICBtb3ZlTGVmdCgpIHtcbiAgICB2YXIgY29vcmRYID0gdGhpcy5nZXRDb29yZFgoKTtcbiAgICBpZihjb29yZFggPj0gNSkge1xuICAgICAgY29vcmRYID0gY29vcmRYIC09IERJU1RBTkNFO1xuICAgIH1cbiAgICB0aGlzLnNldENvb3JkWChjb29yZFgpO1xuICB9XG5cbiAgbW92ZVJpZ2h0KCkge1xuICAgIHZhciBjb29yZFggPSB0aGlzLmdldENvb3JkWCgpO1xuICAgIGNvb3JkWCA9IGNvb3JkWCArPSBESVNUQU5DRTtcbiAgICB0aGlzLnNldENvb3JkWChjb29yZFgpO1xuICB9XG5cbiAgbW92ZVVwKCkge1xuICAgIHZhciBjb29yZFkgPSB0aGlzLmdldENvb3JkWSgpO1xuICAgIGNvb3JkWSA9IGNvb3JkWSArPSBESVNUQU5DRTtcbiAgICB0aGlzLnNldENvb3JkWShjb29yZFkpO1xuICB9XG5cbiAgbW92ZURvd24oKSB7XG4gICAgdmFyIGNvb3JkWSA9IHRoaXMuZ2V0Q29vcmRZKCk7XG4gICAgY29vcmRZID0gY29vcmRZIC09IERJU1RBTkNFO1xuICAgIHRoaXMuc2V0Q29vcmRZKGNvb3JkWSk7XG4gIH1cblxuICBnZXRDb29yZFgoKSB7XG4gICAgcmV0dXJuICh0aGlzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCA9PT0gXCJcIik/IDAgOiBwYXJzZUludCh0aGlzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCk7XG4gIH1cblxuICBzZXRDb29yZFgodmFsdWUpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCA9IHZhbHVlK1wicHhcIjtcbiAgfVxuXG4gIGdldENvb3JkWSgpIHtcbiAgICByZXR1cm4gKHRoaXMuZG9tRWxlbWVudC5zdHlsZS5ib3R0b20gPT09IFwiXCIpPyAwIDogcGFyc2VJbnQodGhpcy5kb21FbGVtZW50LnN0eWxlLmJvdHRvbSk7XG4gIH1cblxuICBzZXRDb29yZFkodmFsdWUpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUuYm90dG9tID0gdmFsdWUrXCJweFwiO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgICAgdGhpcy5tb3ZlVXAoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRSYW5kb21Db2xvcigpIHtcbiAgICB2YXIgbGV0dGVycyA9ICcwMTIzNDU2Nzg5QUJDREVGJy5zcGxpdCgnJyk7XG4gICAgdmFyIGNvbG9yID0gJyMnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNjsgaSsrICkge1xuICAgICAgICBjb2xvciArPSBsZXR0ZXJzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2KV07XG4gICAgfVxuICAgIHJldHVybiBjb2xvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCdWxsZXQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjb2xvciA9IHtcbiAgZGFyazoge1xuICAgIGJnOiBcIiMyODJDMzRcIixcbiAgICBmb250OiBcIiNBQ0IyQkVcIixcbiAgICBsaW5rczogXCIjQUNCMkJFXCIsXG4gICAgaW1wcmVzc3VtOiBcIiNBMkJENzhcIlxuICB9LFxuICBsaWdodCA6IHtcbiAgICAgIGJnOiBcIiNGRkZGRkZcIixcbiAgICAgIGxpbmtzOiBcIiM4QUIzNzdcIixcbiAgICAgIGltcHJlc3N1bTogXCIjQkM1MTQyXCIsXG4gICAgICBmb250OiBcIiMyODJDMzRcIlxuICB9XG59O1xuXG52YXIgZGFya01vZGUgPSBmYWxzZTtcblxuZnVuY3Rpb24gdG9nZ2xlKCkge1xuICBpZihkYXJrTW9kZSkge1xuICAgIHNldE1vZGUoXCJsaWdodG1vZGVcIik7XG4gICAgZGFya01vZGUgPSBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICBzZXRNb2RlKFwiZGFya21vZGVcIik7XG4gICAgZGFya01vZGUgPSB0cnVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldE1vZGUobW9kZSkge1xuICB2YXIgY29sb3JTY2hlbWU7XG4gIGlmKG1vZGUgPT09IFwiZGFya21vZGVcIikge1xuICAgIHNldERlYnVnKFwibGlnaHRtb2RlXCIpO1xuICAgIGNvbG9yU2NoZW1lID0gY29sb3IuZGFyaztcbiAgfSBlbHNlIHtcbiAgICBzZXREZWJ1ZyhcImRhcmttb2RlXCIpO1xuICAgIGNvbG9yU2NoZW1lID0gY29sb3IubGlnaHQ7XG4gIH1cblxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImltcHJlc3N1bVwiKS5zdHlsZS5jb2xvciA9IGNvbG9yU2NoZW1lLmltcHJlc3N1bTtcbiAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvclNjaGVtZS5iZztcbiAgZG9jdW1lbnQuYm9keS5zdHlsZS5jb2xvciA9IGNvbG9yU2NoZW1lLmZvbnQ7XG59XG5cbmZ1bmN0aW9uIHNldERlYnVnKG1lc3NhZ2UpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZWJ1Z1wiKS5pbm5lclRleHQgPSBtZXNzYWdlO1xufVxuXG52YXIgcGVyc2lzdGVudCA9IGZhbHNlO1xudmFyIGNsaWNrZWQgPSAwO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlYnVnXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gIGNsaWNrZWQgPSBuZXcgRGF0ZSgpLmdldEhvdXJzKCk7XG4gIHBlcnNpc3RlbnQgPSB0cnVlO1xuICB0b2dnbGUoKTtcbn0pO1xuXG5zZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIGhvdXJzID0gbmV3IERhdGUoKS5nZXRIb3VycygpO1xuXG4gIC8qIERvbid0IGRvIGFueXRoaW5nIGlmIHVzZXIgaGFzIGNsaWNrZWQgc3dpdGNoIG1hbnVhbGx5ICovXG4gIGlmKHBlcnNpc3RlbnQgPT09IHRydWUpIHJldHVybjtcblxuICBpZihob3VycyA+PSAyMCB8fMKgaG91cnMgPCA4KSB7XG4gICAgc2V0TW9kZShcImRhcmttb2RlXCIpO1xuICB9IGVsc2Uge1xuICAgIHNldE1vZGUoXCJsaWdodG1vZGVcIik7XG4gIH1cbn0sIDEwMDApO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRydWU7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBSb2NrZXQgPSByZXF1aXJlKCcuL1JvY2tldCcpO1xudmFyIEJ1bGxldCA9IHJlcXVpcmUoJy4vQnVsbGV0Jyk7XG52YXIga2V5cyA9IHJlcXVpcmUoXCIuL2tleXMuanNcIik7XG5cbnJlcXVpcmUoXCIuL0NvbG9yTW9kZVwiKTtcblxuY29uc3QgRlBTID0gNjA7XG5jb25zdCByb2NrZXREb21JRCA9IFwicm9ja2V0XCI7XG5jb25zdCBidWxsZXREb21JRCA9IFwiYnVsbGV0Q29udGFpbmVyXCI7XG5cbmxldCBidWxsZXRDb3VudGVyID0gMDtcbi8qXG4gKiBHYW1lTG9vcCBUdXRvcmlhbCB2b25cbiAqIGh0dHA6Ly9ub2thcm1hLm9yZy8yMDExLzAyLzAyL2phdmFzY3JpcHQtZ2FtZS1kZXZlbG9wbWVudC10aGUtZ2FtZS1sb29wL1xuICovXG5jbGFzcyBHYW1lIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5mcHMgPSBGUFM7XG4gICAgdGhpcy5yb2NrZXQgPSBuZXcgUm9ja2V0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHJvY2tldERvbUlEKSk7XG4gICAgdGhpcy5idWxsZXRzID0gbmV3IE1hcCgpO1xuICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh0aGlzLnJ1bi5iaW5kKHRoaXMpLCAxMDAwIC8gdGhpcy5mcHMpO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGlmKGtleXMuZ290Q2xpY2tlZChcInNwYWNlXCIpKSB7XG4gICAgICB2YXIgY29vcmRYID0gdGhpcy5yb2NrZXQuZ2V0Q29vcmRYKCk7XG4gICAgICB0aGlzLmJ1bGxldHMuc2V0KFwiYnVsbGV0XCIrYnVsbGV0Q291bnRlciwgbmV3IEJ1bGxldChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChidWxsZXREb21JRCksIGNvb3JkWCsyNSkpO1xuICAgICAgYnVsbGV0Q291bnRlcisrO1xuICAgIH1cbiAgICB0aGlzLnJvY2tldC51cGRhdGUoKTtcbiAgICB0aGlzLmJ1bGxldHMuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgdmFsdWUudXBkYXRlKCk7XG4gICAgfSk7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gIH1cblxuICBydW4oKSB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxufVxuXG4vKiBzdGFydCBnYW1lICovXG5uZXcgR2FtZSgpO1xuXG5cblxuLyoqXG4gKiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS81MDYyNjk4XG4gKiByZWN1cnNpdmVseSBnZXQgYWxsIHRleHQgbm9kZXMgYXMgYW4gYXJyYXkgZm9yIGEgZ2l2ZW4gZWxlbWVudFxuICovXG5mdW5jdGlvbiBnZXRUZXh0Tm9kZXMobm9kZSkge1xuICAgIHZhciBjaGlsZFRleHROb2RlcyA9IFtdO1xuXG4gICAgaWYgKCFub2RlLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGNoaWxkTm9kZXMgPSBub2RlLmNoaWxkTm9kZXM7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChjaGlsZE5vZGVzW2ldLm5vZGVUeXBlID09IE5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICAgICAgICBjaGlsZFRleHROb2Rlcy5wdXNoKGNoaWxkTm9kZXNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNoaWxkTm9kZXNbaV0ubm9kZVR5cGUgPT0gTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGNoaWxkVGV4dE5vZGVzLCBnZXRUZXh0Tm9kZXMoY2hpbGROb2Rlc1tpXSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNoaWxkVGV4dE5vZGVzO1xufVxuXG4vKipcbiAqIGdpdmVuIGEgdGV4dCBub2RlLCB3cmFwIGVhY2ggY2hhcmFjdGVyIGluIHRoZVxuICogZ2l2ZW4gdGFnLlxuICovXG5mdW5jdGlvbiB3cmFwRWFjaENoYXJhY3Rlcih0ZXh0Tm9kZSwgdGFnKSB7XG4gICAgdmFyIHRleHQgPSB0ZXh0Tm9kZS5ub2RlVmFsdWU7XG4gICAgdmFyIHBhcmVudCA9IHRleHROb2RlLnBhcmVudE5vZGU7XG5cbiAgICB2YXIgY2hhcmFjdGVycyA9IHRleHQuc3BsaXQoJycpO1xuICAgIGNoYXJhY3RlcnMuZm9yRWFjaChmdW5jdGlvbihjaGFyYWN0ZXIpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgICAgIHZhciBjaGFyYWN0ZXJOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY2hhcmFjdGVyKTtcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjaGFyYWN0ZXJOb2RlKTtcblxuICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKGVsZW1lbnQsIHRleHROb2RlKTtcbiAgICB9KTtcblxuICAgIHBhcmVudC5yZW1vdmVDaGlsZCh0ZXh0Tm9kZSk7XG59XG5cbmZ1bmN0aW9uIG1vZGlmeUhUTUwoKSB7XG4gIHZhciBhbGxUZXh0Tm9kZXMgPSBnZXRUZXh0Tm9kZXMoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXJnZXRDb250YWluZXJcIikpO1xuICBhbGxUZXh0Tm9kZXMuZm9yRWFjaCh0ZXh0Tm9kZSA9PiB3cmFwRWFjaENoYXJhY3Rlcih0ZXh0Tm9kZSwgJ3NwYW4nKSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBrZXlzID0gcmVxdWlyZShcIi4va2V5cy5qc1wiKTtcblxuY29uc3QgRElTVEFOQ0UgPSAyO1xuXG5jbGFzcyBSb2NrZXQge1xuICBjb25zdHJ1Y3Rvcihkb21FbGVtZW50KSB7XG4gICAgdGhpcy5kb21FbGVtZW50ID0gZG9tRWxlbWVudDtcbiAgfVxuXG4gIG1vdmVMZWZ0KCkge1xuICAgIHZhciBjb29yZFggPSB0aGlzLmdldENvb3JkWCgpO1xuICAgIGlmKGNvb3JkWCA+PSA1KSB7XG4gICAgICBjb29yZFggPSBjb29yZFggLT0gRElTVEFOQ0U7XG4gICAgfVxuICAgIHRoaXMuc2V0Q29vcmRYKGNvb3JkWCk7XG4gIH1cblxuICBtb3ZlUmlnaHQoKSB7XG4gICAgdmFyIGNvb3JkWCA9IHRoaXMuZ2V0Q29vcmRYKCk7XG4gICAgY29vcmRYID0gY29vcmRYICs9IERJU1RBTkNFO1xuICAgIHRoaXMuc2V0Q29vcmRYKGNvb3JkWCk7XG4gIH1cblxuICBnZXRDb29yZFgoKSB7XG4gICAgcmV0dXJuICh0aGlzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCA9PT0gXCJcIik/IDAgOiBwYXJzZUludCh0aGlzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCk7XG4gIH1cblxuICBzZXRDb29yZFgodmFsdWUpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCA9IHZhbHVlK1wicHhcIjtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBpZiAoa2V5cy5pc1ByZXNzZWQoXCJsZWZ0XCIpKSB7XG4gICAgICB0aGlzLm1vdmVMZWZ0KCk7XG4gICAgfSBlbHNlIGlmIChrZXlzLmlzUHJlc3NlZChcInJpZ2h0XCIpKSB7XG4gICAgICB0aGlzLm1vdmVSaWdodCgpO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvY2tldDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleWNvZGUgPSByZXF1aXJlKFwia2V5Y29kZVwiKTtcblxubW9kdWxlLmV4cG9ydHMuaXNQcmVzc2VkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgdmFyIGNvZGUgPSBrZXljb2RlKG5hbWUpO1xuICByZXR1cm4gaXNQcmVzc2VkS2V5KGNvZGUpO1xufTtcblxubW9kdWxlLmV4cG9ydHMuZ290Q2xpY2tlZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHZhciBjb2RlID0ga2V5Y29kZShuYW1lKTtcbiAgcmV0dXJuIGdvdENsaWNrZWRLZXkoY29kZSk7XG59O1xuXG52YXIgZG93bktleXMgPSBuZXcgTWFwKCk7XG52YXIgY2xpY2tlZEtleXMgPSBuZXcgTWFwKCk7XG5cbmRvY3VtZW50Lm9ua2V5ZG93biA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGRvd25LZXlzLnNldChldmVudC5rZXlDb2RlLCB0cnVlKTtcbiAgY2xpY2tlZEtleXMuc2V0KGV2ZW50LmtleUNvZGUsIHRydWUpO1xufTtcblxuZG9jdW1lbnQub25rZXl1cCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGRvd25LZXlzLnNldChldmVudC5rZXlDb2RlLCBmYWxzZSk7XG59O1xuXG5mdW5jdGlvbiBpc1ByZXNzZWRLZXkoa2V5KSB7XG4gIGlmKGRvd25LZXlzLmhhcyhrZXkpKSB7XG4gICAgcmV0dXJuIGRvd25LZXlzLmdldChrZXkpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnb3RDbGlja2VkS2V5KGtleSkge1xuICBpZihjbGlja2VkS2V5cy5oYXMoa2V5KSkge1xuICAgIHZhciB2YWx1ZSA9IGNsaWNrZWRLZXlzLmdldChrZXkpO1xuICAgIGNsaWNrZWRLZXlzLnNldChrZXksIGZhbHNlKTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iLCIvLyBTb3VyY2U6IGh0dHA6Ly9qc2ZpZGRsZS5uZXQvdld4OFYvXG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU2MDMxOTUvZnVsbC1saXN0LW9mLWphdmFzY3JpcHQta2V5Y29kZXNcblxuXG5cbi8qKlxuICogQ29uZW5pZW5jZSBtZXRob2QgcmV0dXJucyBjb3JyZXNwb25kaW5nIHZhbHVlIGZvciBnaXZlbiBrZXlOYW1lIG9yIGtleUNvZGUuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0ga2V5Q29kZSB7TnVtYmVyfSBvciBrZXlOYW1lIHtTdHJpbmd9XG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc2VhcmNoSW5wdXQpIHtcbiAgLy8gS2V5Ym9hcmQgRXZlbnRzXG4gIGlmIChzZWFyY2hJbnB1dCAmJiAnb2JqZWN0JyA9PT0gdHlwZW9mIHNlYXJjaElucHV0KSB7XG4gICAgdmFyIGhhc0tleUNvZGUgPSBzZWFyY2hJbnB1dC53aGljaCB8fCBzZWFyY2hJbnB1dC5rZXlDb2RlIHx8IHNlYXJjaElucHV0LmNoYXJDb2RlXG4gICAgaWYgKGhhc0tleUNvZGUpIHNlYXJjaElucHV0ID0gaGFzS2V5Q29kZVxuICB9XG5cbiAgLy8gTnVtYmVyc1xuICBpZiAoJ251bWJlcicgPT09IHR5cGVvZiBzZWFyY2hJbnB1dCkgcmV0dXJuIG5hbWVzW3NlYXJjaElucHV0XVxuXG4gIC8vIEV2ZXJ5dGhpbmcgZWxzZSAoY2FzdCB0byBzdHJpbmcpXG4gIHZhciBzZWFyY2ggPSBTdHJpbmcoc2VhcmNoSW5wdXQpXG5cbiAgLy8gY2hlY2sgY29kZXNcbiAgdmFyIGZvdW5kTmFtZWRLZXkgPSBjb2Rlc1tzZWFyY2gudG9Mb3dlckNhc2UoKV1cbiAgaWYgKGZvdW5kTmFtZWRLZXkpIHJldHVybiBmb3VuZE5hbWVkS2V5XG5cbiAgLy8gY2hlY2sgYWxpYXNlc1xuICB2YXIgZm91bmROYW1lZEtleSA9IGFsaWFzZXNbc2VhcmNoLnRvTG93ZXJDYXNlKCldXG4gIGlmIChmb3VuZE5hbWVkS2V5KSByZXR1cm4gZm91bmROYW1lZEtleVxuXG4gIC8vIHdlaXJkIGNoYXJhY3Rlcj9cbiAgaWYgKHNlYXJjaC5sZW5ndGggPT09IDEpIHJldHVybiBzZWFyY2guY2hhckNvZGVBdCgwKVxuXG4gIHJldHVybiB1bmRlZmluZWRcbn1cblxuLyoqXG4gKiBHZXQgYnkgbmFtZVxuICpcbiAqICAgZXhwb3J0cy5jb2RlWydlbnRlciddIC8vID0+IDEzXG4gKi9cblxudmFyIGNvZGVzID0gZXhwb3J0cy5jb2RlID0gZXhwb3J0cy5jb2RlcyA9IHtcbiAgJ2JhY2tzcGFjZSc6IDgsXG4gICd0YWInOiA5LFxuICAnZW50ZXInOiAxMyxcbiAgJ3NoaWZ0JzogMTYsXG4gICdjdHJsJzogMTcsXG4gICdhbHQnOiAxOCxcbiAgJ3BhdXNlL2JyZWFrJzogMTksXG4gICdjYXBzIGxvY2snOiAyMCxcbiAgJ2VzYyc6IDI3LFxuICAnc3BhY2UnOiAzMixcbiAgJ3BhZ2UgdXAnOiAzMyxcbiAgJ3BhZ2UgZG93bic6IDM0LFxuICAnZW5kJzogMzUsXG4gICdob21lJzogMzYsXG4gICdsZWZ0JzogMzcsXG4gICd1cCc6IDM4LFxuICAncmlnaHQnOiAzOSxcbiAgJ2Rvd24nOiA0MCxcbiAgJ2luc2VydCc6IDQ1LFxuICAnZGVsZXRlJzogNDYsXG4gICdjb21tYW5kJzogOTEsXG4gICdyaWdodCBjbGljayc6IDkzLFxuICAnbnVtcGFkIConOiAxMDYsXG4gICdudW1wYWQgKyc6IDEwNyxcbiAgJ251bXBhZCAtJzogMTA5LFxuICAnbnVtcGFkIC4nOiAxMTAsXG4gICdudW1wYWQgLyc6IDExMSxcbiAgJ251bSBsb2NrJzogMTQ0LFxuICAnc2Nyb2xsIGxvY2snOiAxNDUsXG4gICdteSBjb21wdXRlcic6IDE4MixcbiAgJ215IGNhbGN1bGF0b3InOiAxODMsXG4gICc7JzogMTg2LFxuICAnPSc6IDE4NyxcbiAgJywnOiAxODgsXG4gICctJzogMTg5LFxuICAnLic6IDE5MCxcbiAgJy8nOiAxOTEsXG4gICdgJzogMTkyLFxuICAnWyc6IDIxOSxcbiAgJ1xcXFwnOiAyMjAsXG4gICddJzogMjIxLFxuICBcIidcIjogMjIyLFxufVxuXG4vLyBIZWxwZXIgYWxpYXNlc1xuXG52YXIgYWxpYXNlcyA9IGV4cG9ydHMuYWxpYXNlcyA9IHtcbiAgJ3dpbmRvd3MnOiA5MSxcbiAgJ+KHpyc6IDE2LFxuICAn4oylJzogMTgsXG4gICfijIMnOiAxNyxcbiAgJ+KMmCc6IDkxLFxuICAnY3RsJzogMTcsXG4gICdjb250cm9sJzogMTcsXG4gICdvcHRpb24nOiAxOCxcbiAgJ3BhdXNlJzogMTksXG4gICdicmVhayc6IDE5LFxuICAnY2Fwcyc6IDIwLFxuICAncmV0dXJuJzogMTMsXG4gICdlc2NhcGUnOiAyNyxcbiAgJ3NwYyc6IDMyLFxuICAncGd1cCc6IDMzLFxuICAncGdkbic6IDMzLFxuICAnaW5zJzogNDUsXG4gICdkZWwnOiA0NixcbiAgJ2NtZCc6IDkxXG59XG5cblxuLyohXG4gKiBQcm9ncmFtYXRpY2FsbHkgYWRkIHRoZSBmb2xsb3dpbmdcbiAqL1xuXG4vLyBsb3dlciBjYXNlIGNoYXJzXG5mb3IgKGkgPSA5NzsgaSA8IDEyMzsgaSsrKSBjb2Rlc1tTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGkgLSAzMlxuXG4vLyBudW1iZXJzXG5mb3IgKHZhciBpID0gNDg7IGkgPCA1ODsgaSsrKSBjb2Rlc1tpIC0gNDhdID0gaVxuXG4vLyBmdW5jdGlvbiBrZXlzXG5mb3IgKGkgPSAxOyBpIDwgMTM7IGkrKykgY29kZXNbJ2YnK2ldID0gaSArIDExMVxuXG4vLyBudW1wYWQga2V5c1xuZm9yIChpID0gMDsgaSA8IDEwOyBpKyspIGNvZGVzWydudW1wYWQgJytpXSA9IGkgKyA5NlxuXG4vKipcbiAqIEdldCBieSBjb2RlXG4gKlxuICogICBleHBvcnRzLm5hbWVbMTNdIC8vID0+ICdFbnRlcidcbiAqL1xuXG52YXIgbmFtZXMgPSBleHBvcnRzLm5hbWVzID0gZXhwb3J0cy50aXRsZSA9IHt9IC8vIHRpdGxlIGZvciBiYWNrd2FyZCBjb21wYXRcblxuLy8gQ3JlYXRlIHJldmVyc2UgbWFwcGluZ1xuZm9yIChpIGluIGNvZGVzKSBuYW1lc1tjb2Rlc1tpXV0gPSBpXG5cbi8vIEFkZCBhbGlhc2VzXG5mb3IgKHZhciBhbGlhcyBpbiBhbGlhc2VzKSB7XG4gIGNvZGVzW2FsaWFzXSA9IGFsaWFzZXNbYWxpYXNdXG59XG4iXX0=
