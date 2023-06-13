// <!-- Coding Challenge #1
// Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula:
// BMI = mass / height ** 2 = mass / (height * height) (mass in kg and height in meter).
// Your tasks:
// 1. StoreMark'sandJohn'smassandheightinvariables
// 2. CalculateboththeirBMIsusingtheformula(youcanevenimplementboth
// versions)
// 3. CreateaBooleanvariable'markHigherBMI'containinginformationabout
// whether Mark has a higher BMI than John.
// Test data:
// § Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
// § Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76 m tall.
// GOOD LUCK 😀 -->

// TEST 1
// § Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
// 1
let MarkMass = 78
let MarkHeight = 1.69

let JohnMass = 92
let JohnHeight = 1.95
// 2
// BMI = mass / height ** 2 = mass / (height * height) (mass in kg and height in meter).
let MarkBMI = MarkMass / MarkHeight ** 2
console.log("Mark\'s BMI is " + `${MarkBMI}`);

let JohnBMI = JohnMass / JohnHeight ** 2
console.log("John\'s BMI is " + `${JohnBMI}`);

// 3
let compareBMI = MarkBMI > JohnBMI
console.log(compareBMI);

// TEST 2

// § Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76 m tall.
let MarkMass02 = 95
let MarkHeight02 = 1.88

let JohnMass02 = 85
let JohnHeight02 = 1.76
// 2
// BMI = mass / height ** 2 = mass / (height * height) (mass in kg and height in meter).
let MarkBMI02 = MarkMass02 / MarkHeight02 ** 2
console.log("Mark\'s BMI is " + `${MarkBMI02}`);

let JohnBMI02 = JohnMass02 / JohnHeight02 ** 2
console.log("John\'s BMI is " + `${JohnBMI02}`);

// 3
let compareBMI02 = MarkBMI02 > JohnBMI02
console.log(compareBMI02);


// Coding Challenge #2
// Use the BMI example from Challenge #1, and the code you already wrote, and improve it.
// Your tasks:
// 1. Printaniceoutputtotheconsole,sayingwhohasthehigherBMI.Themessage is either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
// 2. UseatemplateliteraltoincludetheBMIvaluesintheoutputs.Example:"Mark's BMI (28.3) is higher than John's (23.9)!"
// Hint: Use an if/else statement 😉 GOOD LUCK 😀

// 1
if (MarkBMI02 > JohnBMI02) {
  console.log("Mark's BMI is higher than John");
} else {
  console.log("John's BMI is higher than Mark's");
}

// 2
if (MarkBMI02 > JohnBMI02) {
  console.log("Mark's BMI " + `${MarkBMI02}` + " is higher than John's " + `${JohnBMI02}`);
} else {
  console.log("John's BMI (" + `${JohnBMI02}` + ") is higher than Mark's (" + `${MarkBMI02}` + ")");
}