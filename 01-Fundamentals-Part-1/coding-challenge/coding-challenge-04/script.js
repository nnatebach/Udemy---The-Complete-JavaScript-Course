// Coding Challenge #4
// Steven wants to build a very simple tip calculator for whenever he goes eating in a restaurant. In his country, it's usual to tip 15% if the bill value is between 50 and 300. If the value is different, the tip is 20%.
// Your tasks:
// 1. Calculatethetip,dependingonthebillvalue.Createavariablecalled'tip'for this. It's not allowed to use an if/else statement 😅 (If it's easier for you, you can start with an if/else statement, and then try to convert it to a ternary operator!)
// 2. Printastringtotheconsolecontainingthebillvalue,thetip,andthefinalvalue (bill + tip). Example: “The bill was 275, the tip was 41.25, and the total value 316.25”
// Test data:
// § Data 1: Test for bill values 275, 40 and 430 Hints:
// § To calculate 20% of a value, simply multiply it by 20/100 = 0.2 
// § Value X is between 50 and 300, if it's>= 50 && <= 300😉
// GOOD LUCK 😀


let bill
let tip

// 1
// 275
bill = 275
bill >= 50 && bill <= 300 ? tip = bill * 15 / 100 : tip = bill * 20 / 100
console.log(tip);

// 40
bill = 40
bill >= 50 && bill <= 300 ? tip = bill * 15 / 100 : tip = bill * 20 / 100
console.log(tip);

// 430
bill = 430
bill >= 50 && bill <= 300 ? tip = bill * 15 / 100 : tip = bill * 20 / 100
console.log(tip);


// 2
// 275
bill = 275
bill >= 50 && bill <= 300 ? tip = bill * 15 / 100 : tip = bill * 20 / 100
console.log("The bill was " + `${bill}` + ". The tip was " + `${tip}` + ". And the total value was " + (bill+tip));

// 40
bill = 40
bill >= 50 && bill <= 300 ? tip = bill * 15 / 100 : tip = bill * 20 / 100
console.log("The bill was " + `${bill}` + ". The tip was " + `${tip}` + ". And the total value was " + (bill+tip));

// 430
bill = 430
bill >= 50 && bill <= 300 ? tip = bill * 15 / 100 : tip = bill * 20 / 100
console.log("The bill was " + `${bill}` + ". The tip was " + `${tip}` + ". And the total value was " + (bill+tip));