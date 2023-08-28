'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2022-11-18T21:31:17.178Z',
    '2022-12-23T07:42:02.383Z',
    '2022-01-28T09:15:04.904Z',
    '2023-04-01T10:17:24.185Z',
    '2023-08-23T14:11:59.604Z',
    '2023-08-22T17:01:17.194Z',
    '2023-08-22T23:36:17.929Z',
    '2023-08-26T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2023-08-25T14:18:46.235Z',
    '2023-08-27T16:33:06.386Z',
    '2023-08-24T14:43:26.374Z',
    '2023-08-26T18:49:59.371Z',
    '2023-08-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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
// Functions

////////////////////////////////// 010 Operations With Dates - START

const formatMovementDate = function (date) {
  // The Math.abs() static method returns the absolute value of a number - POSITIVE NUMBERS ONLY
  const calcDayPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24))
  const dayPassed = calcDayPassed(new Date(), date)
  // console.log(dayPassed);

  if (dayPassed === 0) return "Today"
  if (dayPassed === 1) return "Yesterday"
  if (dayPassed <= 7) return `${dayPassed} days ago`
  // else {
    const year = date.getFullYear()
    const month = `${date.getMonth() + 1}`.padStart(2, 0)
    const day = `${date.getDate()}`.padStart(2, 0)
    return `${day}/${month}/${year}`
  // }
}

////////////////////////////////// 010 Operations With Dates - END

////////////////////////////////// 009 Adding Dates to Bankist App - START
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  
  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    // Looping over 2 arrays at the same time
    // "i" is the current index in the "movements" array. And the same index is going to point to the equivalent date in this "movementsDates" array.
    // Same index => same position

    // Reason: We need the access to the 'day', 'month', and 'year'
    // Problem: "acc.movementsDates[i]" is a time formatted string
    // Solution: We need to create a new "Date" object in order to call the methods from the "Date" object
    const date = new Date(acc.movementsDates[i])
    const displayDate = formatMovementDate(date)

  ////////////////////////////////// 009 Adding Dates to Bankist App - END

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out.toFixed(2))}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  // displayMovements(acc.movements);
  ////////////////////////////////// 009 Adding Dates to Bankist App - START
  displayMovements(acc);
  ////////////////////////////////// 009 Adding Dates to Bankist App - END

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

