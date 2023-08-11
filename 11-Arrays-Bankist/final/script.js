'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  // Replace the old data with the new data at the same HTML position
  // remove old data in order to add new data
  containerMovements.innerHTML = '' // containerMovements.textContent = 0

  // add new data to the 'movements' HTML element
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    // movements__type--deposit
    // movements__type--withdrawal
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `
    // insertAdjacentHTML(position, text)
    // containerMovements = '.movements'
    containerMovements.insertAdjacentHTML('afterbegin', html)
    // afterbegin: new child element will appear before the existing child element
  })
}
displayMovements(account1.movements)

////////////////////////// 014 The reduce Method - START

// const labelBalance = document.querySelector('.balance__value');
const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0)
  labelBalance.textContent = `${balance}€`
}
calcDisplayBalance(account1.movements)

////////////////////////// 014 The reduce Method - END


////////////////////////// 016 The Magic of Chaining Methods - START
const calcSummaryDisplay = function(movements) {

  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  // const labelSumIn = document.querySelector('.summary__value--in');
  labelSumIn.textContent = `${incomes}€`

  const out = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  // const labelSumOut = document.querySelector('.summary__value--out');
  labelSumOut.textContent = `${Math.abs(out)}€` // "Math.abs()" gives a positive number

  // The interest is paid on each deposit
  const interest = movements
    // 'deposit' MUST always be a POSITIVE number AND a non-zero value => it MUST be greater than 0
    .filter(mov => mov > 0)
    // On each of a deposit we will receive 1.2%
    // Create a new array containing all the interests and then add them together at the end
    .map(deposit => (deposit * 1.2) / 100)
    // The interest is only paid if it at least 1 EUR
    // Only then it will be added to the total
    .filter((int, i , arr) => { // we do not need the 'i' but we would still have it there, anyway
      // console.log(arr);
      // (5) [2.4, 5.4, 36, 0.84, 15.6]
      // (5) [2.4, 5.4, 36, 0.84, 15.6]
      // (5) [2.4, 5.4, 36, 0.84, 15.6]
      // (5) [2.4, 5.4, 36, 0.84, 15.6]
      // (5) [2.4, 5.4, 36, 0.84, 15.6]
      return int >= 0
    })
    // Adding the interest together
    .reduce((acc, int) => acc + int, 0);
  // const labelSumInterest = document.querySelector('.summary__value--interest');
  labelSumInterest.textContent = `${interest}€`
}
calcSummaryDisplay(account1.movements)
////////////////////////// 016 The Magic of Chaining Methods - END


// console.log(containerMovements.innerHTML); // double check that old data has been erased by logging the content to the console.
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

////////////////////////// 003 Simple Array Methods - START
// let arr = ['a', 'b', 'c', 'd', 'e']

/////////// SLICE
//////// returns a shallow copy of a portion of an array into a new array object.
//////// The original array will not be modified.
// console.log(arr.slice(2)); // (3) ['c', 'd', 'e']
// console.log(arr.slice(2,4)); // (2) ['c', 'd']
// console.log(arr.slice(-2)); // (2) ['d', 'e']
// console.log(arr.slice(-1)); // ['e']
// console.log(arr.slice(1, -2)); // (2) ['b', 'c']
// console.log(arr.slice()); // (5) ['a', 'b', 'c', 'd', 'e']
// console.log([...arr]); // (5) ['a', 'b', 'c', 'd', 'e']
// console.log("The original array is ", arr); // (5) ['a', 'b', 'c', 'd', 'e']

/////////// SPLICE - The splice() method is a mutating method
// arr.splice(-1) // remove the last element in the array => (4) ['a', 'b', 'c', 'd']
// arr.splice(1, 2) // remove the 2nd and 3rd elements => (2) ['a', 'd']
// console.log("The original array has been modified ", arr); // (2) ['a', 'd']

/////////// REVERSE - reverses an array in place and returns the reference to the same array
// in place => modify that array in its original place in memory
// arr = ['a', 'b', 'c', 'd', 'e']
// const arr2 = ['j', 'i', 'h', 'g', 'f']
// console.log(arr2.reverse()); // (5) ['f', 'g', 'h', 'i', 'j']
// // console.log(arr2); // (5) ['f', 'g', 'h', 'i', 'j'] => The original array has been modified

/////////// CONCAT - merge two or more arrays. This returns a new array and does NOT change the original array
// const letters = arr.concat(arr2)
// console.log(letters);
// // (10) ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
// console.log([...arr, ...arr2]);
// // (10) ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

/////////// JOIN
////// creates and returns a new string by concatenating all of the elements in an array (or an array-like object)
////// separated by commas or a specified separator string

// // console.log(arr); // (5) ['a', 'b', 'c', 'd', 'e']
// console.log(arr.join(' - ')); // a - b - c - d - e
// // console.log(letters); // (10) ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
// console.log(letters.join(' ')); // a b c d e f g h i j

////////////////////////// 003 Simple Array Methods - END

////////////////////////// 004 The new 'at' method - START
//////////// it does not change the original data
// const arr = [23,11,64]
// const string = ['abc', 'cde', 'def', 'efg', 'fgi', 'ghi']
// console.log(arr[0]); // 23
// console.log(arr.at[0]); // undefined

// getting last array element
// console.log(arr[arr.length-1]); // 64
// console.log(arr.slice(-1)); // [64] => array with only 1 element
// console.log(arr.slice(-1)[0]); // 64
// console.log(arr.at(-1)); // 64
// console.log(arr.at(-2)); // 11
// console.log(arr); // (3) [23, 11, 64]

// console.log(string.slice(-2)); // n

// console.log(typeof 'bach'); // string
// console.log('bach'.slice(-1)); // h
// console.log('bach'.slice(-3)); // ach
// console.log('bach'.slice(-1)[0]); // h
// console.log('bach'.at(-1)); // h
// console.log('bach'.at(0)); // b
////////////////////////// 004 The new 'at' method - END


////////////////////////// 005 Looping Arrays forEach - START

// const movements = [200,450,-400,3000,-650,-130,70,1300]

// for (const movement of movements) {
// for (const [i, movement] of movements.entries()) {
//   // console.log(movement);
//   if (movement > 0) {
//     console.log(`movement ${i+1}: You deposited ${movement}`);
//   } else {
//     console.log(`movement ${i+1}: You withdrew ${Math.abs(movement)}`);
//   }
// }

// The absolute value of a number 'x'. If x is negative (including -0), returns -x. Otherwise, returns x. The result is therefore always a positive number or 0.

////////////// forEach
// console.log('----------------- forEach -----------------');
// movements.forEach( function (movement) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// })

// Orders of the parameters
// First value: current element
// Second value: index
// Third value: the entire array that we are looping
// movements.forEach(function(movement, i, arr){
//   if (movement > 0) {
//     console.log(`movement ${i+1}: You deposited ${movement}`);
//   } else {
//     console.log(`movement ${i+1}: You withdrew ${Math.abs(movement)}`);
//   }
// })

// 0: function(200)
// 1: function(450)
// 2: function(400)
// ....

//***** */ The difference between 'forEach' and 'for ( ... of .....)' is that
// 1. We cannot break out of the 'forEach' loop => 'continue' and 'break' method does NOT work in the 'forEach' loop at all
// 2. 'forEach' will loop over the entire array
// 3. forEach: While the names of the parameters are not important YET the orders of the parameters ARE important.

// What is the need for the parameter 'arr'???
// Reason: If your callback function were declared elsewhere then it has no idea what array it's being used for
// Read more at 'https://stackoverflow.com/questions/43500396/what-is-point-of-third-parameter-in-foreach-callback-function-in-javascript'

////////////////////////// 005 Looping Arrays forEach - END


////////////////////////// 006 forEach With Maps and Sets - START
///////////// MAP
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// // USD: United States dollar
// // The first argument is the 'current value' in the 'current iteration'
// // The second argument is the 'key'
// // The third argument is the entire map that is looped over
// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
//   // USD: United States dollar
//   // EUR: Euro
//   // GBP: Pound sterling
// })
// Question: Why there is the difference between the orders of 'key' and 'value' between the parameters and when logging them out from the console?

///////////// SET
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR'])
// // console.log(currenciesUnique); // Set(3) {'USD', 'GBP', 'EUR'}

// currenciesUnique.forEach(function (value, _, map) {
//   console.log(`${value}: ${value}`);
//   // USD: USD
//   // GBP: GBP
//   // EUR: EUR

//   // Reason: SET does NOT have neither the 'key' nor the 'indices' => NO value would make sense for the 'key'
//   // Solution: Replace the 'key' with the underscore '_' which is a throw away variable, a convention in JavaScript
//   // Read more: https://stackoverflow.com/questions/11406823/underscore-as-a-javascript-variable
// })

////////////////////////// 006 forEach With Maps and Sets - END


////////////////////////// Coding Challenge #1 - START

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const dogsJulia = [3, 5, 2, 12, 7]
// const dogsKate = [4, 1, 15, 8, 3]

// const checkDogs = function (dogsJulia, dogsKate) {
//   // create a shallow of the dog array
//   const dogsJuliaCheck = dogsJulia.slice();

//   ////// 1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! => the FIRST and the LAST TWO animals are cats
//   // Removing the FIRST and the LAST TWO animals
//   dogsJuliaCheck.splice(0, 1)
//   // console.log(dogsJuliaCheck); // (4) [5, 2, 12, 7]
//   dogsJuliaCheck.splice(-2)
//   // console.log(dogsJuliaCheck); // (2) [5, 2]

//   ////// 2. Create an array with both Julia's (corrected) and Kate's data
//   // const dogs = dogsJuliaCheck.concat(dogsKate)
//   // console.log(dogs); // (7) [5, 2, 4, 1, 15, 8, 3]

//   ////// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
//   // A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.
//   dogs.forEach(function(dog, i, arr) {
//     if (dog > 3 || dog === 3) {
//       console.log(`Dog number ${i+1} is ${dog} years old so it is an adult dog.`);
//     } else {
//       console.log(`Dog number ${i+1} is ${dog} years old so it is a puppy.`);
//     }
//   })
// }

// TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3])
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4])
////////////////////////// Coding Challenge #1 - END


////////////////////////// 011 The map Method - START
// const eurToUsd = 1.1;
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]

// Below are two different paradigms - different ways or styles in which a given program or programming language can be organized
// 'map' method - use a function to solve the problem of creating a new array
// Functional programming style
// The modern way in programming is to use 'method' together with 'callback' function
// const movementsUsd = movements.map(function (mov) {
//   return mov * eurToUsd
// });

// Replacing the callback function with an arrow function
// const movementsUsd = movements.map(mov => mov * eurToUsd);
// // console.log(movements);
// // (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
// console.log(movementsUsd);
// (8) [220.00000000000003, 495.00000000000006, -440.00000000000006, 3300.0000000000005, -715.0000000000001, -143, 77, 1430.0000000000002]

// loop over one array and manually creating a new array
// const movementsUSDfor = [];
// for (const mov of movements) movementsUSDfor.push(mov * eurToUsd)
// console.log(movementsUSDfor);
// (8) [220.00000000000003, 495.00000000000006, -440.00000000000006, 3300.0000000000005, -715.0000000000001, -143, 77, 1430.0000000000002]


//////////////// Use the 'map' method to loop over the 'movements' array - START

// (originally the 'movements' array). We did this before using 'forEach'
// 005 Looping Arrays forEach exercise
// const movements = [200,450,-400,3000,-650,-130,70,1300]
// console.log("------ Use the 'map' method to loop over array 'movements' ------");
// const bankTransaction = movements.map(function (value, i, arr) {
//   if (value > 0) {
//     console.log(`movement ${i+1}: You deposited ${value}`);
//   } else {
//     console.log(`movement ${i+1}: You withdrew ${Math.abs(value)}`);
//   }
// })

// Use the arrow function and ternary operator with the 'map' method - Self-solution
// console.log("------ Use the arrow function and ternary operator with the 'map' method - Self-solution ------");

// const bankTransaction1 = movements.map((value, i, arr) =>
//   value > 0
//     ? console.log(`movement ${i + 1}: You deposited ${value}`)
//     : console.log(`movement ${i + 1}: You withdrew ${Math.abs(value)}`)
// );

// Use the arrow function with the 'map' method - Video solution
// console.log("------ Use the arrow function and ternary operator with the 'map' method - video solution ------");
// const bankTransaction2 = movements.map(
//   (value, i) =>
//     `movement ${i + 1}: You ${
//       value > 0 ? 'deposited' : 'withdrew'
//     } ${Math.abs(value)}`
// );
// console.log(bankTransaction2);
// (8) ['movement 1: You deposited 200', 'movement 2: You deposited 450', 'movement 3: You withdrew 400', 'movement 4: You deposited 3000', 'movement 5: You withdrew 650', 'movement 6: You withdrew 130', 'movement 7: You deposited 70', 'movement 8: You deposited 1300']

//////////////// Use the 'map' method to loop over the 'movements' array - END

////////////////////////// 011 The map Method - END



////////////////////////// 012 Computing Usernames - START
// take the initial name => s t w
// const user = 'Steven Thomas Williams'
// Normal callback function
// const userName = user
//   .toLowerCase()
//   .split(' ')
//   .map(function (name) {
//     return name[0];
//   })
//   .join('');

// Arrow function
// const createUserName = function (user) {
//   const userName = user
//   .toLowerCase()
//   .split(' ')
//   .map(name => name[0])
//   .join('');
//   return userName
// }
// console.log(createUserName("Wolfgang Amadeus Mozart"));
// split() method takes a pattern and divides a String into an ordered list of substrings
// split() method returns the Array of substrings

// console.log(user.toLowerCase().split(' '));
// // (3) ['steven', 'thomas', 'williams']
// console.log(user.toLowerCase().split(' ').map(function (name) {return name[0]}));
// // (3) ['s', 't', 'w']
// console.log(user.toLowerCase().split(' ').map(function (name) {return name[0]}).join(''));
// // stw

///////////// Compute one username for each of the account holder in the account array
// what we want to do is to modify the object so the existing elements in the "accounts" array
// we do not want to create a new array in this situation
// const accounts = [account1, account2, account3, account4];
// we want to loop over this array "accounts" and then do something with it
// we use "forEach" for this array
// const createUserName = function(accs) {
//   accs.forEach(function(acc) {
//     acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('')
//   });
// };
// createUserName(accounts)
// console.log(accounts);
// (4) [{…}, {…}, {…}, {…}]
// {owner: 'Jonas Schmedtmann', movements: Array(8), interestRate: 1.2, pin: 1111, username: 'js'}
// {owner: 'Jessica Davis', movements: Array(8), interestRate: 1.5, pin: 2222, username: 'jd'}
// {owner: 'Steven Thomas Williams', movements: Array(8), interestRate: 0.7, pin: 3333, username: 'stw'}
// {owner: 'Sarah Smith', movements: Array(5), interestRate: 1, pin: 4444}

////////////////////////// 012 Computing Usernames - END


////////////////////////// 013 The filter Method - START
// filter() - creates a shallow copy filtered down to just the elements from the given array that pass the test implemented
// const deposits = movements.filter(function (mov) {
//   return mov > 0
// })
// console.log(movements); // (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
// console.log(deposits); // (5) [200, 450, 3000, 70, 1300]

// const depositFor = []
// for (const mov of movements) {
//   // console.log(mov);
//   if (mov > 0) {
//     depositFor.push(mov)
//   }
// }
// console.log(depositFor); // (5) [200, 450, 3000, 70, 1300]

// Function expression
// const withdrawals = movements.filter(function (mov) {
//   return mov < 0
// })

// filter with arrow function
// const withdrawals = movements.filter(mov => mov < 0)
// console.log(withdrawals); // (3) [-400, -650, -130]

// Summary
// with the 'for' loop, you will then need to
// - declare a new array
// - check every element from the original array
// - push the elements that are satisfied with the condition in a new array
// - log out the results.

// with the 'filter' method
// - you declare a new variable
// - assign the original array with the 'filter' method applied to that new variable
// - return the new array which contains the qualified array element for the condition.

////////////////////////// 013 The filter Method - END


////////////////////////// 014 The reduce Method - START
// - reduces an array of values down to just one value
// - it runs a reducer function on each element of the array to get the output value

// console.log(movements); // (8) [200, 450, -400, 3000, -650, -130, 70, 1300]

// accumulator => SNOWBALL
// acc - accumulator
// cur - currentValue
// i - currentIndex
// arr - array
// const balance = movements.reduce(function(acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur
// }, 0);
// console.log(balance); // 3840 = 200 + 450 - 400 + 3000 - 650 - 130 + 70 + 1300 (+ 0)

// arrow function
// remove unnecessary parameters
const balance = movements.reduce((acc, cur) => acc + cur, 0);
// console.log(balance); // 3840 = 200 + 450 - 400 + 3000 - 650 - 130 + 70 + 1300 (+ 0)

let balance2 = 0
for (const mov of movements) balance2 += mov
// console.log(balance2); // 3840

//////////// Maximum value
// const maximumValue = movements.reduce(function (acc, mov) {
//   if (acc > mov) {
//     return acc
//   } else {
//     return mov
//   }
// }, movements[0])

const maximumValue = movements.reduce((acc, mov) => (acc > mov) ? acc : mov, movements[0])
// console.log(maximumValue); // 3000

////////////////////////// 014 The reduce Method - END


////////////////////////// 015 Coding Challenge #2 - START
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/


////// This code does not work => WHY??
// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(function(age) {
//     if (age <= 2) {
//       age = age * 2
//     } else {
//       age = 16 + age * 4
//     }
//     console.log(humanAges); // Uncaught ReferenceError: Cannot access 'humanAges' before initialization
//   })
// }
////// This code does not work => WHY??


// const calcAverageHumanAge = function(ages) {
//   // 1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
//   const humanAges = ages.map(age => age <= 2 ? 2 * age : 16 + age * 4)
//   console.log(humanAges);
//   // (7) [36, 4, 32, 2, 76, 48, 28]
//   // (7) [36, 4, 32, 2, 76, 48, 28]
//   // (7) [80, 40, 56, 36, 40, 2, 32]

//   // 2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
//   const adults = humanAges.filter(age => age >= 18)
//   console.log(adults);
//   // (5) [36, 32, 76, 48, 28]
//   // (5) [36, 32, 76, 48, 28]
//   // (6) [80, 40, 56, 36, 40, 32]

//   // 3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
//   // const average = adults.reduce((acc, age) => acc + age, 0) / adults.length
//   const average = adults.reduce((acc, age, i , arr) => acc + age / arr.length)
//   // 2 3. (2+3)/2 = 2.5 === 2/2 + 3/2 = 2.5
//   return average;
// }

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3])

