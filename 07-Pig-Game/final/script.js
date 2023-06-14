'use strict';
// ROLL button
const roll = document.querySelector(".btn--roll")
// dice
const dice = document.querySelector(".dice")
// NEW GAME button
const reset = document.querySelector(".btn--new")
// hold score
const playerCurrentScore = document.querySelector(".current-score")
// Player 01 score
const score0 = document.querySelector("#score--0")
// Player 02 score
const score1 = document.querySelector("#score--1")
// current score
const current0 = document.querySelector("#current--0")
const current1 = document.querySelector("#current--1")
// HOLD button
const hold = document.querySelector(".btn--hold")

// Player sections
const player0 = document.querySelector(".player--0")
const player1 = document.querySelector(".player--1")

// at the beginning of the game - START
score0.textContent = 0
score1.textContent = 0
playerCurrentScore.textContent = 0
dice.classList.add("hidden")

const scores = [0,0] // array scores for "currentScore" and "activePlayer"
let currentScore = 0 // current score
let activePlayer = 0 // current player
let playing = true // set this in order to stop the entire game when there is a winner.
// at the beginning of the game - END

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = currentScore
  activePlayer = activePlayer === 0 ? 1 : 0
  currentScore = 0 // set the "currentScore" back at "0" as the player's turn is over.

  // change background-color for active player
  player0.classList.toggle("player--active")
  player1.classList.toggle("player--active")
}

roll.addEventListener("click", function() {
  if (playing) {
    dice.classList.remove("hidden")
    // 1. Generating a random dice roll
    // declare the "diceNumber" here as the counter in order to alternate the "dice" images so we can have dice-1, dice-2, dice-3, dice-4,......
    const diceNumber = Math.trunc((Math.random()*6)+1) // we want to exclude "0" (zero) as the number of the dice, therefore we have "+1" here.
    // 2. Display dice
    console.log("diceNumber " + diceNumber);
    dice.src = `dice-${diceNumber}.png`
    // 3. Check for rolled 1: if true, switch to next player
    if (diceNumber !== 1) {
      // 1. Add dice to current score
      currentScore += diceNumber // "currentScore" here is the variable to store the current dice number
      // The reason for we cannot add the "diceNumber" directly to "current01" as it will be understood as a concatenation
      // example: 1 + 4 = 14 instead of "5" - Why?
      console.log("currentScore " + currentScore);
      document.getElementById(`current--${activePlayer}`).textContent = currentScore
    } else {
      // switch to next player
      switchPlayer()
    }
  }
})

hold.addEventListener("click", function () {
  if (playing) {
    // add current score to active player's score
    scores[activePlayer] += currentScore // scores[1] = scores[1] + currentScore
    // console.log("currentScore " + currentScore);
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
    // console.log(document.getElementById(`current--${activePlayer}`));
    // console.log(document.getElementById(`current--${activePlayer}`).textContent);

    // check if active player's score >= 100
    if (scores[activePlayer] >= 20) {
      playing = false
      // finish the game
      document.querySelector(`.player--${activePlayer}`).classList.add("player--winner")
      document.querySelector(`.player--${activePlayer}`).classList.remove("player--active")
    } else {
      // switch to the next player
      switchPlayer()
    }
  }
})
reset.addEventListener("click", function() {
  playing = true
  score0.textContent = 0
  score1.textContent = 0
  current0.textContent = 0
  current1.textContent = 0
  player0.classList.add("player--active")
  player1.classList.remove("player--active")
  player0.classList.remove("player--winner")
  player1.classList.remove("player--winner")
})