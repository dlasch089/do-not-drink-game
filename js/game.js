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
  this.numberOfLevels = 5;
  this.header = document.getElementById('header');
  this.main = document.getElementById('main');
  this.footer = document.getElementById('footer');
  this.container = document.getElementById('container');
  this.wonMemes = ['https://giphy.com/embed/QdXfVLeFgNvG',
    'https://giphy.com/embed/aurUBBayxC55m',
    'https://giphy.com/embed/7rWx2wzFOPZEQ',
    "https://giphy.com/embed/J0ySNzZ5APILC",
    "https://giphy.com/embed/5MDk34NOY6ili"
  ];
  this.lostMemes = ['https://giphy.com/embed/26xBwu0ZZVWbG7gA0',
    "https://giphy.com/embed/AwkqAwhwqGzg4",
    "https://giphy.com/embed/3ohfFp1ureujZgWSVa",
    "https://giphy.com/embed/MyU87LnclCPhS",
    "https://giphy.com/embed/1ryrwFNXqNjC8"
  ];
  this.successSound = new Audio("sounds/success-button.mp3");
  this.failSound = new Audio("sounds/fail-button.mp3");
}

CreateGame.prototype.startGame = function(screenBefore) {
  if (screenBefore === "startScreen") {
    console.log("Let's start the Game!!");
    this.deleteGame();
    this.buildGame();
    this.copyChallenge(); //Copies the Challenge-Array (for the reset)
    this.pickChallenge();
  } else if (this.score === this.numberOfLevels) {
    this.gameWon();
  } else {
    this.deleteGame();
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
  numbers.innerHTML = this.score;
  scoreSection.appendChild(numbers);
  var levels = document.createElement('p');
  levels.innerHTML = ' /' + this.numberOfLevels;
  scoreSection.appendChild(levels);
};


CreateGame.prototype.startTimeOut = function() {
  var self = this;
  var timer = document.getElementById('timer');
  setInterval(function() {
    timer.innerText -= 1;
  }, 1000);
  this.endTimer = setTimeout(function() {
    self.gameOver();
  }, this.timeOut * 1200);
};

CreateGame.prototype.validateAnswer = function(answer) {
  var self = this;
  var validate = answer;
  if (validate === "true") {
    this.main.children[0].setAttribute('class', 'true-answer');
    this.score += 1;
    self.successSound.currentTime = 0;
    self.successSound.play();
    setTimeout(function() {
      self.startGame("gameBefore");
    }, 80);

  } else {
    this.main.children[0].setAttribute('class', 'false-answer');
    this.score += 1;
    self.failSound.currentTime = 0;
    self.failSound.play();
    setTimeout(function() {
      self.gameOver();
    }, 800);

  }
};

CreateGame.prototype.deleteGame = function() {
  this.header.innerHTML = "";
  this.main.innerHTML = "";
  this.footer.innerHTML = "";
};

CreateGame.prototype.gameOver = function() {
  this.deleteGame();
  clearTimeout(this.endTimer);
  this.pickMeme(this.lostMemes);
  this.statusMessage("GameOver - go home!");
  // startScreen();
};

CreateGame.prototype.gameWon = function() {
  this.deleteGame();
  clearTimeout(this.endTimer);
  this.pickMeme(this.wonMemes);
  this.statusMessage("Everybody raise their glasses!");
};

CreateGame.prototype.pickMeme = function(status) {
  var memeDiv = document.createElement('div');
  memeDiv.setAttribute('class', 'memes');
  this.main.appendChild(memeDiv);
  var meme = document.createElement('iframe');
  meme.setAttribute('src', status[Math.floor(Math.random() * status.length)]);
  memeDiv.appendChild(meme);
};

CreateGame.prototype.statusMessage = function(status) {
  var self = this;
  var main = this.main;
  var divAround = document.createElement('div');
  divAround.setAttribute('id', 'div-around');
  main.appendChild(divAround);
  var text = document.createElement('h1');
  text.setAttribute('class', 'padding-end-screen');
  text.innerHTML = ('' + status).toUpperCase();
  divAround.appendChild(text);
  var playAgain = document.createElement('button');
  playAgain.innerHTML = "Play again?".toUpperCase();
  playAgain.setAttribute('class', 'button');
  playAgain.setAttribute('id', 'attention-btn');
  divAround.appendChild(playAgain);
  playAgain.addEventListener('click', function() {
    self.deleteGame();
    self.resetScore();
    self.getReady();
  });
  var startAgain = document.createElement('button');
  startAgain.innerHTML = "Back to Start".toUpperCase();
  startAgain.setAttribute('class', 'button');
  startAgain.setAttribute('id', 'ghost-btn');
  divAround.appendChild(startAgain);
  startAgain.addEventListener('click', function() {
    self.deleteGame();
    self.resetScore();
    self.startScreen();
  });
};

CreateGame.prototype.resetScore = function() {
  this.score = 0;
};

CreateGame.prototype.chooseLevel = function(number) {
  this.numberOfLevels = number;
};
