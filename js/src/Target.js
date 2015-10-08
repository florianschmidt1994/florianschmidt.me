'use strict';

class Target {
  constructor(domElement) {
    this.domElement = domElement;
    this.isHit = false;
  }

  setIsHit(isHit) {
    this.domElement.innerText = "_";
    this.isHit = isHit;
  }

  update() {
    
  }
}

module.exports = Target;
