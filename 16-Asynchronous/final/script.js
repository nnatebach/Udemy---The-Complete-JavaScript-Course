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

const getJSON = function(url, errorMessage='Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMessage} (${response.status})`)

    return response.json()
  })
};

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

/*
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
*/

/////////////////////////////////////// Coding Challenge #1 - END


/////////////////////////////////////// 014 Asynchronous Behind the Scenes The Event Loop - START

/****************** NOTE LATER ******************/

/////////////////////////////////////// 014 Asynchronous Behind the Scenes The Event Loop - END


/////////////////////////////////////// 015 The Event Loop in Practice - START


/*
// Orders in console

//// 1 - Why? => Synchronous; top-level code: code outside of any callback
console.log('Test start');

////// Both the 'setTimeout' and 'Promise' will finish at the exact same time
// HOWEVER
//// 4
// - callback queue has low priority
setTimeout(() => console.log('0 sec timer'), 0) // - We told it to finish after 0 second
//// 3
// - the callback of the resolve Promise => microtasks' queue => it is prioritized over the callback queue in No. 4
Promise.resolve('Resolved Promise 1').then(res => console.log(res)) // create a Promise that is immediately resolved => immediately has the success value

//// 2 - Why? => Synchronous; top-level code: code outside of any callback
console.log('Test end');

////// Microtasks callback have priority over regular callback implication
// If one of the Microtasks takes a long time to run then the timer will be delayed and not run after the 'n' second that we specify. Not until the Microtask is done with its work then the timer will run

// Simulating when a Microtask takes a long time to run
Promise.resolve('Resolved Promise 2').then(res => {
  for(let i =0; i < 1000000000;i++) {}
  console.log(res);
})

// NOTE: You canNOT use timer in JS for high precision task
*/


/////////////////////////////////////// 015 The Event Loop in Practice - END


/////////////////////////////////////// 016 Building a Simple Promise - START


/*
const lotteryPromise = new Promise (function(resolve, reject) {
  console.log('Lottery draw is happening 🔮'); // this is the very first Microtask so it is going to be executed first
  setTimeout(function () {
    if (Math.random() >= .5) {
      resolve('You WON 💰 💰 💰')
    } else {
      reject(new Error('You LOST 💩 💩 💩'))
    }
  }, 2000)
})
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err))


//////////////////// Promisifying setTimeout => Replace callback hell

const wait = function (seconds) {
  return new Promise (function (resolve) {
    setTimeout(resolve, seconds * 1000)
  })
}
wait(1)
  .then(() => {
    console.log('1 second has passed!');
    return wait(1);
  })
  .then(() => {
    console.log('2 second has passed!');
    return wait(1);
  })
  .then(() => {
    console.log('3 second has passed!');
    return wait(1);
  })
  .then(() => console.log('4 second has passed!'));

// Reference
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

//////////////////// Promisifying setTimeout

//////// Create a fulfilled or rejected promise IMMEDIATELY
Promise.resolve('abc').then(x => console.log(x))
// There is no resolve value anyway => catch()
Promise.reject(new Error('Problem!')).catch(x => console.log(x))
*/


/////////////////////////////////////// 016 Building a Simple Promise - END


/////////////////////////////////////// 017 Promisifying the Geolocation API - START


/*
// navigator.geolocation.getCurrentPosition offloads its work to the web API environment in the browser and then IMMEDIATELY moves on to the next line right after 'console.log('Getting position');'

// this is a callback-based API
navigator.geolocation.getCurrentPosition(
  position => console.log(position),
  // GeolocationPosition {coords: GeolocationCoordinates, timestamp: 1695790546565}
  err => console.error(err)
  // GeolocationPositionError {code: 1, message: 'User denied Geolocation'}
);
// console.log('Getting position');
*/


/*
////////// Promisify a callback-based API to a Promise-based API
const getPosition = function() {
  return new Promise (function(resolve, reject) { // the 'resolve' and 'reject' functions which we can use to mark the Promise as either 'fulfilled' or 'reject'
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

// getPosition().then(pos => console.log(pos))
// GeolocationPosition {coords: GeolocationCoordinates, timestamp: 1695873438065}

const whereAmI = function() {

  getPosition().then(pos => {

    ////////// 1. Getting the 'coordinates'
    const {latitude: lat, longitude: lng} = pos.coords

    ////////// 2. Using the 'coordinates' to get the location
    return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
  })
  .then(res => {
    if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`)
    return res.json()
  })
  .then(data => {
    console.log(data);
    console.log(`You are in ${data.city}, ${data.countryName}`)

    ////////// 3. Getting the data from the country
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
btn.addEventListener('click', whereAmI)
*/


