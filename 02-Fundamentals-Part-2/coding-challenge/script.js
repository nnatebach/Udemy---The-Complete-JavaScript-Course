// Coding Challenge #1
// Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new gymnastics discipline, which works differently.
// Each team competes 3 times, and then the average of the 3 scores is calculated (so one average score per team).
// A team only wins if it has at least double the average score of the other team. Otherwise, no team wins!
// Your tasks:
// 1. Createanarrowfunction'calcAverage'tocalculatetheaverageof3scores
// 2. Usethefunctiontocalculatetheaverageforbothteams
// 3. Createafunction'checkWinner'thattakestheaveragescoreofeachteam
// as parameters ('avgDolhins' and 'avgKoalas'), and then logs the winner to the console, together with the victory points, according to the rule above. Example: "Koalas win (30 vs. 13)"
// 4. Usethe'checkWinner'functiontodeterminethewinnerforbothData1and Data 2
// 5. Ignoredrawsthistime

// Test data:
// § Data 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49 
// § Data 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27
// Hints:
// § To calculate average of 3 values, add them all together and divide by 3
// § To check if number A is at least double number B, check for A >= 2 * B.
// Apply this to the team's average scores 😉



// Data 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49

// const calcAverage = function (a,b,c) {
//   return (a+b+c)/3
// }
// const calcAverage = (a,b,c) => (a+b+c)/3
// console.log(calcAverage(3,4,5));

// let Dolphins = calcAverage(44,23,71)
// console.log(Dolphins); // 46
// let Koalas = calcAverage(65,54,49)
// console.log(Koalas); // 56

// const checkWinner = function (avgDolphins, avgKoalas) {
//   if (avgDolphins >= avgKoalas * 2) {
//     console.log(`The Winner is Dolphins with ${avgDolphins} vs. ${avgKoalas}`);
//   } else if (avgKoalas >= avgDolphins * 2) {
//     console.log(`The Winner is Koalas with ${avgKoalas} vs. ${avgDolphins}`);
//   } else {
//     console.log("No team wins!");
//   }
// }

// checkWinner(Dolphins, Koalas)



// Data 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27
let Dolphins = (85,54,41)
let Koalas = (23,34,27)

const avgScore = function (a,b,c) {
  return (a+b+c)/3
}

let avgDolphins = avgScore(85,54,41)
console.log(avgDolphins);
let avgKoalas = avgScore(23,34,27)
console.log(avgKoalas);

const checkWinner = function (avgDolphins, avgKoalas) {
  if (avgDolphins >= avgKoalas * 2) {
    console.log(`The Winner is Dolphins with ${avgDolphins} vs. ${avgKoalas}`);
  } else if (avgKoalas >= avgDolphins * 2) {
    console.log(`The Winner is Koalas with ${avgKoalas} vs. ${avgDolphins}`);
  } else {
    console.log(`No team wins!!`);
  }
}
checkWinner(avgDolphins, avgKoalas)

// Coding Challenge #2
// Steven is still building his tip calculator, using the same rules as before: Tip 15% of the bill if the bill value is between 50 and 300, and if the value is different, the tip is 20%.
// Your tasks:
// 1. Writeafunction'calcTip'thattakesanybillvalueasaninputandreturns the corresponding tip, calculated based on the rules above (you can check out the code from first tip calculator challenge if you need to). Use the function type you like the most. Test the function using a bill value of 100
// 2. Andnowlet'susearrays!Socreateanarray'bills'containingthetestdata below
// 3. Createanarray'tips'containingthetipvalueforeachbill,calculatedfrom the function you created before
// 4. Bonus:Createanarray'total'containingthetotalvalues,sothebill+tip 
// Test data: 125, 555 and 44
// Hint: Remember that an array needs a value in each position, and that value can actually be the returned value of a function! So you can just call a function as array values (so don't store the tip values in separate variables first, but right in the new array) 😉
// GOOD LUCK 😀


// 1
// const calcTip = function (bill) {
//   if (50 <= bill && bill <= 300) {
//     console.log(50 <= bill <= 300);
//     console.log(`The tip is ` + (bill * 15 /100));
//   } else {
//     console.log(`The tip is ` + (bill * 20 /100));
//   }
// }

