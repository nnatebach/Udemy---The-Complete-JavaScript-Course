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


//////////// XMLHttpRequest (XHR) objects
// used to interact with servers.
// You can retrieve data from a URL without having to do a full page refresh.
// This enables a Web page to update just part of a page without disrupting what the user is doing.
// XMLHttpRequest is used heavily in AJAX programming.

const request = new XMLHttpRequest()
// XMLHttpRequest.open() - initialize a request
// CORS - Cross-Origin Resource Sharing
// We need a CORS that is specified as 'Yes' or 'Unknown'
// Without CORS, we will not be able to access the 3rd-party API from our own code
// For the demonstration purpose, we are going with an API that does not need 'Auth' and it uses 'HTTPS'
// API ENDPOINTS - The URL we need
// NAME - Search by country name. If you want to get an exact match, use the next endpoint. It can be the common or official value

// https://www.udemy.com/course/the-complete-javascript-course/learn/lecture/28841478#questions
request.open('GET', 'https://restcountries.com/v2/name/portugal')
// request.open('GET', 'https://restcountries.com/v3.1/name/vietnam')
// send request
// the request fetches data in the background
// once the fetching data is done, it will emit the 'load' event
request.send()
// console.log(request.responseText); // this will not show anything

request.addEventListener('load', function () {
  // responseText - returns the text received from a server following a request being sent.
  // console.log(this.responseText);

  // convert the JSON to an actual JavaScript object - JSON.parse()
  // const data = JSON.parse(this.responseText)[0]
  // destructuring
  const [data] = JSON.parse(this.responseText)
  console.log(data);
  // console.log(typeof data.currencies); // object
  console.log(data.languages[0].name);

  const html = `
    <article class="country">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.altSpellings}</h3>
        <h4 class="country__region">${data.continents}</h4>
        <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html)
  countriesContainer.computedStyleMap.opacity = 1
});


/////////////////////////////////////// 005 Our First AJAX Call XMLHttpRequest - END

