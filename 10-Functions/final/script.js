'use strict';

////////////////////// Default Parameters - START
// const bookings = []

// const createBooking = function (flightNum, numPassengers=1, price=199) {

//   // ES5
//   // numPassengers = numPassengers || 1 // short-circuiting
//   // price = price || 1 // short-circuiting

//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   // booking.push(booking); // error - this would mean we are trying to push an object into itself
//   bookings.push(booking)
// }

// createBooking('LH123') // {flightNum: 'LH123', numPassengers: 1, price: 199}
// createBooking('LH123', undefined, 200) // {flightNum: 'LH123', numPassengers: 1, price: 200} => set 'undefined' for the value of the parameter you want to skip.
// createBooking('LH123', 300, 200) // {flightNum: 'LH123', numPassengers: 300, price: 200}
////////////////////// Default Parameters - END


////////////////////// How Passing Arguments Works Value vs. Reference - START
// const flight = 'LH234'
// const jonas = {
//   name: 'Jonas Schmedtmann',
//   passport: 24739479284
// }

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'LH999'
//   passenger.name = 'Mr. ' + passenger.name

//   if (passenger.passport === 24739479284) {
//     alert('Checked in')
//   } else {
//     alert('Wrong passport!')
//   }
// }

// checkIn(flight, jonas);
// console.log(flight); // LH234
// console.log(jonas); // {name: 'Mr. Jonas Schmedtmann', passport: 24739479284}

// is the same as doing
// const flightNum = flight;
// const passenger = jonas;

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 10000000000)
// }

// newPassport(jonas);
// checkIn(flight, jonas);


// We are having two functions manipulating the same object
// Pass-by-reference is NOT available in JavaScript, ONLY pass-by-value
////////////////////// How Passing Arguments Works Value vs. Reference - END


////////////////////// Functions Accepting Callback Functions - START
// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase();
// }

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   // console.log(str.split(' ')); // (4) ['JavaScript', 'is', 'the', 'best!']
//   // console.log([first.toUpperCase(), ...others].join(' ')); // JAVASCRIPT is the best!
//   return [first.toUpperCase(), ...others].join(' ')
// }

// ////// Higher order function - a function that takes one or more functions as arguments, or returns a function as its result.
// const transformer = function (str, fn) {
//   console.log(`Original string ${str}`);
//   console.log(`Transformed string ${fn(str)}`);

//   console.log(`Transformed by ${fn.name}`);
// }

// transformer('JavaScript is the best!', upperFirstWord)

// transformer('JavaScript is the best!', oneWord)

// ////// console.log orders
// // Original string JavaScript is the best!
// // JAVASCRIPT is the best! // upperFirstWord
// // Transformed string JAVASCRIPT is the best!
// // Transformed by upperFirstWord

// // JS uses callback all the time
// const high5 = function () {
//   console.log('✋');
// }
// document.body.addEventListener('click', high5)
// ['Jonas', 'Martha', 'Adam'].forEach(high5)

////////////////////// Functions Accepting Callback Functions - END


////////////////////// Functions Returning Functions - START
// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   }
// }
// console.log(greet);
// // ƒ (greeting) {
// //   return function (name) {
// //     console.log(`${greeting} ${name}`);
// //   }
// // }
// const greeterHey = greet('Hey')
// console.log(greeterHey);
// // ƒ (name) {
// //   console.log(`${greeting} ${name}`);
// // }
// greeterHey('Jonas') // Hey Jonas
// greeterHey('Steven') // Hey Steven
// greet('Hello')('Jonas') // Hello Jonas


// ////// Challenge - Change keyword 'function' to using arrow function

// const greetArr = greeting => name => console.log(`${greeting} ${name}`); // Hi Jonas

// greetArr('Hi')('Jonas')

////////////////////// Functions Returning Functions - END

////////////////////// The call and apply Methods - START
// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   // booking () {}
//   book (flightNum, name) {
//     console.log(`${name} booked a seat on Airline ${this.airline} flight ${this.iataCode}${flightNum}`)
//     // Jonas Schmedtmann booked a seat on Lufthansa flight LH623
//     // Nathan Bach booked a seat on Lufthansa flight LH635
//     this.bookings.push({flight: `${this.iataCode}${flightNum}`, name })
//   }
// }