// // 4. Run the function for both test datasets
// const average1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3])
// const average2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4])
// console.log(average1, average2);
// // 72.79999999999998
// // 114

////////////////////////// 015 Coding Challenge #2 - END


////////////////////////// 016 The Magic of Chaining Methods - START
// NOTE:
// Case 1: Do NOT overuse the chaining method
// Reason 1: Huge array will cause performance issue
// Solution 1 (example): Optimize the 'map' method and call it once instead of many times.

// Case 2: It is a BAD JS practice to chain methods that mutate the original array e.g. splice or reverse methods (It is ok for small application as the bankist app)
// Solution 2: Avoid mutating array

// const eurToUsd = 1.1

// This function does not work => WHY??
// const totalDepositsUSD = movements.filter(function (mov) {
//   return mov > 0
// }).map(function (mov) {
//   return mov * eurToUsd
// }).reduce(function(acc, mov) {
//   return acc + mov, 0
// })
// console.log(totalDepositsUSD); // 0

// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurToUsd)
//   .reduce((acc, mov) => acc + mov, 0);

// PIPELINE
// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   .map((mov, i, arr) => {
//     console.log(arr);
//     // (5) [200, 450, 3000, 70, 1300]
//     // (5) [200, 450, 3000, 70, 1300]
//     // (5) [200, 450, 3000, 70, 1300]
//     // (5) [200, 450, 3000, 70, 1300]
//     // (5) [200, 450, 3000, 70, 1300]
//     return mov * eurToUsd;
//   })
//   // .map(mov => mov * eurToUsd)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositsUSD); // 5522.000000000001
////////////////////////// 016 The Magic of Chaining Methods - END


