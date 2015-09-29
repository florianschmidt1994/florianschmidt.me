'use strict';

var Rocket = require('./Rocket');
var Bullet = require('./Bullet');
var keys = require("./keys.js");

require("./ColorMode");

const FPS = 60;
const rocketDomID = "rocket";
const bulletDomID = "bullet";

/*
 * GameLoop Tutorial von
 * http://nokarma.org/2011/02/02/javascript-game-development-the-game-loop/
 */
class Game {
  constructor() {
    this.fps = FPS;
    this.rocket = new Rocket(document.getElementById(rocketDomID));
    this.bullets = new Set();
    this.interval = setInterval(this.run.bind(this), 1000 / this.fps);
  }

  update() {
    if(keys.isPressed("space")) {
      var coordX = this.rocket.getCoordX();
      this.bullets.add(new Bullet(document.getElementById(bulletDomID), coordX));
    }
    this.rocket.update();
    this.bullets.forEach(bullet => bullet.update());
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
