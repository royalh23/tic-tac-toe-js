const Game = (function() {
  const checkGame = () => {
    return;
  };

  const runGame = () => {
    let playerOneName = prompt("What's the name of the first player?");
    let playerOneSelection = prompt('Please select between "X" and "O":');
    let playerTwoName = prompt("What's the name of the second player?");
    let playerTwoSelection;
    if (playerOneSelection === "X") playerTwoSelection = "O";
    else playerTwoSelection = "X";
    let playerOne = Player(playerOneName, playerOneSelection);
    let playerTwo = Player(playerTwoName, playerTwoSelection);
    console.log(`${playerTwo.name}'s selection is "${playerTwo.selection}" because of ${playerOne.name}'s selection.`);
    Gameboard.displayBoard();
    
  };

  return {checkGame, runGame};
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