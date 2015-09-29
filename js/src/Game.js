'use strict';

var Rocket = require('./Rocket');
var Bullet = require('./Bullet');
var keys = require("./keys.js");

require("./ColorMode");

const FPS = 60;
const rocketDomID = "rocket";
const bulletDomID = "bulletContainer";

let bulletCounter = 0;
/*
 * GameLoop Tutorial von
 * http://nokarma.org/2011/02/02/javascript-game-development-the-game-loop/
 */
class Game {
  constructor() {
    this.fps = FPS;
    this.rocket = new Rocket(document.getElementById(rocketDomID));
    this.bullets = new Map();
    this.interval = setInterval(this.run.bind(this), 1000 / this.fps);
  }

  update() {
    if(keys.gotClicked("space")) {
      var coordX = this.rocket.getCoordX();
      this.bullets.set("bullet"+bulletCounter, new Bullet(document.getElementById(bulletDomID), coordX+25));
      bulletCounter++;
    }
    this.rocket.update();
    this.bullets.forEach(function (value, key) {
      value.update();
    });
  }

  stop() {
    clearInterval(this.interval);
  }

  run() {
    this.update();
  }
}

/* start game */
new Game();
