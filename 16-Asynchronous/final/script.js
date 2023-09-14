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

// const renderCountry = function (data) {
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

  request.open('GET', `https://restcountries.com/v2/name/${country}`)
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

    // we want to get the 'borders' yet it comes with the code ("KHM", "CHN", "LAO") and not the country name => we need to use the code to access it
    // the second AJAX call would not have been possible without the first AJAX call
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighborCountry}`)
    request2.send()

    // the second 'addEventListener' inside the first one => the second callback inside the first callback => nested callback
    request2.addEventListener('load', function() {
      // console.log(this.responseText);
      const data2 = JSON.parse(this.responseText)
      // canNOT destructure here => The 'responseText' here is NO longer an array when we search for the code ('alpha') => this time we are search for country code, NOT country name.
      // the country codes are unique => There is ALWAYS just ONE result! => NO array is returned!

      console.log(data2);

      // renderCountry(data2)
      renderCountry(data2, 'neighbour') // attach className to a neighbor country
    })
  });
}
getCountryAndNeighbor('vietnam')

/////////////////////////////////////// 007 Welcome to Callback Hell - END

