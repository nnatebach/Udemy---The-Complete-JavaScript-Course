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

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

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
const arr = [23,11,64]
const string = ['abc', 'cde', 'def', 'efg', 'fgi', 'ghi']
console.log(arr[0]); // 23
console.log(arr.at[0]); // undefined

// getting last array element
console.log(arr[arr.length-1]); // 64
console.log(arr.slice(-1)); // [64] => array with only 1 element
console.log(arr.slice(-1)[0]); // 64
console.log(arr.at(-1)); // 64
console.log(arr.at(-2)); // 11
console.log(arr); // (3) [23, 11, 64]

console.log(string.slice(-2)); // n

console.log(typeof 'bach'); // string
console.log('bach'.slice(-1)); // h
console.log('bach'.slice(-3)); // ach
console.log('bach'.slice(-1)[0]); // h
console.log('bach'.at(-1)); // h
console.log('bach'.at(0)); // b
////////////////////////// 004 The new 'at' method - END