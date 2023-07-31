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
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // booking () {}
  book (flightNum, name) {
    console.log(`${name} booked a seat on Airline ${this.airline} flight ${this.iataCode}${flightNum}`)
    // Jonas Schmedtmann booked a seat on Lufthansa flight LH623
    // Nathan Bach booked a seat on Lufthansa flight LH635
    this.bookings.push({flight: `${this.iataCode}${flightNum}`, name })
  }
}

lufthansa.book(623, 'Jonas Schmedtmann')
lufthansa.book(635, 'Nathan Bach')

console.log(lufthansa); // {airline: 'Lufthansa', iataCode: 'LH', bookings: Array(2), book: ƒ}

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: []
}

///////////// Store the method 'book' in an external function so we can reuse it for different airlines - Use first class function for this
// First class function is a function that can be
// passed as an argument to other functions
// returned by another function
// can be assigned as a value to a variable.
const book = lufthansa.book // storing the value of 'lufthansa.book' function in the 'book' variable which is also a function

// book(23, 'Sarah Williams') // does NOT work
// console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`)
// Problem: Uncaught TypeError: Cannot read properties of undefined (reading 'airline')
// Reason: The 'book' function is now a regular function call => the 'this' keyword points to 'undefined' (in 'strict' mode)
// Question: Why 'book' is a regular function and NOT the method of 'lufthansa' object??

// Solution: Tell JavaScript explicitly (manually)
// that 'this' keyword should point to Lufthansa if we want to book the airline from Lufthansa
// that 'this' keyword should point to Eurowings if we want to book the airline from Eurowings
// use 'call', 'apply' and 'bind' function methods

////// call
book.call(eurowings, 23, 'Sarah Williams') // book (flightNum, name)
console.log(eurowings); // {name: 'Eurowings', iataCode: 'EW', bookings: Array(1)}

book.call(lufthansa, 239, 'Mary Cooper') // book (flightNum, name)
console.log(lufthansa); // {airline: 'Lufthansa', iataCode: 'LH', bookings: Array(3), book: ƒ}

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: []
}

book.call(swiss, 37, 'Connor McDavid')
console.log(swiss);

////// apply - not popular in modern JavaScript - difference: 'apple' takes an array of arguments after the 'this' keyword
const flightData = [37, 'George Cooper']
book.apply(swiss, flightData)
console.log(swiss); // {airline: 'Swiss Air Lines', iataCode: 'LX', bookings: Array(2)}
// console.log(`${name} booked a seat on Airline ${this.airline} flight ${this.iataCode}${flightNum}`)
// George Cooper booked a seat on Airline Swiss Air Lines flight LX37

book.call(swiss, ...flightData)
console.log(swiss);
// console.log(`${name} booked a seat on Airline ${this.airline} flight ${this.iataCode}${flightNum}`)
// George Cooper booked a seat on Airline Swiss Air Lines flight LX37

// book.apply(swiss, flightData) === book.call(swiss, ...flightData)

////////////////////// The call and apply Methods - END


