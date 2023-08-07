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

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
// Move down for 006 forEach With Maps and Sets exercise
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// 'movements' is changed to 'transactions' for the exercise in '005 Looping Arrays forEach'
// Reason: I found 'transactions' was a better word and also I did not know this array information would be actually used for that exercise
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

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

// const transactions = [200,450,-400,3000,-650,-130,70,1300]

// for (const transaction of transactions) {
// for (const [i, transaction] of transactions.entries()) {
//   // console.log(transaction);
//   if (transaction > 0) {
//     console.log(`Transaction ${i+1}: You deposited ${transaction}`);
//   } else {
//     console.log(`Transaction ${i+1}: You withdrew ${Math.abs(transaction)}`);
//   }
// }

// The absolute value of a number 'x'. If x is negative (including -0), returns -x. Otherwise, returns x. The result is therefore always a positive number or 0.

////////////// forEach
// console.log('----------------- forEach -----------------');
// transactions.forEach( function (transaction) {
//   if (transaction > 0) {
//     console.log(`You deposited ${transaction}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(transaction)}`);
//   }
// })

// Orders of the parameters
// First value: current element
// Second value: index
// Third value: the entire array that we are looping
// transactions.forEach(function(transaction, i, arr){
//   if (transaction > 0) {
//     console.log(`Transaction ${i+1}: You deposited ${transaction}`);
//   } else {
//     console.log(`Transaction ${i+1}: You withdrew ${Math.abs(transaction)}`);
//   }
// })

// 0: function(200)
// 1: function(450)
// 2: function(400)
// ....

// Difference between 'forEach' and 'for (const ... of .....)' is that
// We cannot break out of the 'forEach' loop => 'continue' and 'break' method does NOT work in the 'forEach' loop at all
// 'forEach' will loop over the entire array
// While the names of the parameters are not important YET the orders of the parameters ARE important.

// What is the need for the parameter 'arr'???
// Reason: If your callback function were declared elsewhere then it has no idea what array it's being used for
// Read more at 'https://stackoverflow.com/questions/43500396/what-is-point-of-third-parameter-in-foreach-callback-function-in-javascript'

////////////////////////// 005 Looping Arrays forEach - END


////////////////////////// 006 forEach With Maps and Sets - START
///////////// MAP
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// USD: United States dollar
// The first argument is the 'current value' in the 'current iteration'
// The second argument is the 'key'
// The third argument is the entire map that is looped over
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
  // USD: United States dollar
  // EUR: Euro
  // GBP: Pound sterling
})
// Question: Why there is the difference between the orders of 'key' and 'value' between the parameters and when logging them out from the console?

///////////// SET
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR'])
// console.log(currenciesUnique); // Set(3) {'USD', 'GBP', 'EUR'}

currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
  // USD: USD
  // GBP: GBP
  // EUR: EUR

  // Reason: SET does NOT have neither the 'key' nor the 'indices' => NO value would make sense for the 'key'
  // Solution: Replace the 'key' with the underscore '_' which is a throw away variable, a convention in JavaScript
  // Read more: https://stackoverflow.com/questions/11406823/underscore-as-a-javascript-variable
})

////////////////////////// 006 forEach With Maps and Sets - END

