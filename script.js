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
      displayController.playerOne.classList.add("blue-indicator");
      displayController.addEventListeners();
    }
  }

  function resetGame() {
    removeIndicators();
    displayController.nameInputs.forEach(input => input.value = "");
    startBtn.textContent = "Start";
    gameRound = 1;
    displayController.removeEventListeners();
    gameboard.gameboard = ["", " ", "  ", "   ", "    ", "     ", "      ", "       ", "        ",];
    displayController.displayBoard();
    displayController.gameDialog.close();
  }

  function checkSquare(e) {
    if (!(e.target.textContent === "X" || e.target.textContent === "O")) {
      if (gameRound % 2 === 1) {
        placeMark(e, "blue", playerOne);
      } else {
        placeMark(e, "red", playerTwo);
      }
    }
  }

  function placeMark(e, color, player) {
    e.target.style.color = color;
    toggleIndicators();
    gameboard.gameboard[e.target.dataset.index] = player.mark;
    displayController.displayBoard();
    checkGame(player);
    gameRound++;
  }

  function toggleIndicators() {
    displayController.playerOne.classList.toggle("blue-indicator");
    displayController.playerTwo.classList.toggle("red-indicator");
  }

  function removeIndicators() {
    displayController.playerOne.classList.remove("blue-indicator");
    displayController.playerTwo.classList.remove("red-indicator");
  }

  return {checkGame, runGame, checkSquare, resetGame};
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
  const playerOne = document.querySelector(".player-one");
  const playerTwo = document.querySelector(".player-two");

  newGameBtn.addEventListener("click", game.resetGame);

  function displayBoard() {
    boardSquares.forEach(square => square.textContent = gameboard.gameboard[square.dataset.index]);
  }

  function getNames() {
    playerNames.length = 0;
    nameInputs.forEach(input => playerNames.push(input.value));
  }

  function addEventListeners() {
    boardSquares.forEach(square => square.addEventListener("click", game.checkSquare));
  }

  function removeEventListeners() {
    boardSquares.forEach(square => square.removeEventListener("click", game.checkSquare));
  }

  return {playerNames, playerOne, playerTwo, nameInputs, gameDialog, dialogText, newGameBtn, 
          displayBoard, getNames, addEventListeners, removeEventListeners};
})();

const startBtn = document.querySelector(".start");
startBtn.addEventListener("click", game.runGame);