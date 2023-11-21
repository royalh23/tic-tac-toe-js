const Game = (function() {
  let gameOver = false;

  const checkGame = (player) => {
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
  };

  const runGame = () => {
    let playerOneName = prompt("What's the name of the first player?");
    let playerOneSelection = prompt('Please select between "X" and "O":');
    let playerTwoName = prompt("What's the name of the second player?");
    let playerTwoSelection;
    if (playerOneSelection === "X") playerTwoSelection = "O";
    else playerTwoSelection = "X";
    let playerOne = Player(playerOneName, playerOneSelection.toUpperCase());
    let playerTwo = Player(playerTwoName, playerTwoSelection);
    let playerOneNumber;
    let playerTwoNumber;
    console.log(`${playerTwo.name}'s selection is "${playerTwo.selection}" because of ${playerOne.name}'s selection.`);
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
  };

  return {runGame};
})();

const Gameboard = (function() {
  const gameboard = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const displayBoard = () => {
    console.log(` ${gameboard[0]} | ${gameboard[1]} | ${gameboard[2]} ` + 
                `\n---+---+---\n` + 
                ` ${gameboard[3]} | ${gameboard[4]} | ${gameboard[5]} ` + 
                `\n---+---+---\n` + 
                ` ${gameboard[6]} | ${gameboard[7]} | ${gameboard[8]} `);
  };
  return {gameboard, displayBoard};
})();

function Player(name, selection) {
  return {name, selection};
}

Game.runGame();