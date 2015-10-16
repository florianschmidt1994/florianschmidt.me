'use strict';

class Target {
  constructor(domElement) {
    this.domElement = domElement;
    this.isHit = false;
  }

  setIsHit(isHit) {
    this.domElement.textContent = "_";
    this.isHit = isHit;
  }

  update() {

  }
}

module.exports = Target;
