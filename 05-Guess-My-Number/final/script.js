'use strict';

let score = Number(document.querySelector(".score").textContent)
console.log(`The original score is ${score}`, typeof score);
score = 20

let highScore = document.querySelector(".highscore").textContent
highScore = 0

const message = function (message) {
  document.querySelector(".message").textContent = message
}

// 3 situations
// 1 - no guess
// correct guess - guess === number
// incorrect guess - guess !== number

// demo code - before checking final code
/*
document.querySelector(".check").addEventListener("click", function() {
  const guess = Number(document.querySelector(".guess").value);
  document.querySelector(".number").textContent = Math.trunc(Math.random() * 20)
  console.log(guess);
  const secretNumber = document.querySelector(".number").textContent
  if (!guess) { // if there is no guess
    console.log("No number!!");
  } else if (guess === secretNumber) {
    message("Correct number!!")
  } else if (guess > secretNumber) {
    if (guess > 20) { // guess number must be less than 20
      alert("Invalid input. Input must be between 1 and 20")
    } else {
      score-- // subtract score by 1
      document.querySelector(".score").textContent = score // update "score" number
      console.log("The score is " + score--); // log subtracted "score" number to the console
      message("Too high!!")
    }
  } else if (guess < secretNumber) { // guess number must be greater than 1, guess number must be a positive number
    if (guess < 1) {
      alert("Invalid input. Input must be between 1 and 20")
    } else {
      score--
      document.querySelector(".score").textContent = score
      console.log("The score is " + score--);
      message("Too low!!")
    }
  }
})
*/

// after checking final code

document.querySelector(".check").addEventListener("click", function () {
  document.querySelector(".score").textContent = 20
  const guess = Number(document.querySelector(".guess").value)
  console.log(guess);
  document.querySelector(".number").textContent = Math.trunc(Math.random()*20)
  const secretNumber = Number(document.querySelector(".number").textContent)
  console.log("The secret number is " + secretNumber, typeof secretNumber);
  if (!guess) {
    alert("There must be a guess!")
  } else if (guess === secretNumber) {
    message("Correct number!!")
    if (score > highScore) {
      highScore = score
      document.querySelector(".highscore").textContent = highScore
    }
  } else if (guess !== secretNumber) {
    score--
    console.log("The score is " + score, typeof score);
    Number(document.querySelector(".score").textContent = score)
    if (guess > secretNumber) {
      message("Too high!!")
    } else if (guess < secretNumber) {
      message("Too low!")
    }
  } else if (score === 0) {
    console.log("The score is " + score, typeof score);
    message("You lost the game!!")
  }
})

// again feature
document.querySelector(".again").addEventListener("click", function (){
  document.querySelector(".number").textContent = "?"
  document.querySelector(".guess").value = ""
  message("Start guessing...")
  document.querySelector(".score").textContent = 20
})

// bonus check for "guess" must always be between 1 and 20