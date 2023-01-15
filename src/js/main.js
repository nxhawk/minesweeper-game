//create empty board game
var canPlay = false;
var timePlay = 0;
var board = new Array(SZ_ROW);
for (let i = 0; i < SZ_ROW; i++) board[i] = new Array(SZ_COL).fill(10);
var myTime;

//from idx of square => vt (x, y) in board game
const _index = (idx) => {
  let x = Math.floor(idx / SZ_COL);
  let y = idx - x * SZ_COL;
  return { x, y };
};

//tick square [x,y] and check
//one square
/**
 * -1: bomb death
 * 0..8: have bomb
 * -2: no bomb but player check it
 * -3: bomd simple
 * 9: flash
 * 10: null
 */
const _open2 = (x, y, status) => {
  let idx = x * SZ_COL + y,
    st = "";

  if (timePlay == 0) myTime = setInterval(_changeTime, 1000);

  board[x][y] = status;
  sq_ele[idx].classList.remove("blank");
  sq_ele[idx].classList.remove("bomb");
  if (status === -1) st = "bombdeath";
  else if (status === -2) st = "bombno";
  else if (status === -3) st = "bombshow";
  else if (status === 9) st = "bomb";
  else if (status === 10) st = "blank";
  else st = "open" + status;
  sq_ele[idx].classList.add(st);
};

function trace(x, y) {
  if (x < 0 || x >= SZ_ROW || y < 0 || y >= SZ_COL) return;
  if (bot[x][y] === -1) return;
  if (board[x][y] !== 10) return;
  if (bot[x][y] !== 0) {
    _open2(x, y, bot[x][y]);
    return;
  }
  _open2(x, y, 0);
  trace(x - 1, y - 1);
  trace(x - 1, y);
  trace(x - 1, y + 1);
  trace(x, y - 1);
  trace(x, y + 1);
  trace(x + 1, y - 1);
  trace(x + 1, y);
  trace(x + 1, y + 1);
}

rh = document.getElementById("rh");
rm = document.getElementById("rm");
rs = document.getElementById("rs");

function _changeTime() {
  if (timePlay + 1 > 999 || !canPlay) {
    clearInterval(myTime);
    return;
  }
  timePlay = timePlay + 1;
  t = timePlay;
  let s = "";
  st = t.toString();
  while (st.length < 3) st = "0" + st;
  for (let i = 0; i <= 9; i++) {
    s = "time" + i;
    rh.classList.remove(s);
    rm.classList.remove(s);
    rs.classList.remove(s);
  }
  rh.classList.add("time" + st[0]);
  rm.classList.add("time" + st[1]);
  rs.classList.add("time" + st[2]);
}

const _open = (x, y) => {
  if (bot[x][y] === -1) {
    _gameOver(x, y);
  } else {
    trace(x, y);
  }
};

lh = document.getElementById("lh");
lm = document.getElementById("lm");
ls = document.getElementById("ls");

const _changeLeftNum = (num) => {
  SZ_BOMB = num;
  let s = "";
  st = num.toString();
  while (st.length < 3) st = "0" + st;
  for (let i = 0; i <= 9; i++) {
    s = "time" + i;
    lh.classList.remove(s);
    lm.classList.remove(s);
    ls.classList.remove(s);
  }
  lh.classList.add("time" + st[0]);
  lm.classList.add("time" + st[1]);
  ls.classList.add("time" + st[2]);
  if (num === 0 && _checkWin()) _win();
};

//all square in board game
sq_ele = document.querySelectorAll(".sq");

sq_ele.forEach((sq, idx) => {
  sq.addEventListener("click", () => {
    let { x, y } = _index(idx);
    if (board[x][y] === 10 && canPlay) _open(x, y);
  });
});

sq_ele.forEach((sq, idx) => {
  sq.addEventListener("contextmenu", (event) => event.preventDefault());
  sq.addEventListener("mousedown", (e) => {
    if (e.which === 3 && canPlay) {
      e.preventDefault();
      let { x, y } = _index(idx);
      if (board[x][y] === 10 && SZ_BOMB > 0)
        _open2(x, y, 9), _changeLeftNum(SZ_BOMB - 1);
      else if (board[x][y] === 9) _open2(x, y, 10), _changeLeftNum(SZ_BOMB + 1);
    }
  });
});

function startGame() {
  canPlay = true;
  timePlay = 0;
  _changeLeftNum(50);
  _createBot();
  //console.log(bot);
}

startGame();