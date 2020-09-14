import "./styles.css";

/*
document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;
*/

const cellList = document.getElementsByClassName("col");

let player = 1;
let win = 0;
var timerVar = null;
let time = 10;

// making sure the document is ready and loaded
if (document.readyState !== "loading") {
  console.log("executing");
  initialize();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("executing after wait");
    initialize();
  });
}

function initialize() {
  console.log("initializing");

  // add eventlisteners to all cells
  for (let i = 0; i < cellList.length; i++) {
    cellList[i].addEventListener("mousedown", function () {
      //do the thing that happens when u click
      clickAction(i);
    });
  }
  // timer 10s
  timerVar = setInterval(timer, 1000);
}

function timer() {
  time--;
  if (time === 0) {
    // reset timer
    time = 10;
    // change player
    if (player === 1) {
      player = 2;
    } else {
      player = 1;
    }
  }
  progressBar();
}

function progressBar() {
  var elem = document.getElementById("timeID");
  // shorten bar by 1
  elem.style.width = time * 10 + "%";
  // mark time left
  elem.innerHTML = time + "s";
}

function clickAction(i) {
  //check if cell is empty or game has ended
  if (cellList[i].innerHTML.trim() === "" && win === 0) {
    if (player === 1) {
      // add x to cell
      cellList[i].innerHTML = "x";
      // change cell color
      cellList[i].style.backgroundColor = "rgb(124, 252, 0)";
      // change player
      player = 2;
    } else {
      // add o to cell
      cellList[i].innerHTML = "o";
      //change cell color
      cellList[i].style.backgroundColor = "rgb(250, 128, 114)";
      // change player
      player = 1;
    }
    // reset timer
    clearInterval(timerVar);
    time = 10;
    progressBar();
    timerVar = setInterval(timer, 1000);

    // check win status
    // 5 in a row
    for (let i = 0; i < cellList.length; i = i + 5) {
      if (
        cellList[i].innerHTML !== "" &&
        cellList[i].innerHTML === cellList[i + 1].innerHTML &&
        cellList[i].innerHTML === cellList[i + 2].innerHTML &&
        cellList[i].innerHTML === cellList[i + 3].innerHTML &&
        cellList[i].innerHTML === cellList[i + 4].innerHTML
      ) {
        // trigger win
        winning(i);
      }
    }
    // 5 in a column
    if (win === 0) {
      for (let i = 0; i < 5; i++) {
        if (
          cellList[i].innerHTML !== "" &&
          cellList[i].innerHTML === cellList[i + 5].innerHTML &&
          cellList[i].innerHTML === cellList[i + 10].innerHTML &&
          cellList[i].innerHTML === cellList[i + 15].innerHTML &&
          cellList[i].innerHTML === cellList[i + 20].innerHTML
        ) {
          // trigger win
          winning(i);
        }
      }
    }
    // 5 diagonally
    if (win === 0) {
      let i = 0;
      if (
        cellList[i].innerHTML !== "" &&
        cellList[i].innerHTML === cellList[i + 6].innerHTML &&
        cellList[i].innerHTML === cellList[i + 12].innerHTML &&
        cellList[i].innerHTML === cellList[i + 18].innerHTML &&
        cellList[i].innerHTML === cellList[i + 24].innerHTML
      ) {
        // trigger win
        winning(i);
      }
    }
    if (win === 0) {
      let i = 4;
      if (
        cellList[i].innerHTML !== "" &&
        cellList[i].innerHTML === cellList[i + 4].innerHTML &&
        cellList[i].innerHTML === cellList[i + 8].innerHTML &&
        cellList[i].innerHTML === cellList[i + 12].innerHTML &&
        cellList[i].innerHTML === cellList[i + 16].innerHTML
      ) {
        // trigger win
        winning(i);
      }
    }
  }
}

function winning(i) {
  console.log("win sequence");
  // alert winner
  if (player === 1) {
    alert("Player 2 won!");
    console.log("2");
  } else {
    alert("Player 1 won!");
    console.log("1");
  }
  // log win
  win++;
  // stop timer
  clearInterval(timerVar);
}
