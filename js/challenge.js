'use strict';

CreateGame.prototype.copyChallenge = function() {
  this.challengeCopy = this.challenge.slice();
};

CreateGame.prototype.pickChallenge = function() {
  var randomNumber = Math.floor(Math.random() * game.challengeCopy.length);
  var array = this.challengeCopy;
  var challenge = this.challengeCopy[randomNumber];

  this.createChallenge(challenge);
  array.splice(randomNumber, 1);
};

CreateGame.prototype.createChallenge = function(array) {
  this.action = document.getElementById('action-section');
  this.buttonLeft = this.action.children[0];
  this.buttonRight = this.action.children[1];
  this.main.children[0].innerHTML = array[0];
  this.buttonLeft.innerHTML = array[1];
  this.buttonRight.innerHTML = array[2];

  this.buttonLeft.addEventListener('click', function() {
    // console.log(array[3]);
    game.validateAnswer(array[3]);
  });
  this.buttonRight.addEventListener('click', function() {
    // console.log(array[4]);
    game.validateAnswer(array[4]);
  });
};