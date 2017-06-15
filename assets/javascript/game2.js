//game settings & initializing
var app = {};
app.wordBank = ['book', 'bicycle'];
app.avaiGuesses = 12; 
app.word = '';
app.gameState = '';
app.guessesLeft = 0;
app.guessesState = '';
app.badCharCodes = [115];
app.badKeys = ['capslock', 'arrowright','arrowup', 'arrowdown','arrowleft', 'control', 'alt', 'enter', 'backspace', 'numlock', 'printscreen', 'pause', 'delete', 'home', 'pageup', 'pagedown', 'end', 'insert']
app.goNoGo = 1; 


//code for game starting
app.gameStart = function() {
  console.log('Game has started');
  //hide beginning instructions
  var thingsToHide = document.getElementsByClassName('needToHide');
  for (var element of thingsToHide) {
    element.style.display = 'none';
  }
  //pick random word
  this.word = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];
  //initial game rendering
  this.initRender();
}

//initial game rendering
app.initRender = function (){
  //set initial game states
  this.gameState = '_ '.repeat(this.word.length);
  this.guessesLeft = this.avaiGuesses;
  this.guessesState = '';
  //render once
  app.render();
  //unhide game states on browser: guesses left, guessed letters, etc
  var thingsToShow = document.getElementsByClassName('needToShow');
    for (var element of thingsToShow) {
      element.style.display = 'initial';
    }
}

// game rendering 
app.render = function () {
  console.log('game is re-rendering');
  //render the 3 game states
  document.getElementById('gameState').innerHTML = this.gameState;
  document.getElementById('guessesLeft').innerHTML = this.guessesLeft;
  document.getElementById('guessesState').innerHTML = this.guessesState;
}

//game victory logic
app.victory = function () {
  console.log("yay you win!")
  document.getElementById('start').style.display = 'initial';
  this.goNoGo = 1;
  //logic to play victory sound effect

  var vAudio = new Audio('assets/sounds/victory.mp3');
  vAudio.play();
}

//game failure logic
app.failure = function () {
  console.log("no! you lose!")
  document.getElementById('start').style.display = 'initial';
  this.goNoGo = 1;
  //logic to play failure sound effect
  var fAudio = new Audio('assets/sounds/failure.mp3');
  fAudio.play();
}

document.onkeyup = function (e){

  //if the game should start/restart
  if (app.goNoGo) {
    console.log('Game Starting');
    //run game start logic and set game-start checker to falsey
    app.gameStart(); 
    app.goNoGo = 0;
  } 
  //if the game should not start/restart, run main game logic
  else {
    var oneGuess; 
    oneGuess = e.key.toLowerCase();
    console.log('current game state is: ', app.gameState);
    console.log('current guesses state is: ', app.guessesState);
    console.log('current guesses left is: ', app.guessesLeft);
    //logic to filter only key strokes that are letters
    if (oneGuess.charCodeAt(0) > 96 && oneGuess.charCodeAt(0) < 123 && app.badCharCodes.indexOf(oneGuess.charCodeAt(0)) === -1 && app.badKeys.indexOf(oneGuess) === -1 ) {
      //Only apply logic to new guesses
      if (app.guessesState.indexOf(oneGuess) === -1) {
        //logic for a new wrong guess
        if (app.word.indexOf(oneGuess) === -1){
          console.log('wrong letter; you pressed: ', oneGuess)
          //check for using up the last guess and it wasn't correct
          if (app.guessesLeft === 1) {
            app.failure();
          }
          
        //logic for a new correct guess
        } else if (app.word.indexOf(oneGuess) !== -1) {
          console.log('correct letter; you pressed: ', oneGuess)
          //logic for updating the underscore game state
          var CGSsplit = app.gameState.split('');
          var CGSsplit2 = app.gameState.split(' ');
          for (var i = 0; i<app.word.length; i++){
            if (app.word[i] === oneGuess) {
              CGSsplit[2*i] = oneGuess;
              CGSsplit2[i] = oneGuess;
            }
            //update game state for a new correct guess
            app.gameState = CGSsplit.join("");
            var finalGuess = CGSsplit2.join("");
            console.log('new game state is: ', app.gameState);
            //check for victory
            if (finalGuess === app.word) {
              app.victory();
            }
          }
        }
        //update both guess states for a new guess 
        app.guessesLeft --;
        app.guessesState += oneGuess + ' '; 
        //re-render for a new guess
        app.render();
      }
    }
  }
}
