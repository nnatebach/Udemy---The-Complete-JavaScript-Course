'use strict';
// ROLL button
const roll = document.querySelector(".btn--roll")
// dice
const dice = document.querySelector(".dice")
// NEW GAME button
const reset = document.querySelector(".btn--new")
// hold score
const playerInitialScore = document.querySelector(".current-score")
// Player 01
const score01 = document.querySelector("#score--0")
// Player 02
const score02 = document.querySelector("#score--1")
// current score
const current01 = document.querySelector("#current--0")
const current02 = document.querySelector("#current--1")
// HOLD button
const hold = document.querySelector(".btn--hold")

// at the beginning of the game - START
score01.textContent = 0
score02.textContent = 0
playerInitialScore.textContent = 0
dice.classList.add("hidden")

let currentScore, activePlayer

currentScore = 0 // current score
activePlayer = 0 // current player
// at the beginning of the game - END


roll.addEventListener("click", function() {
  dice.classList.remove("hidden")
  // 1. Generating a random dice roll
  // declare the "diceNumber" here as the counter in order to alternate the "dice" images so we can have dice-1, dice-2, dice-3, dice-4,......
  const diceNumber = Math.trunc((Math.random()*6)+1) // we want to exclude "0" (zero) as the number of the dice, therefore we have "+1" here.
  // 2. Display dice
  console.log("diceNumber" + diceNumber);
  dice.src = `dice-${diceNumber}.png`
  // 3. Check for rolled 1: if true, switch to next player
  if (diceNumber !== 1) {
    // 1. Add dice to current score
    currentScore += diceNumber // "currentScore" here is the variable to store the current dice number
    // The reason for we cannot add the "diceNumber" directly to "current01" as it will be understood as a concatenation
    // example: 1 + 4 = 14 instead of "5" - Why?
    console.log("currentScore" + currentScore);
    // current01.textContent = currentScore
    document.getElementById(`current--${activePlayer}`).textContent = currentScore
  } else {
    // switch to next player
    activePlayer = activePlayer === 0 ? 1 : 0
  }
})
hold.addEventListener("click", function () {
  
})
reset.addEventListener("click", function() {
  score01.textContent = 0
  score02.textContent = 0
})