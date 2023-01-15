const _gameOver = (x, y) => {
  canPlay = false;
  for (let i = 0; i < SZ_ROW; i++)
    for (let j = 0; j < SZ_COL; j++)
      if (i === x && j === y) continue;
      else if (board[i][j] === -1 && bot[i][j] != -1) _open2(i, j, -2);
      else if (board[i][j] === 9 && bot[i][j] !== -1) _open2(i, j, -2);
      else if (board[i][j] !== 9 && bot[i][j] == -1) _open2(i, j, -3);
  _open2(x, y, -1);
};

const _checkWin = () => {
  for (let x = 0; x < SZ_ROW; x++)
    for (let y = 0; y < SZ_COL; y++)
      if (board[x][y] === 9 && bot[x][y] != -1) return false;
      else if (board[x][y] !== 9 && bot[x][y] == -1) return false;
  return true;
};

const _win = () => {
  canPlay = false;
  alert("WIN GAME");
};