/////////////////////////////////////// 017 Promisifying the Geolocation API - END


/////////////////////////////////////// 018 Coding Challenge #2 - START


/*
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

/*
////// PART 1 - Creating the image 'holder' in the DOM

// 1. Step by step - Written by Nathan
// 1.1. Create a function 'createImage' which receives imgPath as an input
// 1.2. This function returns a promise...
// 1.3. which creates a new image (use document.createElement('img')) and...
// 1.4. sets the .src attribute to the provided image path.
// 1.5. When the image is done loading....
// 1.6. append it to the DOM element with the 'images' class => DOM element in index.html
// 1.7. and resolve the promise.
// 1.8. In case there is an error loading the image ('error' event)
// 1.9. reject the promise.


// 2.3 - Use the Promisified setTimeout() that we created earlier
const wait = function (seconds) {
  return new Promise (function (resolve) {
    setTimeout(resolve, seconds * 1000)
  })
}

// 1.6.a - create a new variable for the 'images' class in the DOM
const imgContainer = document.querySelector('.images')

// 1.1
const createImage = function (imgPath) {
  // 1.2
  return new Promise (function (resolve, reject) {
    // 1.3
    const img = document.createElement('img')
    // 1.4
    img.src = imgPath

    // 1.5
    img.addEventListener('load', function () {
      // 1.6.b
      imgContainer.append(img)
      // 1.7
      resolve(img)
    })
    // 1.8
    img.addEventListener('error', function() {
      reject(new Error('Image not found!!'))
    })
  })
}

// document.createElement() method creates the HTML element specified by tagName, or an HTMLUnknownElement if tagName isn't recognized.


////// PART 2 - 'Send' the image to the DOM structure AND handling the results (resolve or reject / success or failure)
// 2.1. Consume the promise using .then and also...
// 2.2. add an error handler;
// 2.3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
// 2.4. After the 2 seconds have passed,
// 2.4.a. hide the current image (set display to 'none'), and
// 2.4.b. load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
// 2.5. After the second image has loaded, pause execution for 2 seconds again;
// 2.6. After the 2 seconds have passed, hide the current image.

// 2.4.a
let currentImg

// 2.1.
createImage('img/img-1.jpg')
  .then(img => {
    // 2.4.a
    currentImg = img;
    console.log('Image 1 loaded');
    // 2.3
    return wait(2);
  })
  .then(() => {
    // 2.4.a
    currentImg.style.display = 'none';
    // 2.4.b
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    // 2.4.a
    currentImg = img;
    console.log('Image 2 loaded');
    // 2.5
    return wait(2);
  })
  .then(() => {
    // 2.6
    currentImg.style.display = 'none';
  })
  // 2.2.
  .catch(err => console.error(err));
*/

/////////////////////////////////////// 018 Coding Challenge #2 - END


/////////////////////////////////////// 019 Consuming Promises with AsyncAwait - END

/*
const getPosition = function() {
  return new Promise (function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

//// async - creates a binding of a new async function to a given name
//// await
// - is permitted within the FUNCTION BODY, enabling asynchronous
// - NO explicitly configure promise chains needed.
// - WAITS for a Promise and GET its fulfillment value
// - ONLY works INSIDE an async function or at the top level of a module.

const whereAmI = async function () {

  //// Geolocation
  try {
    const pos = await getPosition()
    const { latitude: lat, longitude: lng } = pos.coords // destructure

    //// Reverse geocoding - convert coordinates to a meaningful location
    const resGeo = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
    console.log('resGeo', resGeo);
    if (!resGeo.ok) throw new Error('Problem getting location data')

    const dataGeo = await resGeo.json()
    console.log('dataGeo', dataGeo);

    //// Country
    const res = await fetch(`https://restcountries.com/v2/name/${dataGeo.countryName}`)

    if (!res.ok) throw new Error('Problem getting location data')

    console.log('res (Country, returned from Promise)', res);
    // with 'await' we can store the result directly to the variable 'data'
    const data = await res.json()
    console.log('res.json(), get json from the Promise', data);
    renderCountry(data[0]);
    return `You are in ${dataGeo.city}, ${dataGeo.countryName}, ${dataGeo.continent}`
  }
  catch(err) {
    console.error(`${err} 💥`);
    renderError(`Something went wrong ${err.message}`)

    // Reject Promise returned from async function
    throw err; // re-throw the error, take the error and throw it again.
  }
}
console.log('1: Will get location');


// This code here is a mix of philosophy between async/await WITH "then" and "catch"
// => NOT good!!
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message}`))
//   .finally(() => console.log('3: Finished getting location'));


// Convert "whereAmI()" to async/await code using IIFE
(async function () {
  try {
    const city = await whereAmI()
    console.log(`2: ${city}`)
  } catch(err) {
    console.error(`2: ${err.message}`)
  }
  console.log('3: Finished getting location')
})()
// You are in Ho Chi Minh City, Viet Nam, Asia
*/

