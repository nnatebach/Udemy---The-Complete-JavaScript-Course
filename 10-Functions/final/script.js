'use strict';

const bookings = []

const createBooking = function (flightNum, numPassengers=1, price=199) {

  // ES5
  // numPassengers = numPassengers || 1 // short-circuiting
  // price = price || 1 // short-circuiting

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  // booking.push(booking); // error - this would mean we are trying to push an object into itself
  bookings.push(booking)
}

createBooking('LH123') // {flightNum: 'LH123', numPassengers: 1, price: 199}
createBooking('LH123', undefined, 200) // {flightNum: 'LH123', numPassengers: 1, price: 200} => set 'undefined' for the value of the parameter you want to skip.
createBooking('LH123', 300, 200) // {flightNum: 'LH123', numPassengers: 300, price: 200}