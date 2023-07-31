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
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
}

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  // console.log(str.split(' ')); // (4) ['JavaScript', 'is', 'the', 'best!']
  // console.log([first.toUpperCase(), ...others].join(' ')); // JAVASCRIPT is the best!
  return [first.toUpperCase(), ...others].join(' ')
}

////// Higher order function - a function that takes one or more functions as arguments, or returns a function as its result.
const transformer = function (str, fn) {
  console.log(`Original string ${str}`);
  console.log(`Transformed string ${fn(str)}`);

  console.log(`Transformed by ${fn.name}`);
}

transformer('JavaScript is the best!', upperFirstWord)

transformer('JavaScript is the best!', oneWord)

////// console.log orders
// Original string JavaScript is the best!
// JAVASCRIPT is the best! // upperFirstWord
// Transformed string JAVASCRIPT is the best!
// Transformed by upperFirstWord

// JS uses callback all the time
const high5 = function () {
  console.log('✋');
}
document.body.addEventListener('click', high5)
['Jonas', 'Martha', 'Adam'].forEach(high5)

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
//     console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
//     // Jonas Schmedtmann booked a seat on Lufthansa flight LH623
//     // Nathan Bach booked a seat on Lufthansa flight LH635
//   }
// }

// lufthansa.book(623, 'Jonas Schmedtmann')
// lufthansa.book(635, 'Nathan Bach')
////////////////////// The call and apply Methods - END


