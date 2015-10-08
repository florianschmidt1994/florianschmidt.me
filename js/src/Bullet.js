'use strict';

var keys = require("./keys.js");

const DISTANCE = 2;

class Bullet {
  constructor(container, coordX) {
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

  moveLeft() {
    var coordX = this.getCoordX();
    if(coordX >= 5) {
      coordX = coordX -= DISTANCE;
    }
    this.setCoordX(coordX);
  }

  moveRight() {
    var coordX = this.getCoordX();
    coordX = coordX += DISTANCE;
    this.setCoordX(coordX);
  }

  moveUp() {
    var coordY = this.getCoordY();
    coordY = coordY += DISTANCE;
    this.setCoordY(coordY);
  }

  moveDown() {
    var coordY = this.getCoordY();
    coordY = coordY -= DISTANCE;
    this.setCoordY(coordY);
  }

  getCoordX() {
    return (this.domElement.style.left === "")? 0 : parseInt(this.domElement.style.left);
  }

  setCoordX(value) {
    this.domElement.style.left = value+"px";
  }

  getCoordY() {
    return (this.domElement.style.bottom === "")? 0 : parseInt(this.domElement.style.bottom);
  }

  setCoordY(value) {
    this.domElement.style.bottom = value+"px";
  }

  setHasHit() {
    this.hasHit = true;
    this.domElement.parentNode.removeChild(this.domElement);
  }

  checkViewport() {
    if(!isElementInViewport(this.domElement)) {
      this.hasHit = true;
      this.domElement.parentNode.removeChild(this.domElement);
      console.log("Bullet has left viewport!!");
    }
  }

  update() {
      this.checkViewport();
      this.moveUp();
  }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/*
 * Check if element is in current viewport
 * from: http://stackoverflow.com/a/7557433/4187312
 */
function isElementInViewport (el) {

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

module.exports = Bullet;
