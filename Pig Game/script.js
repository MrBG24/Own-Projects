"use strict";

//Selecting Score Values
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let score, currentScore, activePlayer, playing;

const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  // Starting Points
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden"); // Here it takes the CSS class that we gives
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
};
init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  // Toggle method : its used to add or remove class element of its availablity
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Rolling Dice Functionality
btnRoll.addEventListener("click", () => {
  if (playing) {
    // 1. genarating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2.Display DIce with image
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`; //using src key to import image.

    if (dice !== 1) {
      //currentScore = currentScore + dice ;
      currentScore += dice;
      //Using Terenay Operator to switch Players..
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
      // we are callling this block in multiple places that why it is given in a function
    }
  }
});

btnHold.addEventListener("click", () => {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
