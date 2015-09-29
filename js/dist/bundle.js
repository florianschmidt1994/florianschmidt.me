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
    modifyHTML();
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

        var targets = document.getElementById('targetContainer').getElementsByTagName('span');
        for (var i = 0; i < targets.length; i++) {
          if (targets[i].innerText !== " ") {
            if (hit(targets[i], value.domElement)) {
              targets[i].innerText = "_";
            }
          }
        }
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

function hit(node1, node2) {

  if (Math.abs(node1.getBoundingClientRect().bottom - node2.getBoundingClientRect().bottom) < 10) {
    if (Math.abs(node1.getBoundingClientRect().left - node2.getBoundingClientRect().left) < 10) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZmxvcmlhbnNjaG1pZHQvRGV2ZWxvcG1lbnQvZmxvcmlhbnNjaG1pZHQuY28udWsvanMvc3JjL0J1bGxldC5qcyIsIi9Vc2Vycy9mbG9yaWFuc2NobWlkdC9EZXZlbG9wbWVudC9mbG9yaWFuc2NobWlkdC5jby51ay9qcy9zcmMvQ29sb3JNb2RlLmpzIiwiL1VzZXJzL2Zsb3JpYW5zY2htaWR0L0RldmVsb3BtZW50L2Zsb3JpYW5zY2htaWR0LmNvLnVrL2pzL3NyYy9HYW1lLmpzIiwiL1VzZXJzL2Zsb3JpYW5zY2htaWR0L0RldmVsb3BtZW50L2Zsb3JpYW5zY2htaWR0LmNvLnVrL2pzL3NyYy9Sb2NrZXQuanMiLCIvVXNlcnMvZmxvcmlhbnNjaG1pZHQvRGV2ZWxvcG1lbnQvZmxvcmlhbnNjaG1pZHQuY28udWsvanMvc3JjL2tleXMuanMiLCJub2RlX21vZHVsZXMva2V5Y29kZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7Ozs7O0FBRWIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUVoQyxJQUFNLFFBQVEsR0FBRyxDQUFDLENBQUM7O0lBRWIsTUFBTTtBQUNDLFdBRFAsTUFBTSxDQUNFLFNBQVMsRUFBRSxNQUFNLEVBQUU7MEJBRDNCLE1BQU07O0FBR1IsUUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2hELFFBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNoRCxRQUFJLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hDLFFBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBrZXlzID0gcmVxdWlyZShcIi4va2V5cy5qc1wiKTtcblxuY29uc3QgRElTVEFOQ0UgPSAyO1xuXG5jbGFzcyBCdWxsZXQge1xuICBjb25zdHJ1Y3Rvcihjb250YWluZXIsIGNvb3JkWCkge1xuXG4gICAgdGhpcy5kb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLmRvbUVsZW1lbnQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJidWxsZXRcIik7XG4gICAgdmFyIGljb24gPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIipcIik7XG4gICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKGljb24pO1xuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS5ib3R0b20gPSBcIjMwcHhcIjtcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUuY29sb3IgPSBnZXRSYW5kb21Db2xvcigpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmRvbUVsZW1lbnQpO1xuICAgIHRoaXMuc2V0Q29vcmRYKGNvb3JkWCk7XG4gIH1cblxuICBtb3ZlTGVmdCgpIHtcbiAgICB2YXIgY29vcmRYID0gdGhpcy5nZXRDb29yZFgoKTtcbiAgICBpZihjb29yZFggPj0gNSkge1xuICAgICAgY29vcmRYID0gY29vcmRYIC09IERJU1RBTkNFO1xuICAgIH1cbiAgICB0aGlzLnNldENvb3JkWChjb29yZFgpO1xuICB9XG5cbiAgbW92ZVJpZ2h0KCkge1xuICAgIHZhciBjb29yZFggPSB0aGlzLmdldENvb3JkWCgpO1xuICAgIGNvb3JkWCA9IGNvb3JkWCArPSBESVNUQU5DRTtcbiAgICB0aGlzLnNldENvb3JkWChjb29yZFgpO1xuICB9XG5cbiAgbW92ZVVwKCkge1xuICAgIHZhciBjb29yZFkgPSB0aGlzLmdldENvb3JkWSgpO1xuICAgIGNvb3JkWSA9IGNvb3JkWSArPSBESVNUQU5DRTtcbiAgICB0aGlzLnNldENvb3JkWShjb29yZFkpO1xuICB9XG5cbiAgbW92ZURvd24oKSB7XG4gICAgdmFyIGNvb3JkWSA9IHRoaXMuZ2V0Q29vcmRZKCk7XG4gICAgY29vcmRZID0gY29vcmRZIC09IERJU1RBTkNFO1xuICAgIHRoaXMuc2V0Q29vcmRZKGNvb3JkWSk7XG4gIH1cblxuICBnZXRDb29yZFgoKSB7XG4gICAgcmV0dXJuICh0aGlzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCA9PT0gXCJcIik/IDAgOiBwYXJzZUludCh0aGlzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCk7XG4gIH1cblxuICBzZXRDb29yZFgodmFsdWUpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCA9IHZhbHVlK1wicHhcIjtcbiAgfVxuXG4gIGdldENvb3JkWSgpIHtcbiAgICByZXR1cm4gKHRoaXMuZG9tRWxlbWVudC5zdHlsZS5ib3R0b20gPT09IFwiXCIpPyAwIDogcGFyc2VJbnQodGhpcy5kb21FbGVtZW50LnN0eWxlLmJvdHRvbSk7XG4gIH1cblxuICBzZXRDb29yZFkodmFsdWUpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUuYm90dG9tID0gdmFsdWUrXCJweFwiO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgICAgdGhpcy5tb3ZlVXAoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRSYW5kb21Db2xvcigpIHtcbiAgICB2YXIgbGV0dGVycyA9ICcwMTIzNDU2Nzg5QUJDREVGJy5zcGxpdCgnJyk7XG4gICAgdmFyIGNvbG9yID0gJyMnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNjsgaSsrICkge1xuICAgICAgICBjb2xvciArPSBsZXR0ZXJzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2KV07XG4gICAgfVxuICAgIHJldHVybiBjb2xvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCdWxsZXQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjb2xvciA9IHtcbiAgZGFyazoge1xuICAgIGJnOiBcIiMyODJDMzRcIixcbiAgICBmb250OiBcIiNBQ0IyQkVcIixcbiAgICBsaW5rczogXCIjQUNCMkJFXCIsXG4gICAgaW1wcmVzc3VtOiBcIiNBMkJENzhcIlxuICB9LFxuICBsaWdodCA6IHtcbiAgICAgIGJnOiBcIiNGRkZGRkZcIixcbiAgICAgIGxpbmtzOiBcIiM4QUIzNzdcIixcbiAgICAgIGltcHJlc3N1bTogXCIjQkM1MTQyXCIsXG4gICAgICBmb250OiBcIiMyODJDMzRcIlxuICB9XG59O1xuXG52YXIgZGFya01vZGUgPSBmYWxzZTtcblxuZnVuY3Rpb24gdG9nZ2xlKCkge1xuICBpZihkYXJrTW9kZSkge1xuICAgIHNldE1vZGUoXCJsaWdodG1vZGVcIik7XG4gICAgZGFya01vZGUgPSBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICBzZXRNb2RlKFwiZGFya21vZGVcIik7XG4gICAgZGFya01vZGUgPSB0cnVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldE1vZGUobW9kZSkge1xuICB2YXIgY29sb3JTY2hlbWU7XG4gIGlmKG1vZGUgPT09IFwiZGFya21vZGVcIikge1xuICAgIHNldERlYnVnKFwibGlnaHRtb2RlXCIpO1xuICAgIGNvbG9yU2NoZW1lID0gY29sb3IuZGFyaztcbiAgfSBlbHNlIHtcbiAgICBzZXREZWJ1ZyhcImRhcmttb2RlXCIpO1xuICAgIGNvbG9yU2NoZW1lID0gY29sb3IubGlnaHQ7XG4gIH1cblxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImltcHJlc3N1bVwiKS5zdHlsZS5jb2xvciA9IGNvbG9yU2NoZW1lLmltcHJlc3N1bTtcbiAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvclNjaGVtZS5iZztcbiAgZG9jdW1lbnQuYm9keS5zdHlsZS5jb2xvciA9IGNvbG9yU2NoZW1lLmZvbnQ7XG59XG5cbmZ1bmN0aW9uIHNldERlYnVnKG1lc3NhZ2UpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZWJ1Z1wiKS5pbm5lclRleHQgPSBtZXNzYWdlO1xufVxuXG52YXIgcGVyc2lzdGVudCA9IGZhbHNlO1xudmFyIGNsaWNrZWQgPSAwO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlYnVnXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gIGNsaWNrZWQgPSBuZXcgRGF0ZSgpLmdldEhvdXJzKCk7XG4gIHBlcnNpc3RlbnQgPSB0cnVlO1xuICB0b2dnbGUoKTtcbn0pO1xuXG5zZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIGhvdXJzID0gbmV3IERhdGUoKS5nZXRIb3VycygpO1xuXG4gIC8qIERvbid0IGRvIGFueXRoaW5nIGlmIHVzZXIgaGFzIGNsaWNrZWQgc3dpdGNoIG1hbnVhbGx5ICovXG4gIGlmKHBlcnNpc3RlbnQgPT09IHRydWUpIHJldHVybjtcblxuICBpZihob3VycyA+PSAyMCB8fMKgaG91cnMgPCA4KSB7XG4gICAgc2V0TW9kZShcImRhcmttb2RlXCIpO1xuICB9IGVsc2Uge1xuICAgIHNldE1vZGUoXCJsaWdodG1vZGVcIik7XG4gIH1cbn0sIDEwMDApO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRydWU7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBSb2NrZXQgPSByZXF1aXJlKCcuL1JvY2tldCcpO1xudmFyIEJ1bGxldCA9IHJlcXVpcmUoJy4vQnVsbGV0Jyk7XG52YXIga2V5cyA9IHJlcXVpcmUoXCIuL2tleXMuanNcIik7XG5cbnJlcXVpcmUoXCIuL0NvbG9yTW9kZVwiKTtcblxuY29uc3QgRlBTID0gNjA7XG5jb25zdCByb2NrZXREb21JRCA9IFwicm9ja2V0XCI7XG5jb25zdCBidWxsZXREb21JRCA9IFwiYnVsbGV0Q29udGFpbmVyXCI7XG5cbmxldCBidWxsZXRDb3VudGVyID0gMDtcbi8qXG4gKiBHYW1lTG9vcCBUdXRvcmlhbCB2b25cbiAqIGh0dHA6Ly9ub2thcm1hLm9yZy8yMDExLzAyLzAyL2phdmFzY3JpcHQtZ2FtZS1kZXZlbG9wbWVudC10aGUtZ2FtZS1sb29wL1xuICovXG5jbGFzcyBHYW1lIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5mcHMgPSBGUFM7XG4gICAgdGhpcy5yb2NrZXQgPSBuZXcgUm9ja2V0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHJvY2tldERvbUlEKSk7XG4gICAgdGhpcy5idWxsZXRzID0gbmV3IE1hcCgpO1xuICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh0aGlzLnJ1bi5iaW5kKHRoaXMpLCAxMDAwIC8gdGhpcy5mcHMpO1xuICAgIG1vZGlmeUhUTUwoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBpZihrZXlzLmdvdENsaWNrZWQoXCJzcGFjZVwiKSkge1xuICAgICAgdmFyIGNvb3JkWCA9IHRoaXMucm9ja2V0LmdldENvb3JkWCgpO1xuICAgICAgdGhpcy5idWxsZXRzLnNldChcImJ1bGxldFwiK2J1bGxldENvdW50ZXIsIG5ldyBCdWxsZXQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYnVsbGV0RG9tSUQpLCBjb29yZFgrMjUpKTtcbiAgICAgIGJ1bGxldENvdW50ZXIrKztcbiAgICB9XG4gICAgdGhpcy5yb2NrZXQudXBkYXRlKCk7XG4gICAgdGhpcy5idWxsZXRzLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgIHZhbHVlLnVwZGF0ZSgpO1xuXG4gICAgICB2YXIgdGFyZ2V0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXJnZXRDb250YWluZXInKS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3BhbicpO1xuICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRhcmdldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYodGFyZ2V0c1tpXS5pbm5lclRleHQgIT09IFwiIFwiKSB7XG4gICAgICAgICAgaWYoaGl0KHRhcmdldHNbaV0sIHZhbHVlLmRvbUVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0YXJnZXRzW2ldLmlubmVyVGV4dCA9IFwiX1wiO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc3RvcCgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICB9XG5cbiAgcnVuKCkge1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cbn1cblxuLyogc3RhcnQgZ2FtZSAqL1xubmV3IEdhbWUoKTtcblxuXG5mdW5jdGlvbiBoaXQobm9kZTEsIG5vZGUyKSB7XG5cbiAgaWYoTWF0aC5hYnMobm9kZTEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tIC0gbm9kZTIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tKSA8IDEwKSB7XG4gICAgaWYoTWF0aC5hYnMobm9kZTEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtIG5vZGUyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQpIDwgMTApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vKipcbiAqIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzUwNjI2OThcbiAqIHJlY3Vyc2l2ZWx5IGdldCBhbGwgdGV4dCBub2RlcyBhcyBhbiBhcnJheSBmb3IgYSBnaXZlbiBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIGdldFRleHROb2Rlcyhub2RlKSB7XG4gICAgdmFyIGNoaWxkVGV4dE5vZGVzID0gW107XG5cbiAgICBpZiAoIW5vZGUuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgY2hpbGROb2RlcyA9IG5vZGUuY2hpbGROb2RlcztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGNoaWxkTm9kZXNbaV0ubm9kZVR5cGUgPT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgICAgICAgIGNoaWxkVGV4dE5vZGVzLnB1c2goY2hpbGROb2Rlc1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2hpbGROb2Rlc1tpXS5ub2RlVHlwZSA9PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoY2hpbGRUZXh0Tm9kZXMsIGdldFRleHROb2RlcyhjaGlsZE5vZGVzW2ldKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2hpbGRUZXh0Tm9kZXM7XG59XG5cbi8qKlxuICogZ2l2ZW4gYSB0ZXh0IG5vZGUsIHdyYXAgZWFjaCBjaGFyYWN0ZXIgaW4gdGhlXG4gKiBnaXZlbiB0YWcuXG4gKi9cbmZ1bmN0aW9uIHdyYXBFYWNoQ2hhcmFjdGVyKHRleHROb2RlLCB0YWcpIHtcbiAgICB2YXIgdGV4dCA9IHRleHROb2RlLm5vZGVWYWx1ZTtcbiAgICB2YXIgcGFyZW50ID0gdGV4dE5vZGUucGFyZW50Tm9kZTtcblxuICAgIHZhciBjaGFyYWN0ZXJzID0gdGV4dC5zcGxpdCgnJyk7XG4gICAgY2hhcmFjdGVycy5mb3JFYWNoKGZ1bmN0aW9uKGNoYXJhY3Rlcikge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICAgICAgdmFyIGNoYXJhY3Rlck5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGFyYWN0ZXIpO1xuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNoYXJhY3Rlck5vZGUpO1xuXG4gICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoZWxlbWVudCwgdGV4dE5vZGUpO1xuICAgIH0pO1xuXG4gICAgcGFyZW50LnJlbW92ZUNoaWxkKHRleHROb2RlKTtcbn1cblxuZnVuY3Rpb24gbW9kaWZ5SFRNTCgpIHtcbiAgdmFyIGFsbFRleHROb2RlcyA9IGdldFRleHROb2Rlcyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhcmdldENvbnRhaW5lclwiKSk7XG4gIGFsbFRleHROb2Rlcy5mb3JFYWNoKHRleHROb2RlID0+IHdyYXBFYWNoQ2hhcmFjdGVyKHRleHROb2RlLCAnc3BhbicpKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleXMgPSByZXF1aXJlKFwiLi9rZXlzLmpzXCIpO1xuXG5jb25zdCBESVNUQU5DRSA9IDI7XG5cbmNsYXNzIFJvY2tldCB7XG4gIGNvbnN0cnVjdG9yKGRvbUVsZW1lbnQpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb21FbGVtZW50O1xuICB9XG5cbiAgbW92ZUxlZnQoKSB7XG4gICAgdmFyIGNvb3JkWCA9IHRoaXMuZ2V0Q29vcmRYKCk7XG4gICAgaWYoY29vcmRYID49IDUpIHtcbiAgICAgIGNvb3JkWCA9IGNvb3JkWCAtPSBESVNUQU5DRTtcbiAgICB9XG4gICAgdGhpcy5zZXRDb29yZFgoY29vcmRYKTtcbiAgfVxuXG4gIG1vdmVSaWdodCgpIHtcbiAgICB2YXIgY29vcmRYID0gdGhpcy5nZXRDb29yZFgoKTtcbiAgICBjb29yZFggPSBjb29yZFggKz0gRElTVEFOQ0U7XG4gICAgdGhpcy5zZXRDb29yZFgoY29vcmRYKTtcbiAgfVxuXG4gIGdldENvb3JkWCgpIHtcbiAgICByZXR1cm4gKHRoaXMuZG9tRWxlbWVudC5zdHlsZS5sZWZ0ID09PSBcIlwiKT8gMCA6IHBhcnNlSW50KHRoaXMuZG9tRWxlbWVudC5zdHlsZS5sZWZ0KTtcbiAgfVxuXG4gIHNldENvb3JkWCh2YWx1ZSkge1xuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS5sZWZ0ID0gdmFsdWUrXCJweFwiO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGlmIChrZXlzLmlzUHJlc3NlZChcImxlZnRcIikpIHtcbiAgICAgIHRoaXMubW92ZUxlZnQoKTtcbiAgICB9IGVsc2UgaWYgKGtleXMuaXNQcmVzc2VkKFwicmlnaHRcIikpIHtcbiAgICAgIHRoaXMubW92ZVJpZ2h0KCk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm9ja2V0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIga2V5Y29kZSA9IHJlcXVpcmUoXCJrZXljb2RlXCIpO1xuXG5tb2R1bGUuZXhwb3J0cy5pc1ByZXNzZWQgPSBmdW5jdGlvbiAobmFtZSkge1xuICB2YXIgY29kZSA9IGtleWNvZGUobmFtZSk7XG4gIHJldHVybiBpc1ByZXNzZWRLZXkoY29kZSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5nb3RDbGlja2VkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgdmFyIGNvZGUgPSBrZXljb2RlKG5hbWUpO1xuICByZXR1cm4gZ290Q2xpY2tlZEtleShjb2RlKTtcbn07XG5cbnZhciBkb3duS2V5cyA9IG5ldyBNYXAoKTtcbnZhciBjbGlja2VkS2V5cyA9IG5ldyBNYXAoKTtcblxuZG9jdW1lbnQub25rZXlkb3duID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgZG93bktleXMuc2V0KGV2ZW50LmtleUNvZGUsIHRydWUpO1xuICBjbGlja2VkS2V5cy5zZXQoZXZlbnQua2V5Q29kZSwgdHJ1ZSk7XG59O1xuXG5kb2N1bWVudC5vbmtleXVwID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgZG93bktleXMuc2V0KGV2ZW50LmtleUNvZGUsIGZhbHNlKTtcbn07XG5cbmZ1bmN0aW9uIGlzUHJlc3NlZEtleShrZXkpIHtcbiAgaWYoZG93bktleXMuaGFzKGtleSkpIHtcbiAgICByZXR1cm4gZG93bktleXMuZ2V0KGtleSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdvdENsaWNrZWRLZXkoa2V5KSB7XG4gIGlmKGNsaWNrZWRLZXlzLmhhcyhrZXkpKSB7XG4gICAgdmFyIHZhbHVlID0gY2xpY2tlZEtleXMuZ2V0KGtleSk7XG4gICAgY2xpY2tlZEtleXMuc2V0KGtleSwgZmFsc2UpO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsIi8vIFNvdXJjZTogaHR0cDovL2pzZmlkZGxlLm5ldC92V3g4Vi9cbi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTYwMzE5NS9mdWxsLWxpc3Qtb2YtamF2YXNjcmlwdC1rZXljb2Rlc1xuXG5cblxuLyoqXG4gKiBDb25lbmllbmNlIG1ldGhvZCByZXR1cm5zIGNvcnJlc3BvbmRpbmcgdmFsdWUgZm9yIGdpdmVuIGtleU5hbWUgb3Iga2V5Q29kZS5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSBrZXlDb2RlIHtOdW1iZXJ9IG9yIGtleU5hbWUge1N0cmluZ31cbiAqIEByZXR1cm4ge01peGVkfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzZWFyY2hJbnB1dCkge1xuICAvLyBLZXlib2FyZCBFdmVudHNcbiAgaWYgKHNlYXJjaElucHV0ICYmICdvYmplY3QnID09PSB0eXBlb2Ygc2VhcmNoSW5wdXQpIHtcbiAgICB2YXIgaGFzS2V5Q29kZSA9IHNlYXJjaElucHV0LndoaWNoIHx8IHNlYXJjaElucHV0LmtleUNvZGUgfHwgc2VhcmNoSW5wdXQuY2hhckNvZGVcbiAgICBpZiAoaGFzS2V5Q29kZSkgc2VhcmNoSW5wdXQgPSBoYXNLZXlDb2RlXG4gIH1cblxuICAvLyBOdW1iZXJzXG4gIGlmICgnbnVtYmVyJyA9PT0gdHlwZW9mIHNlYXJjaElucHV0KSByZXR1cm4gbmFtZXNbc2VhcmNoSW5wdXRdXG5cbiAgLy8gRXZlcnl0aGluZyBlbHNlIChjYXN0IHRvIHN0cmluZylcbiAgdmFyIHNlYXJjaCA9IFN0cmluZyhzZWFyY2hJbnB1dClcblxuICAvLyBjaGVjayBjb2Rlc1xuICB2YXIgZm91bmROYW1lZEtleSA9IGNvZGVzW3NlYXJjaC50b0xvd2VyQ2FzZSgpXVxuICBpZiAoZm91bmROYW1lZEtleSkgcmV0dXJuIGZvdW5kTmFtZWRLZXlcblxuICAvLyBjaGVjayBhbGlhc2VzXG4gIHZhciBmb3VuZE5hbWVkS2V5ID0gYWxpYXNlc1tzZWFyY2gudG9Mb3dlckNhc2UoKV1cbiAgaWYgKGZvdW5kTmFtZWRLZXkpIHJldHVybiBmb3VuZE5hbWVkS2V5XG5cbiAgLy8gd2VpcmQgY2hhcmFjdGVyP1xuICBpZiAoc2VhcmNoLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHNlYXJjaC5jaGFyQ29kZUF0KDApXG5cbiAgcmV0dXJuIHVuZGVmaW5lZFxufVxuXG4vKipcbiAqIEdldCBieSBuYW1lXG4gKlxuICogICBleHBvcnRzLmNvZGVbJ2VudGVyJ10gLy8gPT4gMTNcbiAqL1xuXG52YXIgY29kZXMgPSBleHBvcnRzLmNvZGUgPSBleHBvcnRzLmNvZGVzID0ge1xuICAnYmFja3NwYWNlJzogOCxcbiAgJ3RhYic6IDksXG4gICdlbnRlcic6IDEzLFxuICAnc2hpZnQnOiAxNixcbiAgJ2N0cmwnOiAxNyxcbiAgJ2FsdCc6IDE4LFxuICAncGF1c2UvYnJlYWsnOiAxOSxcbiAgJ2NhcHMgbG9jayc6IDIwLFxuICAnZXNjJzogMjcsXG4gICdzcGFjZSc6IDMyLFxuICAncGFnZSB1cCc6IDMzLFxuICAncGFnZSBkb3duJzogMzQsXG4gICdlbmQnOiAzNSxcbiAgJ2hvbWUnOiAzNixcbiAgJ2xlZnQnOiAzNyxcbiAgJ3VwJzogMzgsXG4gICdyaWdodCc6IDM5LFxuICAnZG93bic6IDQwLFxuICAnaW5zZXJ0JzogNDUsXG4gICdkZWxldGUnOiA0NixcbiAgJ2NvbW1hbmQnOiA5MSxcbiAgJ3JpZ2h0IGNsaWNrJzogOTMsXG4gICdudW1wYWQgKic6IDEwNixcbiAgJ251bXBhZCArJzogMTA3LFxuICAnbnVtcGFkIC0nOiAxMDksXG4gICdudW1wYWQgLic6IDExMCxcbiAgJ251bXBhZCAvJzogMTExLFxuICAnbnVtIGxvY2snOiAxNDQsXG4gICdzY3JvbGwgbG9jayc6IDE0NSxcbiAgJ215IGNvbXB1dGVyJzogMTgyLFxuICAnbXkgY2FsY3VsYXRvcic6IDE4MyxcbiAgJzsnOiAxODYsXG4gICc9JzogMTg3LFxuICAnLCc6IDE4OCxcbiAgJy0nOiAxODksXG4gICcuJzogMTkwLFxuICAnLyc6IDE5MSxcbiAgJ2AnOiAxOTIsXG4gICdbJzogMjE5LFxuICAnXFxcXCc6IDIyMCxcbiAgJ10nOiAyMjEsXG4gIFwiJ1wiOiAyMjIsXG59XG5cbi8vIEhlbHBlciBhbGlhc2VzXG5cbnZhciBhbGlhc2VzID0gZXhwb3J0cy5hbGlhc2VzID0ge1xuICAnd2luZG93cyc6IDkxLFxuICAn4oenJzogMTYsXG4gICfijKUnOiAxOCxcbiAgJ+KMgyc6IDE3LFxuICAn4oyYJzogOTEsXG4gICdjdGwnOiAxNyxcbiAgJ2NvbnRyb2wnOiAxNyxcbiAgJ29wdGlvbic6IDE4LFxuICAncGF1c2UnOiAxOSxcbiAgJ2JyZWFrJzogMTksXG4gICdjYXBzJzogMjAsXG4gICdyZXR1cm4nOiAxMyxcbiAgJ2VzY2FwZSc6IDI3LFxuICAnc3BjJzogMzIsXG4gICdwZ3VwJzogMzMsXG4gICdwZ2RuJzogMzMsXG4gICdpbnMnOiA0NSxcbiAgJ2RlbCc6IDQ2LFxuICAnY21kJzogOTFcbn1cblxuXG4vKiFcbiAqIFByb2dyYW1hdGljYWxseSBhZGQgdGhlIGZvbGxvd2luZ1xuICovXG5cbi8vIGxvd2VyIGNhc2UgY2hhcnNcbmZvciAoaSA9IDk3OyBpIDwgMTIzOyBpKyspIGNvZGVzW1N0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaSAtIDMyXG5cbi8vIG51bWJlcnNcbmZvciAodmFyIGkgPSA0ODsgaSA8IDU4OyBpKyspIGNvZGVzW2kgLSA0OF0gPSBpXG5cbi8vIGZ1bmN0aW9uIGtleXNcbmZvciAoaSA9IDE7IGkgPCAxMzsgaSsrKSBjb2Rlc1snZicraV0gPSBpICsgMTExXG5cbi8vIG51bXBhZCBrZXlzXG5mb3IgKGkgPSAwOyBpIDwgMTA7IGkrKykgY29kZXNbJ251bXBhZCAnK2ldID0gaSArIDk2XG5cbi8qKlxuICogR2V0IGJ5IGNvZGVcbiAqXG4gKiAgIGV4cG9ydHMubmFtZVsxM10gLy8gPT4gJ0VudGVyJ1xuICovXG5cbnZhciBuYW1lcyA9IGV4cG9ydHMubmFtZXMgPSBleHBvcnRzLnRpdGxlID0ge30gLy8gdGl0bGUgZm9yIGJhY2t3YXJkIGNvbXBhdFxuXG4vLyBDcmVhdGUgcmV2ZXJzZSBtYXBwaW5nXG5mb3IgKGkgaW4gY29kZXMpIG5hbWVzW2NvZGVzW2ldXSA9IGlcblxuLy8gQWRkIGFsaWFzZXNcbmZvciAodmFyIGFsaWFzIGluIGFsaWFzZXMpIHtcbiAgY29kZXNbYWxpYXNdID0gYWxpYXNlc1thbGlhc11cbn1cbiJdfQ==