///////////////////////////////////////// Coding Challenge #3 - START

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const calcAverageHumanAge = ages => ages.map(age => age <= 2 ? 2 * age : 16 + age * 4).filter(age => age >= 18).reduce((acc, age, i , arr) => acc + age / arr.length)

// // Run the function for both test datasets
// const average1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3])
// const average2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4])
// console.log(average1, average2);
// 72.79999999999998
// 114
///////////////////////////////////////// Coding Challenge #3 - END


///////////////////////////////////////// 018 The find Method - START
const firstWithdrawal = movements.find(mov => mov < 0)
console.log(movements); // (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
console.log(firstWithdrawal); // -400

console.log(accounts);
// {owner: 'Jonas Schmedtmann', movements: Array(8), interestRate: 1.2, pin: 1111}
// {owner: 'Jessica Davis', movements: Array(8), interestRate: 1.5, pin: 2222}
// {owner: 'Steven Thomas Williams', movements: Array(8), interestRate: 0.7, pin: 3333}
// {owner: 'Sarah Smith', movements: Array(5), interestRate: 1, pin: 4444}
const account = accounts.find(acc => acc.owner === 'Jessica Davis')
console.log(account); // {owner: 'Jessica Davis', movements: Array(8), interestRate: 1.5, pin: 2222}
///////////////////////////////////////// 018 The find Method - END