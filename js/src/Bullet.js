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
    this.visible = false;
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

  removeFromDOM() {
    this.visible = false;
    this.domElement.parentNode.removeChild(this.domElement);
  }

  update() {
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

module.exports = Bullet;