/*
// arrow function + ternary operator
const calcTip = bill => (50 <= bill && bill <= 300) ? bill * 15 /100 : bill * 20 /100

calcTip(100)

// 2
const bills = [125,555,44] // array containing test data

// 3
const tips = [] // array containing tip for each bill

const calcAllTips = () => {
  let b
  for (b=0;b<=bills.length-1;b++) {
    console.log(bills[b]); // all bills
    const allTips = calcTip(bills[b])
    tips.push(allTips)
    console.log(tips[b]); // all tips
    console.log(`The bills are ` + `${bills[b]}` + ` and the tips are ` + `${tips[b]}`);
  }
}

calcAllTips()

// 4
const total = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]] // array containing total values, bill+tip
for (let t=0;t<=total.length-1;t++) {
  console.log("The total values are " + total[t]);
}
*/

// Coding Challenge #3
// Let's go back to Mark and John comparing their BMIs! This time, let's use objects to implement the calculations! Remember: BMI = mass / height ** 2 = mass / (height * height) (mass in kg and height in meter)
// Your tasks:
// 1. Foreachofthem,createanobjectwithpropertiesfortheirfullname,mass,and height (Mark Miller and John Smith)
// 2. Createa'calcBMI'methodoneachobjecttocalculatetheBMI(thesame method on both objects). Store the BMI value to a property, and also return it from the method
// 3. LogtotheconsolewhohasthehigherBMI,togetherwiththefullnameandthe respective BMI. Example: "John's BMI (28.3) is higher than Mark's (23.9)!"
// Test data: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
// GOOD LUCK 😀

// 1
const Mark = {
  fullname: "Mark Miller",
  mass: 78,
  height: 1.69,
  // 2
  calcBMI() {
    const BMI = this.mass / (this.height ** 2)
    return BMI
  },
}

// 1
const John = {
  fullname: "John Smith",
  mass: 92,
  height: 1.95,
  // 2
  calcBMI() {
    const BMI = this.mass / (this.height ** 2)
    return BMI
  }
}

// 3
const MarkBMI = Mark.calcBMI()
console.log(MarkBMI);

const JohnBMI = John.calcBMI()
console.log(JohnBMI);

if (MarkBMI > JohnBMI) {
  console.log(`Mark's BMI ${MarkBMI} is higher than John's BMI ${JohnBMI}`);
} else if (JohnBMI > MarkBMI) {
  console.log(`John's BMI ${JohnBMI} is higher than Mark's BMI ${MarkBMI}`);
}

// Coding Challenge #4
// Let's improve Steven's tip calculator even more, this time using loops!
// Your tasks:
// 1. Create an array 'bills' containing all 10 test bill values
// 2. Create empty arrays for the tips and the totals ('tips' and 'totals')
// 3. Use the 'calcTip' function we wrote before (no need to repeat) to calculate tips and total values (bill + tip) for every bill value in the bills array. Use a for loop to perform the 10 calculations!
// Test data: 22, 295, 176, 440, 37, 105, 10, 1100, 86 and 52
// Hints: Call ‘calcTip ‘in the loop and use the push method to add values to the
// tips and totals arrays 😉 
// Bonus:
// 4. Bonus:Writeafunction'calcAverage'whichtakesanarraycalled'arr'as an argument. This function calculates the average of all numbers in the given array. This is a difficult challenge (we haven't done this before)! Here is how to solve it:
// 4.1. First, you will need to add up all values in the array. To do the addition, start by creating a variable 'sum' that starts at 0. Then loop over the array using a for loop. In each iteration, add the current value to the 'sum' variable. This way, by the end of the loop, you have all values added together
// 4.2. To calculate the average, divide the sum you calculated before by the length of the array (because that's the number of elements)
// 4.3. Call the function with the 'totals' array
// GOOD LUCK 😀

// 1
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52] // 10 test bill values

// 2
const tips = []
const totals = []

// 3 - transforming function express to arrow function
const calcTip = (bill) => {
  if (50 <= bill && bill <= 300) {
    return bill * 15 / 100
  } else {
    return bill * 20 / 100
  }
}

for (let i=0;i<=bills.length-1;i++) {
  // console.log(`The bill is ${bills[i]}`);
  tips.push(calcTip(bills[i]))
  // console.log(`The tips is ${tips[i]}`);
  totals.push(tips[i] + bills[i])
  console.log(`The total expenses is ${totals[i]}`);
}
// 4
let sum
function calcAverage(arr) {
  sum = 0 // what is the difference between placing "sum = 0" before and after the loop???
  for (i=0;i<=arr.length-1;i++) {
    // console.log(arr.length);
    sum += arr[i]
    console.log(sum);
  }
  const arrAverage = sum / arr.length
  console.log(`The average of all elements in the array is ${arrAverage}`);
}

calcAverage(totals)