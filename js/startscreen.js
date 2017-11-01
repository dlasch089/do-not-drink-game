'use strict';


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
  // Display the Level-Button:
  var levelButton = document.createElement('button');
  levelButton.innerHTML = "levels".toUpperCase();
  levelButton.setAttribute('class', 'button');
  levelButton.setAttribute('id', 'ghost-btn');
  divAround.appendChild(levelButton);
  //Add Click-Events:
  startButton.addEventListener('click', function() {
    self.getReady();
  });

  resetButton.addEventListener('click', function() {
    self.rules();
  });

  levelButton.addEventListener('click', function() {
    self.levels();
  });
};

CreateGame.prototype.rules = function() {
  var self = this;
  var popUpContainer = document.createElement('div');
  popUpContainer.setAttribute('id', 'pop-up-container');
  this.container.insertBefore(popUpContainer, this.header);
  var popUp = document.createElement('div');
  popUp.setAttribute('class', 'pop-up');
  popUpContainer.appendChild(popUp);
  var rulesHeadline = document.createElement('h1');
  rulesHeadline.innerHTML = "It's easy:".toUpperCase();
  popUp.appendChild(rulesHeadline);
  var rulesWin = document.createElement('p');
  rulesWin.innerHTML = "// if you lose, you have to drink!".toUpperCase();
  popUp.appendChild(rulesWin);
  var rulesLose = document.createElement('p');
  rulesLose.innerHTML = "// If you win, everbody else has to drink!".toUpperCase();
  popUp.appendChild(rulesLose);
  var closeButton = document.createElement('button');
  closeButton.innerHTML = "close".toUpperCase();
  closeButton.setAttribute('class', 'button');
  closeButton.setAttribute('id', 'close-btn');
  popUp.appendChild(closeButton);
  closeButton.addEventListener('click', function() {

    popUp.style.opacity = '0';
    setTimeout(function() {
      popUpContainer.remove();
    }, 500);
  });
};

CreateGame.prototype.levels = function() {
  var self = this;
  var popUpContainer = document.createElement('div');
  popUpContainer.setAttribute('id', 'pop-up-container');
  this.container.insertBefore(popUpContainer, this.header);
  var popUp = document.createElement('div');
  popUp.setAttribute('class', 'level-pop-up');
  popUpContainer.appendChild(popUp);
  var levelsHeadline = document.createElement('h1');
  levelsHeadline.setAttribute('id', 'level-headline');
  levelsHeadline.innerHTML = "Choose your drunk-level:".toUpperCase();
  popUp.appendChild(levelsHeadline);
  var levelOne = document.createElement('button');
  levelOne.innerHTML = "Drunk!".toUpperCase();
  levelOne.setAttribute('class', 'button');
  levelOne.setAttribute('id', 'close-btn');
  popUp.appendChild(levelOne);
  levelOne.addEventListener('click', function() {
    popUp.style.opacity = '0';
    setTimeout(function() {
      self.chooseLevel(10);
      popUpContainer.remove();
    }, 500);
  });

  var levelTwo = document.createElement('button');
  levelTwo.innerHTML = "Super-Drunk!".toUpperCase();
  levelTwo.setAttribute('class', 'button');
  levelTwo.setAttribute('id', 'close-btn');
  popUp.appendChild(levelTwo);
  levelTwo.addEventListener('click', function() {
    popUp.style.opacity = '0';
    setTimeout(function() {
      self.chooseLevel(7);
      popUpContainer.remove();
    }, 500);
  });

  var levelThree = document.createElement('button');
  levelThree.innerHTML = "Can't read this!".toUpperCase();
  levelThree.setAttribute('class', 'button');
  levelThree.setAttribute('id', 'close-btn');
  popUp.appendChild(levelThree);
  levelThree.addEventListener('click', function() {
    popUp.style.opacity = '0';
    setTimeout(function() {
      self.chooseLevel(4);
      popUpContainer.remove();
    }, 500);
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
