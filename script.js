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