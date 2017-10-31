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
    ["CLICK:", " ", "HERE!", "true", "false"],
    ["Press the Ghost-Button!", "Ghost", "Ghost", "false", "true"],
    ["Click opposite of 'right'", "left ", "right", "false", "true"],
  ];
  this.challengeLength = this.challenge.length;
  this.timeOut = 3;
  this.score = 0;
  this.header = document.getElementById('header');
  this.main = document.getElementById('main');
  this.footer = document.getElementById('footer');

}

function rules() {
  console.log('The rules are easy!');
}

function startScreen() {
  var self = this;
  var main = document.getElementById('main');
  var divAround = document.createElement('div');
  divAround.setAttribute('id', 'div-around');
  main.appendChild(divAround);
  // Display the name of the Game:
  var text = document.createElement('h1');
  text.innerHTML = 'Do The Opposite!'.toUpperCase();
  text.setAttribute('class', 'padding-startscreen');
  divAround.appendChild(text);
  // Display the Start-Button:
  var startButton = document.createElement('button');
  startButton.innerHTML = "Let's Go!".toUpperCase();
  startButton.setAttribute('class', 'button');
  startButton.setAttribute('id', 'attention-btn');
  divAround.appendChild(startButton);
  // Display the Rules-Button:
  var resetButton = document.createElement('button');
  resetButton.innerHTML = "Rules".toUpperCase();
  resetButton.setAttribute('class', 'button');
  resetButton.setAttribute('id', 'ghost-btn');
  divAround.appendChild(resetButton);
  //Add Click-Events:
  startButton.addEventListener('click', function() {
    getReady();
  });

  resetButton.addEventListener('click', function() {
    rules();
  });
}



function getReady() {
  deleteGame();
  var getReadyNumbers = document.createElement('h1');
  // getReadyNumbers.setAttribute('class', 'padding-startscreen');
  getReadyNumbers.setAttribute('class', 'getReady');
  getReadyNumbers.innerText = 3;
  game.main.appendChild(getReadyNumbers);
  var reminder = document.createElement('h1');
  // reminder.setAttribute('class', 'padding-startscreen');
  reminder.innerText = 'DO THE OPPOSITE!';
  game.main.appendChild(reminder);
  setInterval(function() {
    getReadyNumbers.innerText -= 1;
  }, 1000);
  setTimeout(function() {
    game.startGame("startScreen");
  }, 3000);

}

CreateGame.prototype.startGame = function(screenBefore) {
  if (screenBefore === "startScreen") {
    console.log("Let's start the Game!!");
    deleteGame();
    this.buildGame();
    this.copyChallenge(); //Copies the Challenge-Array (for the reset)
    this.pickChallenge();
  } else if (this.challengeCopy.length === 0) {
    this.gameWon();
  } else {
    deleteGame();
    this.buildGame();
    this.pickChallenge();
  }
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
};

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
  var scoreSection = document.createElement('div');
  scoreSection.setAttribute('id', 'score');
  scoreSection.setAttribute('class', 'fadeInOut');
  this.footer.appendChild(scoreSection);
  var scoreTitle = document.createElement('p');
  scoreTitle.innerHTML = 'level: ';
  scoreSection.appendChild(scoreTitle);
  scoreSection.appendChild(scoreTitle);
  var numbers = document.createElement('p');
  numbers.innerHTML = game.score;
  scoreSection.appendChild(numbers);
  var levels = document.createElement('p');
  levels.innerHTML = ' /' + this.challengeLength;
  scoreSection.appendChild(levels);
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

  var resetButton = document.createElement('button');
  resetButton.innerHTML = "Play again?".toUpperCase();
  resetButton.setAttribute('class', 'button');
  resetButton.setAttribute('id', 'ghost-btn');
  divAround.appendChild(resetButton);
  resetButton.addEventListener('click', function() {
    deleteGame();
    game.resetScore();
    getReady();
  });
}

CreateGame.prototype.resetScore = function() {
  this.score = 0;
};