// lufthansa.book(623, 'Jonas Schmedtmann')
// lufthansa.book(635, 'Nathan Bach')

// console.log(lufthansa); // {airline: 'Lufthansa', iataCode: 'LH', bookings: Array(2), book: ƒ}

// const eurowings = {
//   airline: 'Eurowings',
//   iataCode: 'EW',
//   bookings: []
// }

///////////// Store the method 'book' in an external function so we can reuse it for different airlines - Use first class function for this
// First class function is a function that can be
// passed as an argument to other functions
// returned by another function
// can be assigned as a value to a variable.
// const book = lufthansa.book // storing the value of 'lufthansa.book' function in the 'book' variable which is also a function

// book(23, 'Sarah Williams') // does NOT work
// Problem: Uncaught TypeError: Cannot read properties of undefined (reading 'airline')
// Reason: The 'book' function is now a regular function call => the 'this' keyword points to 'undefined' (in 'strict' mode)
// Question: Why 'book' is a regular function and NOT the method of 'lufthansa' object??

// Solution: Tell JavaScript explicitly (manually)
// that 'this' keyword should point to Lufthansa if we want to book the airline from Lufthansa
// that 'this' keyword should point to Eurowings if we want to book the airline from Eurowings
// use 'call', 'apply' and 'bind' function methods

////// call
// book.call(eurowings, 23, 'Sarah Williams') // 'this' keyword points to 'eurowings' => Sarah Williams booked a seat on Airline Eurowings flight EW23
// console.log(eurowings); // {name: 'Eurowings', iataCode: 'EW', bookings: Array(1)}

// book.call(lufthansa, 239, 'Mary Cooper') // 'this' keyword points to 'lufthansa' => Mary Cooper booked a seat on Airline Lufthansa flight LH239
// console.log(lufthansa); // {airline: 'Lufthansa', iataCode: 'LH', bookings: Array(3), book: ƒ}

// const swiss = {
//   airline: 'Swiss Air Lines',
//   iataCode: 'LX',
//   bookings: []
// }

// book.call(swiss, 37, 'Connor McDavid')
// console.log(swiss);

////// apply - not popular in modern JavaScript - difference: 'apple' takes an array of arguments after the 'this' keyword
// const flightData = [37, 'George Cooper']
// book.apply(swiss, flightData)
// console.log(swiss); // {airline: 'Swiss Air Lines', iataCode: 'LX', bookings: Array(2)}
// console.log(`${name} booked a seat on Airline ${this.airline} flight ${this.iataCode}${flightNum}`)
// George Cooper booked a seat on Airline Swiss Air Lines flight LX37

// book.call(swiss, ...flightData) // George Cooper booked a seat on Airline Swiss Air Lines flight LX37
// console.log(swiss);

// book.apply(swiss, flightData) === book.call(swiss, ...flightData)

////////////////////// The call and apply Methods - END

////////////////////// bind - START
// The bind() method creates a new function that, when called, has its 'this' keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.
// const bookLH = book.bind(lufthansa)
// const bookEW = book.bind(eurowings)
// const bookLX = book.bind(swiss)

// bookLH(23, 'Steven Williams') // Steven Williams booked a seat on Airline Eurowings flight EW23

// Same flight number for all guests
// const bookLH23 = book.bind(lufthansa, 23) // add the second parameter for the 'bind' method
// bookLH23('Michael Jordan') // Michael Jordan booked a seat on Airline Lufthansa flight LH23
// bookLH23('Stephen Curry') // Stephen Curry booked a seat on Airline Lufthansa flight LH23

////////// With Event Listeners - IMPORTANT
// lufthansa.planes = 300
// lufthansa.buyPlane = function () {
//   console.log(this); // <button class="buy">Buy new plane 🛩</button>

