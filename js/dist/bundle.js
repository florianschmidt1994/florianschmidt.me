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
        if (targetDoms[i].innerText !== " ") {
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
      this.domElement.innerText = "_";
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZmxvcmlhbnNjaG1pZHQvRGV2ZWxvcG1lbnQvZmxvcmlhbnNjaG1pZHQuY28udWsvanMvc3JjL0J1bGxldC5qcyIsIi9Vc2Vycy9mbG9yaWFuc2NobWlkdC9EZXZlbG9wbWVudC9mbG9yaWFuc2NobWlkdC5jby51ay9qcy9zcmMvQ29sb3JNb2RlLmpzIiwiL1VzZXJzL2Zsb3JpYW5zY2htaWR0L0RldmVsb3BtZW50L2Zsb3JpYW5zY2htaWR0LmNvLnVrL2pzL3NyYy9HYW1lLmpzIiwiL1VzZXJzL2Zsb3JpYW5zY2htaWR0L0RldmVsb3BtZW50L2Zsb3JpYW5zY2htaWR0LmNvLnVrL2pzL3NyYy9Sb2NrZXQuanMiLCIvVXNlcnMvZmxvcmlhbnNjaG1pZHQvRGV2ZWxvcG1lbnQvZmxvcmlhbnNjaG1pZHQuY28udWsvanMvc3JjL1RhcmdldC5qcyIsIi9Vc2Vycy9mbG9yaWFuc2NobWlkdC9EZXZlbG9wbWVudC9mbG9yaWFuc2NobWlkdC5jby51ay9qcy9zcmMva2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9rZXljb2RlL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFDOzs7Ozs7QUFFYixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7O0FBRWhDLElBQU0sUUFBUSxHQUFHLENBQUMsQ0FBQzs7SUFFYixNQUFNO0FBQ0MsV0FEUCxNQUFNLENBQ0UsU0FBUyxFQUFFLE1BQU0sRUFBRTswQkFEM0IsTUFBTTs7QUFFUixRQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDaEQsUUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2hELFFBQUksSUFBSSxHQUFHLFFBQVEs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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIga2V5cyA9IHJlcXVpcmUoXCIuL2tleXMuanNcIik7XG5cbmNvbnN0IERJU1RBTkNFID0gMjtcblxuY2xhc3MgQnVsbGV0IHtcbiAgY29uc3RydWN0b3IoY29udGFpbmVyLCBjb29yZFgpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMuZG9tRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImJ1bGxldFwiKTtcbiAgICB2YXIgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiKlwiKTtcbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLmJvdHRvbSA9IFwiMzBweFwiO1xuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS5jb2xvciA9IGdldFJhbmRvbUNvbG9yKCk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuZG9tRWxlbWVudCk7XG4gICAgdGhpcy5zZXRDb29yZFgoY29vcmRYKTtcbiAgICB0aGlzLmhhc0hpdCA9IGZhbHNlO1xuICB9XG5cbiAgbW92ZUxlZnQoKSB7XG4gICAgdmFyIGNvb3JkWCA9IHRoaXMuZ2V0Q29vcmRYKCk7XG4gICAgaWYoY29vcmRYID49IDUpIHtcbiAgICAgIGNvb3JkWCA9IGNvb3JkWCAtPSBESVNUQU5DRTtcbiAgICB9XG4gICAgdGhpcy5zZXRDb29yZFgoY29vcmRYKTtcbiAgfVxuXG4gIG1vdmVSaWdodCgpIHtcbiAgICB2YXIgY29vcmRYID0gdGhpcy5nZXRDb29yZFgoKTtcbiAgICBjb29yZFggPSBjb29yZFggKz0gRElTVEFOQ0U7XG4gICAgdGhpcy5zZXRDb29yZFgoY29vcmRYKTtcbiAgfVxuXG4gIG1vdmVVcCgpIHtcbiAgICB2YXIgY29vcmRZID0gdGhpcy5nZXRDb29yZFkoKTtcbiAgICBjb29yZFkgPSBjb29yZFkgKz0gRElTVEFOQ0U7XG4gICAgdGhpcy5zZXRDb29yZFkoY29vcmRZKTtcbiAgfVxuXG4gIG1vdmVEb3duKCkge1xuICAgIHZhciBjb29yZFkgPSB0aGlzLmdldENvb3JkWSgpO1xuICAgIGNvb3JkWSA9IGNvb3JkWSAtPSBESVNUQU5DRTtcbiAgICB0aGlzLnNldENvb3JkWShjb29yZFkpO1xuICB9XG5cbiAgZ2V0Q29vcmRYKCkge1xuICAgIHJldHVybiAodGhpcy5kb21FbGVtZW50LnN0eWxlLmxlZnQgPT09IFwiXCIpPyAwIDogcGFyc2VJbnQodGhpcy5kb21FbGVtZW50LnN0eWxlLmxlZnQpO1xuICB9XG5cbiAgc2V0Q29vcmRYKHZhbHVlKSB7XG4gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLmxlZnQgPSB2YWx1ZStcInB4XCI7XG4gIH1cblxuICBnZXRDb29yZFkoKSB7XG4gICAgcmV0dXJuICh0aGlzLmRvbUVsZW1lbnQuc3R5bGUuYm90dG9tID09PSBcIlwiKT8gMCA6IHBhcnNlSW50KHRoaXMuZG9tRWxlbWVudC5zdHlsZS5ib3R0b20pO1xuICB9XG5cbiAgc2V0Q29vcmRZKHZhbHVlKSB7XG4gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLmJvdHRvbSA9IHZhbHVlK1wicHhcIjtcbiAgfVxuXG4gIHNldEhhc0hpdCgpIHtcbiAgICB0aGlzLmhhc0hpdCA9IHRydWU7XG4gICAgdGhpcy5kb21FbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5kb21FbGVtZW50KTtcbiAgfVxuXG4gIGNoZWNrVmlld3BvcnQoKSB7XG4gICAgaWYoIWlzRWxlbWVudEluVmlld3BvcnQodGhpcy5kb21FbGVtZW50KSkge1xuICAgICAgdGhpcy5oYXNIaXQgPSB0cnVlO1xuICAgICAgdGhpcy5kb21FbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5kb21FbGVtZW50KTtcbiAgICAgIGNvbnNvbGUubG9nKFwiQnVsbGV0IGhhcyBsZWZ0IHZpZXdwb3J0ISFcIik7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgICAgdGhpcy5jaGVja1ZpZXdwb3J0KCk7XG4gICAgICB0aGlzLm1vdmVVcCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFJhbmRvbUNvbG9yKCkge1xuICAgIHZhciBsZXR0ZXJzID0gJzAxMjM0NTY3ODlBQkNERUYnLnNwbGl0KCcnKTtcbiAgICB2YXIgY29sb3IgPSAnIyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA2OyBpKysgKSB7XG4gICAgICAgIGNvbG9yICs9IGxldHRlcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTYpXTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbG9yO1xufVxuXG4vKlxuICogQ2hlY2sgaWYgZWxlbWVudCBpcyBpbiBjdXJyZW50IHZpZXdwb3J0XG4gKiBmcm9tOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS83NTU3NDMzLzQxODczMTJcbiAqL1xuZnVuY3Rpb24gaXNFbGVtZW50SW5WaWV3cG9ydCAoZWwpIHtcblxuICAgIHZhciByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICByZWN0LnRvcCA+PSAwICYmXG4gICAgICAgIHJlY3QubGVmdCA+PSAwICYmXG4gICAgICAgIHJlY3QuYm90dG9tIDw9ICh3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCkgJiYgLypvciAkKHdpbmRvdykuaGVpZ2h0KCkgKi9cbiAgICAgICAgcmVjdC5yaWdodCA8PSAod2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoKSAvKm9yICQod2luZG93KS53aWR0aCgpICovXG4gICAgKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCdWxsZXQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjb2xvciA9IHtcbiAgZGFyazoge1xuICAgIGJnOiBcIiMyODJDMzRcIixcbiAgICBmb250OiBcIiNBQ0IyQkVcIixcbiAgICBsaW5rczogXCIjQUNCMkJFXCIsXG4gICAgaW1wcmVzc3VtOiBcIiNBMkJENzhcIlxuICB9LFxuICBsaWdodCA6IHtcbiAgICAgIGJnOiBcIiNGRkZGRkZcIixcbiAgICAgIGxpbmtzOiBcIiM4QUIzNzdcIixcbiAgICAgIGltcHJlc3N1bTogXCIjQkM1MTQyXCIsXG4gICAgICBmb250OiBcIiMyODJDMzRcIlxuICB9XG59O1xuXG52YXIgZGFya01vZGUgPSBmYWxzZTtcblxuZnVuY3Rpb24gdG9nZ2xlKCkge1xuICBpZihkYXJrTW9kZSkge1xuICAgIHNldE1vZGUoXCJsaWdodG1vZGVcIik7XG4gICAgZGFya01vZGUgPSBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICBzZXRNb2RlKFwiZGFya21vZGVcIik7XG4gICAgZGFya01vZGUgPSB0cnVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldE1vZGUobW9kZSkge1xuICB2YXIgY29sb3JTY2hlbWU7XG4gIGlmKG1vZGUgPT09IFwiZGFya21vZGVcIikge1xuICAgIHNldERlYnVnKFwibGlnaHRtb2RlXCIpO1xuICAgIGNvbG9yU2NoZW1lID0gY29sb3IuZGFyaztcbiAgfSBlbHNlIHtcbiAgICBzZXREZWJ1ZyhcImRhcmttb2RlXCIpO1xuICAgIGNvbG9yU2NoZW1lID0gY29sb3IubGlnaHQ7XG4gIH1cblxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImltcHJlc3N1bVwiKS5zdHlsZS5jb2xvciA9IGNvbG9yU2NoZW1lLmltcHJlc3N1bTtcbiAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvclNjaGVtZS5iZztcbiAgZG9jdW1lbnQuYm9keS5zdHlsZS5jb2xvciA9IGNvbG9yU2NoZW1lLmZvbnQ7XG59XG5cbmZ1bmN0aW9uIHNldERlYnVnKG1lc3NhZ2UpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZWJ1Z1wiKS5pbm5lclRleHQgPSBtZXNzYWdlO1xufVxuXG52YXIgcGVyc2lzdGVudCA9IGZhbHNlO1xudmFyIGNsaWNrZWQgPSAwO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlYnVnXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gIGNsaWNrZWQgPSBuZXcgRGF0ZSgpLmdldEhvdXJzKCk7XG4gIHBlcnNpc3RlbnQgPSB0cnVlO1xuICB0b2dnbGUoKTtcbn0pO1xuXG5zZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIGhvdXJzID0gbmV3IERhdGUoKS5nZXRIb3VycygpO1xuXG4gIC8qIERvbid0IGRvIGFueXRoaW5nIGlmIHVzZXIgaGFzIGNsaWNrZWQgc3dpdGNoIG1hbnVhbGx5ICovXG4gIGlmKHBlcnNpc3RlbnQgPT09IHRydWUpIHJldHVybjtcblxuICBpZihob3VycyA+PSAyMCB8fMKgaG91cnMgPCA4KSB7XG4gICAgc2V0TW9kZShcImRhcmttb2RlXCIpO1xuICB9IGVsc2Uge1xuICAgIHNldE1vZGUoXCJsaWdodG1vZGVcIik7XG4gIH1cbn0sIDEwMDApO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRydWU7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBSb2NrZXQgPSByZXF1aXJlKCcuL1JvY2tldCcpO1xudmFyIEJ1bGxldCA9IHJlcXVpcmUoJy4vQnVsbGV0Jyk7XG52YXIgVGFyZ2V0ID0gcmVxdWlyZSgnLi9UYXJnZXQnKTtcbnZhciBrZXlzID0gcmVxdWlyZShcIi4va2V5cy5qc1wiKTtcblxucmVxdWlyZShcIi4vQ29sb3JNb2RlXCIpO1xuXG5jb25zdCBGUFMgPSA2MDtcbmNvbnN0IFJPQ0tFVF9ET01fSUQgPSBcInJvY2tldFwiO1xuY29uc3QgQlVMTEVUX0RPTV9JRCA9IFwiYnVsbGV0Q29udGFpbmVyXCI7XG5jb25zdCBUQVJHRVRfQ09OVEFJTkVSX0lEID0gXCJ0YXJnZXRDb250YWluZXJcIjtcbmNvbnN0IFRBUkdFVF9XUkFQX1RBRyA9IFwiU1BBTlwiO1xuXG4vKlxuICogR2FtZUxvb3AgVHV0b3JpYWwgdm9uXG4gKiBodHRwOi8vbm9rYXJtYS5vcmcvMjAxMS8wMi8wMi9qYXZhc2NyaXB0LWdhbWUtZGV2ZWxvcG1lbnQtdGhlLWdhbWUtbG9vcC9cbiAqL1xuY2xhc3MgR2FtZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZnBzID0gRlBTO1xuICAgIHRoaXMucm9ja2V0ID0gbmV3IFJvY2tldChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChST0NLRVRfRE9NX0lEKSk7XG4gICAgdGhpcy5idWxsZXRzID0gW107XG4gICAgdGhpcy50YXJnZXRzID0gdGhpcy5pbml0VGFyZ2V0cygpO1xuICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh0aGlzLnJ1bi5iaW5kKHRoaXMpLCAxMDAwIC8gdGhpcy5mcHMpO1xuICB9XG5cbiAgaW5pdFRhcmdldHMoKSB7XG4gICAgbGV0IGFsbFRleHROb2RlcyA9IGdldFRleHROb2Rlcyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZChUQVJHRVRfQ09OVEFJTkVSX0lEKSk7XG4gICAgYWxsVGV4dE5vZGVzLmZvckVhY2godGV4dE5vZGUgPT4gd3JhcEVhY2hDaGFyYWN0ZXIodGV4dE5vZGUsIFRBUkdFVF9XUkFQX1RBRykpO1xuICAgIGxldCB0YXJnZXREb21zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoVEFSR0VUX0NPTlRBSU5FUl9JRCkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoVEFSR0VUX1dSQVBfVEFHKTtcbiAgICBsZXQgdGFyZ2V0cyA9IFtdO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0YXJnZXREb21zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZih0YXJnZXREb21zW2ldLmlubmVyVGV4dCAhPT0gXCIgXCIpIHtcbiAgICAgICAgdGFyZ2V0cy5wdXNoKG5ldyBUYXJnZXQodGFyZ2V0RG9tc1tpXSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0cztcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcblxuICAgIC8qIGZpcmUgbmV3IGJ1bGxldCBpZiBzcGFjZSBpcyBwcmVzc2VkICovXG4gICAgaWYoa2V5cy5nb3RDbGlja2VkKFwic3BhY2VcIikpIHtcbiAgICAgIHZhciBjb29yZFggPSB0aGlzLnJvY2tldC5nZXRDb29yZFgoKTtcbiAgICAgIHRoaXMuYnVsbGV0cy5wdXNoKG5ldyBCdWxsZXQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoQlVMTEVUX0RPTV9JRCksIGNvb3JkWCsyNSkpO1xuICAgIH1cblxuICAgIC8qIHVwZGF0ZSBhbGwgZ2FtZSBlbGVtZW50cyAqL1xuICAgIHRoaXMucm9ja2V0LnVwZGF0ZSgpO1xuICAgIHRoaXMuYnVsbGV0cy5mb3JFYWNoKGJ1bGxldCA9PiBidWxsZXQudXBkYXRlKCkpO1xuICAgIHRoaXMudGFyZ2V0cy5mb3JFYWNoKHRhcmdldCA9PiB0YXJnZXQudXBkYXRlKCkpO1xuXG4gICAgLyogY2hlY2sgZm9yIGhpdHMgKi9cbiAgICB0aGlzLmJ1bGxldHMuZm9yRWFjaChidWxsZXQgPT4ge1xuICAgICAgdGhpcy50YXJnZXRzLmZvckVhY2godGFyZ2V0ID0+IHtcbiAgICAgICAgaWYoaGl0KHRhcmdldC5kb21FbGVtZW50LCBidWxsZXQuZG9tRWxlbWVudCkpIHtcbiAgICAgICAgICB0YXJnZXQuc2V0SXNIaXQodHJ1ZSk7XG4gICAgICAgICAgYnVsbGV0LnNldEhhc0hpdCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmJ1bGxldHMgPSB0aGlzLmJ1bGxldHMuZmlsdGVyKGJ1bGxldCA9PiAhYnVsbGV0Lmhhc0hpdCk7XG4gICAgdGhpcy50YXJnZXRzID0gdGhpcy50YXJnZXRzLmZpbHRlcih0YXJnZXQgPT4gIXRhcmdldC5pc0hpdCk7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gIH1cblxuICBydW4oKSB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxufVxuXG4vKiBzdGFydCBnYW1lICovXG5uZXcgR2FtZSgpO1xuXG5mdW5jdGlvbiBoaXQobm9kZTEsIG5vZGUyKSB7XG4gIGlmKE1hdGguYWJzKG5vZGUxLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbSAtIG5vZGUyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbSkgPCAxMCkge1xuICAgIGlmKE1hdGguYWJzKG5vZGUxLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgLSBub2RlMi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0KSA8IDEwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLyoqXG4gKiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS81MDYyNjk4XG4gKiByZWN1cnNpdmVseSBnZXQgYWxsIHRleHQgbm9kZXMgYXMgYW4gYXJyYXkgZm9yIGEgZ2l2ZW4gZWxlbWVudFxuICovXG5mdW5jdGlvbiBnZXRUZXh0Tm9kZXMobm9kZSkge1xuICAgIHZhciBjaGlsZFRleHROb2RlcyA9IFtdO1xuXG4gICAgaWYgKCFub2RlLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGNoaWxkTm9kZXMgPSBub2RlLmNoaWxkTm9kZXM7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChjaGlsZE5vZGVzW2ldLm5vZGVUeXBlID09IE5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICAgICAgICBjaGlsZFRleHROb2Rlcy5wdXNoKGNoaWxkTm9kZXNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNoaWxkTm9kZXNbaV0ubm9kZVR5cGUgPT0gTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGNoaWxkVGV4dE5vZGVzLCBnZXRUZXh0Tm9kZXMoY2hpbGROb2Rlc1tpXSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNoaWxkVGV4dE5vZGVzO1xufVxuXG4vKipcbiAqIGdpdmVuIGEgdGV4dCBub2RlLCB3cmFwIGVhY2ggY2hhcmFjdGVyIGluIHRoZVxuICogZ2l2ZW4gdGFnLlxuICovXG5mdW5jdGlvbiB3cmFwRWFjaENoYXJhY3Rlcih0ZXh0Tm9kZSwgdGFnKSB7XG4gICAgdmFyIHRleHQgPSB0ZXh0Tm9kZS5ub2RlVmFsdWU7XG4gICAgdmFyIHBhcmVudCA9IHRleHROb2RlLnBhcmVudE5vZGU7XG5cbiAgICB2YXIgY2hhcmFjdGVycyA9IHRleHQuc3BsaXQoJycpO1xuICAgIGNoYXJhY3RlcnMuZm9yRWFjaChmdW5jdGlvbihjaGFyYWN0ZXIpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgICAgIHZhciBjaGFyYWN0ZXJOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY2hhcmFjdGVyKTtcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjaGFyYWN0ZXJOb2RlKTtcblxuICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKGVsZW1lbnQsIHRleHROb2RlKTtcbiAgICB9KTtcblxuICAgIHBhcmVudC5yZW1vdmVDaGlsZCh0ZXh0Tm9kZSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBrZXlzID0gcmVxdWlyZShcIi4va2V5cy5qc1wiKTtcblxuY29uc3QgRElTVEFOQ0UgPSAyO1xuXG5jbGFzcyBSb2NrZXQge1xuICBjb25zdHJ1Y3Rvcihkb21FbGVtZW50KSB7XG4gICAgdGhpcy5kb21FbGVtZW50ID0gZG9tRWxlbWVudDtcbiAgfVxuXG4gIG1vdmVMZWZ0KCkge1xuICAgIHZhciBjb29yZFggPSB0aGlzLmdldENvb3JkWCgpO1xuICAgIGlmKGNvb3JkWCA+PSA1KSB7XG4gICAgICBjb29yZFggPSBjb29yZFggLT0gRElTVEFOQ0U7XG4gICAgfVxuICAgIHRoaXMuc2V0Q29vcmRYKGNvb3JkWCk7XG4gIH1cblxuICBtb3ZlUmlnaHQoKSB7XG4gICAgdmFyIGNvb3JkWCA9IHRoaXMuZ2V0Q29vcmRYKCk7XG4gICAgY29vcmRYID0gY29vcmRYICs9IERJU1RBTkNFO1xuICAgIHRoaXMuc2V0Q29vcmRYKGNvb3JkWCk7XG4gIH1cblxuICBnZXRDb29yZFgoKSB7XG4gICAgcmV0dXJuICh0aGlzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCA9PT0gXCJcIik/IDAgOiBwYXJzZUludCh0aGlzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCk7XG4gIH1cblxuICBzZXRDb29yZFgodmFsdWUpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCA9IHZhbHVlK1wicHhcIjtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBpZiAoa2V5cy5pc1ByZXNzZWQoXCJsZWZ0XCIpKSB7XG4gICAgICB0aGlzLm1vdmVMZWZ0KCk7XG4gICAgfSBlbHNlIGlmIChrZXlzLmlzUHJlc3NlZChcInJpZ2h0XCIpKSB7XG4gICAgICB0aGlzLm1vdmVSaWdodCgpO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvY2tldDtcbiIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgVGFyZ2V0IHtcbiAgY29uc3RydWN0b3IoZG9tRWxlbWVudCkge1xuICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvbUVsZW1lbnQ7XG4gICAgdGhpcy5pc0hpdCA9IGZhbHNlO1xuICB9XG5cbiAgc2V0SXNIaXQoaXNIaXQpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQuaW5uZXJUZXh0ID0gXCJfXCI7XG4gICAgdGhpcy5pc0hpdCA9IGlzSGl0O1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIFxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVGFyZ2V0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIga2V5Y29kZSA9IHJlcXVpcmUoXCJrZXljb2RlXCIpO1xuXG52YXIgZG93bktleXMgPSBuZXcgTWFwKCk7XG52YXIgY2xpY2tlZEtleXMgPSBuZXcgTWFwKCk7XG5cbm1vZHVsZS5leHBvcnRzLmlzUHJlc3NlZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHZhciBjb2RlID0ga2V5Y29kZShuYW1lKTtcbiAgcmV0dXJuIGlzUHJlc3NlZEtleShjb2RlKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzLmdvdENsaWNrZWQgPSBmdW5jdGlvbiAobmFtZSkge1xuICB2YXIgY29kZSA9IGtleWNvZGUobmFtZSk7XG4gIHJldHVybiBnb3RDbGlja2VkS2V5KGNvZGUpO1xufTtcblxuZG9jdW1lbnQub25rZXlkb3duID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgZG93bktleXMuc2V0KGV2ZW50LmtleUNvZGUsIHRydWUpO1xuICBjbGlja2VkS2V5cy5zZXQoZXZlbnQua2V5Q29kZSwgdHJ1ZSk7XG59O1xuXG5kb2N1bWVudC5vbmtleXVwID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgZG93bktleXMuc2V0KGV2ZW50LmtleUNvZGUsIGZhbHNlKTtcbn07XG5cbmZ1bmN0aW9uIGlzUHJlc3NlZEtleShrZXkpIHtcbiAgaWYoZG93bktleXMuaGFzKGtleSkpIHtcbiAgICByZXR1cm4gZG93bktleXMuZ2V0KGtleSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdvdENsaWNrZWRLZXkoa2V5KSB7XG4gIGlmKGNsaWNrZWRLZXlzLmhhcyhrZXkpKSB7XG4gICAgdmFyIHZhbHVlID0gY2xpY2tlZEtleXMuZ2V0KGtleSk7XG4gICAgY2xpY2tlZEtleXMuc2V0KGtleSwgZmFsc2UpO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsIi8vIFNvdXJjZTogaHR0cDovL2pzZmlkZGxlLm5ldC92V3g4Vi9cbi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTYwMzE5NS9mdWxsLWxpc3Qtb2YtamF2YXNjcmlwdC1rZXljb2Rlc1xuXG5cblxuLyoqXG4gKiBDb25lbmllbmNlIG1ldGhvZCByZXR1cm5zIGNvcnJlc3BvbmRpbmcgdmFsdWUgZm9yIGdpdmVuIGtleU5hbWUgb3Iga2V5Q29kZS5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSBrZXlDb2RlIHtOdW1iZXJ9IG9yIGtleU5hbWUge1N0cmluZ31cbiAqIEByZXR1cm4ge01peGVkfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzZWFyY2hJbnB1dCkge1xuICAvLyBLZXlib2FyZCBFdmVudHNcbiAgaWYgKHNlYXJjaElucHV0ICYmICdvYmplY3QnID09PSB0eXBlb2Ygc2VhcmNoSW5wdXQpIHtcbiAgICB2YXIgaGFzS2V5Q29kZSA9IHNlYXJjaElucHV0LndoaWNoIHx8IHNlYXJjaElucHV0LmtleUNvZGUgfHwgc2VhcmNoSW5wdXQuY2hhckNvZGVcbiAgICBpZiAoaGFzS2V5Q29kZSkgc2VhcmNoSW5wdXQgPSBoYXNLZXlDb2RlXG4gIH1cblxuICAvLyBOdW1iZXJzXG4gIGlmICgnbnVtYmVyJyA9PT0gdHlwZW9mIHNlYXJjaElucHV0KSByZXR1cm4gbmFtZXNbc2VhcmNoSW5wdXRdXG5cbiAgLy8gRXZlcnl0aGluZyBlbHNlIChjYXN0IHRvIHN0cmluZylcbiAgdmFyIHNlYXJjaCA9IFN0cmluZyhzZWFyY2hJbnB1dClcblxuICAvLyBjaGVjayBjb2Rlc1xuICB2YXIgZm91bmROYW1lZEtleSA9IGNvZGVzW3NlYXJjaC50b0xvd2VyQ2FzZSgpXVxuICBpZiAoZm91bmROYW1lZEtleSkgcmV0dXJuIGZvdW5kTmFtZWRLZXlcblxuICAvLyBjaGVjayBhbGlhc2VzXG4gIHZhciBmb3VuZE5hbWVkS2V5ID0gYWxpYXNlc1tzZWFyY2gudG9Mb3dlckNhc2UoKV1cbiAgaWYgKGZvdW5kTmFtZWRLZXkpIHJldHVybiBmb3VuZE5hbWVkS2V5XG5cbiAgLy8gd2VpcmQgY2hhcmFjdGVyP1xuICBpZiAoc2VhcmNoLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHNlYXJjaC5jaGFyQ29kZUF0KDApXG5cbiAgcmV0dXJuIHVuZGVmaW5lZFxufVxuXG4vKipcbiAqIEdldCBieSBuYW1lXG4gKlxuICogICBleHBvcnRzLmNvZGVbJ2VudGVyJ10gLy8gPT4gMTNcbiAqL1xuXG52YXIgY29kZXMgPSBleHBvcnRzLmNvZGUgPSBleHBvcnRzLmNvZGVzID0ge1xuICAnYmFja3NwYWNlJzogOCxcbiAgJ3RhYic6IDksXG4gICdlbnRlcic6IDEzLFxuICAnc2hpZnQnOiAxNixcbiAgJ2N0cmwnOiAxNyxcbiAgJ2FsdCc6IDE4LFxuICAncGF1c2UvYnJlYWsnOiAxOSxcbiAgJ2NhcHMgbG9jayc6IDIwLFxuICAnZXNjJzogMjcsXG4gICdzcGFjZSc6IDMyLFxuICAncGFnZSB1cCc6IDMzLFxuICAncGFnZSBkb3duJzogMzQsXG4gICdlbmQnOiAzNSxcbiAgJ2hvbWUnOiAzNixcbiAgJ2xlZnQnOiAzNyxcbiAgJ3VwJzogMzgsXG4gICdyaWdodCc6IDM5LFxuICAnZG93bic6IDQwLFxuICAnaW5zZXJ0JzogNDUsXG4gICdkZWxldGUnOiA0NixcbiAgJ2NvbW1hbmQnOiA5MSxcbiAgJ3JpZ2h0IGNsaWNrJzogOTMsXG4gICdudW1wYWQgKic6IDEwNixcbiAgJ251bXBhZCArJzogMTA3LFxuICAnbnVtcGFkIC0nOiAxMDksXG4gICdudW1wYWQgLic6IDExMCxcbiAgJ251bXBhZCAvJzogMTExLFxuICAnbnVtIGxvY2snOiAxNDQsXG4gICdzY3JvbGwgbG9jayc6IDE0NSxcbiAgJ215IGNvbXB1dGVyJzogMTgyLFxuICAnbXkgY2FsY3VsYXRvcic6IDE4MyxcbiAgJzsnOiAxODYsXG4gICc9JzogMTg3LFxuICAnLCc6IDE4OCxcbiAgJy0nOiAxODksXG4gICcuJzogMTkwLFxuICAnLyc6IDE5MSxcbiAgJ2AnOiAxOTIsXG4gICdbJzogMjE5LFxuICAnXFxcXCc6IDIyMCxcbiAgJ10nOiAyMjEsXG4gIFwiJ1wiOiAyMjIsXG59XG5cbi8vIEhlbHBlciBhbGlhc2VzXG5cbnZhciBhbGlhc2VzID0gZXhwb3J0cy5hbGlhc2VzID0ge1xuICAnd2luZG93cyc6IDkxLFxuICAn4oenJzogMTYsXG4gICfijKUnOiAxOCxcbiAgJ+KMgyc6IDE3LFxuICAn4oyYJzogOTEsXG4gICdjdGwnOiAxNyxcbiAgJ2NvbnRyb2wnOiAxNyxcbiAgJ29wdGlvbic6IDE4LFxuICAncGF1c2UnOiAxOSxcbiAgJ2JyZWFrJzogMTksXG4gICdjYXBzJzogMjAsXG4gICdyZXR1cm4nOiAxMyxcbiAgJ2VzY2FwZSc6IDI3LFxuICAnc3BjJzogMzIsXG4gICdwZ3VwJzogMzMsXG4gICdwZ2RuJzogMzMsXG4gICdpbnMnOiA0NSxcbiAgJ2RlbCc6IDQ2LFxuICAnY21kJzogOTFcbn1cblxuXG4vKiFcbiAqIFByb2dyYW1hdGljYWxseSBhZGQgdGhlIGZvbGxvd2luZ1xuICovXG5cbi8vIGxvd2VyIGNhc2UgY2hhcnNcbmZvciAoaSA9IDk3OyBpIDwgMTIzOyBpKyspIGNvZGVzW1N0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaSAtIDMyXG5cbi8vIG51bWJlcnNcbmZvciAodmFyIGkgPSA0ODsgaSA8IDU4OyBpKyspIGNvZGVzW2kgLSA0OF0gPSBpXG5cbi8vIGZ1bmN0aW9uIGtleXNcbmZvciAoaSA9IDE7IGkgPCAxMzsgaSsrKSBjb2Rlc1snZicraV0gPSBpICsgMTExXG5cbi8vIG51bXBhZCBrZXlzXG5mb3IgKGkgPSAwOyBpIDwgMTA7IGkrKykgY29kZXNbJ251bXBhZCAnK2ldID0gaSArIDk2XG5cbi8qKlxuICogR2V0IGJ5IGNvZGVcbiAqXG4gKiAgIGV4cG9ydHMubmFtZVsxM10gLy8gPT4gJ0VudGVyJ1xuICovXG5cbnZhciBuYW1lcyA9IGV4cG9ydHMubmFtZXMgPSBleHBvcnRzLnRpdGxlID0ge30gLy8gdGl0bGUgZm9yIGJhY2t3YXJkIGNvbXBhdFxuXG4vLyBDcmVhdGUgcmV2ZXJzZSBtYXBwaW5nXG5mb3IgKGkgaW4gY29kZXMpIG5hbWVzW2NvZGVzW2ldXSA9IGlcblxuLy8gQWRkIGFsaWFzZXNcbmZvciAodmFyIGFsaWFzIGluIGFsaWFzZXMpIHtcbiAgY29kZXNbYWxpYXNdID0gYWxpYXNlc1thbGlhc11cbn1cbiJdfQ==
