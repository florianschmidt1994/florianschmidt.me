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
    this.hasHit = false;
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
    key: "setHasHit",
    value: function setHasHit() {
      this.hasHit = true;
      this.domElement.parentNode.removeChild(this.domElement);
    }
  }, {
    key: "checkViewport",
    value: function checkViewport() {
      if (!isElementInViewport(this.domElement)) {
        this.hasHit = true;
        this.domElement.parentNode.removeChild(this.domElement);
        console.log("Bullet has left viewport!!");
      }
    }
  }, {
    key: "update",
    value: function update() {
      this.checkViewport();
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

module.exports = Bullet;

},{"./keys.js":6}],2:[function(require,module,exports){
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
  document.getElementById("debug").textContent = message;
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
var Target = require('./Target');
var keys = require("./keys.js");

require("./ColorMode");

var FPS = 60;
var ROCKET_DOM_ID = "rocket";
var BULLET_DOM_ID = "bulletContainer";
var TARGET_CONTAINER_ID = "targetContainer";
var TARGET_WRAP_TAG = "SPAN";

/*
 * GameLoop Tutorial von
 * http://nokarma.org/2011/02/02/javascript-game-development-the-game-loop/
 */

var Game = (function () {
  function Game() {
    _classCallCheck(this, Game);

    this.fps = FPS;
    this.rocket = new Rocket(document.getElementById(ROCKET_DOM_ID));
    this.bullets = [];
    this.targets = this.initTargets();
    this.interval = setInterval(this.run.bind(this), 1000 / this.fps);
  }

  /* start game */

  _createClass(Game, [{
    key: 'initTargets',
    value: function initTargets() {
      var allTextNodes = getTextNodes(document.getElementById(TARGET_CONTAINER_ID));
      allTextNodes.forEach(function (textNode) {
        return wrapEachCharacter(textNode, TARGET_WRAP_TAG);
      });
      var targetDoms = document.getElementById(TARGET_CONTAINER_ID).getElementsByTagName(TARGET_WRAP_TAG);
      var targets = [];
      for (var i = 0; i < targetDoms.length; i++) {
        if (targetDoms[i].textContent !== " ") {
          targets.push(new Target(targetDoms[i]));
        }
      }
      return targets;
    }
  }, {
    key: 'update',
    value: function update() {
      var _this = this;

      /* fire new bullet if space is pressed */
      if (keys.gotClicked("space")) {
        var coordX = this.rocket.getCoordX();
        this.bullets.push(new Bullet(document.getElementById(BULLET_DOM_ID), coordX + 25));
      }

      /* update all game elements */
      this.rocket.update();
      this.bullets.forEach(function (bullet) {
        return bullet.update();
      });
      this.targets.forEach(function (target) {
        return target.update();
      });

      /* check for hits */
      this.bullets.forEach(function (bullet) {
        _this.targets.forEach(function (target) {
          if (hit(target.domElement, bullet.domElement)) {
            target.setIsHit(true);
            bullet.setHasHit(true);
          }
        });
      });

      this.bullets = this.bullets.filter(function (bullet) {
        return !bullet.hasHit;
      });
      this.targets = this.targets.filter(function (target) {
        return !target.isHit;
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

},{"./Bullet":1,"./ColorMode":2,"./Rocket":4,"./Target":5,"./keys.js":6}],4:[function(require,module,exports){
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

},{"./keys.js":6}],5:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Target = (function () {
  function Target(domElement) {
    _classCallCheck(this, Target);

    this.domElement = domElement;
    this.isHit = false;
  }

  _createClass(Target, [{
    key: "setIsHit",
    value: function setIsHit(isHit) {
      this.domElement.textContent = "_";
      this.isHit = isHit;
    }
  }, {
    key: "update",
    value: function update() {}
  }]);

  return Target;
})();

module.exports = Target;

},{}],6:[function(require,module,exports){
'use strict';

var keycode = require("keycode");

var downKeys = new Map();
var clickedKeys = new Map();

module.exports.isPressed = function (name) {
  var code = keycode(name);
  return isPressedKey(code);
};

module.exports.gotClicked = function (name) {
  var code = keycode(name);
  return gotClickedKey(code);
};

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

},{"keycode":7}],7:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZmxvcmlhbnNjaG1pZHQvRGV2ZWxvcG1lbnQvZmxvcmlhbnNjaG1pZHQuY28udWsvanMvc3JjL0J1bGxldC5qcyIsIi9Vc2Vycy9mbG9yaWFuc2NobWlkdC9EZXZlbG9wbWVudC9mbG9yaWFuc2NobWlkdC5jby51ay9qcy9zcmMvQ29sb3JNb2RlLmpzIiwiL1VzZXJzL2Zsb3JpYW5zY2htaWR0L0RldmVsb3BtZW50L2Zsb3JpYW5zY2htaWR0LmNvLnVrL2pzL3NyYy9HYW1lLmpzIiwiL1VzZXJzL2Zsb3JpYW5zY2htaWR0L0RldmVsb3BtZW50L2Zsb3JpYW5zY2htaWR0LmNvLnVrL2pzL3NyYy9Sb2NrZXQuanMiLCIvVXNlcnMvZmxvcmlhbnNjaG1pZHQvRGV2ZWxvcG1lbnQvZmxvcmlhbnNjaG1pZHQuY28udWsvanMvc3JjL1RhcmdldC5qcyIsIi9Vc2Vycy9mbG9yaWFuc2NobWlkdC9EZXZlbG9wbWVudC9mbG9yaWFuc2NobWlkdC5jby51ay9qcy9zcmMva2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9rZXljb2RlL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFDOzs7Ozs7QUFFYixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7O0FBRWhDLElBQU0sUUFBUSxHQUFHLENBQUMsQ0FBQzs7SUFFYixNQUFNO0FBQ0MsV0FEUCxNQUFNLENBQ0UsU0FBUyxFQUFFLE1BQU0sRUFBRTswQkFEM0IsTUFBTTs7QUFFUixRQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDaEQsUUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2hELFFBQUksSUFBSSxHQUFHLFFBQVEs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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIga2V5cyA9IHJlcXVpcmUoXCIuL2tleXMuanNcIik7XG5cbmNvbnN0IERJU1RBTkNFID0gMjtcblxuY2xhc3MgQnVsbGV0IHtcbiAgY29uc3RydWN0b3IoY29udGFpbmVyLCBjb29yZFgpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMuZG9tRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImJ1bGxldFwiKTtcbiAgICB2YXIgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiKlwiKTtcbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLmJvdHRvbSA9IFwiMzBweFwiO1xuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS5jb2xvciA9IGdldFJhbmRvbUNvbG9yKCk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuZG9tRWxlbWVudCk7XG4gICAgdGhpcy5zZXRDb29yZFgoY29vcmRYKTtcbiAgICB0aGlzLmhhc0hpdCA9IGZhbHNlO1xuICB9XG5cbiAgbW92ZUxlZnQoKSB7XG4gICAgdmFyIGNvb3JkWCA9IHRoaXMuZ2V0Q29vcmRYKCk7XG4gICAgaWYoY29vcmRYID49IDUpIHtcbiAgICAgIGNvb3JkWCA9IGNvb3JkWCAtPSBESVNUQU5DRTtcbiAgICB9XG4gICAgdGhpcy5zZXRDb29yZFgoY29vcmRYKTtcbiAgfVxuXG4gIG1vdmVSaWdodCgpIHtcbiAgICB2YXIgY29vcmRYID0gdGhpcy5nZXRDb29yZFgoKTtcbiAgICBjb29yZFggPSBjb29yZFggKz0gRElTVEFOQ0U7XG4gICAgdGhpcy5zZXRDb29yZFgoY29vcmRYKTtcbiAgfVxuXG4gIG1vdmVVcCgpIHtcbiAgICB2YXIgY29vcmRZID0gdGhpcy5nZXRDb29yZFkoKTtcbiAgICBjb29yZFkgPSBjb29yZFkgKz0gRElTVEFOQ0U7XG4gICAgdGhpcy5zZXRDb29yZFkoY29vcmRZKTtcbiAgfVxuXG4gIG1vdmVEb3duKCkge1xuICAgIHZhciBjb29yZFkgPSB0aGlzLmdldENvb3JkWSgpO1xuICAgIGNvb3JkWSA9IGNvb3JkWSAtPSBESVNUQU5DRTtcbiAgICB0aGlzLnNldENvb3JkWShjb29yZFkpO1xuICB9XG5cbiAgZ2V0Q29vcmRYKCkge1xuICAgIHJldHVybiAodGhpcy5kb21FbGVtZW50LnN0eWxlLmxlZnQgPT09IFwiXCIpPyAwIDogcGFyc2VJbnQodGhpcy5kb21FbGVtZW50LnN0eWxlLmxlZnQpO1xuICB9XG5cbiAgc2V0Q29vcmRYKHZhbHVlKSB7XG4gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLmxlZnQgPSB2YWx1ZStcInB4XCI7XG4gIH1cblxuICBnZXRDb29yZFkoKSB7XG4gICAgcmV0dXJuICh0aGlzLmRvbUVsZW1lbnQuc3R5bGUuYm90dG9tID09PSBcIlwiKT8gMCA6IHBhcnNlSW50KHRoaXMuZG9tRWxlbWVudC5zdHlsZS5ib3R0b20pO1xuICB9XG5cbiAgc2V0Q29vcmRZKHZhbHVlKSB7XG4gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLmJvdHRvbSA9IHZhbHVlK1wicHhcIjtcbiAgfVxuXG4gIHNldEhhc0hpdCgpIHtcbiAgICB0aGlzLmhhc0hpdCA9IHRydWU7XG4gICAgdGhpcy5kb21FbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5kb21FbGVtZW50KTtcbiAgfVxuXG4gIGNoZWNrVmlld3BvcnQoKSB7XG4gICAgaWYoIWlzRWxlbWVudEluVmlld3BvcnQodGhpcy5kb21FbGVtZW50KSkge1xuICAgICAgdGhpcy5oYXNIaXQgPSB0cnVlO1xuICAgICAgdGhpcy5kb21FbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5kb21FbGVtZW50KTtcbiAgICAgIGNvbnNvbGUubG9nKFwiQnVsbGV0IGhhcyBsZWZ0IHZpZXdwb3J0ISFcIik7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgICAgdGhpcy5jaGVja1ZpZXdwb3J0KCk7XG4gICAgICB0aGlzLm1vdmVVcCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFJhbmRvbUNvbG9yKCkge1xuICAgIHZhciBsZXR0ZXJzID0gJzAxMjM0NTY3ODlBQkNERUYnLnNwbGl0KCcnKTtcbiAgICB2YXIgY29sb3IgPSAnIyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA2OyBpKysgKSB7XG4gICAgICAgIGNvbG9yICs9IGxldHRlcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTYpXTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbG9yO1xufVxuXG4vKlxuICogQ2hlY2sgaWYgZWxlbWVudCBpcyBpbiBjdXJyZW50IHZpZXdwb3J0XG4gKiBmcm9tOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS83NTU3NDMzLzQxODczMTJcbiAqL1xuZnVuY3Rpb24gaXNFbGVtZW50SW5WaWV3cG9ydCAoZWwpIHtcblxuICAgIHZhciByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICByZWN0LnRvcCA+PSAwICYmXG4gICAgICAgIHJlY3QubGVmdCA+PSAwICYmXG4gICAgICAgIHJlY3QuYm90dG9tIDw9ICh3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCkgJiYgLypvciAkKHdpbmRvdykuaGVpZ2h0KCkgKi9cbiAgICAgICAgcmVjdC5yaWdodCA8PSAod2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoKSAvKm9yICQod2luZG93KS53aWR0aCgpICovXG4gICAgKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCdWxsZXQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjb2xvciA9IHtcbiAgZGFyazoge1xuICAgIGJnOiBcIiMyODJDMzRcIixcbiAgICBmb250OiBcIiNBQ0IyQkVcIixcbiAgICBsaW5rczogXCIjQUNCMkJFXCIsXG4gICAgaW1wcmVzc3VtOiBcIiNBMkJENzhcIlxuICB9LFxuICBsaWdodCA6IHtcbiAgICAgIGJnOiBcIiNGRkZGRkZcIixcbiAgICAgIGxpbmtzOiBcIiM4QUIzNzdcIixcbiAgICAgIGltcHJlc3N1bTogXCIjQkM1MTQyXCIsXG4gICAgICBmb250OiBcIiMyODJDMzRcIlxuICB9XG59O1xuXG52YXIgZGFya01vZGUgPSBmYWxzZTtcblxuZnVuY3Rpb24gdG9nZ2xlKCkge1xuICBpZihkYXJrTW9kZSkge1xuICAgIHNldE1vZGUoXCJsaWdodG1vZGVcIik7XG4gICAgZGFya01vZGUgPSBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICBzZXRNb2RlKFwiZGFya21vZGVcIik7XG4gICAgZGFya01vZGUgPSB0cnVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldE1vZGUobW9kZSkge1xuICB2YXIgY29sb3JTY2hlbWU7XG4gIGlmKG1vZGUgPT09IFwiZGFya21vZGVcIikge1xuICAgIHNldERlYnVnKFwibGlnaHRtb2RlXCIpO1xuICAgIGNvbG9yU2NoZW1lID0gY29sb3IuZGFyaztcbiAgfSBlbHNlIHtcbiAgICBzZXREZWJ1ZyhcImRhcmttb2RlXCIpO1xuICAgIGNvbG9yU2NoZW1lID0gY29sb3IubGlnaHQ7XG4gIH1cblxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImltcHJlc3N1bVwiKS5zdHlsZS5jb2xvciA9IGNvbG9yU2NoZW1lLmltcHJlc3N1bTtcbiAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvclNjaGVtZS5iZztcbiAgZG9jdW1lbnQuYm9keS5zdHlsZS5jb2xvciA9IGNvbG9yU2NoZW1lLmZvbnQ7XG59XG5cbmZ1bmN0aW9uIHNldERlYnVnKG1lc3NhZ2UpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZWJ1Z1wiKS50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG59XG5cbnZhciBwZXJzaXN0ZW50ID0gZmFsc2U7XG52YXIgY2xpY2tlZCA9IDA7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVidWdcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgY2xpY2tlZCA9IG5ldyBEYXRlKCkuZ2V0SG91cnMoKTtcbiAgcGVyc2lzdGVudCA9IHRydWU7XG4gIHRvZ2dsZSgpO1xufSk7XG5cbnNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcblxuICB2YXIgaG91cnMgPSBuZXcgRGF0ZSgpLmdldEhvdXJzKCk7XG5cbiAgLyogRG9uJ3QgZG8gYW55dGhpbmcgaWYgdXNlciBoYXMgY2xpY2tlZCBzd2l0Y2ggbWFudWFsbHkgKi9cbiAgaWYocGVyc2lzdGVudCA9PT0gdHJ1ZSkgcmV0dXJuO1xuXG4gIGlmKGhvdXJzID49IDIwIHx8wqBob3VycyA8IDgpIHtcbiAgICBzZXRNb2RlKFwiZGFya21vZGVcIik7XG4gIH0gZWxzZSB7XG4gICAgc2V0TW9kZShcImxpZ2h0bW9kZVwiKTtcbiAgfVxufSwgMTAwMCk7XG5cbm1vZHVsZS5leHBvcnRzID0gdHJ1ZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFJvY2tldCA9IHJlcXVpcmUoJy4vUm9ja2V0Jyk7XG52YXIgQnVsbGV0ID0gcmVxdWlyZSgnLi9CdWxsZXQnKTtcbnZhciBUYXJnZXQgPSByZXF1aXJlKCcuL1RhcmdldCcpO1xudmFyIGtleXMgPSByZXF1aXJlKFwiLi9rZXlzLmpzXCIpO1xuXG5yZXF1aXJlKFwiLi9Db2xvck1vZGVcIik7XG5cbmNvbnN0IEZQUyA9IDYwO1xuY29uc3QgUk9DS0VUX0RPTV9JRCA9IFwicm9ja2V0XCI7XG5jb25zdCBCVUxMRVRfRE9NX0lEID0gXCJidWxsZXRDb250YWluZXJcIjtcbmNvbnN0IFRBUkdFVF9DT05UQUlORVJfSUQgPSBcInRhcmdldENvbnRhaW5lclwiO1xuY29uc3QgVEFSR0VUX1dSQVBfVEFHID0gXCJTUEFOXCI7XG5cbi8qXG4gKiBHYW1lTG9vcCBUdXRvcmlhbCB2b25cbiAqIGh0dHA6Ly9ub2thcm1hLm9yZy8yMDExLzAyLzAyL2phdmFzY3JpcHQtZ2FtZS1kZXZlbG9wbWVudC10aGUtZ2FtZS1sb29wL1xuICovXG5jbGFzcyBHYW1lIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5mcHMgPSBGUFM7XG4gICAgdGhpcy5yb2NrZXQgPSBuZXcgUm9ja2V0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFJPQ0tFVF9ET01fSUQpKTtcbiAgICB0aGlzLmJ1bGxldHMgPSBbXTtcbiAgICB0aGlzLnRhcmdldHMgPSB0aGlzLmluaXRUYXJnZXRzKCk7XG4gICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMucnVuLmJpbmQodGhpcyksIDEwMDAgLyB0aGlzLmZwcyk7XG4gIH1cblxuICBpbml0VGFyZ2V0cygpIHtcbiAgICBsZXQgYWxsVGV4dE5vZGVzID0gZ2V0VGV4dE5vZGVzKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFRBUkdFVF9DT05UQUlORVJfSUQpKTtcbiAgICBhbGxUZXh0Tm9kZXMuZm9yRWFjaCh0ZXh0Tm9kZSA9PiB3cmFwRWFjaENoYXJhY3Rlcih0ZXh0Tm9kZSwgVEFSR0VUX1dSQVBfVEFHKSk7XG4gICAgbGV0IHRhcmdldERvbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChUQVJHRVRfQ09OVEFJTkVSX0lEKS5nZXRFbGVtZW50c0J5VGFnTmFtZShUQVJHRVRfV1JBUF9UQUcpO1xuICAgIGxldCB0YXJnZXRzID0gW107XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHRhcmdldERvbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmKHRhcmdldERvbXNbaV0udGV4dENvbnRlbnQgIT09IFwiIFwiKSB7XG4gICAgICAgIHRhcmdldHMucHVzaChuZXcgVGFyZ2V0KHRhcmdldERvbXNbaV0pKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldHM7XG4gIH1cblxuICB1cGRhdGUoKSB7XG5cbiAgICAvKiBmaXJlIG5ldyBidWxsZXQgaWYgc3BhY2UgaXMgcHJlc3NlZCAqL1xuICAgIGlmKGtleXMuZ290Q2xpY2tlZChcInNwYWNlXCIpKSB7XG4gICAgICB2YXIgY29vcmRYID0gdGhpcy5yb2NrZXQuZ2V0Q29vcmRYKCk7XG4gICAgICB0aGlzLmJ1bGxldHMucHVzaChuZXcgQnVsbGV0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKEJVTExFVF9ET01fSUQpLCBjb29yZFgrMjUpKTtcbiAgICB9XG5cbiAgICAvKiB1cGRhdGUgYWxsIGdhbWUgZWxlbWVudHMgKi9cbiAgICB0aGlzLnJvY2tldC51cGRhdGUoKTtcbiAgICB0aGlzLmJ1bGxldHMuZm9yRWFjaChidWxsZXQgPT4gYnVsbGV0LnVwZGF0ZSgpKTtcbiAgICB0aGlzLnRhcmdldHMuZm9yRWFjaCh0YXJnZXQgPT4gdGFyZ2V0LnVwZGF0ZSgpKTtcblxuICAgIC8qIGNoZWNrIGZvciBoaXRzICovXG4gICAgdGhpcy5idWxsZXRzLmZvckVhY2goYnVsbGV0ID0+IHtcbiAgICAgIHRoaXMudGFyZ2V0cy5mb3JFYWNoKHRhcmdldCA9PiB7XG4gICAgICAgIGlmKGhpdCh0YXJnZXQuZG9tRWxlbWVudCwgYnVsbGV0LmRvbUVsZW1lbnQpKSB7XG4gICAgICAgICAgdGFyZ2V0LnNldElzSGl0KHRydWUpO1xuICAgICAgICAgIGJ1bGxldC5zZXRIYXNIaXQodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5idWxsZXRzID0gdGhpcy5idWxsZXRzLmZpbHRlcihidWxsZXQgPT4gIWJ1bGxldC5oYXNIaXQpO1xuICAgIHRoaXMudGFyZ2V0cyA9IHRoaXMudGFyZ2V0cy5maWx0ZXIodGFyZ2V0ID0+ICF0YXJnZXQuaXNIaXQpO1xuICB9XG5cbiAgc3RvcCgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICB9XG5cbiAgcnVuKCkge1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cbn1cblxuLyogc3RhcnQgZ2FtZSAqL1xubmV3IEdhbWUoKTtcblxuZnVuY3Rpb24gaGl0KG5vZGUxLCBub2RlMikge1xuICBpZihNYXRoLmFicyhub2RlMS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20gLSBub2RlMi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20pIDwgMTApIHtcbiAgICBpZihNYXRoLmFicyhub2RlMS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0IC0gbm9kZTIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCkgPCAxMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qKlxuICogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNTA2MjY5OFxuICogcmVjdXJzaXZlbHkgZ2V0IGFsbCB0ZXh0IG5vZGVzIGFzIGFuIGFycmF5IGZvciBhIGdpdmVuIGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gZ2V0VGV4dE5vZGVzKG5vZGUpIHtcbiAgICB2YXIgY2hpbGRUZXh0Tm9kZXMgPSBbXTtcblxuICAgIGlmICghbm9kZS5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBjaGlsZE5vZGVzID0gbm9kZS5jaGlsZE5vZGVzO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoY2hpbGROb2Rlc1tpXS5ub2RlVHlwZSA9PSBOb2RlLlRFWFRfTk9ERSkge1xuICAgICAgICAgICAgY2hpbGRUZXh0Tm9kZXMucHVzaChjaGlsZE5vZGVzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjaGlsZE5vZGVzW2ldLm5vZGVUeXBlID09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShjaGlsZFRleHROb2RlcywgZ2V0VGV4dE5vZGVzKGNoaWxkTm9kZXNbaV0pKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjaGlsZFRleHROb2Rlcztcbn1cblxuLyoqXG4gKiBnaXZlbiBhIHRleHQgbm9kZSwgd3JhcCBlYWNoIGNoYXJhY3RlciBpbiB0aGVcbiAqIGdpdmVuIHRhZy5cbiAqL1xuZnVuY3Rpb24gd3JhcEVhY2hDaGFyYWN0ZXIodGV4dE5vZGUsIHRhZykge1xuICAgIHZhciB0ZXh0ID0gdGV4dE5vZGUubm9kZVZhbHVlO1xuICAgIHZhciBwYXJlbnQgPSB0ZXh0Tm9kZS5wYXJlbnROb2RlO1xuXG4gICAgdmFyIGNoYXJhY3RlcnMgPSB0ZXh0LnNwbGl0KCcnKTtcbiAgICBjaGFyYWN0ZXJzLmZvckVhY2goZnVuY3Rpb24oY2hhcmFjdGVyKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgICAgICB2YXIgY2hhcmFjdGVyTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNoYXJhY3Rlcik7XG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hhcmFjdGVyTm9kZSk7XG5cbiAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShlbGVtZW50LCB0ZXh0Tm9kZSk7XG4gICAgfSk7XG5cbiAgICBwYXJlbnQucmVtb3ZlQ2hpbGQodGV4dE5vZGUpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIga2V5cyA9IHJlcXVpcmUoXCIuL2tleXMuanNcIik7XG5cbmNvbnN0IERJU1RBTkNFID0gMjtcblxuY2xhc3MgUm9ja2V0IHtcbiAgY29uc3RydWN0b3IoZG9tRWxlbWVudCkge1xuICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvbUVsZW1lbnQ7XG4gIH1cblxuICBtb3ZlTGVmdCgpIHtcbiAgICB2YXIgY29vcmRYID0gdGhpcy5nZXRDb29yZFgoKTtcbiAgICBpZihjb29yZFggPj0gNSkge1xuICAgICAgY29vcmRYID0gY29vcmRYIC09IERJU1RBTkNFO1xuICAgIH1cbiAgICB0aGlzLnNldENvb3JkWChjb29yZFgpO1xuICB9XG5cbiAgbW92ZVJpZ2h0KCkge1xuICAgIHZhciBjb29yZFggPSB0aGlzLmdldENvb3JkWCgpO1xuICAgIGNvb3JkWCA9IGNvb3JkWCArPSBESVNUQU5DRTtcbiAgICB0aGlzLnNldENvb3JkWChjb29yZFgpO1xuICB9XG5cbiAgZ2V0Q29vcmRYKCkge1xuICAgIHJldHVybiAodGhpcy5kb21FbGVtZW50LnN0eWxlLmxlZnQgPT09IFwiXCIpPyAwIDogcGFyc2VJbnQodGhpcy5kb21FbGVtZW50LnN0eWxlLmxlZnQpO1xuICB9XG5cbiAgc2V0Q29vcmRYKHZhbHVlKSB7XG4gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLmxlZnQgPSB2YWx1ZStcInB4XCI7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgaWYgKGtleXMuaXNQcmVzc2VkKFwibGVmdFwiKSkge1xuICAgICAgdGhpcy5tb3ZlTGVmdCgpO1xuICAgIH0gZWxzZSBpZiAoa2V5cy5pc1ByZXNzZWQoXCJyaWdodFwiKSkge1xuICAgICAgdGhpcy5tb3ZlUmlnaHQoKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSb2NrZXQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIFRhcmdldCB7XG4gIGNvbnN0cnVjdG9yKGRvbUVsZW1lbnQpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb21FbGVtZW50O1xuICAgIHRoaXMuaXNIaXQgPSBmYWxzZTtcbiAgfVxuXG4gIHNldElzSGl0KGlzSGl0KSB7XG4gICAgdGhpcy5kb21FbGVtZW50LnRleHRDb250ZW50ID0gXCJfXCI7XG4gICAgdGhpcy5pc0hpdCA9IGlzSGl0O1xuICB9XG5cbiAgdXBkYXRlKCkge1xuXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUYXJnZXQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBrZXljb2RlID0gcmVxdWlyZShcImtleWNvZGVcIik7XG5cbnZhciBkb3duS2V5cyA9IG5ldyBNYXAoKTtcbnZhciBjbGlja2VkS2V5cyA9IG5ldyBNYXAoKTtcblxubW9kdWxlLmV4cG9ydHMuaXNQcmVzc2VkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgdmFyIGNvZGUgPSBrZXljb2RlKG5hbWUpO1xuICByZXR1cm4gaXNQcmVzc2VkS2V5KGNvZGUpO1xufTtcblxubW9kdWxlLmV4cG9ydHMuZ290Q2xpY2tlZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHZhciBjb2RlID0ga2V5Y29kZShuYW1lKTtcbiAgcmV0dXJuIGdvdENsaWNrZWRLZXkoY29kZSk7XG59O1xuXG5kb2N1bWVudC5vbmtleWRvd24gPSBmdW5jdGlvbihldmVudCkge1xuICBkb3duS2V5cy5zZXQoZXZlbnQua2V5Q29kZSwgdHJ1ZSk7XG4gIGNsaWNrZWRLZXlzLnNldChldmVudC5rZXlDb2RlLCB0cnVlKTtcbn07XG5cbmRvY3VtZW50Lm9ua2V5dXAgPSBmdW5jdGlvbihldmVudCkge1xuICBkb3duS2V5cy5zZXQoZXZlbnQua2V5Q29kZSwgZmFsc2UpO1xufTtcblxuZnVuY3Rpb24gaXNQcmVzc2VkS2V5KGtleSkge1xuICBpZihkb3duS2V5cy5oYXMoa2V5KSkge1xuICAgIHJldHVybiBkb3duS2V5cy5nZXQoa2V5KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ290Q2xpY2tlZEtleShrZXkpIHtcbiAgaWYoY2xpY2tlZEtleXMuaGFzKGtleSkpIHtcbiAgICB2YXIgdmFsdWUgPSBjbGlja2VkS2V5cy5nZXQoa2V5KTtcbiAgICBjbGlja2VkS2V5cy5zZXQoa2V5LCBmYWxzZSk7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiLy8gU291cmNlOiBodHRwOi8vanNmaWRkbGUubmV0L3ZXeDhWL1xuLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81NjAzMTk1L2Z1bGwtbGlzdC1vZi1qYXZhc2NyaXB0LWtleWNvZGVzXG5cblxuXG4vKipcbiAqIENvbmVuaWVuY2UgbWV0aG9kIHJldHVybnMgY29ycmVzcG9uZGluZyB2YWx1ZSBmb3IgZ2l2ZW4ga2V5TmFtZSBvciBrZXlDb2RlLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IGtleUNvZGUge051bWJlcn0gb3Iga2V5TmFtZSB7U3RyaW5nfVxuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHNlYXJjaElucHV0KSB7XG4gIC8vIEtleWJvYXJkIEV2ZW50c1xuICBpZiAoc2VhcmNoSW5wdXQgJiYgJ29iamVjdCcgPT09IHR5cGVvZiBzZWFyY2hJbnB1dCkge1xuICAgIHZhciBoYXNLZXlDb2RlID0gc2VhcmNoSW5wdXQud2hpY2ggfHwgc2VhcmNoSW5wdXQua2V5Q29kZSB8fCBzZWFyY2hJbnB1dC5jaGFyQ29kZVxuICAgIGlmIChoYXNLZXlDb2RlKSBzZWFyY2hJbnB1dCA9IGhhc0tleUNvZGVcbiAgfVxuXG4gIC8vIE51bWJlcnNcbiAgaWYgKCdudW1iZXInID09PSB0eXBlb2Ygc2VhcmNoSW5wdXQpIHJldHVybiBuYW1lc1tzZWFyY2hJbnB1dF1cblxuICAvLyBFdmVyeXRoaW5nIGVsc2UgKGNhc3QgdG8gc3RyaW5nKVxuICB2YXIgc2VhcmNoID0gU3RyaW5nKHNlYXJjaElucHV0KVxuXG4gIC8vIGNoZWNrIGNvZGVzXG4gIHZhciBmb3VuZE5hbWVkS2V5ID0gY29kZXNbc2VhcmNoLnRvTG93ZXJDYXNlKCldXG4gIGlmIChmb3VuZE5hbWVkS2V5KSByZXR1cm4gZm91bmROYW1lZEtleVxuXG4gIC8vIGNoZWNrIGFsaWFzZXNcbiAgdmFyIGZvdW5kTmFtZWRLZXkgPSBhbGlhc2VzW3NlYXJjaC50b0xvd2VyQ2FzZSgpXVxuICBpZiAoZm91bmROYW1lZEtleSkgcmV0dXJuIGZvdW5kTmFtZWRLZXlcblxuICAvLyB3ZWlyZCBjaGFyYWN0ZXI/XG4gIGlmIChzZWFyY2gubGVuZ3RoID09PSAxKSByZXR1cm4gc2VhcmNoLmNoYXJDb2RlQXQoMClcblxuICByZXR1cm4gdW5kZWZpbmVkXG59XG5cbi8qKlxuICogR2V0IGJ5IG5hbWVcbiAqXG4gKiAgIGV4cG9ydHMuY29kZVsnZW50ZXInXSAvLyA9PiAxM1xuICovXG5cbnZhciBjb2RlcyA9IGV4cG9ydHMuY29kZSA9IGV4cG9ydHMuY29kZXMgPSB7XG4gICdiYWNrc3BhY2UnOiA4LFxuICAndGFiJzogOSxcbiAgJ2VudGVyJzogMTMsXG4gICdzaGlmdCc6IDE2LFxuICAnY3RybCc6IDE3LFxuICAnYWx0JzogMTgsXG4gICdwYXVzZS9icmVhayc6IDE5LFxuICAnY2FwcyBsb2NrJzogMjAsXG4gICdlc2MnOiAyNyxcbiAgJ3NwYWNlJzogMzIsXG4gICdwYWdlIHVwJzogMzMsXG4gICdwYWdlIGRvd24nOiAzNCxcbiAgJ2VuZCc6IDM1LFxuICAnaG9tZSc6IDM2LFxuICAnbGVmdCc6IDM3LFxuICAndXAnOiAzOCxcbiAgJ3JpZ2h0JzogMzksXG4gICdkb3duJzogNDAsXG4gICdpbnNlcnQnOiA0NSxcbiAgJ2RlbGV0ZSc6IDQ2LFxuICAnY29tbWFuZCc6IDkxLFxuICAncmlnaHQgY2xpY2snOiA5MyxcbiAgJ251bXBhZCAqJzogMTA2LFxuICAnbnVtcGFkICsnOiAxMDcsXG4gICdudW1wYWQgLSc6IDEwOSxcbiAgJ251bXBhZCAuJzogMTEwLFxuICAnbnVtcGFkIC8nOiAxMTEsXG4gICdudW0gbG9jayc6IDE0NCxcbiAgJ3Njcm9sbCBsb2NrJzogMTQ1LFxuICAnbXkgY29tcHV0ZXInOiAxODIsXG4gICdteSBjYWxjdWxhdG9yJzogMTgzLFxuICAnOyc6IDE4NixcbiAgJz0nOiAxODcsXG4gICcsJzogMTg4LFxuICAnLSc6IDE4OSxcbiAgJy4nOiAxOTAsXG4gICcvJzogMTkxLFxuICAnYCc6IDE5MixcbiAgJ1snOiAyMTksXG4gICdcXFxcJzogMjIwLFxuICAnXSc6IDIyMSxcbiAgXCInXCI6IDIyMixcbn1cblxuLy8gSGVscGVyIGFsaWFzZXNcblxudmFyIGFsaWFzZXMgPSBleHBvcnRzLmFsaWFzZXMgPSB7XG4gICd3aW5kb3dzJzogOTEsXG4gICfih6cnOiAxNixcbiAgJ+KMpSc6IDE4LFxuICAn4oyDJzogMTcsXG4gICfijJgnOiA5MSxcbiAgJ2N0bCc6IDE3LFxuICAnY29udHJvbCc6IDE3LFxuICAnb3B0aW9uJzogMTgsXG4gICdwYXVzZSc6IDE5LFxuICAnYnJlYWsnOiAxOSxcbiAgJ2NhcHMnOiAyMCxcbiAgJ3JldHVybic6IDEzLFxuICAnZXNjYXBlJzogMjcsXG4gICdzcGMnOiAzMixcbiAgJ3BndXAnOiAzMyxcbiAgJ3BnZG4nOiAzMyxcbiAgJ2lucyc6IDQ1LFxuICAnZGVsJzogNDYsXG4gICdjbWQnOiA5MVxufVxuXG5cbi8qIVxuICogUHJvZ3JhbWF0aWNhbGx5IGFkZCB0aGUgZm9sbG93aW5nXG4gKi9cblxuLy8gbG93ZXIgY2FzZSBjaGFyc1xuZm9yIChpID0gOTc7IGkgPCAxMjM7IGkrKykgY29kZXNbU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpIC0gMzJcblxuLy8gbnVtYmVyc1xuZm9yICh2YXIgaSA9IDQ4OyBpIDwgNTg7IGkrKykgY29kZXNbaSAtIDQ4XSA9IGlcblxuLy8gZnVuY3Rpb24ga2V5c1xuZm9yIChpID0gMTsgaSA8IDEzOyBpKyspIGNvZGVzWydmJytpXSA9IGkgKyAxMTFcblxuLy8gbnVtcGFkIGtleXNcbmZvciAoaSA9IDA7IGkgPCAxMDsgaSsrKSBjb2Rlc1snbnVtcGFkICcraV0gPSBpICsgOTZcblxuLyoqXG4gKiBHZXQgYnkgY29kZVxuICpcbiAqICAgZXhwb3J0cy5uYW1lWzEzXSAvLyA9PiAnRW50ZXInXG4gKi9cblxudmFyIG5hbWVzID0gZXhwb3J0cy5uYW1lcyA9IGV4cG9ydHMudGl0bGUgPSB7fSAvLyB0aXRsZSBmb3IgYmFja3dhcmQgY29tcGF0XG5cbi8vIENyZWF0ZSByZXZlcnNlIG1hcHBpbmdcbmZvciAoaSBpbiBjb2RlcykgbmFtZXNbY29kZXNbaV1dID0gaVxuXG4vLyBBZGQgYWxpYXNlc1xuZm9yICh2YXIgYWxpYXMgaW4gYWxpYXNlcykge1xuICBjb2Rlc1thbGlhc10gPSBhbGlhc2VzW2FsaWFzXVxufVxuIl19