/////////////////////////////////////// 019 Consuming Promises with AsyncAwait - END


/////////////////////////////////////// 022 Running Promises in Parallel - START


/*
// Advantage: This technique will save time!

//// Demonstration:
// Getting data about 3 countries at the same time
// YET, the ORDER of arrival for 3 countries does NOT matter at all!

//// Instructions
// The function will take in 3 countries
// The function will log the capital cities of the 3 countries as an array

const get3Countries = async function (c1, c2, c3) {
  // ALWAYS use 'try...catch' inside an async function!!
  // Use 'Promise.all()' - a Promise combinator in order to combine multiple Promises

  try {
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`)
    ])
      // console.log(data);
      // this will give an array containing all 3 arrays => Loop over them to get all the elements.

      // map() - WHY???
      // console.log(data) // (3) [Array(1), Array(1), Array(1)]
      // console.log(data[0][0].capital) // Hanoi
      console.log(data.map(d => d[0].capital)); // (3) ['Hanoi', 'Vientiane', 'Bangkok']
  } catch(err) {
    console.error(err);
  }
}
get3Countries('Vietnam', 'Laos', 'Thai')
// get3Countries('Vietnam', 'Laos', 'Thai') // If one Promise is rejected => The whole Promise.all() will be rejected!
*/


/////////////////////////////////////// 022 Running Promises in Parallel - END


/////////////////////////////////////// 023 Other Promise Combinators race, allSettled and any - START


/*
// NOTE: Keep in mind AT LEAST 'Promise.race()' and 'Promise.all()'

(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/france`),
    getJSON(`https://restcountries.com/v2/name/italy`),
    getJSON(`https://restcountries.com/v2/name/spain`),
  ]);
  console.log(res[0]); // Order in console: 4
  // refreshing the page will gives us different results of 'france', 'italy' or 'spain' => depending on which call is faster (the one that takes the least time in the Network tab - check the Tab time or subtract the black BOLD number with the duration)
  // we only get one result and not an array of the results of all the three.
  // a Promise that gets rejected can actually also win the race => Promise.race short-circuits whenever one of the Promises gets settled NO matter if fulfilled or rejected.
})();


////// Promise.any() [ES2021] is different from 'Promise.race()' that 'rejected' Promises are ignored - START


////// Promise.race() - START
// - receives an array of Promise and also returns a Promise
// - the Promise that is returned by Promise.race() is settled as soon as one of the input Promises settles.
// - when a Promise is settled => a value is available NO matter if Promise is rejected or fulfilled
// - the first settled Promise wins the race
// - in the real world Promise.race is actually very useful to prevent against never ending promises or also very long running promises.

//// Example: your user has a very bad internet connection => fetch request takes way too long to actually be useful.
// Solution: create a special time out Promise, which AUTOMATICALLY REJECTS after a certain TIME has PASSED.

//// Instructions:
// Create a 'timeout' function
// Return a new Promise (Promise allows us to setup the option for a reject case), use throw away convention for 'resolve' because we don't need that option in this case
// Create a timeout function within the returned Promise => add the 'new Error' in the reject method

const timeout = function(sec) {
  return new Promise (function (_, reject) {
    setTimeout(function() {
      reject(new Error('Request took too long!'))
    }, sec * 1000)
  })
}

Promise.race([
  getJSON(`https://restcountries.com/v2/name/tanzania`),
  timeout(.5)
])
.then(res => console.log(res[0])) // Order in console: 5
.catch(err => console.error(err))
//// Results:
// - The Promise will show the result if the result takes less than .5 second to show
// - Otherwise, it will show this error 'Request took too long!'


//// Promise.any()
// - takes in an array of multiple promises
// - it will RETURN the FIRST 'fulfilled' Promise and IGNORE rejected Promises.
// - the results of Promise.any() is always gonna be a fulfilled Promise, UNLESS all of them are rejected
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success')
])
.then(res => console.log(res)) // Success - Order in console: 1
.catch(err => console.error(err))


////// Promise.any() [ES2021] is different from 'Promise.race()' - END


////// 'Promise.allSettled()' AND 'Promise.all()' BOTH return an array of all the results - START

//// Promise.allSettled()
// - it takes in an array of Promise and returns an array of ALL the settled Promises NO matter if the Promise is rejected or not.
// - Promise.allSettled NEVER short circuits => it will return ALL the results of all the Promises.
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success')
])
// .then(res => console.log(res[0]))
// {status: 'fulfilled', value: 'Success'}
.then(res => console.log(res)) // Order in console: 2
//// 0: {status: 'fulfilled', value: 'Success'}
//// 1: {status: 'rejected', reason: 'ERROR'}
//// 2: {status: 'fulfilled', value: 'Another success'}

// NOTE: Even though one of the result is 'rejected' we still get all three results when we do them manually with 'resolve', 'reject' and 'resolve'

////// Promise.all() is going to short-circuit as soon as one Promise rejects.
Promise.all([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success')
])
.then(res => console.log(res))
.catch(err => console.error(err)) // ERROR - Order in console: 3
// If one of the Promise is rejected, the whole thing is going to be 'rejected' => ERROR

////// 'Promise.allSettled()' AND 'Promise.all() - END
*/