// FAKE ALWAYS LOGGED IN
currentAccount = account1
updateUI(currentAccount)
containerApp.style.opacity = 100

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log("currentAccount", currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //// Create current date and time
    const now = new Date()
    const year = now.getFullYear()

    // const month = now.getMonth() + 1 // 8
    // const day = now.getDate() // 26

    // Add "0" before "month" and "date": 8 => 08
    const month = `${now.getMonth() + 1}`.padStart(2, 0)
    const day = `${now.getDate()}`.padStart(2, 0)

    const hours = `${now.getHours()}`.padStart(2, 0)
    const minutes = `${now.getMinutes()}`.padStart(2, 0)

    // const labelDate = document.querySelector('.date');
    // This is now a static time
    labelDate.textContent = `${day}/${month}/${year}, ${hours}:${minutes}`

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    ////////////////////////////////// 009 Adding Dates to Bankist App - START
    // Problem 1: Date shows "NAN/NAN/NAN" when requesting the new loan (new transfer)
    // Reason 1: The "movementsDates" does not have any date
    // - movements: Array(9)
    // - movementsDates: Array(8)
    // Solution 1: Whenever there is a new transfer or a new loan, we need to not only push the value into the "movements" array but also into the "movementsDates"
    // We need to push in the date for both the sender and the receiver

    // Problem 2: "new Date()" returns an object, we need a string
    // Solution 2: use "toISOString()"
    currentAccount.movementsDates.push(new Date().toISOString())
    receiverAcc.movementsDates.push(new Date().toISOString())
    ////////////////////////////////// 009 Adding Dates to Bankist App - END

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    ////////////////////////////////// 009 Adding Dates to Bankist App - START
    // Add loan date
    // toISOString() method of Date instances returns a string representing this date in the date time string format
    // currentAccount.movementsDates.push(new Date()) // Mon Aug 28 2023 10:59:47 GMT+0700 (Indochina Time)
    currentAccount.movementsDates.push(new Date().toISOString()) // "2023-08-28T04:00:38.039Z"
    // console.log(currentAccount.movementsDates.push(new Date().toISOString()));
    ////////////////////////////////// 009 Adding Dates to Bankist App - END

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

////////////////////////////////// 003 Converting and Checking Numbers - START

// console.log(23 === 23.0); // true

// // Base 10 - 0 to 9. 1 / 10 = 0.1. 3 / 10 = 3.33333333
// // Binary base 2 - 0 1
// console.log(.1 + .2); // 0.30000000000000004
// console.log(.1 + .2 === .3); // false

// // Conversion
// console.log(Number(23)); // 23
// console.log(+'23'); // 23

// // Parsing
// console.log(Number.parseInt('30px')); // 30
// console.log(Number.parseInt('e23')); // NaN

// console.log(Number.parseInt('2.5rem')); // 2
// // This is the GO TO method whenever you need to read a value out of a string
// console.log(Number.parseFloat('2.5rem')); // 2.5

// // This function here is also a global function => We would not have to call it on 'Number', that would also work.
// // However, this is the traditional way. In modern JavaScript, it is more encouraged to call the function 'parseFloat' on the 'Number' object.
// // console.log(parseFloat('2.5rem')); // 2.5

// ////// Check if value is NaN
// //// The isNaN() function determines whether a value is NaN
// // - first converting the value to a number if necessary.
// // - Because coercion inside the isNaN() function can be surprising, you may prefer to use Number.isNaN().
// console.log(Number.isNaN(20)); // false
// console.log(Number.isNaN('20')); // false

// // Converting the '20X' string to a number (by adding the 'plus' sign (+) before it) => Not a number
// console.log(Number.isNaN(+'20X')); // true

// // Diving a number by zero (0) is NOT allowed in mathematics since that will give infinity
// console.log(Number.isNaN(23 / 0)); // false


// ////// Check if value is finite
// // isFinite - A better method for testing finite value
// // The isFinite() function determines whether a value is finite, first converting the value to a number if necessary. A finite number is one that's not NaN or ±Infinity. Because coercion inside the isFinite() function can be surprising, you may prefer to use Number.isFinite().
// // This is the GO TO method to check whether something is a number or not.
// console.log(Number.isFinite(20)); // true
// console.log(Number.isFinite('20')); // false
// console.log(Number.isFinite(+'20X')); // false
// console.log(Number.isFinite(23 / 0)); // false


// ////// Check if value is an Integer
// // The Number.isInteger() static method determines whether the passed value is an integer.
// console.log(Number.isInteger(23)); // true
// console.log(Number.isInteger(23.0)); // true
// console.log(Number.isInteger(23 / 0)); // false

////////////////////////////////// 003 Converting and Checking Numbers - END


////////////////////////////////// 004 Math and Rounding - START

// //// Math.sqrt() static method returns the square root of a number.
// console.log(Math.sqrt(25)); // 5
// console.log(25 ** (1/2)); // 5
// console.log(8 ** (1/3)); // 2

// //// Math.max() static method returns
// // - the largest of the numbers given as input parameters,
// // - or -Infinity if there are no parameters.
// console.log(Math.max(5,18,23,11,2)); // 23
// console.log(Math.max(5,18,'23',11,2)); // 23
// console.log(Math.max(5,18,'23px',11,2)); // NaN

// console.log(Math.min(5,18,23,11,2)); // 2

// console.log(Math.PI); // 3.141592653589793

// // Calculate the area of a circle with the radius of 10px
// console.log(Math.PI * Number.parseFloat('10px') ** 2); // 314.1592653589793

// //// Generate 6 different random numbers - The Dice example
// // - Math.trunc - returns the integer part of a number by removing any fractional digits.
// // - Plus 1 ( + 1) at the end because we want to have 6 numbers from 1 - 6
// console.log(Math.trunc(Math.random() * 6) + 1);

// //// Generate random numbers given the range of min and max
// const randomInt = (min, max) => Math.trunc(Math.random() * (max - min) + 1) + min
// // 0...1 -> 0...(max - min) -> min...max
// console.log(randomInt(10, 20)); // min value being 10 + 1 and max value is 20

// // Rounding integers
// console.log(Math.round(23.3)); // 23
// console.log(Math.round(23.9)); // 24

// console.log(Math.ceil(23.3)); // 24
// console.log(Math.ceil(23.9)); // 24

// console.log(Math.floor(23.3)); // 23
// console.log(Math.floor('23.9')); // 23

// console.log(Math.trunc(23.3)); // 23

// console.log(Math.trunc(-23.3)); // -23
// console.log(Math.floor(-23.3)); // -24

// // Rounding decimals - The toFixed() method of Number values formats this number using fixed-point notation.
// console.log((2.7).toFixed(0)); // 3
// console.log((2.7).toFixed(3)); // 2.700
// console.log((2.345).toFixed(2)); // 2.35
// console.log(+(2.345).toFixed(2)); // 2.35 => number - the plus '+' sign converts a string to a number

////////////////////////////////// 004 Math and Rounding - END


////////////////////////////////// 005 The Remainder Operator - START

// console.log(5 % 2); // 1
// console.log(5 / 2); // 2.5

// console.log(8 % 3); // 2
// console.log(8 / 3); // 2.6666666666666665

// console.log(6 % 2); // 0
// console.log(6 / 2); // 3

// console.log(7 % 2); // 1
// console.log(7 / 2); // 3.5

// // Check even numbers
// const isEven = n => n % 2 === 0
// console.log(isEven(8)); // true
// console.log(isEven(11)); // false
// console.log(isEven(5)); // false
// console.log(isEven(4)); // true

{/* <div class="movements__row"> */}
// const labelBalance = document.querySelector('.balance__value');
labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    // 0, 2, 4, 6
    if (i % 2 === 0) row.style.backgroundColor = 'orangered'
    // 0, 3, 6, 9
    if (i % 3 === 0) row.style.backgroundColor = 'blue'
  })
})

