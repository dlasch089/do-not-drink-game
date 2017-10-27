'use strict';

$(document).ready(function() {

  startScreen();


  console.log('Validated!');
});

function startScreen() {
  // ----------- DONE IN PURE JS DOM ------------------ //
  var main = document.getElementById('main');
  var divAround = document.createElement('div');
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
    $('#ghost-btn').hide();
  });

  // $('#ghost-btn').click(function() {
  //   $('#ghost-btn').hide();
  //   var game = new CreateGame();
  // });

}

function CreateGame()  {
  this.challenge = [];
  this.timeOut = 3;
  this.score = 0;
}
