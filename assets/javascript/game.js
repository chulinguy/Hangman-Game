
  var app = {};

  //game settings
  app.wordBank = ['book', 'bicycle'];
  app.avaiGuesses = 12; 

  //code for initializing game menu
  app.initialize = function() {
    var that = this;
    console.log('Welcome to game menu, press the Start button to start');

    //code for the start button  
    var startButton = document.getElementById('start');
    startButton.onclick = function() {
      console.log('Game Starting');
      //hide start button & menu instruction before the game starts
      var thingsToHide = document.getElementsByClassName('needToHide')
      for (var element of thingsToHide){
        element.style.display = 'none'
      }
      that.gameStart();
    }
  }

  //code for game starting
  app.gameStart = function() {
    console.log('Game has started');
    //pick random word
    var bank = this.wordBank; 
    var solution = bank[Math.floor(Math.random() * bank.length)];

    this.initRender(solution);
    this.gamePlay(solution);

  }

  //initial rendering
  app.initRender = function (word){
    document.getElementById('game').innerHTML = ' _'.repeat(word.length);
    document.getElementById('guessesLeft').innerHTML = this.avaiGuesses;
    //show game elements: guesses left, guessed letters, etc
    var thingsToShow = document.getElementsByClassName('needToShow');
      for (var element of thingsToShow) {
        element.style.display = 'initial';
      }
  }

  //game logic
  app.gamePlay = function (word) {
    var oneGuess; 
    var that = this;
    var currentState = document.getElementById('state').innerHTML;
    var currentGuessesLeft = document.getElementById('guessesLeft').innerHTML;
    console.log('current guesses left is: ', currentGuessesLeft);
    document.onkeyup = function (e){
      oneGuess = e.key.toLowerCase();
    }
    if (word.indexOf(oneGuess) === -1){
      that.render()
    }
  } 

  //game render 
  app.render = function () {
    console.log('game is rendering')
  }

  //initialize game menu
  app.initialize();