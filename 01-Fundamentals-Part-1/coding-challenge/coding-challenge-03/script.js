// Coding Challenge #3
// There are two gymnastics teams, Dolphins and Koalas. They compete against each other 3 times. The winner with the highest average score wins a trophy!
// Your tasks:
// 1. Calculatetheaveragescoreforeachteam,usingthetestdatabelow
// 2. Comparetheteam'saveragescorestodeterminethewinnerofthecompetition,
// and print it to the console. Don't forget that there can be a draw, so test for that
// as well (draw means they have the same average score)
// 3. Bonus1:Includearequirementforaminimumscoreof100.Withthisrule,a
// team only wins if it has a higher score than the other team, and the same time a score of at least 100 points. Hint: Use a logical operator to test for minimum score, as well as multiple else-if blocks 😉
// 4. Bonus2:Minimumscorealsoappliestoadraw!Soadrawonlyhappenswhen both teams have the same score and both have a score greater or equal 100 points. Otherwise, no team wins the trophy
// Test data:
// § Data 1: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
// § Data Bonus 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
// § Data Bonus 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106
// GOOD LUCK 😀

// Dolphins Score
let DolphinsScore01 = 96
let DolphinsScore02 = 108
let DolphinsScore03 = 89
// Koalas Score
let KoalasScore01 = 88
let KoalasScore02 = 91
let KoalasScore03 = 110

// 1 - Average score for each team
const DolphinsAverage = (DolphinsScore01 + DolphinsScore02 + DolphinsScore03) / 3
console.log("Dolphins' average 01 is " + `${DolphinsAverage}`);

const KoalasAverage = (KoalasScore01 + KoalasScore02 + KoalasScore03) / 3
console.log("Koalas' average 01 is " + `${KoalasAverage}`);

// 2
// if (DolphinsAverage > KoalasAverage) {
//   console.log("The WINNER is Dolphin with the average score of " + `${DolphinsAverage}`);
// } else if (KoalasAverage > DolphinsAverage) {
//   console.log("The WINNER is Koala with the average score of " + `${KoalasAverage}`);
// } else {
//   console.log("It's a DRAW");
// }

// 3 - Bonus 1 - Minimum Score of 100
// § Data Bonus 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
// Dolphins Score
DolphinsScore01 = 97
DolphinsScore02 = 112
DolphinsScore03 = 101
// Koalas Score
KoalasScore01 = 109
KoalasScore02 = 95
KoalasScore03 = 123

const DolphinsAverage02 = (DolphinsScore01 + DolphinsScore02 + DolphinsScore03) / 3
console.log("Dolphins' average 02 is " + `${DolphinsAverage02}`);

const KoalasAverage02 = (KoalasScore01 + KoalasScore02 + KoalasScore03) / 3
console.log("Koalas' average 02 is " + `${KoalasAverage02}`);

let minimumScore = 100
if (DolphinsAverage02 > KoalasAverage02 && DolphinsAverage02 >= minimumScore) {
  console.log("The WINNER is Dolphin with the average score of " + `${DolphinsAverage02}`);
} else if (KoalasAverage02 > DolphinsAverage02 && KoalasAverage02 >= minimumScore) {
  console.log("The WINNER is Koala with the average score of " + `${KoalasAverage02}`);
} else if (KoalasAverage02 === DolphinsAverage02 && KoalasAverage02 >= minimumScore && DolphinsAverage02 >= minimumScore)  {
  console.log("It's a DRAW.");
} else {
  console.log("No team wins the trophy!");
}

// 4 - Bonus 2
// § Data Bonus 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106
// Dolphins Score
DolphinsScore01 = 97
DolphinsScore02 = 112
DolphinsScore03 = 101
// Koalas Score
KoalasScore01 = 109
KoalasScore02 = 95
KoalasScore03 = 106

// Average score
const DolphinsAverage03 = (DolphinsScore01 + DolphinsScore02 + DolphinsScore03) / 3
console.log("Dolphins' average 03 is " + `${DolphinsAverage03}`);

const KoalasAverage03 = (KoalasScore01 + KoalasScore02 + KoalasScore03) / 3
console.log("Koalas' average 03 is " + `${KoalasAverage03}`);

if (DolphinsAverage03 > KoalasAverage03 && DolphinsAverage03 >= minimumScore) {
  console.log("The WINNER is Dolphin with the average score of " + `${DolphinsAverage03}`);
} else if (KoalasAverage03 > DolphinsAverage03 && KoalasAverage03 >= minimumScore) {
  console.log("The WINNER is Koala with the average score of " + `${KoalasAverage03}`);
} else if (KoalasAverage03 === DolphinsAverage03 && KoalasAverage03 >= minimumScore && DolphinsAverage03 >= minimumScore)  {
  console.log("It's a DRAW.");
} else {
  console.log("No team wins the trophy!");
}