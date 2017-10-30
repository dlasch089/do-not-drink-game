'use strict';

function CreateGame()  {
  this.challenge = [
    ["Click 'left'!", "right", "left", "true", "false"],
    ["Click the button on the right!", "right", "left", "true", "false"],
    ["NaN is not equal to: ", "a number", "NaN", "false", "true"],
    ["Don't click any button!", "Why..", "..not?", "true", "true"],
    ["Press play!", "Play!", "|>", "false", "true"],
    ["Donald Trump is..", "..an asshole", "..not racist!", "false", "true"],
    ["Wait for Timeout!", "..2..", "..1..!", "true", "true"],
    ["CLICK:", " ", "HERE!", "true", "false"]
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
  divAround.appendChild(text);
  text.setAttribute('class', 'padding-startscreen');
  var startButton = document.createElement('button');
  startButton.innerHTML = "Let's Go!".toUpperCase();
  startButton.setAttribute('class', 'button');
  startButton.setAttribute('id', 'ghost-btn');


  divAround.appendChild(startButton);

  startButton.addEventListener('click', function() {
    game.startGame("startScreen");
  });
}


CreateGame.prototype.startGame = function(screenBefore) {
  if (screenBefore === "startScreen") {
    console.log("Let's start the Game!!");
    this.deleteStartScreen();
    this.buildGame();
    this.pickChallenge();
  } else if (this.challenge.length === 0) {
    this.gameWon();
  } else {
    deleteGame();
    this.buildGame();
    this.pickChallenge();
  }

};

CreateGame.prototype.deleteStartScreen = function() {
  var parent = document.getElementById('div-around');
  parent.remove();
};

CreateGame.prototype.buildGame = function() {
  this.showTimeOut();
  this.showChallenge();
  this.showScore();
  this.startTimeOut();
};

CreateGame.prototype.showTimeOut = function() {
  var timer = document.createElement('div');
  this.header.appendChild(timer);
  var numbers = document.createElement('p');
  numbers.innerHTML = this.timeOut;
  timer.setAttribute('class', 'round');
  numbers.setAttribute('id', 'timer');
  timer.appendChild(numbers);
  clearTimeout(this.endTimer); // to clear the timer and set it to 5 again
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


CreateGame.prototype.startTimeOut = function() {

  var timer = document.getElementById('timer');
  setInterval(function() {
    timer.innerText -= 1;
  }, 1000);
  this.endTimer = setTimeout(function() {
    gameOver();
  }, this.timeOut * 1200);

};

CreateGame.prototype.pickChallenge = function() {
  var randomNumber = Math.floor(Math.random() * game.challenge.length);
  var array = this.challenge;
  var challenge = this.challenge[randomNumber];

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
    console.log(array[3]);
    game.validateAnswer(array[3]);
  });
  this.buttonRight.addEventListener('click', function() {
    console.log(array[4]);
    game.validateAnswer(array[4]);
  });
};

CreateGame.prototype.validateAnswer = function(answer) {
  var validate = answer;
  if (validate === "true") {
    game.score += 1;
    this.startGame("gameBefore");
  } else {
    gameOver();
  }

};

function deleteGame() {
  game.header.innerHTML = "";
  game.main.innerHTML = "";
  game.footer.innerHTML = "";
}

function gameOver() {
  deleteGame();
  clearTimeout(game.endTimer);
  statusMessage("GameOver - go home!");
  // startScreen();
}

CreateGame.prototype.gameWon = function() {
  deleteGame();
  clearTimeout(game.endTimer);
  statusMessage("You're focused! Everybody raise their glasses!");
  //needs to be called when the array of challenges is empty (level 10)
};

function statusMessage(status) {
  var main = document.getElementById('main');
  var divAround = document.createElement('div');
  divAround.setAttribute('id', 'div-around');
  main.appendChild(divAround);
  var text = document.createElement('h1');
  text.setAttribute('class', 'padding-startscreen');
  text.innerHTML = ('' + status).toUpperCase();
  divAround.appendChild(text);
}