////////////////////////////////// 005 The Remainder Operator - END


////////////////////////////////// 006 Numeric Separators - START

// // 287, 460, 000, 000
// const diameter = 287_460_000_000
// console.log(diameter); // 287460000000

// const price = 345_99
// console.log(price); // 34599

// const transferFee1 = 15_00
// const transferFee2 = 1_500

// const PI = 3.14_15
// // const PI1 = 3_.1415 // Uncaught SyntaxError: Numeric separators are not allowed at the end of numeric literals
// // const PI2 = _3.1415 // Uncaught SyntaxError: Unexpected number
// // const PI3 = 3.1415_ // Uncaught SyntaxError: Numeric separators are not allowed at the end of numeric literals
// console.log(PI); // 3.1415

// console.log(Number('230_000')); // NaN
// console.log(parseInt('230_000')); // 230

////////////////////////////////// 006 Numeric Separators - END


////////////////////////////////// 007 Working with BigInt - START

/*
console.log(2 ** 53 - 1); // 9007199254740991 - The largest number that JavaScript can safely represent (2^53 – 1)
// '2' stands for base 2 which includes 0 and 1 as this is what we are working with

// The Number.MAX_SAFE_INTEGER static data property represents the maximum safe integer in JavaScript (2^53 – 1).
// For larger integers, consider using BigInt.
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991 => 2 ** 53 - 1 === (2^53 – 1)

// Any numbers that are greater than '2 ** 53 - 1' will lose precision!
console.log(2 ** 53 + 0); // 9007199254740992
console.log(2 ** 53 + 1); // 9007199254740992
console.log(2 ** 53 + 2); // 9007199254740994
console.log(2 ** 53 + 3); // 9007199254740996
console.log(2 ** 53 + 4); // 9007199254740996

console.log(2938745928375982375948n); // 2938745928375982375948n => bigint
console.log(BigInt(823765)); // 823765n

// Operations
console.log(10000n + 10000n); // 20000n
console.log(9283745982375n * 10000n); // 92837459823750000n
// console.log(Math.sqrt(16n)); // Uncaught TypeError: Cannot convert a BigInt value to a number => Math.sqrt does NOT work with BigInt

// CANNOT mix BigInt and other types => Use explicit conversions
const huge = 1239587238945n
const num = 23
// console.log(huge * num); // Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions
// => Convert 'num' to BigInt explicitly!
console.log(1239587238945n * BigInt(num)); // 28510506495735n

// Exceptions
console.log(20n > 15); // true
console.log(20n === 20); // false.
// Reason:
// - The '===' will compare the types between the two variables. In here we are having '20n' as BigInt type and '20' as a regular variable
// - The '===' will NOT do type coercion
console.log(20n == 20); // true. Reason: '==' DOES type coercion
console.log(20n == '20'); // true

console.log(huge + ' is REALLY big!'); // 1239587238945 is REALLY big!

// Divisions
console.log(10n / 3n); // 3n - The closest BigInt, decimals are cut off
console.log(10 / 3); // 3.3333333333333335
*/