//   this.planes++;
//   console.log(this.planes);
// }
// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane)
// Problem: the console currently logs out 'NaN'
// Reason: the 'this' keyword points to the element that is attached to the 'addEventListener' method
// the element <button class="buy">Buy new plane 🛩</button> is currently attached to the 'addEventListener' method which is NOT a number
// Solution: we need the 'this' to point to the 'lufthansa' object => We need to manually define the 'this' keyword here.
// How? use 'bind'
// Why? We need to pass in a function in "document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane)"
// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa))
// console.log(this); // {airline: 'Lufthansa', iataCode: 'LH', bookings: Array(6), planes: 300, book: ƒ, …}
// console.log(this.planes); // 301


////////// Partial Application - IMPORTANT
// const addTax = (rate, value) => value + value * rate
// console.log("addTax ", addTax(.1, 200)); // 220 = 200 + 20 = 200 + (200 * .1)

// Say the VAT here is 23%
// use the 'bind' on the 'addTax' function and preset the 'rate' to always be 23%
// the first argument of 'bind' is the 'this' keyword
// we use 'null' for the 'this' keyword since in this case we don't care about the 'this' keyword at all => WHY???
// 'null' is the standard for the 'this' keyword in this case when the value of 'this' can be any other value, nothing will happen with it.
// const addVAT = addTax.bind(null, .23)
// addVAT = value => value + value * .23
// The order of the arguments here is important.
// If you want to preset the 'rate' then it MUST be the first argument, it will NOT work otherwise

// console.log("addVAT ", addVAT(100)); // 123 = 100 + 23 = 100 + (100 * .23)
// console.log("addVAT ", addVAT(23)); // 28.29 = 23 + 5.29 = 23 + (23 * .23)

////////// Challenge - Partial Application using 'One Function returning Another Function'

// const addTaxRate = function (rate) {
//   return function (value) {
//     return value + value * rate
//   }
// }
// we need the 'rate' and the 'value'
// the first function is the one that needs the 'rate'
// the result function is the one that takes in the 'value'

// const addVAT2 = addTaxRate(.23)
// console.log("addVAT2 ", addVAT2(100)); // 123
// console.log("addVAT2 ", addVAT2(23)); // 28.29

// 'addVAT' and 'addVAT2' are the same function which give the same result

////////////////////// bind - END


// In Summary of 'call', 'bind' and 'apply'
// Orders of importance and priority: 'call' and 'bind' are more important than 'apply'.
// 'apply' is old and not as popular for the modern day.
// use 'bind' for 'Event Listeners'. Reason: the 'this' keyword points to the element that is attached to the 'addEventListener' method which results in the console logs out 'NaN' when the element is NOT a number.
// use 'call' to reuse a method from an object for other objects where the method is not available. 'call' helps us to not repeat ourselves.


////////////////////// 010 Coding Challenge #1 - START
///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

//////////////////////// 1
const poll = {
  question: 'What is your favorite programming language?',
  option: [
    '0: JavaScript',
    '1: Python',
    '2: Rust',
    '3: C++'
  ],
  // this generates [0,0,0,0]. More in the next section.
  answers: new Array(4).fill(0),
  registerNewAnswer () {
    // Get answer
    const answer = Number(
      prompt(
        `${this.question}\n${this.option.join('\n')}\n(Write option number)`
      )
    );
    console.log(answer); // Without 'Number()', 'answer' is a string

    // Register answer
    typeof answer === 'number' && answer < this.answers.length && this.answers[answer]++
    // console.log(this.answers);

    this.displayResults()
    this.displayResults('string')
  },

//////////////////////// 3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  }
}

// Why do we need to convert the array 'poll.option' to a string??
// Reason: 'poll.option' is originally an array, we want to show every element inside as a string
// console.log(poll.option); // (4) ['0: JavaScript', '1: Python', '2: Rust', '3: C++']
// console.log(poll.option.join()); // 0: JavaScript,1: Python,2: Rust,3: C++

//////////////////////// 2. Call 'registerNewAnswer' method whenever the user clicks the "Answer poll" button.
document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll))
// WHY do we use 'bind' here???

//////////////////////// 4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.
poll.displayResults.call({answers: [5,2,3]}, 'string')
poll.displayResults.call({answers: [1, 5, 3, 9, 6, 1]}, 'string')

////////////////////// 010 Coding Challenge #1 - END