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
      var _this = this;

      if (keys.gotClicked("space")) {
        var coordX = this.rocket.getCoordX();
        this.bullets.set("bullet" + bulletCounter, new Bullet(document.getElementById(bulletDomID), coordX + 25));
        bulletCounter++;
      }
      this.rocket.update();

      var toBeDeleted = new Set();

      this.bullets.forEach(function (value, key) {

        value.update();

        if (!isElementInViewport(value.domElement)) {
          console.log("element left viewport");
          toBeDeleted.add(key);
          return;
        }

        var targets = document.getElementById('targetContainer').getElementsByTagName('span');
        for (var i = 0; i < targets.length; i++) {
          if (targets[i].innerText !== " " && targets[i].innerText !== "_") {
            if (hit(targets[i], value.domElement)) {
              targets[i].innerText = "_";
              toBeDeleted.add(key);
            }
          }
        }
      });

      toBeDeleted.forEach(function (key) {
        var bullet = _this.bullets.get(key);
        bullet.domElement.innerText = "";
      });

      toBeDeleted.forEach(function (key) {
        return _this.bullets['delete'](key);
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

/*
 * Check if element is in current viewport
 * from: http://stackoverflow.com/a/7557433/4187312
 */
function isElementInViewport(el) {

  var rect = el.getBoundingClientRect();

  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
  rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
  ;
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZmxvcmlhbnNjaG1pZHQvRGV2ZWxvcG1lbnQvZmxvcmlhbnNjaG1pZHQuY28udWsvanMvc3JjL0J1bGxldC5qcyIsIi9Vc2Vycy9mbG9yaWFuc2NobWlkdC9EZXZlbG9wbWVudC9mbG9yaWFuc2NobWlkdC5jby51ay9qcy9zcmMvQ29sb3JNb2RlLmpzIiwiL1VzZXJzL2Zsb3JpYW5zY2htaWR0L0RldmVsb3BtZW50L2Zsb3JpYW5zY2htaWR0LmNvLnVrL2pzL3NyYy9HYW1lLmpzIiwiL1VzZXJzL2Zsb3JpYW5zY2htaWR0L0RldmVsb3BtZW50L2Zsb3JpYW5zY2htaWR0LmNvLnVrL2pzL3NyYy9Sb2NrZXQuanMiLCIvVXNlcnMvZmxvcmlhbnNjaG1pZHQvRGV2ZWxvcG1lbnQvZmxvcmlhbnNjaG1pZHQuY28udWsvanMvc3JjL2tleXMuanMiLCJub2RlX21vZHVsZXMva2V5Y29kZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7Ozs7O0FBRWIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUVoQyxJQUFNLFFBQVEsR0FBRyxDQUFDLENBQUM7O0lBRWIsTUFBTTtBQUNDLFdBRFAsTUFBTSxDQUNFLFNBQVMsRUFBRSxNQUFNLEVBQUU7MEJBRDNCLE1BQU07O0FBR1IsUUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2hELFFBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNoRCxRQUFJLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hDLFFBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleXMgPSByZXF1aXJlKFwiLi9rZXlzLmpzXCIpO1xuXG5jb25zdCBESVNUQU5DRSA9IDI7XG5cbmNsYXNzIEJ1bGxldCB7XG4gIGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgY29vcmRYKSB7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMuZG9tRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImJ1bGxldFwiKTtcbiAgICB2YXIgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiKlwiKTtcbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLmJvdHRvbSA9IFwiMzBweFwiO1xuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS5jb2xvciA9IGdldFJhbmRvbUNvbG9yKCk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuZG9tRWxlbWVudCk7XG4gICAgdGhpcy5zZXRDb29yZFgoY29vcmRYKTtcbiAgfVxuXG4gIG1vdmVMZWZ0KCkge1xuICAgIHZhciBjb29yZFggPSB0aGlzLmdldENvb3JkWCgpO1xuICAgIGlmKGNvb3JkWCA+PSA1KSB7XG4gICAgICBjb29yZFggPSBjb29yZFggLT0gRElTVEFOQ0U7XG4gICAgfVxuICAgIHRoaXMuc2V0Q29vcmRYKGNvb3JkWCk7XG4gIH1cblxuICBtb3ZlUmlnaHQoKSB7XG4gICAgdmFyIGNvb3JkWCA9IHRoaXMuZ2V0Q29vcmRYKCk7XG4gICAgY29vcmRYID0gY29vcmRYICs9IERJU1RBTkNFO1xuICAgIHRoaXMuc2V0Q29vcmRYKGNvb3JkWCk7XG4gIH1cblxuICBtb3ZlVXAoKSB7XG4gICAgdmFyIGNvb3JkWSA9IHRoaXMuZ2V0Q29vcmRZKCk7XG4gICAgY29vcmRZID0gY29vcmRZICs9IERJU1RBTkNFO1xuICAgIHRoaXMuc2V0Q29vcmRZKGNvb3JkWSk7XG4gIH1cblxuICBtb3ZlRG93bigpIHtcbiAgICB2YXIgY29vcmRZID0gdGhpcy5nZXRDb29yZFkoKTtcbiAgICBjb29yZFkgPSBjb29yZFkgLT0gRElTVEFOQ0U7XG4gICAgdGhpcy5zZXRDb29yZFkoY29vcmRZKTtcbiAgfVxuXG4gIGdldENvb3JkWCgpIHtcbiAgICByZXR1cm4gKHRoaXMuZG9tRWxlbWVudC5zdHlsZS5sZWZ0ID09PSBcIlwiKT8gMCA6IHBhcnNlSW50KHRoaXMuZG9tRWxlbWVudC5zdHlsZS5sZWZ0KTtcbiAgfVxuXG4gIHNldENvb3JkWCh2YWx1ZSkge1xuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS5sZWZ0ID0gdmFsdWUrXCJweFwiO1xuICB9XG5cbiAgZ2V0Q29vcmRZKCkge1xuICAgIHJldHVybiAodGhpcy5kb21FbGVtZW50LnN0eWxlLmJvdHRvbSA9PT0gXCJcIik/IDAgOiBwYXJzZUludCh0aGlzLmRvbUVsZW1lbnQuc3R5bGUuYm90dG9tKTtcbiAgfVxuXG4gIHNldENvb3JkWSh2YWx1ZSkge1xuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS5ib3R0b20gPSB2YWx1ZStcInB4XCI7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgICB0aGlzLm1vdmVVcCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFJhbmRvbUNvbG9yKCkge1xuICAgIHZhciBsZXR0ZXJzID0gJzAxMjM0NTY3ODlBQkNERUYnLnNwbGl0KCcnKTtcbiAgICB2YXIgY29sb3IgPSAnIyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA2OyBpKysgKSB7XG4gICAgICAgIGNvbG9yICs9IGxldHRlcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTYpXTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbG9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1bGxldDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNvbG9yID0ge1xuICBkYXJrOiB7XG4gICAgYmc6IFwiIzI4MkMzNFwiLFxuICAgIGZvbnQ6IFwiI0FDQjJCRVwiLFxuICAgIGxpbmtzOiBcIiNBQ0IyQkVcIixcbiAgICBpbXByZXNzdW06IFwiI0EyQkQ3OFwiXG4gIH0sXG4gIGxpZ2h0IDoge1xuICAgICAgYmc6IFwiI0ZGRkZGRlwiLFxuICAgICAgbGlua3M6IFwiIzhBQjM3N1wiLFxuICAgICAgaW1wcmVzc3VtOiBcIiNCQzUxNDJcIixcbiAgICAgIGZvbnQ6IFwiIzI4MkMzNFwiXG4gIH1cbn07XG5cbnZhciBkYXJrTW9kZSA9IGZhbHNlO1xuXG5mdW5jdGlvbiB0b2dnbGUoKSB7XG4gIGlmKGRhcmtNb2RlKSB7XG4gICAgc2V0TW9kZShcImxpZ2h0bW9kZVwiKTtcbiAgICBkYXJrTW9kZSA9IGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHNldE1vZGUoXCJkYXJrbW9kZVwiKTtcbiAgICBkYXJrTW9kZSA9IHRydWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0TW9kZShtb2RlKSB7XG4gIHZhciBjb2xvclNjaGVtZTtcbiAgaWYobW9kZSA9PT0gXCJkYXJrbW9kZVwiKSB7XG4gICAgc2V0RGVidWcoXCJsaWdodG1vZGVcIik7XG4gICAgY29sb3JTY2hlbWUgPSBjb2xvci5kYXJrO1xuICB9IGVsc2Uge1xuICAgIHNldERlYnVnKFwiZGFya21vZGVcIik7XG4gICAgY29sb3JTY2hlbWUgPSBjb2xvci5saWdodDtcbiAgfVxuXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW1wcmVzc3VtXCIpLnN0eWxlLmNvbG9yID0gY29sb3JTY2hlbWUuaW1wcmVzc3VtO1xuICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yU2NoZW1lLmJnO1xuICBkb2N1bWVudC5ib2R5LnN0eWxlLmNvbG9yID0gY29sb3JTY2hlbWUuZm9udDtcbn1cblxuZnVuY3Rpb24gc2V0RGVidWcobWVzc2FnZSkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlYnVnXCIpLmlubmVyVGV4dCA9IG1lc3NhZ2U7XG59XG5cbnZhciBwZXJzaXN0ZW50ID0gZmFsc2U7XG52YXIgY2xpY2tlZCA9IDA7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVidWdcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgY2xpY2tlZCA9IG5ldyBEYXRlKCkuZ2V0SG91cnMoKTtcbiAgcGVyc2lzdGVudCA9IHRydWU7XG4gIHRvZ2dsZSgpO1xufSk7XG5cbnNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcblxuICB2YXIgaG91cnMgPSBuZXcgRGF0ZSgpLmdldEhvdXJzKCk7XG5cbiAgLyogRG9uJ3QgZG8gYW55dGhpbmcgaWYgdXNlciBoYXMgY2xpY2tlZCBzd2l0Y2ggbWFudWFsbHkgKi9cbiAgaWYocGVyc2lzdGVudCA9PT0gdHJ1ZSkgcmV0dXJuO1xuXG4gIGlmKGhvdXJzID49IDIwIHx8wqBob3VycyA8IDgpIHtcbiAgICBzZXRNb2RlKFwiZGFya21vZGVcIik7XG4gIH0gZWxzZSB7XG4gICAgc2V0TW9kZShcImxpZ2h0bW9kZVwiKTtcbiAgfVxufSwgMTAwMCk7XG5cbm1vZHVsZS5leHBvcnRzID0gdHJ1ZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFJvY2tldCA9IHJlcXVpcmUoJy4vUm9ja2V0Jyk7XG52YXIgQnVsbGV0ID0gcmVxdWlyZSgnLi9CdWxsZXQnKTtcbnZhciBrZXlzID0gcmVxdWlyZShcIi4va2V5cy5qc1wiKTtcblxucmVxdWlyZShcIi4vQ29sb3JNb2RlXCIpO1xuXG5jb25zdCBGUFMgPSA2MDtcbmNvbnN0IHJvY2tldERvbUlEID0gXCJyb2NrZXRcIjtcbmNvbnN0IGJ1bGxldERvbUlEID0gXCJidWxsZXRDb250YWluZXJcIjtcblxubGV0IGJ1bGxldENvdW50ZXIgPSAwO1xuLypcbiAqIEdhbWVMb29wIFR1dG9yaWFsIHZvblxuICogaHR0cDovL25va2FybWEub3JnLzIwMTEvMDIvMDIvamF2YXNjcmlwdC1nYW1lLWRldmVsb3BtZW50LXRoZS1nYW1lLWxvb3AvXG4gKi9cbmNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmZwcyA9IEZQUztcbiAgICB0aGlzLnJvY2tldCA9IG5ldyBSb2NrZXQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocm9ja2V0RG9tSUQpKTtcbiAgICB0aGlzLmJ1bGxldHMgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMucnVuLmJpbmQodGhpcyksIDEwMDAgLyB0aGlzLmZwcyk7XG4gICAgbW9kaWZ5SFRNTCgpO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGlmKGtleXMuZ290Q2xpY2tlZChcInNwYWNlXCIpKSB7XG4gICAgICB2YXIgY29vcmRYID0gdGhpcy5yb2NrZXQuZ2V0Q29vcmRYKCk7XG4gICAgICB0aGlzLmJ1bGxldHMuc2V0KFwiYnVsbGV0XCIrYnVsbGV0Q291bnRlciwgbmV3IEJ1bGxldChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChidWxsZXREb21JRCksIGNvb3JkWCsyNSkpO1xuICAgICAgYnVsbGV0Q291bnRlcisrO1xuICAgIH1cbiAgICB0aGlzLnJvY2tldC51cGRhdGUoKTtcblxuICAgIGxldCB0b0JlRGVsZXRlZCA9IG5ldyBTZXQoKTtcblxuICAgIHRoaXMuYnVsbGV0cy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG5cbiAgICAgIHZhbHVlLnVwZGF0ZSgpO1xuXG4gICAgICBpZighaXNFbGVtZW50SW5WaWV3cG9ydCh2YWx1ZS5kb21FbGVtZW50KSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImVsZW1lbnQgbGVmdCB2aWV3cG9ydFwiKTtcbiAgICAgICAgdG9CZURlbGV0ZWQuYWRkKGtleSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHRhcmdldHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFyZ2V0Q29udGFpbmVyJykuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NwYW4nKTtcbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0YXJnZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmKHRhcmdldHNbaV0uaW5uZXJUZXh0ICE9PSBcIiBcIiAmJiB0YXJnZXRzW2ldLmlubmVyVGV4dCAhPT0gXCJfXCIpIHtcbiAgICAgICAgICBpZihoaXQodGFyZ2V0c1tpXSwgdmFsdWUuZG9tRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRhcmdldHNbaV0uaW5uZXJUZXh0ID0gXCJfXCI7XG4gICAgICAgICAgICB0b0JlRGVsZXRlZC5hZGQoa2V5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRvQmVEZWxldGVkLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGxldCBidWxsZXQgPSB0aGlzLmJ1bGxldHMuZ2V0KGtleSk7XG4gICAgICBidWxsZXQuZG9tRWxlbWVudC5pbm5lclRleHQgPSBcIlwiO1xuICAgIH0pO1xuXG4gICAgdG9CZURlbGV0ZWQuZm9yRWFjaChrZXkgPT4gdGhpcy5idWxsZXRzLmRlbGV0ZShrZXkpKTtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgfVxuXG4gIHJ1bigpIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG59XG5cbi8qIHN0YXJ0IGdhbWUgKi9cbm5ldyBHYW1lKCk7XG5cblxuZnVuY3Rpb24gaGl0KG5vZGUxLCBub2RlMikge1xuICBpZihNYXRoLmFicyhub2RlMS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20gLSBub2RlMi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20pIDwgMTApIHtcbiAgICBpZihNYXRoLmFicyhub2RlMS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0IC0gbm9kZTIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCkgPCAxMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qXG4gKiBDaGVjayBpZiBlbGVtZW50IGlzIGluIGN1cnJlbnQgdmlld3BvcnRcbiAqIGZyb206IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzc1NTc0MzMvNDE4NzMxMlxuICovXG5mdW5jdGlvbiBpc0VsZW1lbnRJblZpZXdwb3J0IChlbCkge1xuXG4gICAgdmFyIHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIHJlY3QudG9wID49IDAgJiZcbiAgICAgICAgcmVjdC5sZWZ0ID49IDAgJiZcbiAgICAgICAgcmVjdC5ib3R0b20gPD0gKHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSAmJiAvKm9yICQod2luZG93KS5oZWlnaHQoKSAqL1xuICAgICAgICByZWN0LnJpZ2h0IDw9ICh3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgpIC8qb3IgJCh3aW5kb3cpLndpZHRoKCkgKi9cbiAgICApO1xufVxuXG4vKipcbiAqIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzUwNjI2OThcbiAqIHJlY3Vyc2l2ZWx5IGdldCBhbGwgdGV4dCBub2RlcyBhcyBhbiBhcnJheSBmb3IgYSBnaXZlbiBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIGdldFRleHROb2Rlcyhub2RlKSB7XG4gICAgdmFyIGNoaWxkVGV4dE5vZGVzID0gW107XG5cbiAgICBpZiAoIW5vZGUuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgY2hpbGROb2RlcyA9IG5vZGUuY2hpbGROb2RlcztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGNoaWxkTm9kZXNbaV0ubm9kZVR5cGUgPT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgICAgICAgIGNoaWxkVGV4dE5vZGVzLnB1c2goY2hpbGROb2Rlc1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2hpbGROb2Rlc1tpXS5ub2RlVHlwZSA9PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoY2hpbGRUZXh0Tm9kZXMsIGdldFRleHROb2RlcyhjaGlsZE5vZGVzW2ldKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2hpbGRUZXh0Tm9kZXM7XG59XG5cbi8qKlxuICogZ2l2ZW4gYSB0ZXh0IG5vZGUsIHdyYXAgZWFjaCBjaGFyYWN0ZXIgaW4gdGhlXG4gKiBnaXZlbiB0YWcuXG4gKi9cbmZ1bmN0aW9uIHdyYXBFYWNoQ2hhcmFjdGVyKHRleHROb2RlLCB0YWcpIHtcbiAgICB2YXIgdGV4dCA9IHRleHROb2RlLm5vZGVWYWx1ZTtcbiAgICB2YXIgcGFyZW50ID0gdGV4dE5vZGUucGFyZW50Tm9kZTtcblxuICAgIHZhciBjaGFyYWN0ZXJzID0gdGV4dC5zcGxpdCgnJyk7XG4gICAgY2hhcmFjdGVycy5mb3JFYWNoKGZ1bmN0aW9uKGNoYXJhY3Rlcikge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICAgICAgdmFyIGNoYXJhY3Rlck5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGFyYWN0ZXIpO1xuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNoYXJhY3Rlck5vZGUpO1xuXG4gICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoZWxlbWVudCwgdGV4dE5vZGUpO1xuICAgIH0pO1xuXG4gICAgcGFyZW50LnJlbW92ZUNoaWxkKHRleHROb2RlKTtcbn1cblxuZnVuY3Rpb24gbW9kaWZ5SFRNTCgpIHtcbiAgdmFyIGFsbFRleHROb2RlcyA9IGdldFRleHROb2Rlcyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhcmdldENvbnRhaW5lclwiKSk7XG4gIGFsbFRleHROb2Rlcy5mb3JFYWNoKHRleHROb2RlID0+IHdyYXBFYWNoQ2hhcmFjdGVyKHRleHROb2RlLCAnc3BhbicpKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleXMgPSByZXF1aXJlKFwiLi9rZXlzLmpzXCIpO1xuXG5jb25zdCBESVNUQU5DRSA9IDI7XG5cbmNsYXNzIFJvY2tldCB7XG4gIGNvbnN0cnVjdG9yKGRvbUVsZW1lbnQpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb21FbGVtZW50O1xuICB9XG5cbiAgbW92ZUxlZnQoKSB7XG4gICAgdmFyIGNvb3JkWCA9IHRoaXMuZ2V0Q29vcmRYKCk7XG4gICAgaWYoY29vcmRYID49IDUpIHtcbiAgICAgIGNvb3JkWCA9IGNvb3JkWCAtPSBESVNUQU5DRTtcbiAgICB9XG4gICAgdGhpcy5zZXRDb29yZFgoY29vcmRYKTtcbiAgfVxuXG4gIG1vdmVSaWdodCgpIHtcbiAgICB2YXIgY29vcmRYID0gdGhpcy5nZXRDb29yZFgoKTtcbiAgICBjb29yZFggPSBjb29yZFggKz0gRElTVEFOQ0U7XG4gICAgdGhpcy5zZXRDb29yZFgoY29vcmRYKTtcbiAgfVxuXG4gIGdldENvb3JkWCgpIHtcbiAgICByZXR1cm4gKHRoaXMuZG9tRWxlbWVudC5zdHlsZS5sZWZ0ID09PSBcIlwiKT8gMCA6IHBhcnNlSW50KHRoaXMuZG9tRWxlbWVudC5zdHlsZS5sZWZ0KTtcbiAgfVxuXG4gIHNldENvb3JkWCh2YWx1ZSkge1xuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS5sZWZ0ID0gdmFsdWUrXCJweFwiO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGlmIChrZXlzLmlzUHJlc3NlZChcImxlZnRcIikpIHtcbiAgICAgIHRoaXMubW92ZUxlZnQoKTtcbiAgICB9IGVsc2UgaWYgKGtleXMuaXNQcmVzc2VkKFwicmlnaHRcIikpIHtcbiAgICAgIHRoaXMubW92ZVJpZ2h0KCk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm9ja2V0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIga2V5Y29kZSA9IHJlcXVpcmUoXCJrZXljb2RlXCIpO1xuXG5tb2R1bGUuZXhwb3J0cy5pc1ByZXNzZWQgPSBmdW5jdGlvbiAobmFtZSkge1xuICB2YXIgY29kZSA9IGtleWNvZGUobmFtZSk7XG4gIHJldHVybiBpc1ByZXNzZWRLZXkoY29kZSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5nb3RDbGlja2VkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgdmFyIGNvZGUgPSBrZXljb2RlKG5hbWUpO1xuICByZXR1cm4gZ290Q2xpY2tlZEtleShjb2RlKTtcbn07XG5cbnZhciBkb3duS2V5cyA9IG5ldyBNYXAoKTtcbnZhciBjbGlja2VkS2V5cyA9IG5ldyBNYXAoKTtcblxuZG9jdW1lbnQub25rZXlkb3duID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgZG93bktleXMuc2V0KGV2ZW50LmtleUNvZGUsIHRydWUpO1xuICBjbGlja2VkS2V5cy5zZXQoZXZlbnQua2V5Q29kZSwgdHJ1ZSk7XG59O1xuXG5kb2N1bWVudC5vbmtleXVwID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgZG93bktleXMuc2V0KGV2ZW50LmtleUNvZGUsIGZhbHNlKTtcbn07XG5cbmZ1bmN0aW9uIGlzUHJlc3NlZEtleShrZXkpIHtcbiAgaWYoZG93bktleXMuaGFzKGtleSkpIHtcbiAgICByZXR1cm4gZG93bktleXMuZ2V0KGtleSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdvdENsaWNrZWRLZXkoa2V5KSB7XG4gIGlmKGNsaWNrZWRLZXlzLmhhcyhrZXkpKSB7XG4gICAgdmFyIHZhbHVlID0gY2xpY2tlZEtleXMuZ2V0KGtleSk7XG4gICAgY2xpY2tlZEtleXMuc2V0KGtleSwgZmFsc2UpO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsIi8vIFNvdXJjZTogaHR0cDovL2pzZmlkZGxlLm5ldC92V3g4Vi9cbi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTYwMzE5NS9mdWxsLWxpc3Qtb2YtamF2YXNjcmlwdC1rZXljb2Rlc1xuXG5cblxuLyoqXG4gKiBDb25lbmllbmNlIG1ldGhvZCByZXR1cm5zIGNvcnJlc3BvbmRpbmcgdmFsdWUgZm9yIGdpdmVuIGtleU5hbWUgb3Iga2V5Q29kZS5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSBrZXlDb2RlIHtOdW1iZXJ9IG9yIGtleU5hbWUge1N0cmluZ31cbiAqIEByZXR1cm4ge01peGVkfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzZWFyY2hJbnB1dCkge1xuICAvLyBLZXlib2FyZCBFdmVudHNcbiAgaWYgKHNlYXJjaElucHV0ICYmICdvYmplY3QnID09PSB0eXBlb2Ygc2VhcmNoSW5wdXQpIHtcbiAgICB2YXIgaGFzS2V5Q29kZSA9IHNlYXJjaElucHV0LndoaWNoIHx8IHNlYXJjaElucHV0LmtleUNvZGUgfHwgc2VhcmNoSW5wdXQuY2hhckNvZGVcbiAgICBpZiAoaGFzS2V5Q29kZSkgc2VhcmNoSW5wdXQgPSBoYXNLZXlDb2RlXG4gIH1cblxuICAvLyBOdW1iZXJzXG4gIGlmICgnbnVtYmVyJyA9PT0gdHlwZW9mIHNlYXJjaElucHV0KSByZXR1cm4gbmFtZXNbc2VhcmNoSW5wdXRdXG5cbiAgLy8gRXZlcnl0aGluZyBlbHNlIChjYXN0IHRvIHN0cmluZylcbiAgdmFyIHNlYXJjaCA9IFN0cmluZyhzZWFyY2hJbnB1dClcblxuICAvLyBjaGVjayBjb2Rlc1xuICB2YXIgZm91bmROYW1lZEtleSA9IGNvZGVzW3NlYXJjaC50b0xvd2VyQ2FzZSgpXVxuICBpZiAoZm91bmROYW1lZEtleSkgcmV0dXJuIGZvdW5kTmFtZWRLZXlcblxuICAvLyBjaGVjayBhbGlhc2VzXG4gIHZhciBmb3VuZE5hbWVkS2V5ID0gYWxpYXNlc1tzZWFyY2gudG9Mb3dlckNhc2UoKV1cbiAgaWYgKGZvdW5kTmFtZWRLZXkpIHJldHVybiBmb3VuZE5hbWVkS2V5XG5cbiAgLy8gd2VpcmQgY2hhcmFjdGVyP1xuICBpZiAoc2VhcmNoLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHNlYXJjaC5jaGFyQ29kZUF0KDApXG5cbiAgcmV0dXJuIHVuZGVmaW5lZFxufVxuXG4vKipcbiAqIEdldCBieSBuYW1lXG4gKlxuICogICBleHBvcnRzLmNvZGVbJ2VudGVyJ10gLy8gPT4gMTNcbiAqL1xuXG52YXIgY29kZXMgPSBleHBvcnRzLmNvZGUgPSBleHBvcnRzLmNvZGVzID0ge1xuICAnYmFja3NwYWNlJzogOCxcbiAgJ3RhYic6IDksXG4gICdlbnRlcic6IDEzLFxuICAnc2hpZnQnOiAxNixcbiAgJ2N0cmwnOiAxNyxcbiAgJ2FsdCc6IDE4LFxuICAncGF1c2UvYnJlYWsnOiAxOSxcbiAgJ2NhcHMgbG9jayc6IDIwLFxuICAnZXNjJzogMjcsXG4gICdzcGFjZSc6IDMyLFxuICAncGFnZSB1cCc6IDMzLFxuICAncGFnZSBkb3duJzogMzQsXG4gICdlbmQnOiAzNSxcbiAgJ2hvbWUnOiAzNixcbiAgJ2xlZnQnOiAzNyxcbiAgJ3VwJzogMzgsXG4gICdyaWdodCc6IDM5LFxuICAnZG93bic6IDQwLFxuICAnaW5zZXJ0JzogNDUsXG4gICdkZWxldGUnOiA0NixcbiAgJ2NvbW1hbmQnOiA5MSxcbiAgJ3JpZ2h0IGNsaWNrJzogOTMsXG4gICdudW1wYWQgKic6IDEwNixcbiAgJ251bXBhZCArJzogMTA3LFxuICAnbnVtcGFkIC0nOiAxMDksXG4gICdudW1wYWQgLic6IDExMCxcbiAgJ251bXBhZCAvJzogMTExLFxuICAnbnVtIGxvY2snOiAxNDQsXG4gICdzY3JvbGwgbG9jayc6IDE0NSxcbiAgJ215IGNvbXB1dGVyJzogMTgyLFxuICAnbXkgY2FsY3VsYXRvcic6IDE4MyxcbiAgJzsnOiAxODYsXG4gICc9JzogMTg3LFxuICAnLCc6IDE4OCxcbiAgJy0nOiAxODksXG4gICcuJzogMTkwLFxuICAnLyc6IDE5MSxcbiAgJ2AnOiAxOTIsXG4gICdbJzogMjE5LFxuICAnXFxcXCc6IDIyMCxcbiAgJ10nOiAyMjEsXG4gIFwiJ1wiOiAyMjIsXG59XG5cbi8vIEhlbHBlciBhbGlhc2VzXG5cbnZhciBhbGlhc2VzID0gZXhwb3J0cy5hbGlhc2VzID0ge1xuICAnd2luZG93cyc6IDkxLFxuICAn4oenJzogMTYsXG4gICfijKUnOiAxOCxcbiAgJ+KMgyc6IDE3LFxuICAn4oyYJzogOTEsXG4gICdjdGwnOiAxNyxcbiAgJ2NvbnRyb2wnOiAxNyxcbiAgJ29wdGlvbic6IDE4LFxuICAncGF1c2UnOiAxOSxcbiAgJ2JyZWFrJzogMTksXG4gICdjYXBzJzogMjAsXG4gICdyZXR1cm4nOiAxMyxcbiAgJ2VzY2FwZSc6IDI3LFxuICAnc3BjJzogMzIsXG4gICdwZ3VwJzogMzMsXG4gICdwZ2RuJzogMzMsXG4gICdpbnMnOiA0NSxcbiAgJ2RlbCc6IDQ2LFxuICAnY21kJzogOTFcbn1cblxuXG4vKiFcbiAqIFByb2dyYW1hdGljYWxseSBhZGQgdGhlIGZvbGxvd2luZ1xuICovXG5cbi8vIGxvd2VyIGNhc2UgY2hhcnNcbmZvciAoaSA9IDk3OyBpIDwgMTIzOyBpKyspIGNvZGVzW1N0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaSAtIDMyXG5cbi8vIG51bWJlcnNcbmZvciAodmFyIGkgPSA0ODsgaSA8IDU4OyBpKyspIGNvZGVzW2kgLSA0OF0gPSBpXG5cbi8vIGZ1bmN0aW9uIGtleXNcbmZvciAoaSA9IDE7IGkgPCAxMzsgaSsrKSBjb2Rlc1snZicraV0gPSBpICsgMTExXG5cbi8vIG51bXBhZCBrZXlzXG5mb3IgKGkgPSAwOyBpIDwgMTA7IGkrKykgY29kZXNbJ251bXBhZCAnK2ldID0gaSArIDk2XG5cbi8qKlxuICogR2V0IGJ5IGNvZGVcbiAqXG4gKiAgIGV4cG9ydHMubmFtZVsxM10gLy8gPT4gJ0VudGVyJ1xuICovXG5cbnZhciBuYW1lcyA9IGV4cG9ydHMubmFtZXMgPSBleHBvcnRzLnRpdGxlID0ge30gLy8gdGl0bGUgZm9yIGJhY2t3YXJkIGNvbXBhdFxuXG4vLyBDcmVhdGUgcmV2ZXJzZSBtYXBwaW5nXG5mb3IgKGkgaW4gY29kZXMpIG5hbWVzW2NvZGVzW2ldXSA9IGlcblxuLy8gQWRkIGFsaWFzZXNcbmZvciAodmFyIGFsaWFzIGluIGFsaWFzZXMpIHtcbiAgY29kZXNbYWxpYXNdID0gYWxpYXNlc1thbGlhc11cbn1cbiJdfQ==
