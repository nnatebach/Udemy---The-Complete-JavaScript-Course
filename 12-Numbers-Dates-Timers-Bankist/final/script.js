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
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
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
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
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
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

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

//// Math.sqrt() static method returns the square root of a number.
console.log(Math.sqrt(25)); // 5
console.log(25 ** (1/2)); // 5
console.log(8 ** (1/3)); // 2

//// Math.max() static method returns
// - the largest of the numbers given as input parameters,
// - or -Infinity if there are no parameters.
console.log(Math.max(5,18,23,11,2)); // 23
console.log(Math.max(5,18,'23',11,2)); // 23
console.log(Math.max(5,18,'23px',11,2)); // NaN

console.log(Math.min(5,18,23,11,2)); // 2

console.log(Math.PI); // 3.141592653589793

// Calculate the area of a circle with the radius of 10px
console.log(Math.PI * Number.parseFloat('10px') ** 2); // 314.1592653589793

//// Generate 6 different random numbers - The Dice example
// - Math.trunc - returns the integer part of a number by removing any fractional digits.
// - Plus 1 ( + 1) at the end because we want to have 6 numbers from 1 - 6
console.log(Math.trunc(Math.random() * 6) + 1);

//// Generate random numbers given the range of min and max
const randomInt = (min, max) => Math.trunc(Math.random() * (max - min) + 1) + min
// 0...1 -> 0...(max - min) -> min...max
console.log(randomInt(10, 20)); // min value being 10 + 1 and max value is 20

// Rounding integers
console.log(Math.round(23.3)); // 23
console.log(Math.round(23.9)); // 24

console.log(Math.ceil(23.3)); // 24
console.log(Math.ceil(23.9)); // 24

console.log(Math.floor(23.3)); // 23
console.log(Math.floor('23.9')); // 23

console.log(Math.trunc(23.3)); // 23

console.log(Math.trunc(-23.3)); // -23
console.log(Math.floor(-23.3)); // -24

// Rounding decimals - The toFixed() method of Number values formats this number using fixed-point notation.
console.log((2.7).toFixed(0)); // 3
console.log((2.7).toFixed(3)); // 2.700
console.log((2.345).toFixed(2)); // 2.35
console.log(+(2.345).toFixed(2)); // 2.35 => number - the plus '+' sign converts a string to a number

////////////////////////////////// 004 Math and Rounding - END

