'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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
  countriesContainer.style.opacity = 1
}

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg)
  countriesContainer.style.opacity = 1
}

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


/*
const getCountryAndNeighbor = function (country) {

  //////////////// AJAX call country 1
  const request = new XMLHttpRequest()

  request.open('GET', `https://restcountries.com/v2/name/${country}`) // 'name'
  request.send()

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText)
    // console.log('AJAX - returns object', data);

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
*/

/////////////////////////////////////// 007 Welcome to Callback Hell - END


/////////////////////////////////////// 008 Promises and the Fetch API - START

/*
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
*/

/////////////////////////////////////// 008 Promises and the Fetch API - END


/////////////////////////////////////// 009 Consuming Promises - START


////// then(), catch(), finally()
// immediately returns an equivalent Promise object, allowing you to chain calls to other promise methods.


////// then() - this will be called when the Promise is FULFILLED
// takes up to two arguments: callback functions for the fulfilled and rejected cases of the Promise.


////// catch() - this will be called when the Promise is REJECTED
// - schedules a function to be called when the promise is rejected.
// - It is a shortcut for Promise.prototype.then(undefined, onRejected).


////// finally() - this is ALWAYS going to be called no matter what the result of the Promise will be
// schedules a function to be called when the promise is settled (either fulfilled or rejected).
// e.g. SHOW the loading spinner when the asynchronous operation is taking place and HIDE it when the operation is finished.


//////////// Full Version
/*
const getCountry = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`) // 'fetch' returns a Promise
    .then(function (response) { // using 'then' method to handle 'Promise'
      // console.log(response);
      // body: ReadableStream => canNOT access body => call JSON method
      // response.json()
      // 'json' method is available on all 'response' objects that come from 'fetch' function (all result values)
      // 'response' is a result value => it DOES have the 'json' method
      // 'json' method is an asynchronous function => it returns a Promise

      // we need to return a Promise
      return response.json(); // the returned Promise, again, returns a new Promise
    })
    .then(function (data) {
      // handling the new Promise with 'then'
      console.log('Promise - returns array object', data);
      renderCountry(data[0])
    });
};
getCountry('portugal')
*/


//////////// Simplified Version - using arrow function


/*
////// Chaining Promises
// Step 1 - Create the Promise
// Step 2 - Return the Promise
// Step 3 - Handling the Promise OUTSIDE of the Promise block

const getJSON = function(url, errorMessage='Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMessage} (${response.status})`)

    return response.json()
  })
}

// const getCountry = function (country) {
//   // Country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     // Step 1
//     .then(response => {
//       console.log(response)

//       if (!response.ok) throw new Error(`Country not found ${response.status}`)

//       return response.json()
//     })
//     .then(data => {
//       // Step 2
//       renderCountry(data[0]);
//       // const neighborCountry = data[0].borders[0];

//       const neighborCountry = 'kajshf'

//       if (!neighborCountry) return;

//       // Country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighborCountry}`);
//     })
//     // handling the Promise outside of the coding block
//     // Step 3
//     .then(
//       response => {
//         if (!response.ok) throw new Error(`Country not found ${response.status}`)
//         return response.json()
//       }
//     )
//     .then(data => renderCountry(data, 'neighbour')) // Step 4
//     .catch(err => {
//       console.error(`${err} 💥 💥 💥`); // TypeError: Failed to fetch 💥 💥 💥
//       renderError(`Something went wrong 💥 💥 ${err.message}. Try again!`)
//     })
//     // this will only work in Promise
//     // since 'catch' itself also returns a 'Promise' => 'finally' will work
//     .finally(() => {
//       countriesContainer.style.opacity = 1 // this will happen no matter what the outcome of the Promise would be
//     })
// };

const getCountry = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found!')
    .then(data => {
      // Step 2
      renderCountry(data[0]);

      // https://www.udemy.com/course/the-complete-javascript-course/learn/lecture/22648673#questions/16169550
      if (!('borders' in data[0])) throw new Error('No neighbour found');
      const neighborCountry = data[0].borders[0];

      // Country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighborCountry}`,
        'Country not found!'
      );
    })
    // handling the Promise outside of the coding block
    .then(data => renderCountry(data, 'neighbour')) // Step 4
    .catch(err => {
      console.error(`${err} 💥 💥 💥`); // TypeError: Failed to fetch 💥 💥 💥
      renderError(`Something went wrong 💥 💥 ${err.message}. Try again!`);
    })
    // this will only work in Promise
    // since 'catch' itself also returns a 'Promise' => 'finally' will work
    .finally(() => {
      countriesContainer.style.opacity = 1; // this will happen no matter what the outcome of the Promise would be
    });
};

btn.addEventListener('click', function () {
  getCountry('portugal')
})
getCountry('australia') // test country that does not have any neighbors


//////////// NOTES:
/////// Do NOT call 'then' right after 'fetch' like this
// fetch(`https://restcountries.com/v2/alpha/${neighborCountry}`).then(response => response.json());
// Reason: It will create another callback => BIG PROBLEM!!

/////// It is a bad practice to leave the errors hanging
// We need to create (the rejections) and handle the errors with 'catch' and possibly using 'finally' in order to handle the errors as well
*/


/////////////////////////////////////// 009 Consuming Promises - END


/////////////////////////////////////// Coding Challenge #1 - START


///////////////////////////////////////
// Coding Challenge #1

/*
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

const whereAmI = function(lat, lng) {
  // API changed https://www.udemy.com/course/the-complete-javascript-course/learn/lecture/28841478#questions/20404652
  fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
  .then(res => {
    // console.log(res); // body: ReadableStream => NOT accessible => use 'json()' method
    // ok: true => ok: false - 403 error
    if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`)
    // console.log(res.json()); // Promise {<pending>} => body now is accessible
    return res.json()
  })
  .then(data => {
    console.log(data);
    console.log(`You are in ${data.city}, ${data.countryName}`)

    return fetch(`https://restcountries.com/v2/name/${data.countryName}`);
  })
  .then(
    res => {
      if (!res.ok) throw new Error(`Country not found ${res.status}`)
      return res.json()
    }
  )
  .then(data => renderCountry(data[0]))
  .catch(err => console.error(`${err.message}`))
}
whereAmI(52.508, 13.381)
whereAmI(19.037, 72.873)
whereAmI(14.0583, 108.2772)


/////////////////////////////////////// Coding Challenge #1 - END


/////////////////////////////////////// 014 Asynchronous Behind the Scenes The Event Loop - START

/****************** NOTE LATER ******************/

/////////////////////////////////////// 014 Asynchronous Behind the Scenes The Event Loop - END
