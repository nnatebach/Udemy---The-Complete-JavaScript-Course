'use strict';

///////////////////////////////////////// Default Parameters - START
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
///////////////////////////////////////// Default Parameters - END


///////////////////////////////////////// How Passing Arguments Works Value vs. Reference - START
const flight = 'LH234'
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 24739479284
}

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999'
  passenger.name = 'Mr. ' + passenger.name

  if (passenger.passport === 24739479284) {
    alert('Checked in')
  } else {
    alert('Wrong passport!')
  }
}

// checkIn(flight, jonas);
// console.log(flight); // LH234
// console.log(jonas); // {name: 'Mr. Jonas Schmedtmann', passport: 24739479284}

// is the same as doing
// const flightNum = flight;
// const passenger = jonas;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000)
}

newPassport(jonas);
checkIn(flight, jonas);


// We are having two functions manipulating the same object
// Pass-by-reference is NOT available in JavaScript, ONLY pass-by-value
///////////////////////////////////////// How Passing Arguments Works Value vs. Reference - END