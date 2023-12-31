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

// const displayMovements = function (movements) {
///////////////////////////////////////// 024 Sorting Arrays - START
const displayMovements = function (movements, sort = false) {
  // Replace the old data with the new data at the same HTML position
  // remove old data in order to add new data
  containerMovements.innerHTML = '' // containerMovements.textContent = 0

  // slice - returns a shallow copy of a portion of an array into a new array object
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements

  // add new data to the 'movements' HTML element
  // movements.forEach(function (mov, i) {
  movs.forEach(function (mov, i) {
///////////////////////////////////////// 024 Sorting Arrays - END
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

////////////////////////// 014 The reduce Method - START

// // const labelBalance = document.querySelector('.balance__value');
// // this will only show the account balance to the interface
// const calcDisplayBalance = function (movements) {
//   const balance = movements.reduce((acc, mov) => acc + mov, 0)
//   labelBalance.textContent = `${balance}€`
// }

//////// 020 Implementing Transfers - START

// What we need to do: Add negative 'movement' to current 'user' and positive 'movement' to recipient
// Reason: Say if the current user transfers 100 eur to a recipient then
// - that 100 eur should be DEDUCTED from the current user (NEGATIVE movement)
// - and ADDED to the recipient (POSITIVE movement)
// Problem: The balance is not stored anywhere. We need to have the balance stored somewhere in order to check whether the current user has enough of the money he wants to transfer to the recipient (by comparing the balance with the amount the current user want to transfer )
// Solution: We need to change 'movements' parameter to 'acc' parameter => We can do that by passing in the entire account 'acc' just like what we did in 'calcSummaryDisplay'
// by passing in the 'acc' we'll be able to create the new properly on that account with the balance.
const calcDisplayBalance = function (acc) {
  // console.log(acc); // {owner: 'Jonas Schmedtmann', movements: Array(8), interestRate: 1.2, pin: 1111, username: 'js'}
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0)
  labelBalance.textContent = `${acc.balance}€`
}
//////// 020 Implementing Transfers - END

////////////////////////// 014 The reduce Method - END


////////////////////////// 016 The Magic of Chaining Methods - START
const calcSummaryDisplay = function(acc) {

  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  // const labelSumIn = document.querySelector('.summary__value--in');
  labelSumIn.textContent = `${incomes}€`

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  // const labelSumOut = document.querySelector('.summary__value--out');
  labelSumOut.textContent = `${Math.abs(out)}€` // "Math.abs()" gives a positive number

  // The interest is paid on each deposit
  const interest = acc.movements
    // 'deposit' MUST always be a POSITIVE number AND a non-zero value => it MUST be greater than 0
    .filter(mov => mov > 0)
    // On each of a deposit we will receive 1.2%
    // Create a new array containing all the interests and then add them together at the end
    .map(deposit => (deposit * acc.interestRate) / 100)
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

// map() - creates a new array populated with the results of calling a provided function on every element in the calling array.

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
const createUserName = function(accs) {
  accs.forEach(function(acc) {
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('')
  });
};
createUserName(accounts)
// console.log(accounts);
// (4) [{…}, {…}, {…}, {…}]
// {owner: 'Jonas Schmedtmann', movements: Array(8), interestRate: 1.2, pin: 1111, username: 'js'}
// {owner: 'Jessica Davis', movements: Array(8), interestRate: 1.5, pin: 2222, username: 'jd'}
// {owner: 'Steven Thomas Williams', movements: Array(8), interestRate: 0.7, pin: 3333, username: 'stw'}
// {owner: 'Sarah Smith', movements: Array(5), interestRate: 1, pin: 4444}

////////////////////////// 012 Computing Usernames - END

///////////////////////////////////////// 020 Implementing Transfers - START

const updateUI = function (acc) {
  //// Display movements
  displayMovements(acc.movements)
  //// Display balance
  calcDisplayBalance(acc) // 020 Implementing Transfers
  //// Display summary
  calcSummaryDisplay(acc)
}

///////////////////////////////////////// 020 Implementing Transfers - END

///////////////////////////////////////// 019 Implementing Login - START
{/* <form class="login">
  <input
    type="text"
    placeholder="user"
    class="login__input login__input--user"
  />
  <!-- In practice, use type="password" -->
  <input
    type="text"
    placeholder="PIN"
    maxlength="4"
    class="login__input login__input--pin"
  />
  <button class="login__btn">&rarr;</button>
</form> */}
// const btnLogin = document.querySelector('.login__btn');

let currentAccount

// Event handler
btnLogin.addEventListener('click', function(e) {
  // Prevent form from submitting
  e.preventDefault()

  // 'currentAccount' is a variable that points to one of the original objects of the array 'accounts' in the memory heap (account1, account2, account3, account4)
  // 'currentAccount' is NOT the copy of the original object
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)
  console.log(currentAccount);
  // UI user: js
  // UI PIN: 1111
  // console: {owner: 'Jonas Schmedtmann', movements: Array(8), interestRate: 1.2, pin: 1111, username: 'js'}

  // currentAccount?.pin => both the owner account and the pin MUST be correct
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //// Display UI and message
    // <p class="welcome">Log in to get started</p>
    // const labelWelcome = document.querySelector('.welcome');
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`
    // const containerApp = document.querySelector('.app');
    containerApp.style.opacity = 100

    //// Clear input fields
    inputLoginUsername.value = inputLoginPin.value = ''
    inputLoginPin.blur()
    
    updateUI(currentAccount)
  }
})
///////////////////////////////////////// 019 Implementing Login - END


///////////////////////////////////////// 020 Implementing Transfers - START

// const btnTransfer = document.querySelector('.form__btn--transfer');
btnTransfer.addEventListener('click', function (e){
  e.preventDefault()
  //// What is the transfer amount??
  // const inputTransferAmount = document.querySelector('.form__input--amount');
  const amount = Number(inputTransferAmount.value)
  //// Who to transfer to??
  // const inputTransferTo = document.querySelector('.form__input--to');
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value)
  console.log(amount, receiverAcc);
  // 123 {owner: 'Jonas Schmedtmann', movements: Array(8), interestRate: 1.2, pin: 1111, username: 'js'}

  // Empty the inputs after the transfer has been done (either success or failure)
  inputTransferAmount.value = inputTransferTo.value = ''

  // Condition for transferring
  // 1. The amount MUST be a non-zero value
  // 2. The current account MUST have enough money for the transfer
  // 3. The current account CANNOT transfer to itself
  // 4. The recipient MUST be an existing account
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount)
    receiverAcc.movements.push(amount)
  }

  // Updating UI
  updateUI(currentAccount)

})
// console.log(Number(inputTransferAmount.value)); // 0
// console.log(accounts.find(acc => acc.username)); // {owner: 'Jonas Schmedtmann', movements: Array(8), interestRate: 1.2, pin: 1111, username: 'js'}

///////////////////////////////////////// 020 Implementing Transfers - END


///////////////////////////////////////// 022 some and every - START

// const btnLoan = document.querySelector('.form__btn--loan');
btnLoan.addEventListener('click', function(e){
  e.preventDefault()
  // const inputLoanAmount = document.querySelector('.form__input--loan-amount');
  const amount = Number(inputLoanAmount.value)

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * .1)) {
    // Add movement
    // The loan is ONLY granted if there is any deposit in the current account that is at least 10% of the requested loan.
    currentAccount.movements.push(amount)
    // console.log(currentAccount.movements.push(amount)); // Request loan: 1000 => console logs 10. What is this number?

    // UPdate UI
    updateUI(currentAccount)
  }
  inputLoanAmount.value = ''
})

///////////////////////////////////////// 022 some and every - END


///////////////////////////////////////// 021 The findIndex Method - START

/////// The findIndex() method of Array instances
//// - returns the index of the first element in an array that satisfies the provided testing function.
//// - If no elements satisfy the testing function, -1 is returned.

// const btnClose = document.querySelector('.form__btn--close');
btnClose.addEventListener('click', function(e) {
  e.preventDefault();

  // const inputCloseUsername = document.querySelector('.form__input--user');
  // const inputClosePin = document.querySelector('.form__input--pin');
  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username)
    console.log(index);

    // Delete account
    accounts.splice(index, 1)

    // Hide UI
    containerApp.style.opacity = 0
  }
  inputCloseUsername.value = inputClosePin.value = ''
  // console.log(currentAccount); // undefined

  ////////// NOTES
  // Both the 'find' and 'findIndex' methods get access to the current index and the current array
  // Both the 'find' and 'findIndex' methods are ONLY available in ES6 => They will NOT work in browsers that are too old!
})

///////////////////////////////////////// 021 The findIndex Method - END


///////////////////////////////////////// 024 Sorting Arrays - START

//// sort() - sorts the elements of an array in place and returns the reference to the same array, now sorted.
let sorted = false

// const btnSort = document.querySelector('.btn--sort');
btnSort.addEventListener('click', function(e) {
  e.preventDefault()
  displayMovements(currentAccount.movements, !sorted)
  // if the array is NOT sorted, we want to have the function to sort the array here
  // however, if the array is ALREADY sorted, we want to have the function to unsort the array here.
  sorted = !sorted
})

///////////////////////////////////////// 024 Sorting Arrays - END


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

// The find() method of Array instances
// returns the FIRST ELEMENT in the provided array that satisfies the provided testing function.
// If NO VALUES SATISFY the testing function, UNDEFINED is returned.

// const firstWithdrawal = movements.find(mov => mov < 0)
// console.log(movements); // (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
// console.log(firstWithdrawal); // -400

// console.log(accounts);
// // {owner: 'Jonas Schmedtmann', movements: Array(8), interestRate: 1.2, pin: 1111}
// // {owner: 'Jessica Davis', movements: Array(8), interestRate: 1.5, pin: 2222}
// // {owner: 'Steven Thomas Williams', movements: Array(8), interestRate: 0.7, pin: 3333}
// // {owner: 'Sarah Smith', movements: Array(5), interestRate: 1, pin: 4444}
// const account = accounts.find(acc => acc.owner === 'Jessica Davis')
// console.log(account); // {owner: 'Jessica Davis', movements: Array(8), interestRate: 1.5, pin: 2222}

///////////////////////////////////////// 018 The find Method - END


///////////////////////////////////////// 022 some and every - START

// EQUALITY
////// includes() - determines whether an array includes a certain value among its entries, returning true or false as appropriate.
// console.log(movements); // (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
// console.log(movements.includes(-130)); // true

// CONDITION
////// some() - tests whether at least one element in the array passes the test implemented by the provided function
// - returns true if, in the array, it finds an element for which the provided function; otherwise it returns false
// - It doesn't modify the array.
// console.log(movements.some(mov => mov === -130)); // true
// const anyDeposits = movements.some(mov => mov > 0)
// console.log(anyDeposits); // true

////// every() - tests whether all elements in the array pass the test implemented by the provided function.
// It returns a Boolean value.
// console.log(movements.every(mov => mov > 0)); // false
// console.log(account4.movements.every(mov => mov > 0)); // true

////// SEPARATE CALLBACK
// const deposit = mov => mov > 0
// console.log(movements.deposit);
// console.log(movements.some(deposit)); // true
// console.log(movements.every(deposit)); // false
// console.log(movements.filter(deposit)); // (5) [200, 450, 3000, 70, 1300]

///////////////////////////////////////// 022 some and every - END


///////////////////////////////////////// 023 flat and flatMap - START

//// flat() - creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.
// const arr = [[1 ,2 , 3], [4, 5, 6], 7, 8]
// console.log(arr.flat()); // (8) [1, 2, 3, 4, 5, 6, 7, 8]

// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8]
// console.log(arrDeep.flat()); // (6) [Array(2), 3, 4, Array(2), 7, 8]
// console.log(arrDeep.flat(2)); // (8) [1, 2, 3, 4, 5, 6, 7, 8]

//////////////////// separate map, flat, reduce
// const accountMovements = accounts.map(acc => acc.movements)
// console.log(accountMovements);
// // (4) [Array(8), Array(8), Array(8), Array(5)]
// // (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
// // (8) [5000, 3400, -150, -790, -3210, -1000, 8500, -30]
// // (8) [200, -200, 340, -300, -20, 50, 400, -460]
// // (5) [430, 1000, 700, 50, 90]
// const allMovements = accountMovements.flat()
// console.log(allMovements);
// // (29) [200, 450, -400, 3000, -650, -130, 70, 1300, 5000, 3400, -150, -790, -3210, -1000, 8500, -30, 200, -200, 340, -300, -20, 50, 400, -460, 430, 1000, 700, 50, 90]
// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0)
// console.log(overallBalance); // 17840
//////////////////// separate map, flat, reduce

// console.log('accounts', accounts);
// const overallBalance1 = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log('overallBalance1: map, flat, reduce', overallBalance1); // 17840

//// flatMap()
// - returns a NEW ARRAY formed by applying a given callback function to each element of the array
// - flattening the result by one level
// - slightly more efficient than '(arr.map(...args).flat())' (flat() of depth 1)
// const overallBalance2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log('overallBalance2: flatMap, reduce', overallBalance2); // 17840

///////////////////////////////////////// 023 flat and flatMap - END


///////////////////////////////////////// 024 Sorting Arrays - START

// Strings
// const owners = ['Jonas', 'Adam', 'Steven', 'Martha']
// console.log(owners.sort()); // (4) ['Adam', 'Jonas', 'Martha', 'Steven'] => Alphabetical sort

// Numbers
// console.log(movements); // (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
// console.log(movements.sort()); // (8) [-130, -400, -650, 1300, 200, 3000, 450, 70] => first number sort (e.g. -1 < 1 < 2 < 3 < ...)

// return < 0, A, B (keep order)
// return > 0, B, A (switch order)
// movements.sort((a, b) => {
//   if (a > b) {
//     return 1
//   } else if (a < b) {
//     return -1
//   }
// })

//////////// Sorting Numbers - START

// Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1
//   if (a < b) return -1
// })
// console.log(movements); // (8) [-650, -400, -130, 70, 200, 450, 1300, 3000]

// movements.sort((a, b) => a - b)
// console.log(movements); // (8) [-650, -400, -130, 70, 200, 450, 1300, 3000]

// Descending
// movements.sort((a, b) => {
//   if (a > b) return -1
//   if (a < b) return 1
// })
// console.log(movements); // (8) [3000, 1300, 450, 200, 70, -130, -400, -650]

// movements.sort((a, b) => b - a)
// console.log(movements); // (8) [3000, 1300, 450, 200, 70, -130, -400, -650]

//////////// Sorting Numbers - END

///////////////////////////////////////// 024 Sorting Arrays - END


///////////////////////////////////////// 025 More Ways of Creating and Filling Arrays - START

// const arr = [1,2,3,4,5,6,7]

// console.log([1,2,3,4,5,6,7]); // (7) [1, 2, 3, 4, 5, 6, 7]
// console.log(new Array(1,2,3,4,5,6,7)); // (7) [1, 2, 3, 4, 5, 6, 7]

//////// Empty array + fill method
// The 'new Array' here is a special Constructor function
// we canNOT use the 'x' array for anything else (e.g. we canNOT call the 'map' method on it)
// const x = new Array(7) // (7) [empty × 7]
// console.log(x.map(() => 5)); // (7) [empty × 7] => the 'map' method does NOT work => the original array is returned.

//// fill
// - changes all elements within a range of indices in an array to a static value
// - returns the modified array.
// - the start index in the array will be included but the end index will NOT be

// x.fill(1) // (7) [1, 1, 1, 1, 1, 1, 1]
// x.fill(1, 3, 5) // (7) [empty × 3, 1, 1, empty × 2] => ONLY fill the array with value '1' starting at index 3 and end at index 4
// console.log(x);

// arr.fill(23, 4, 6) // (7) [1, 2, 3, 4, 23, 23, 7]

// arr.fill(23, 2, 6) // (7) [1, 2, 23, 23, 23, 23, 7]

//// Array.from - creates a new, shallow-copied Array instance from an iterable or array-like object.
// const y = Array.from({ length: 7 }, () => 1) // (7) [1, 1, 1, 1, 1, 1, 1]

// const z = Array.from({ length: 7 }, (cur, i) => i + 1) // (7) [1, 2, 3, 4, 5, 6, 7]
// const z = Array.from({ length: 7 }, (_, i) => i + 1) // since we are not using 'cur' here, we can as well set it to '_'
// console.log(z); // (7) [1, 2, 3, 4, 5, 6, 7]

//// Assume we ONLY have the "movements" (deposits and withdrawals) in the UI but we do NOT have them in the code => We do NOT have an array containing those values
// Task: We need to calculate their sum

// const labelBalance = document.querySelector('.balance__value');
// labelBalance.addEventListener('click', function() {
//   const movementsUI = Array.from(document.querySelectorAll('.movements__value')).map(el => el.textContent.replace('€', ''))
//   {/* <div class="movements__row">
//     <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
//     <div class="movements__value">${mov}€</div>
//   </div> */}
//   // console.log(movementsUI); // (2) [div.movements__value, div.movements__value]
//   console.log(movementsUI); // after logged in => (8) ['1300', '70', '-130', '-650', '3000', '-400', '450', '200']

//   // Another way to convert 'document.querySelectorAll('.movements__value')' to an array
//   // const movementsUI2 = [...document.querySelectorAll('.movements__value')]
//   // Question: Why not use the 'spread' operator to convert '.movements__value' to an array instead?
//   // Reason: Because then we will have to do the 'map' separately
//   // Solution: 'Array.from()' is a better solution here.
// })

///////////////////////////////////////// 025 More Ways of Creating and Filling Arrays - END


///////////////////////////////////////// 027 Array Methods Practice - START

////// Practice 1 - Sum up all the deposited amounts from all the 'movements' arrays
//// 1.1. Log out all the accounts
// Whenever we want to create a new array with the same length out of the previous/original array => use the 'map' method
// console.log(accounts.map(acc => acc.movements));
// (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
// (8) [5000, 3400, -150, -790, -3210, -1000, 8500, -30]
// (8) [200, -200, 340, -300, -20, 50, 400, -460]
// (5) [430, 1000, 700, 50, 90]

//// 1.2. Concatenating all the 'account' arrays into one array => use 'flatMap' method
// 8 + 8 + 8 + 5 = 8 * 3 + 5 = 29 array elements in total
console.log(accounts.flatMap(acc => acc.movements));
// (29) [200, 450, -400, 3000, -650, -130, 70, 1300, 5000, 3400, -150, -790, -3210, -1000, 8500, -30, 200, -200, 340, -300, -20, 50, 400, -460, 430, 1000, 700, 50, 90]

//// 1.3. Filter out ONLY the deposited amount
console.log(accounts.flatMap(acc => acc.movements).filter(mov => mov > 0));
// [200, 450, 3000, 70, 1300, 5000, 3400, 8500, 200, 340, 50, 400, 430, 1000, 700, 50, 90]

//// 1.4. Sum up all the deposited amount
// console.log(accounts.flatMap(acc => acc.movements).filter(mov => mov > 0).reduce((sum, cur) => sum + cur, 0));
// 25180


////// Practice 2 - Count the number of deposits that are at least 1,000 in the bank
//// 2.1.
// const numDeposit1000 = accounts.flatMap(acc => acc.movements).filter(mov => mov >= 1000).length
// console.log(numDeposit1000); // 6

//// 2.2. Better alternative solution for 2.1.
// console.log(accounts.flatMap(acc => acc.movements).reduce((count, cur) => (cur >= 1000 ? count++ : count), 0)); // 0

// Prefixed ++ operator
// let a = 10
// console.log(a++); // 10
// console.log(++a); // 12
// console.log(a); // 12

//// 3. Create an object that contains the sums of the 'deposits' and the 'withdrawal'
// 3.1. Full object
// const sums = accounts.flatMap(acc => acc.movements).reduce((sums, cur) => {
//   cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur)
//   return sums
// }, {
//   // Initialization - Start with 0 for deposits and 0 for withdrawal
//   deposits: 0, withdrawals: 0
// })
// // NOTE: In an arrow function the value is ONLY implicitly returned when we don't have a function body with curly braces
// // however, we do have have a function body with curly braces here
// // Solution: We need to manually/explicitly return the 'accumulator' from the function
// // How the 'reduce' function works: We ALWAYS need to return the 'accumulator' from each iteration.
// console.log(sums); // {deposits: 25180, withdrawals: -7340}

// 3.2. Object destructuring
// const { deposits, withdrawals } = accounts.flatMap(acc => acc.movements).reduce((sums, cur) => {
//   // Replace the duplication (sums.deposits += cur) and  (sums.withdrawals += cur) with the condition
//   sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur
//   return sums
// }, {
//   // Initialization - Start with 0 for deposits and 0 for withdrawal
//   deposits: 0, withdrawals: 0
// })
// console.log(deposits, withdrawals); // {deposits: 25180, withdrawals: -7340}


//// 4. this is a nice title => This Is a Nice Title
// const convertTitle = function(title) {
//   const capitalize = str => str[0].toUpperCase() + str.slice(1)

//   const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with']

//   const titleCase = title.toLowerCase().split(' ').map(word => (exceptions.includes(word)) ? word : capitalize(word)).join(' ')
//   return capitalize(titleCase)
// };
// console.log(convertTitle('this is a nice title'));
// console.log(convertTitle('this is a LONG title but not too long'));
// console.log(convertTitle('this is a nice title'));
// console.log(convertTitle('and here is another title with an example'));

///////////////////////////////////////// 027 Array Methods Practice - END


///////////////////////////////////////// 028 Coding Challenge #4 - START

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

//// 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)

// for (const [key, i] of dogs.entries()) {
//   console.log(`${key + 1}: weight is ${i.weight} kg, curFood is ${i.curFood} and recommendedFood is ${i.weight ** .75 * 28} grams`);
// }

// Math.trunc() - returns the integer part of a number by removing any fractional digits.
dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)))
console.log(dogs);


//// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓

const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'))
console.log(sarahDog); // {weight: 13, curFood: 275, owners: Array(2), recFood: 191}

// Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.

const recFood = Math.trunc(dogs.weight ** 0.75 * 28)
console.log(`Sarah's dog is eating too ${dogs.curFood > sarahDog.recFood ? 'much' : 'little'}`);


//// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').

const ownersEatTooMuch = dogs.filter(dog => (dog.curFood > dog.recFood)).flatMap(dog => dog.owners)
console.log('Owners of dogs that eat too much', ownersEatTooMuch);
// Owners of dogs that eat too much (3) ['Matilda', 'Sarah', 'John']

const ownersEatTooLittle = dogs.filter(dog => (dog.curFood < dog.recFood)).flatMap(dog => dog.owners)
console.log('Owners of dogs that eat too little', ownersEatTooLittle);
// Owners of dogs that eat too little (3) ['Alice', 'Bob', 'Michael']


//// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
const str1 = ownersEatTooMuch.join(' and ')
console.log(`${str1}'s dogs eat too much`); // Matilda and Sarah and John's dogs eat too much

const str2 = ownersEatTooLittle.join(' and ')
console.log(`${str2}'s dogs eat too little`); // Alice and Bob and Michael's dogs eat too little


//// 5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
console.log('There is any dog eating EXACTLY the amount of food that is recommended ', dogs.some(dog => dog.curFood === dog.recFood)); // false


//// 6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
// Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

// dog.curFood > dog.recFood * .9 && dog.curFood < dog.recFood * 1.1 - Condition from the video lesson
const checkEatingOk = dog => dog.curFood > dog.recFood * .9 && dog.curFood < dog.recFood * 1.1
console.log(dogs.some(checkEatingOk)); // true


// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
const dogsEatingOk = dogs.filter(checkEatingOk)
console.log(dogsEatingOk);


// 8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)
// const recFoodSort = dogs.slice().sort((a, b) => {
//   return a.recFood - b.recFood
// })
const recFoodSort = dogs.slice().sort((a, b) => a.recFood - b.recFood)
console.log(dogs);
// {weight: 22, curFood: 250, owners: Array(2), recFood: 284}
// {weight: 8, curFood: 200, owners: Array(1), recFood: 133}
// {weight: 13, curFood: 275, owners: Array(2), recFood: 191}
// {weight: 32, curFood: 340, owners: Array(1), recFood: 376}
console.log(recFoodSort);
// {weight: 8, curFood: 200, owners: Array(1), recFood: 133}
// {weight: 13, curFood: 275, owners: Array(2), recFood: 191}
// {weight: 22, curFood: 250, owners: Array(2), recFood: 284}
// {weight: 32, curFood: 340, owners: Array(1), recFood: 376}

///////////////////////////////////////// 028 Coding Challenge #4 - END


