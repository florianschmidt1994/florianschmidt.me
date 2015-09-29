'use strict';

var Rocket = require('./Rocket');

const FPS = 60;
const rocketDomID = "rocket";

/*
 * GameLoop Tutorial von
 * http://nokarma.org/2011/02/02/javascript-game-development-the-game-loop/
 */
class Game {
  constructor() {
    this.fps = FPS;
    this.rocket = new Rocket(document.getElementById(rocketDomID));
    this.interval = setInterval(this.run.bind(this), 1000 / this.fps);
  }

  update() {
    this.rocket.update();
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
