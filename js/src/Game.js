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
    modifyHTML();
  }

  update() {
    if(keys.gotClicked("space")) {
      var coordX = this.rocket.getCoordX();
      this.bullets.set("bullet"+bulletCounter, new Bullet(document.getElementById(bulletDomID), coordX+25));
      bulletCounter++;
    }
    this.rocket.update();

    let toBeDeleted = new Set();

    this.bullets.forEach(function (value, key) {

      value.update();

      if(!isElementInViewport(value.domElement)) {
        console.log("element left viewport");
        toBeDeleted.add(key);
        return;
      }

      var targets = document.getElementById('targetContainer').getElementsByTagName('span');
      for(var i = 0; i < targets.length; i++) {
        if(targets[i].innerText !== " " && targets[i].innerText !== "_") {
          if(hit(targets[i], value.domElement)) {
            targets[i].innerText = "_";
            toBeDeleted.add(key);
          }
        }
      }
    });

    toBeDeleted.forEach(key => {
      let bullet = this.bullets.get(key);
      bullet.domElement.innerText = "";
    });

    toBeDeleted.forEach(key => this.bullets.delete(key));
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


function hit(node1, node2) {
  if(Math.abs(node1.getBoundingClientRect().bottom - node2.getBoundingClientRect().bottom) < 10) {
    if(Math.abs(node1.getBoundingClientRect().left - node2.getBoundingClientRect().left) < 10) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
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
        }
        else if (childNodes[i].nodeType == Node.ELEMENT_NODE) {
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
    characters.forEach(function(character) {
        var element = document.createElement(tag);
        var characterNode = document.createTextNode(character);
        element.appendChild(characterNode);

        parent.insertBefore(element, textNode);
    });

    parent.removeChild(textNode);
}

function modifyHTML() {
  var allTextNodes = getTextNodes(document.getElementById("targetContainer"));
  allTextNodes.forEach(textNode => wrapEachCharacter(textNode, 'span'));
}
