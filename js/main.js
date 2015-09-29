(function() {
'use strict';

var color = {

  dark: {
    bg: "#282C34",
    font: "#ACB2BE",
    links: "#ACB2BE",
    impressum: "#A2BD78"
  },

  light : {
      bg: "#FFFFFF",
      links: "#8AB377",
      impressum: "#BC5142",
      font: "#282C34"
  }
};

var darkMode = false;

function toggle() {
  if(darkMode) {
    setMode("lightmode");
    darkMode = false;
  } else {
    setMode("darkmode");
    darkMode = true;
  }
}

function setMode(mode) {
  var colorScheme;
  if(mode === "darkmode") {
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
  if(persistent === true) return;

  if(hours >= 20 || hours < 8) {
    setMode("darkmode");
  } else {
    setMode("lightmode");
  }
}, 1000);


function Rocket(domElem) {
  this.domElem = domElem;
}

Rocket.prototype.moveLeft = function() {
  var left = (this.domElem.style.left === "") ? 0 : parseInt(this.domElem.style.left);
  if(left >= 5) {
    left = left -= 2;
  }

  this.domElem.style.left = left+"px";
};

Rocket.prototype.moveRight = function() {
  var left = (this.domElem.style.left === "") ? 0 : parseInt(this.domElem.style.left);
  left = left += 2;
  this.domElem.style.left = left+"px";
};

Rocket.prototype.update = function() {
  if(isPressed());
};

var rocket = new Rocket(document.getElementById("rocket"));

/*
* http://nokarma.org/2011/02/02/javascript-game-development-the-game-loop/
*/
var Game = {};
Game.fps = 60;

Game.run = function () {
  Game.update();
  Game.draw();
};

Game.draw = function () {

};

Game.update = function () {
  if(isPressed(37)) {
    rocket.moveLeft();
  } else if (isPressed(39)) {
    rocket.moveRight();
  }
};

/* Start the game */
Game.interval = setInterval(Game.run, 1000 / Game.fps);

/* Stop the game */
// clearInterval(Game.interval);

var downKeys = {};
document.onkeydown = function(event) {
    downKeys[event.keyCode] = true;
};

document.onkeyup = function(event) {
  try {
    downKeys[event.keyCode] = false;
  } catch (err) {
  }
};

function isPressed(keyCode) {
  try {
    var res = downKeys[keyCode];
    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
}

})();
