//game settings & initializing
var app = {};
app.wordBank = ['horse', 'monkey', 'fox', 'dog', 'pig', 'lion', 'mouse', 'hamster', 'panda', 'koala', 'wolf'];
app.wordBank= ['horse', 'monkey']
app.iconBank = ["&#x1F434;","&#x1F435;", "&#x1F98A;", "&#x1F436;", "&#x1F437;", "&#x1F981;", "&#x1F42D;", "&#x1F439;", "&#x1F43C;", "&#x1F428;", "&#x1F43A;"]
app.avaiGuesses = 12; 
app.digramStart = 7;  
app.word = '';
app.icon = '';
app.gameState = '';
app.guessesLeft = 0;
app.guessesState = '';
app.badCharCodes = [115];
app.badKeys = ['capslock', 'arrowright','arrowup', 'arrowdown','arrowleft', 'control', 'alt', 'enter', 'backspace', 'numlock', 'printscreen', 'pause', 'delete', 'home', 'pageup', 'pagedown', 'end', 'insert']
app.goNoGo = 1; 
app.diagram = [];


//code for game starting
app.gameStart = function() {
  console.log('Game has started');
  //hide beginning instructions
  var thingsToHide = document.getElementsByClassName('needToHide');
  for (var element of thingsToHide) {
    element.style.display = 'none';
  }
  //set initial game states
  var RN = [Math.floor(Math.random() * this.wordBank.length)];
  this.word = this.wordBank[RN];
  this.icon = this.iconBank[RN];
  this.gameState = '_ '.repeat(this.word.length);
  this.guessesLeft = this.avaiGuesses;
  this.guessesState = '';
  //initialing hangman diagram 
  for (var i = 0; i < 10; i++) { 
    app.diagram[i]='';
    for (var j = 0; j < 10; j++) {
      app.diagram[i] += "*";  
    }
    app.diagram[i] += '\n';
  }


  //initial game rendering
  this.initRender();
}

//initial game rendering
app.initRender = function (){
  //render once
  app.render();
  //unhide game states on browser: guesses left, guessed letters, etc
  var thingsToShow = document.getElementsByClassName('needToShow');
    for (var element of thingsToShow) {
      element.style.display = 'block';
    }
}

// main game rendering 
app.render = function () {
  console.log('game is re-rendering');
  //render the 3 game states
  document.getElementById('gameState').innerHTML = this.gameState;
  document.getElementById('guessesLeft').innerHTML = this.guessesLeft;
  document.getElementById('guessesState').innerHTML = this.guessesState;
  this.renderDiagram();
}

//game victory logic
app.victory = function () {
  console.log("yay you win!");
  document.getElementById('start').style.display = 'block';
  this.goNoGo = 1;
  //logic to play victory sound effect

  var vAudio = new Audio('assets/sounds/victory.mp3');
  vAudio.play();
}

//game failure logic
app.failure = function () {
  console.log("no! you lose!")
  document.getElementById('start').style.display = 'block';
  this.goNoGo = 1;
  //logic to play failure sound effect
  var fAudio = new Audio('assets/sounds/failure.mp3');
  fAudio.play();
}

//Hangman diagram logic
app.renderDiagram = function () {
  console.log('rendering diagram');
  var that = this; 
  var stringUpdater = (str, pos, symbol) => {
    var newStr = str; 
    newStr = newStr.slice(0, pos) + symbol + newStr.slice(pos + 1);
    return newStr;
  }

  //draw platform
  if (this.guessesLeft === 7){
    _.range(1, 9).forEach((i) => (that.diagram[9] = stringUpdater(that.diagram[9], i, '_')));
    _.range(1, 9).forEach((i) => (that.diagram[7] = stringUpdater(that.diagram[7], i, '_')));
    _.range(8, 10).forEach((i) => (that.diagram[i] = stringUpdater(that.diagram[i], 0, '|')));
    _.range(8, 10).forEach((i) => (that.diagram[i] = stringUpdater(that.diagram[i], 9, '|')));
  }
  //draw pole
  if (this.guessesLeft === 6){
    _.range(1, 8).forEach((i) => (that.diagram[i] = stringUpdater(that.diagram[i], 1, '|')));
    _.range(2, 6).forEach((i) => (that.diagram[0] = stringUpdater(that.diagram[0], i, '_')));
    that.diagram[1] = stringUpdater(that.diagram[1], 6, '|');
  }
  //draw body
  if (this.guessesLeft === 5){
    that.diagram[3] = stringUpdater(that.diagram[3], 6, '|');
    that.diagram[4] = stringUpdater(that.diagram[4], 6, '|');
  }
  //draw left arm
  if (this.guessesLeft === 4){
    that.diagram[3] = stringUpdater(that.diagram[3], 5, '/');
  }
  //draw right arm
  if (this.guessesLeft === 3){
    that.diagram[3] = stringUpdater(that.diagram[3], 7, '\\');
  }
  //draw left leg
  if (this.guessesLeft === 2){
    that.diagram[5] = stringUpdater(that.diagram[5], 5, '/');
  }
  //draw right leg
  if (this.guessesLeft === 1){
    that.diagram[5] = stringUpdater(that.diagram[5], 7, '\\');
  }
  //draw head
  if (this.guessesLeft === 0){
    that.diagram[2] = stringUpdater(that.diagram[2], 9, '');
    that.diagram[2] = stringUpdater(that.diagram[2], 5, that.icon);
  }
  
  var oneJoin = this.diagram.join('');
  document.getElementById('diagram').innerHTML = oneJoin;
  
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
    if (oneGuess.charCodeAt(0) > 96 && oneGuess.charCodeAt(0) < 123 && 
    app.badCharCodes.indexOf(oneGuess.charCodeAt(0)) === -1 && app.badKeys.indexOf(oneGuess) === -1 ) {
      //Only apply logic to new guesses
      if (app.guessesState.indexOf(oneGuess) === -1) {
        //logic for a new wrong guess
        if (app.word.indexOf(oneGuess) === -1){
          console.log('wrong letter; you pressed: ', oneGuess);
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
