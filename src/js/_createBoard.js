var SZ_ROW = 16;
var SZ_COL = 30;
var SZ_BOMB = 99;

//create empty bot
var bot = new Array(SZ_ROW);

const _randBomb = () => {
  for (let r = 0; r < SZ_BOMB; r++) {
    let x = Math.floor(Math.random() * SZ_ROW);
    let y = Math.floor(Math.random() * SZ_COL);
    while (bot[x][y] != 0) {
      x = Math.floor(Math.random() * SZ_ROW);
      y = Math.floor(Math.random() * SZ_COL);
    }
    bot[x][y] = -1;
  }
};

const _haveBomb = (x, y) => {
  let ans = 0;
  for (let i = x - 1; i <= x + 1; i++)
    if (i >= 0 && i < SZ_ROW)
      for (let j = y - 1; j <= y + 1; j++)
        if (j >= 0 && j < SZ_COL) if (bot[i][j] == -1) ans++;
  return ans;
};

const _calcBomb = () => {
  for (let i = 0; i < SZ_ROW; i++)
    for (let j = 0; j < SZ_COL; j++)
      if (bot[i][j] != -1) bot[i][j] = _haveBomb(i, j);
};

const _createBot = () => {
  //clean
  for (let i = 0; i < SZ_ROW; i++) bot[i] = new Array(SZ_COL).fill(0);
  //random bomb
  _randBomb();
  //caculate square dont have bomb
  _calcBomb();
};
