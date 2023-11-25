const Game = (function() {
  let gameRound = 1;
  let playerOne;
  let playerTwo;

  function checkGame(player) {
    if (Gameboard.gameboard[0] == Gameboard.gameboard[1] && Gameboard.gameboard[1] == Gameboard.gameboard[2] ||
        Gameboard.gameboard[0] == Gameboard.gameboard[3] && Gameboard.gameboard[3] == Gameboard.gameboard[6] ||
        Gameboard.gameboard[2] == Gameboard.gameboard[5] && Gameboard.gameboard[5] == Gameboard.gameboard[8] ||
        Gameboard.gameboard[6] == Gameboard.gameboard[7] && Gameboard.gameboard[7] == Gameboard.gameboard[8] ||
        Gameboard.gameboard[0] == Gameboard.gameboard[4] && Gameboard.gameboard[4] == Gameboard.gameboard[8] ||
        Gameboard.gameboard[2] == Gameboard.gameboard[4] && Gameboard.gameboard[4] == Gameboard.gameboard[6] ||
        Gameboard.gameboard[3] == Gameboard.gameboard[4] && Gameboard.gameboard[4] == Gameboard.gameboard[5] ||
        Gameboard.gameboard[1] == Gameboard.gameboard[4] && Gameboard.gameboard[4] == Gameboard.gameboard[7]) {
          DisplayController.dialogText.textContent = `${player.name} wins!`;
          DisplayController.gameDialog.showModal();
        } else if (gameRound == 9) {
          DisplayController.dialogText.textContent = "It's a tie!";
          DisplayController.gameDialog.showModal();
        }
  }

  function runGame() {
    DisplayController.getNames();
    playerOne = Player(DisplayController.playerNames[0]);
    playerTwo = Player(DisplayController.playerNames[1]);
    
    DisplayController.addEventListeners();
  }

  function placeMark(e) {
    if (!(e.target.textContent === "X" || e.target.textContent === "O")) {
      if (gameRound % 2 === 1) {
        Gameboard.gameboard[e.target.dataset.index] = "X";
        DisplayController.displayBoard();
        checkGame(playerOne);
        gameRound++;
      } else {
        Gameboard.gameboard[e.target.dataset.index] = "O";
        DisplayController.displayBoard();
        checkGame(playerTwo);
        gameRound++;
      }
    }
  }

  function resetGame() {
    gameRound = 1;
    DisplayController.removeEventListeners();
    Gameboard.gameboard = ["", " ", "  ", "   ", "    ", "     ", "      ", "       ", "        ",];
    DisplayController.displayBoard();
    DisplayController.gameDialog.close();
    runGame();
  }

  return {checkGame, runGame, placeMark, resetGame};
})();

const Gameboard = (function() {
  const gameboard = ["", " ", "  ", "   ", "    ", "     ", "      ", "       ", "        ",];
  
  return {gameboard};
})();

function Player(name) {
  return {name};
}

const DisplayController = (function() {
  const playerNames = [];
  const nameInputs = document.querySelectorAll("input");
  const boardSquares = document.querySelectorAll(".container > div");
  const gameDialog = document.querySelector("dialog");
  const newGameBtn = document.querySelector("dialog button");
  const dialogText= document.querySelector(".dialog-text");

  newGameBtn.addEventListener("click", Game.resetGame);

  function displayBoard() {
    boardSquares.forEach(square => square.textContent = Gameboard.gameboard[square.dataset.index]);
  }

  function getNames() {
    playerNames.length = 0;
    nameInputs.forEach(input => playerNames.push(input.value));
  }

  function addEventListeners() {
    boardSquares.forEach(square => square.addEventListener("click", Game.placeMark));
  }

  function removeEventListeners() {
    boardSquares.forEach(square => square.removeEventListener("click", Game.placeMark));
  }

  return {playerNames, gameDialog, dialogText, newGameBtn, displayBoard, getNames, addEventListeners, removeEventListeners};
})();

const startBtn = document.querySelector(".start");
startBtn.addEventListener("click", Game.runGame);