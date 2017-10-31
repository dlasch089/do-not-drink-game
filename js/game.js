'use strict';

function CreateGame()  {
  this.challenge = [
    ["Click 'left'!", "right", "left", "true", "false"],
    // ["Click the button on the right!", "right", "left", "true", "false"],
    // ["NaN is not equal to: ", "a number", "NaN", "false", "true"],
    // ["Don't click any button!", "Why..", "..not?", "true", "true"],
    // ["Press play!", "Play!", "|>", "false", "true"],
    // ["Donald Trump is..", "..an asshole", "..not racist!", "false", "true"],
    // ["Wait for Timeout!", "..2..", "..1..!", "true", "true"],
    // ["CLICK:", " ", "HERE!", "true", "false"],
    // ["Press the Ghost-Button!", "Ghost", "Ghost", "false", "true"],
    // ["Click opposite of 'right'", "left ", "right", "false", "true"],
  ];
  this.challengeLength = this.challenge.length;
  this.timeOut = 3;
  this.score = 0;
  this.header = document.getElementById('header');
  this.main = document.getElementById('main');
  this.footer = document.getElementById('footer');
  this.wonMemes = ['https://giphy.com/embed/QdXfVLeFgNvG',
    'https://giphy.com/embed/aurUBBayxC55m',
    'https://giphy.com/embed/7rWx2wzFOPZEQ'
  ];
  this.lostMemes = ['https://giphy.com/embed/26xBwu0ZZVWbG7gA0',
    "https://giphy.com/embed/AwkqAwhwqGzg4",
    "https://giphy.com/embed/3ohfFp1ureujZgWSVa"
  ];
}

CreateGame.prototype.rules = function() {
  console.log('The rules are easy!');
};

CreateGame.prototype.startScreen = function() {
  var self = this;
  var main = document.getElementById('main');
  var divAround = document.createElement('div');
  divAround.setAttribute('id', 'div-around');
  main.appendChild(divAround);
  // Display the name of the Game:
  var text = document.createElement('h1');
  text.innerHTML = 'Do The Opposite!'.toUpperCase();
  text.setAttribute('class', 'padding-start-screen');
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
    self.getReady();
  });

  resetButton.addEventListener('click', function() {
    self.rules();
  });
};



CreateGame.prototype.getReady = function() {
  var self = this;
  this.deleteGame();
  var getReadyNumbers = document.createElement('h1');
  // getReadyNumbers.setAttribute('class', 'padding-startscreen');
  getReadyNumbers.setAttribute('class', 'getReady');
  getReadyNumbers.innerText = 3;
  this.main.appendChild(getReadyNumbers);
  var reminder = document.createElement('h1');
  // reminder.setAttribute('class', 'padding-startscreen');
  reminder.innerText = 'DO THE OPPOSITE!';
  this.main.appendChild(reminder);
  setInterval(function() {
    getReadyNumbers.innerText -= 1;
  }, 1000);
  setTimeout(function() {
    self.startGame("startScreen");
  }, 3000);

};

CreateGame.prototype.startGame = function(screenBefore) {
  if (screenBefore === "startScreen") {
    console.log("Let's start the Game!!");
    this.deleteGame();
    this.buildGame();
    this.copyChallenge(); //Copies the Challenge-Array (for the reset)
    this.pickChallenge();
  } else if (this.challengeCopy.length === 0) {
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
  levels.innerHTML = ' /' + this.challengeLength;
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
  // var self = this;
  var validate = answer;
  if (validate === "true") {
    this.score += 1;
    this.startGame("gameBefore");
  } else {
    this.gameOver();
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
  var resetButton = document.createElement('button');
  resetButton.innerHTML = "Play again?".toUpperCase();
  resetButton.setAttribute('class', 'button');
  resetButton.setAttribute('id', 'ghost-btn');
  divAround.appendChild(resetButton);
  resetButton.addEventListener('click', function() {
    self.deleteGame();
    self.resetScore();
    self.getReady();
  });
};

CreateGame.prototype.resetScore = function() {
  this.score = 0;
};