/////////////////////////////////////// 023 Other Promise Combinators race, allSettled and any - END


/////////////////////////////////////// Coding Challenge #3 - START


/*
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK
*/


/*
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.
*/


const wait = function (seconds) {
  return new Promise (function (resolve) {
    setTimeout(resolve, seconds * 1000)
  })
}

const imgContainer = document.querySelector('.images')

const createImage = function (imgPath) {
  return new Promise (function (resolve, reject) {
    const img = document.createElement('img')
    img.src = imgPath

    img.addEventListener('load', function () {
      imgContainer.append(img)
      resolve(img)
    })
    img.addEventListener('error', function() {
      reject(new Error('Image not found!!'))
    })
  })
}

//// createImage with 'catch'

// let currentImg

/*
createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));
*/

//// reuse createImage

const loadNPause = async function () {
  try {
    // Load image 1
    // This time we will not need the "currentImg" variable
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded');
    // 'await' for 'wait(2)'
    // we don't need to store this into any variable
    await wait(2)
    img.style.display = 'none';

    // Load image 2
    img = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded');
    // 'await' for 'wait(2)'
    await wait(2)
    img.style.display = 'none';
  } catch(err) {
    console.error(err);
  }
}
// loadNPause()


/*
PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'parallel' class to all the images (it has some CSS styles).
*/

const loadAll = async function (imgArr) {
  try {
    // in each iteration of the array we have one image
    // we want to use the 'createImage' function to load that image
    // the function 'createImage' returns a Promise => we need to 'await' that Promise
    // we need to make 'i => createImage(i)' an async function
    // and 'await' for 'createImage(i)'
    const imgs = imgArr.map(async i => await createImage(i))
    console.log(imgs);

    const imgsEL = await Promise.all(imgs)
    // this works because in this loop 'async i => await createImage(i)', the 'await' pauses the execution of the function => we use 'Promise.all()' to actually get the image elements out of the Promise array
    // this is how we use 'async await' in a 'map' method
    // all the images are loaded all at the same time because of this loop 'i => await createImage(i)'
    console.log(imgsEL);
    // the three image elements are hidden (check console) => add 'parallel' class
    imgsEL.forEach(img => img.classList.add('parallel'))
  } catch (err) {
    console.error(err);
  }
}
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'])

////// NOTE:
// const imgs = imgArr.map(async i => await createImage(i))
// (3) [Promise, Promise, Promise]
// we actually got three 'fulfilled' Promises here AND NOT the images themselves
// 'async i => await createImage(i)' - here we have an 'async' function, an 'arrow' function and an 'implicit return' => this is like returning something from this callback function '(return) await createImage(i)' in each iteration.
// An 'async' will always return a Promise WHILE the value that we want to return is going to be the 'fulfilled' value of the Promise that the 'async' function returns.
// We are using the 'async' function on three images => the Promises are happening three times => we are returning something three times from an 'async' function here => the result will be three Promises
// In the previous lecture where we attempted to return a string from one of the functions. In here we have the exact same situation!
// The images are already being loaded behind the scenes => Now we need to get the image elements themselves out of the Promise
// Option 1: Take each Promise out of the array and then manually await it => NOT a good solution. WHY???
//// - We would have additional work
//// - the work would not be happening in parallel, BUT we want it to be happening in parallel
// Option 2: Promise.all()
//// - This will take some time
//// - This can ONLY happen once the images are ACTUALLY LOADED


/////////////////////////////////////// Coding Challenge #3 - END