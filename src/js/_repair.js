table = document.getElementById("table");

//repair board game
const _repair = () => {
  //init null
  table.innerHTML = "";
  table.innerHTML += "<div class = 'bordertl'></div>";
  for (let i = 0; i < 30; i++)
    table.innerHTML += "<div class = 'bordertb'></div>";
  table.innerHTML += "<div class = 'bordertr'></div>";

  table.innerHTML += "<div class = 'borderlrlong'></div>";
  table.innerHTML += "<div class='time0' id = 'lh'></div>";
  table.innerHTML += "<div class='time9' id = 'lm'></div>";
  table.innerHTML += "<div class='time9' id = 'ls'></div>";
  table.innerHTML += "<div id='face'></div>";
  table.innerHTML += "<div class='time0' id = 'rh'></div>";
  table.innerHTML += "<div class='time0' id = 'rm'></div>";
  table.innerHTML += "<div class='time0' id = 'rs'></div>";
  table.innerHTML += "<div class = 'borderlrlong'></div>";

  table.innerHTML += "<div class = 'borderjointl'></div>";
  for (let i = 0; i < 30; i++)
    table.innerHTML += "<div class = 'bordertb'></div>";
  table.innerHTML += "<div class = 'borderjointr'></div>";
  //main square
  for (let i = 0; i < 16; i++) {
    table.innerHTML += "<div class='borderlr'></div>";
    for (let j = 0; j < 30; j++)
      table.innerHTML += "<div class='sq blank'></div>";
    table.innerHTML += "<div class='borderlr'></div>";
  }
  table.innerHTML += "<div class = 'borderbl'></div>";
  for (let i = 0; i < 30; i++)
    table.innerHTML += "<div class = 'bordertb'></div>";

  table.innerHTML += "<div class = 'borderbr'></div>";
};

_repair();
