const Game = (function() {
  let gameOver = false;

  function checkGame(player) {
    if (Gameboard.gameboard[0] == Gameboard.gameboard[1] && Gameboard.gameboard[1] == Gameboard.gameboard[2] ||
        Gameboard.gameboard[0] == Gameboard.gameboard[3] && Gameboard.gameboard[3] == Gameboard.gameboard[6] ||
        Gameboard.gameboard[2] == Gameboard.gameboard[5] && Gameboard.gameboard[5] == Gameboard.gameboard[8] ||
        Gameboard.gameboard[6] == Gameboard.gameboard[7] && Gameboard.gameboard[7] == Gameboard.gameboard[8] ||
        Gameboard.gameboard[0] == Gameboard.gameboard[4] && Gameboard.gameboard[4] == Gameboard.gameboard[8] ||
        Gameboard.gameboard[2] == Gameboard.gameboard[4] && Gameboard.gameboard[4] == Gameboard.gameboard[6] ||
        Gameboard.gameboard[3] == Gameboard.gameboard[4] && Gameboard.gameboard[4] == Gameboard.gameboard[5] ||
        Gameboard.gameboard[1] == Gameboard.gameboard[4] && Gameboard.gameboard[4] == Gameboard.gameboard[7]) {
          console.log(`Game over! ${player.name} wins.`);
          gameOver = true;
        }
  }

  function runGame() {
    DisplayController.getNames();
    let playerOne = Player(DisplayController.playerNames[0], "X");
    let playerTwo = Player(DisplayController.playerNames[1], "O");
    Gameboard.displayBoard();

    for (let i = 0; i < 4; i++) {
      playerOneNumber = prompt(`${playerOne.name}, please enter a number to place ${playerOne.selection}`);
      Gameboard.gameboard[playerOneNumber - 1] = playerOne.selection;
      Gameboard.displayBoard();
      checkGame(playerOne);
      if (gameOver) return;

      playerTwoNumber = prompt(`${playerTwo.name}, please enter a number to place ${playerTwo.selection}`);
      Gameboard.gameboard[playerTwoNumber - 1] = playerTwo.selection;
      Gameboard.displayBoard();
      checkGame(playerTwo);
      if (gameOver) return;
    }

    playerOneNumber = prompt(`${playerOne.name}, please enter a number to place ${playerOne.selection}`);
    Gameboard.gameboard[playerOneNumber - 1] = playerOne.selection;
    Gameboard.displayBoard();
    
    console.log("Game over! It's a tie.");
  }

  return {runGame};
})();

const Gameboard = (function() {
  const gameboard = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  function displayBoard() {
    console.log(` ${gameboard[0]} | ${gameboard[1]} | ${gameboard[2]} ` + 
                `\n---+---+---\n` + 
                ` ${gameboard[3]} | ${gameboard[4]} | ${gameboard[5]} ` + 
                `\n---+---+---\n` + 
                ` ${gameboard[6]} | ${gameboard[7]} | ${gameboard[8]} `);
  }
  return {gameboard, displayBoard};
})();

function Player(name, selection) {
  return {name, selection};
}

const DisplayController = (function() {
  const playerNames = [];
  const nameInputs = document.querySelectorAll("input");

  function getNames() {
    nameInputs.forEach(input => playerNames.push(input.value));
  }

  return {playerNames, getNames};
})();

const startBtn = document.querySelector(".start");
startBtn.addEventListener("click", Game.runGame);