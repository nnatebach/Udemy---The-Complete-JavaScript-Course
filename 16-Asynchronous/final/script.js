'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////


/////////////////////////////////////// 003 Asynchronous JavaScript, AJAX and APIs - START


//////////// Most code is SYNCHRONOUS
// Synchronous code is EXECUTED LINE BY LINE
// Each line of code WAITS for previous line to finish
// DOWNSIDE: Long-running operations BLOCK code execution

//////////// ASYNCHRONOUS
// Asynchronous code is executed AFTER A TASK THAT RUNS IN THE 'BACKGROUND' FINISHES
// Asynchronous code is NON-BLOCKING
// Execution does not wait for an asynchronous task to finish its work
// Callback functions alone do NOT make code asynchronous!

//////////// AJAX - Asynchronous JavaScript and XML
// allows us to communicate with remote web servers in an ASYNCHRONOUS WAY.
// we can REQUEST DATA from web servers dynamically
// XML - the data format that used to be widely used to transmit data on the web
// Nowadays, AJAX has replaced XML with JSON data format for data transmission (JSON is a JavaScript object-based String)

//////////// API - Application Programming Interface (software)
// can be used by another piece of software, in order to allow APPLICATIONS TO TALK TO EACH OTHER
// different types of APIs in web development: DOM API, Geolocation API, Own Class API, "Online" API
// "Online" API - Application running on a server, that receives requests for data, and sends data back as response.
// we can build OUR OWN web APIs (requires back-end development, e.g. with node.js) or use 3RD-PARTY APIs
// - Weather data
// - Data about countries
// - Flights data
// - Currency conversion data
// - APIs for sending email or SMS
// - Google Maps
// - Millions of possibilities


/////////////////////////////////////// 003 Asynchronous JavaScript, AJAX and APIs - END


/////////////////////////////////////// 005 Our First AJAX Call XMLHttpRequest - START

/*
//////////// XMLHttpRequest (XHR) objects - used to interact with servers.

const getCountry = function (country) {
  const request = new XMLHttpRequest()

  // https://www.udemy.com/course/the-complete-javascript-course/learn/lecture/28841478#questions
  request.open('GET', `https://restcountries.com/v2/name/${country}`)
  // send request - fetches data in the background
  // fetched data will emit to 'load' event
  request.send()

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText)
    console.log(data);

    const html = `
      <article class="country">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
      </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html)
    countriesContainer.computedStyleMap.opacity = 1
  });
}
getCountry('portugal')
getCountry('vietnam')
getCountry('canada')
*/

/////////////////////////////////////// 005 Our First AJAX Call XMLHttpRequest - END


/////////////////////////////////////// 006 [OPTIONAL] How the Web Works Requests and Responses - START

/*********** NOTE LATER ***********/

/////////////////////////////////////// 006 [OPTIONAL] How the Web Works Requests and Responses - END


/////////////////////////////////////// 007 Welcome to Callback Hell - START


const renderCountry = function (data, className="") { // attach className to a neighbor country
  const html = `
  <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html)
  countriesContainer.computedStyleMap.opacity = 1
}

const getCountryAndNeighbor = function (country) {

  //////////////// AJAX call country 1
  const request = new XMLHttpRequest()

  request.open('GET', `https://restcountries.com/v2/name/${country}`) // 'name'
  request.send()

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText)
    console.log(data);

    //////////////// Render country 1
    renderCountry(data)

    //////////////// Get neighbor country (2)
    const neighborCountry = data.borders?.[0]
    if (!neighborCountry) return
    //////////////// AJAX call country 2
    const request2 = new XMLHttpRequest()

    // border comes with the codes: "KHM", "CHN", "LAO" => 'alpha'
    // the second AJAX call relies on the first AJAX call
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighborCountry}`)
    request2.send()

    // nested callback
    request2.addEventListener('load', function() {

      const data2 = JSON.parse(this.responseText) // canNOT destructure here
      // The country codes are unique => NO array is returned!

      renderCountry(data2, 'neighbour') // attach className to a neighbor country
    })
  });
}
getCountryAndNeighbor('vietnam')

// Callback Hell => Bad Code
// Solution for Callback Hell: Promises
// setTimeout(() => {
//   console.log('1 second has passed!');
//   setTimeout(() => {
//     console.log('2 seconds has passed!');
//     setTimeout(() => {
//       console.log('3 seconds has passed!');
//       setTimeout(() => {
//         console.log('4 seconds has passed!');
//         setTimeout(() => {
//           console.log('5 seconds has passed!');
//         }, 1000)
//       }, 1000)
//     }, 1000)
//   }, 1000)
// }, 1000)


/////////////////////////////////////// 007 Welcome to Callback Hell - END


/////////////////////////////////////// 008 Promises and the Fetch API - START


//////////// The Promise object
/////// a container for a future value => Example: Response from AJAX call

// Example of a Promise: Buying a lottery ticket
// correct outcome => you will get the money

/////// Advantages of Promise:
// handling asynchronous results - NO need to use event and callback function
// escape callback hell by changing Promises for a sequence of asynchronous operations

/////// The Promise lifecycle:
// They are time sensitive, they change over time in different stages. (asynchronous operations)

// Storing the Promise
const request = fetch('https://restcountries.com/v2/name/portugal')
console.log(request); // Promise {<pending>}


/////////////////////////////////////// 008 Promises and the Fetch API - END

