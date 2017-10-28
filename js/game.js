'use strict';

function CreateGame()  {
  this.challenge = [
    ["Click 'left'!", "right", "left", "true", "false"]
  ];
  this.timeOut = 3;
  this.score = 0;
  this.header = document.getElementById('header');
  this.main = document.getElementById('main');
  this.footer = document.getElementById('footer');

}

function startScreen() {
  var main = document.getElementById('main');
  var divAround = document.createElement('div');
  divAround.setAttribute('id', 'div-around');
  main.appendChild(divAround);
  var text = document.createElement('h1');
  text.innerHTML = 'Do The Opposite!'.toUpperCase();
  text.setAttribute('class', 'padding-startscreen');
  var startButton = document.createElement('button');
  startButton.innerHTML = "Let's Go!".toUpperCase();
  startButton.setAttribute('class', 'button');
  startButton.setAttribute('id', 'ghost-btn');

  divAround.appendChild(text);
  divAround.appendChild(startButton);

  startButton.addEventListener('click', function() {
    game.startGame();
  });
}


CreateGame.prototype.startGame = function() {
  console.log("Let's start the Game!!");
  this.deleteStartScreen();
  this.buildGame();
  this.createChallenge(array);

};

CreateGame.prototype.deleteStartScreen = function() {
  var parent = document.getElementById('div-around');
  parent.remove();
};

CreateGame.prototype.buildGame = function() {
  this.showTimeOut();
  this.showChallenge();
  this.showScore();
};

CreateGame.prototype.showTimeOut = function() {
  var timer = document.createElement('div');
  this.header.appendChild(timer);
  var numbers = document.createElement('p');
  numbers.innerHTML = game.timeOut;
  timer.setAttribute('class', 'round');
  timer.setAttribute('id', 'timer');
  timer.appendChild(numbers);
}

CreateGame.prototype.showChallenge = function() {
  var command = document.createElement('h1');
  command.innerHTML = 'Long Command with placeholder!';
  this.main.appendChild(command);
  var action = document.createElement('div');
  action.setAttribute('id', 'action-section');
  this.main.appendChild(action);
  var buttonLeft = document.createElement('button');
  var buttonRight = document.createElement('button');
  buttonLeft.innerHTML = 'placeholder';
  buttonRight.innerHTML = 'placeholder';
  buttonLeft.setAttribute('id', 'ghost-btn');
  buttonRight.setAttribute('id', 'attention-btn');
  action.appendChild(buttonLeft);
  action.appendChild(buttonRight);
};

CreateGame.prototype.showScore = function() {
  var score = document.createElement('div');
  this.footer.appendChild(score);
  var numbers = document.createElement('p');
  numbers.innerHTML = game.score;
  score.setAttribute('class', 'round round-bottom');
  score.setAttribute('id', 'score');
  score.appendChild(numbers);
};

function startTimeOut() {

}



CreateGame.prototype.createChallenge = function(array) {
  this.action = document.getElementById('action-section')
  this.main.children[0].innerHTML = array[0];
  this.action.children[0].innerHTML = array[1];
  this.action.children[1].innerHTML = array[2];
};