////////////////////////////////// 007 Working with BigInt - END


////////////////////////////////// 008 Creating Dates - START

//// The Date() constructor
// - creates Date objects.
// - it returns a string representing the current time when called as a function.

// Syntax
// new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds)

/*
// Create a date
const now = new Date()
console.log(now); // Tue Aug 22 2023 15:10:26 GMT+0700 (Indochina Time)

console.log(new Date('Aug 22 2023 3:12:40')); // Tue Aug 22 2023 03:12:40 GMT+0700 (Indochina Time)
console.log(new Date(account1.movementsDates[0])); // Tue Nov 19 2019 04:31:17 GMT+0700 (Indochina Time)
console.log(new Date(account1.movementsDates[4])); // Fri May 08 2020 21:11:59 GMT+0700 (Indochina Time)

////// data
// const account1 = {
//   movementsDates: [
//     '2019-11-18T21:31:17.178Z',
//     '2019-12-23T07:42:02.383Z',
//     '2020-01-28T09:15:04.904Z',
//     '2020-04-01T10:17:24.185Z',
//     '2020-05-08T14:11:59.604Z',
//     '2020-05-27T17:01:17.194Z',
//     '2020-07-11T23:36:17.929Z',
//     '2020-07-12T10:51:36.790Z',
//   ],
// }
////// data

console.log(new Date(2037, 10, 19, 15, 23, 5)); // Thu Nov 19 2037 15:23:05 GMT+0700 (Indochina Time)

console.log(new Date(2037, 10, 31)); // Tue Dec 01 2037 00:00:00 GMT+0700 (Indochina Time)

console.log(new Date(0)); // Thu Jan 01 1970 08:00:00 GMT+0800 (Indochina Time)

console.log(new Date(3 * 24 * 60 * 60 * 1000)); // Sun Jan 04 1970 08:00:00 GMT+0800 (Indochina Time)
// console.log(3 * 24 * 60 * 60 * 1000); // 259200000
*/

/*
// Working with dates
const future = new Date(2037, 10, 19, 15, 23)
console.log(future); // Thu Nov 19 2037 15:23:00 GMT+0700 (Indochina Time)
console.log(future.getFullYear()); // 2037
console.log(future.getMonth()); // 10
console.log(future.getDate()); // 19
console.log(future.getDay()); // 4
console.log(future.getHours()); // 15
console.log(future.getMinutes()); // 23
console.log(future.getSeconds()); // 0
console.log(future.toISOString()); // 2037-11-19T08:23:00.000Z
console.log(future.getTime()); // 2142231780000

console.log(new Date(2142231780000)); // Thu Nov 19 2037 15:23:00 GMT+0700 (Indochina Time)

console.log(Date.now()); // 1692946043922 - at the time of console logging this

// "setFullYear" changes the Date object in place, and returns its new timestamp
future.setFullYear(2040)
console.log(future); // Mon Nov 19 2040 15:23:00 GMT+0700 (Indochina Time)
*/

////////////////////////////////// 008 Creating Dates - END


////////////////////////////////// 010 Operations With Dates - START

// const future = new Date(2037, 10, 19, 15, 23)
// console.log(future); // Thu Nov 19 2037 15:23:00 GMT+0700 (Indochina Time) => object
// console.log(+future); // 2142231780000 => number

// const calcDayPassed = (date1, date2) => (date2 - date1) / (1000 * 60 * 60 * 24)
// milliseconds => seconds (divided by 1000)
// seconds => minutes (multiplied by 60)
// seconds => hours (multiplied by 60)
// seconds => days (multiplied by 24)

// const day1 = calcDayPassed(new Date(2037, 3, 14), new Date(2037, 3, 24))
// 2037, 3, 14 - March 14th, 2023
// 2037, 3, 24 - March 24th, 2023
// console.log(day1); // 10 days = 864000000 milliseconds (original unit)

////////////////////////////////// 010 Operations With Dates - END

