  //game settings
  var app = {};
  app.wordBank = ['book', 'bicycle'];
  app.avaiGuesses = 12; 
  app.word = '';

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
    this.word = solution;
    this.initRender(solution);
  }

  //initial game rendering
  app.initRender = function (word){
    document.getElementById('gameState').innerHTML = '_ '.repeat(word.length);
    document.getElementById('guessesLeft').innerHTML = this.avaiGuesses;
    document.getElementById('guessesState').innerHTML = '';
    //show game elements: guesses left, guessed letters, etc
    var thingsToShow = document.getElementsByClassName('needToShow');
      for (var element of thingsToShow) {
        element.style.display = 'initial';
      }
  }

  //regular game render 
  app.render = function (gameState, guessesLeft, guessesState) {
    console.log('game is rendering');
    document.getElementById('gameState').innerHTML = gameState;
    document.getElementById('guessesLeft').innerHTML = guessesLeft;
    document.getElementById('guessesState').innerHTML = guessesState;
  }


  //game logic
  document.onkeyup = function (e){
    var oneGuess; 
    var currentGameState = document.getElementById('gameState').innerHTML;
    var currentGuessesLeft = document.getElementById('guessesLeft').innerHTML;
    var currentGuessesState = document.getElementById('guessesState').innerHTML;
    console.log('current game state is: ', currentGameState)
    console.log('current guesses state is: ', currentGuessesState)
    console.log('current guesses left is: ', currentGuessesLeft);
    oneGuess = e.key.toLowerCase();
    
    //logic for new wrong guess
    if (app.word.indexOf(oneGuess) === -1 && currentGuessesState.indexOf(oneGuess) === -1){
      console.log('wrong letter; you pressed: ', oneGuess)
      currentGuessesLeft --;
      currentGuessesState += oneGuess + ' '; 
      app.render(currentGameState, currentGuessesLeft, currentGuessesState);
    //logic for new right guess
  } else if (app.word.indexOf(oneGuess) !== -1 && currentGuessesState.indexOf(oneGuess) === -1) {
      console.log('correct letter; you pressed: ', oneGuess)
      currentGuessesLeft --;
      currentGuessesState += oneGuess + ' '; 
      console.log('currentGameState length is: ',currentGameState.length)
      console.log('currentGameState type is: ',typeof(currentGameState))
      var CGSsplit = currentGameState.split('')
      for (var i = 0; i<app.word.length; i++){
        if (app.word[i] === oneGuess) {
          CGSsplit[2*i] = oneGuess;
        }
        currentGameState = CGSsplit.join("");
        console.log('new game state is: ', currentGameState)
      }
      app.render(currentGameState, currentGuessesLeft, currentGuessesState);
    }
  }

  //initialize game menu
  app.initialize();