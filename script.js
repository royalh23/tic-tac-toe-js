const game = (function() {
  let gameRound = 1;
  let playerOne;
  let playerTwo;

  function checkGame(player) {
    if (gameboard.gameboard[0] == gameboard.gameboard[1] && gameboard.gameboard[1] == gameboard.gameboard[2] ||
        gameboard.gameboard[0] == gameboard.gameboard[3] && gameboard.gameboard[3] == gameboard.gameboard[6] ||
        gameboard.gameboard[2] == gameboard.gameboard[5] && gameboard.gameboard[5] == gameboard.gameboard[8] ||
        gameboard.gameboard[6] == gameboard.gameboard[7] && gameboard.gameboard[7] == gameboard.gameboard[8] ||
        gameboard.gameboard[0] == gameboard.gameboard[4] && gameboard.gameboard[4] == gameboard.gameboard[8] ||
        gameboard.gameboard[2] == gameboard.gameboard[4] && gameboard.gameboard[4] == gameboard.gameboard[6] ||
        gameboard.gameboard[3] == gameboard.gameboard[4] && gameboard.gameboard[4] == gameboard.gameboard[5] ||
        gameboard.gameboard[1] == gameboard.gameboard[4] && gameboard.gameboard[4] == gameboard.gameboard[7]) {
          displayController.dialogText.textContent = `${player.name} wins!`;
          displayController.gameDialog.showModal();
        } else if (gameRound == 9) {
          displayController.dialogText.textContent = "It's a tie!";
          displayController.gameDialog.showModal();
        }
  }

  function runGame() {
    if (startBtn.textContent == "Restart") {
      resetGame();
    } else {
      startBtn.textContent = "Restart";
      displayController.getNames();
      playerOne = createPlayer(displayController.playerNames[0], "X");
      playerTwo = createPlayer(displayController.playerNames[1], "O");
      displayController.addEventListeners();
    }
  }

  function placeMark(e) {
    if (!(e.target.textContent === "X" || e.target.textContent === "O")) {
      if (gameRound % 2 === 1) {
        gameboard.gameboard[e.target.dataset.index] = playerOne.mark;
        displayController.displayBoard();
        checkGame(playerOne);
        gameRound++;
      } else {
        gameboard.gameboard[e.target.dataset.index] = playerTwo.mark;
        displayController.displayBoard();
        checkGame(playerTwo);
        gameRound++;
      }
    }
  }

  function resetGame() {
    displayController.nameInputs.forEach(input => input.value = "");
    startBtn.textContent = "Start";
    gameRound = 1;
    displayController.removeEventListeners();
    gameboard.gameboard = ["", " ", "  ", "   ", "    ", "     ", "      ", "       ", "        ",];
    displayController.displayBoard();
    displayController.gameDialog.close();
  }

  return {checkGame, runGame, placeMark, resetGame};
})();

const gameboard = (function() {
  const gameboard = ["", " ", "  ", "   ", "    ", "     ", "      ", "       ", "        ",];
  
  return {gameboard};
})();

function createPlayer(name, mark) {
  return {name, mark};
}

const displayController = (function() {
  const playerNames = [];
  const nameInputs = document.querySelectorAll("input");
  const boardSquares = document.querySelectorAll(".container > div");
  const gameDialog = document.querySelector("dialog");
  const newGameBtn = document.querySelector("dialog button");
  const dialogText= document.querySelector(".dialog-text");

  newGameBtn.addEventListener("click", game.resetGame);

  function displayBoard() {
    boardSquares.forEach(square => square.textContent = gameboard.gameboard[square.dataset.index]);
  }

  function getNames() {
    playerNames.length = 0;
    nameInputs.forEach(input => playerNames.push(input.value));
  }

  function addEventListeners() {
    boardSquares.forEach(square => square.addEventListener("click", game.placeMark));
  }

  function removeEventListeners() {
    boardSquares.forEach(square => square.removeEventListener("click", game.placeMark));
  }

  return {playerNames, nameInputs, gameDialog, dialogText, newGameBtn, displayBoard, getNames, addEventListeners, removeEventListeners};
})();

const startBtn = document.querySelector(".start");
startBtn.addEventListener("click", game.runGame);