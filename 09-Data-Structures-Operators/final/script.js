'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri']
const weekends = ['sat', 'sun']

const openingHours = {
  [weekdays[4]]: {
    open: 12,
    close: 22,
  },
  [weekdays[3]]: {
    open: 11,
    close: 23,
  },
  [weekends[0]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
}

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 enhanced object literals
  openingHours,
  
  order (startIndex, mainIndex) {
    return [this.starterMenu[startIndex], this.mainMenu[mainIndex]]
  },
  orderDelivery ({startIndex=1, mainIndex=0, time="20:00", address}) {
    console.log(`Order received! ${this.starterMenu[startIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
  },
  orderPasta (ing1, ing2, ing3) {
    console.log(`The ingredients to make pasta includes ${ing1}, ${ing2}, ${ing3}`);
  },
  orderPizza (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  }
};

/////////////////////////// WORKING WITH STRINGS - START

////////////// PART 1
// const airline = 'Tap Air Portugal'
// const plane = 'A320'

// console.log(plane[0]); // A => string starts at index 0
// console.log(plane[1]); // 3
// console.log(plane[2]); // 2
// console.log('B737'[0]); // B

// console.log(airline.length); // 16
// console.log('B737'.length); // 4

// console.log(airline.indexOf('r')); // 6
// console.log(airline.lastIndexOf('r')); // 10
// console.log(airline.indexOf('portugal')); // -1 => The string does not contain "portugal"

// console.log(airline.slice(4)); // 'Air Portugal'
// console.log(airline.slice(4, 7)); // 'Air' => include the starting index until BEFORE the ending index (index 4,5,6 and NOT 7)

////////////// PART 2
// console.log(airline.toLowerCase()); // tap air portugal
// console.log(airline.toUpperCase()); // TAP AIR PORTUGAL

//// Fix capitalization in name - 'jOnAS' to 'Jonas'
// const passenger = "jOnAS"
// const passengerLower = passenger.toLowerCase()
// console.log(passengerLower); // jonas
// const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1)
// // console.log(passengerLower[0].toUpperCase()); // J
// // console.log(passengerLower.slice(1)); // onas
// console.log(passengerCorrect); // Jonas

//// Comparing emails - true
// const email = 'hello@jonas.io'
// const loginEmail = '   Hello@Jonas.Io \n'

// console.log(`Original loginEmail: ${loginEmail}`);
// const lowerEmail = loginEmail.toLowerCase()
// console.log(lowerEmail);
// const trimmedEmail = lowerEmail.trim() // remove all spaces around the string
// console.log(trimmedEmail);

// const normalizeEmail = loginEmail.toLowerCase().trim()
// console.log(normalizeEmail);
// console.log(normalizeEmail === email); // true

//// Replacing
// const priceGB = '£288,97'
// const priceUS = priceGB.replace('£', '$').replace(',', '.')
// console.log(priceUS); // $288.97

// const announcement = "All passengers come to boarding door 23. Boarding door 23."
// console.log(announcement.replace('door', 'gate')); // All passengers come to boarding 'gate' 23. Boarding 'door' 23.
// console.log(announcement.replace(/door/g, 'gate')); // All passengers come to boarding 'gate' 23. Boarding 'gate' 23.


//// Booleans
// const plane = 'Airbus A320neo'
// console.log(plane.includes('A320')); // true
// console.log(plane.includes('Boeing')); // false
// console.log(plane.startsWith('Airb')); // true

// if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
//   console.log('Part of the new Airbus family');
// }

//// Practice Exercise
// const checkBaggage = function (items) {
//   const Baggage = items.toLowerCase() // this line will normalize all words by turning them all lower cases
//   if (Baggage.includes('gun') || Baggage.includes('knife')) {
//     console.log('you are NOT allowed onboard!');
//   } else {
//     console.log('Welcome aboard!!');
//   }
// }
// checkBaggage('I have a laptop, some Food and a pocket Knife') // you are NOT allowed onboard!
// checkBaggage('Socks and camera') // Welcome aboard!!
// checkBaggage('Got some snacks and a gun for protection') // you are NOT allowed onboard!


////////////// PART 3
//// split - turns a string into an array with the string text becoming the element of the array
console.log('a+very+nice+string'.split('+')); // (4) ['a', 'very', 'nice', 'string']
console.log('Jonas Schmedtmann'.split(' ')); // (2) ['Jonas', 'Schmedtmann']
const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ')

// const newName = ['Mr. ', firstName, lastName.toUpperCase()]
// console.log(newName); // (3) ['Mr. ', 'Jonas', 'SCHMEDTMANN']

// join - returns a new string by concatenating all of the elements in an array (or an array-like object), separated by commas or a specified separator string
// const newName = ['Mr.', firstName, lastName.toUpperCase()].join('---')
// console.log(newName); // Mr.---Jonas---SCHMEDTMANN
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ')
console.log(newName); // Mr. Jonas SCHMEDTMANN

//////// PRACTICE - Uppercase for every first letter in a word
// Examples: jessica ann smith davies => Jessica Ann Smith Davies
// Examples: nathan bach => Nathan Bach
const capitalizeName = function (names) {
  const name = names.split(' ')
  // console.log(name); // ['nathan', 'bach']
  const upperCase = []

  for (const n of name) {
    // console.log(n);
    // nathan
    // bach
    // console.log(n[0].toUpperCase()); // N
    // console.log(n[0].toUpperCase() + n.slice(1)); // Nathan
    // console.log(upperCase.push(n[0].toUpperCase() + n.slice(1)));
    // upperCase.push(n[0].toUpperCase() + n.slice(1))

    upperCase.push(n.replace(n[0], n[0].toUpperCase()))
  }
  console.log(upperCase.join(' '));
  // Jessica Ann Smith Davies
  // Nathan Bach
}

capitalizeName('jessica ann smith davies')
capitalizeName('nathan bach')

//////// Padding
const message = 'Go to gate 23!'
console.log(message.padStart(25, '+')); // +++++++++++Go to gate 23!
// console.log('Jonas'.padStart(23, '+')); // ++++++++++++++++++Jonas => 18 '+' signs = 23 - 5 (letters)
console.log('Jonas'.padStart(23, '+').padEnd(30, '+')); // Jonas+++++++ => 7 '+' signs = 30 - 23 (padStart(23, '+'))

const maskCreditCard = function (number) {
  const str = number + ''
  // converting a number to a string without using method 'String()'
  // trick: when one of the operand of the plus (+) sign is a string => all the operands will be converted to be a string

  // console.log('932835 is a', typeof number); // 932835 is a number
  // console.log('932835 is a', typeof str); // 932835 is a string
  const last = str.slice(-4) // ONLY the last 4 digits remain, the rest are hidden (removed)
  console.log(last); // 2835
  return last.padStart(str.length, '*')
}

console.log(maskCreditCard(932835))
console.log(maskCreditCard(9378481345))
console.log(maskCreditCard('182376428347683868274'))

//////// REPEAT
const message2 = 'BAD WEATHER...ALL DEPARTURES DELAYED...'
console.log(message2.repeat(5));
// BAD WEATHER...ALL DEPARTURES DELAYED...BAD WEATHER...ALL DEPARTURES DELAYED...BAD WEATHER...ALL DEPARTURES DELAYED...BAD WEATHER...ALL DEPARTURES DELAYED...BAD WEATHER...ALL DEPARTURES DELAYED...

const planesInLine = function (n) {
  console.log(`There are ${n} in line ${'🛩'.repeat(n)}`);
}
planesInLine(5)
planesInLine(7)
planesInLine(12)

/////////////////////////// WORKING WITH STRINGS - END


/////////////////////////// Coding Challenge #3 - START

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

// const gameEvents = new Map([
//   [17, '⚽️ GOAL'],
//   [36, '🔁 Substitution'],
//   [47, '⚽️ GOAL'],
//   [61, '🔁 Substitution'],
//   [64, '🔶 Yellow card'],
//   [69, '🔴 Red card'],
//   [70, '🔁 Substitution'],
//   [72, '🔁 Substitution'],
//   [76, '⚽️ GOAL'],
//   [80, '⚽️ GOAL'],
//   [92, '🔶 Yellow card'],
// ]);

// 1. Create an array 'events' of the different game events that happened (no duplicates)
// const events = new Set(gameEvents.values())
// console.log(events); // Set(4) {'⚽️ GOAL', '🔁 Substitution', '🔶 Yellow card', '🔴 Red card'} - Object with NO duplication
// const events = [...new Set(gameEvents.values())]
// console.log(events); // (4) ['⚽️ GOAL', '🔁 Substitution', '🔶 Yellow card', '🔴 Red card'] - Array with NO duplication

// 2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
// gameEvents.delete(64)
// console.log(gameEvents); // Map(10) {17 => '⚽️ GOAL', 36 => '🔁 Substitution', 47 => '⚽️ GOAL', 61 => '🔁 Substitution', 69 => '🔴 Red card', …}

// 3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
// console.log(gameEvents.size); // 10
// console.log(`An event happened, on average, every ${90 / gameEvents.size} minutes`); // An event happened, on average, every 9 minutes
// Convert Map to array
// const time = [...gameEvents.keys()]
// const time = [...gameEvents.keys()].pop()
// console.log(time); // 92
// console.log(`An event happened, on average, every ${ time / gameEvents.size } minutes`); // An event happened, on average, every 9.2 minutes

// 4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
//       [FIRST HALF] 17: ⚽️ GOAL
// console.log(gameEvents); // Map => Object
// for (const [min, event] of gameEvents) { // WHY do not need "entries()" here? => The Object.entries() static method returns an array of a given object's own enumerable string-keyed property key-value pairs.
//   const half = min <= 45 ? 'FIRST' : 'SECOND'
//   console.log(`[${half} HALF]: ${event}`);
// }

/////////////////////////// Coding Challenge #3 - END

/////////////////////////// MAPS ITERATION - START
// const question = new Map([
//   ['question', 'What is the best programming language in the world?'],
//   [1, 'C'],
//   [2, 'Java'],
//   [3, 'JavaScript'],
//   ['correct', 3],
//   [true, 'Correct 🍾'],
//   [false, 'Try again!'],
// ])
// console.log(question); // Map(7) {'question' => 'What is the best programming language in the world?', 1 => 'C', 2 => 'Java', 3 => 'JavaScript', 'correct' => 3, …}

////////////////////////////////////// Convert object to Map - openingHours - START
// console.log('openingHours is an ', typeof openingHours); // 'openingHours' is an object
// const hoursMap = new Map(Object.entries(openingHours))
// console.log(hoursMap); // Map(3) {'fri' => {…}, 'thu' => {…}, 'sat' => {…}}
// console.log(new Map(Object.entries(openingHours))); // Map(3) {'fri' => {…}, 'thu' => {…}, 'sat' => {…}}

////////////////////////////////////// Quizz app - START
// console.log(question.get('question')); // What is the best programming language in the world?
// for (const [key, value] of question) {
//   if (typeof key === 'number') console.log(`Answer ${key}: ${value}`)
// }

// const answer = Number(prompt('Your answer is '))
// console.log(answer);
// console.log(question.get(question.get('correct') === answer));
// WHY 'question.get' TWICE here?
// WHY 'answer' works but NOT number 3?

////////////////////////////////////// Convert Map to array - START

// console.log(typeof question); // Map - object

// console.log([...question]); // (7) [Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2)]

// console.log([...question.keys()]); // (7) ['question', 1, 2, 3, 'correct', true, false]

// console.log([...question.values()]); // (7) ['What is the best programming language in the world?', 'C', 'Java', 'JavaScript', 3, 'Correct 🍾', 'Try again!']


/////////////////////////// MAPS ITERATION - END


/////////////////////////// MAPS FUNDAMENTALS - START
// const rest = new Map();
// rest.set('name', 'Classico Italiano');
// rest.set(1, 'Firenze, Italy');
// console.log(rest.set(2, 'Lisbon, Portugal')); // Map(3) {'name' => 'Classico Italiano', 1 => 'Firenze, Italy', 2 => 'Lisbon, Portugal'}

// rest
//   .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
//   .set('open', 11)
//   .set('close', 23)
//   .set(true, 'we are opened :D')
//   .set(false, 'we are closed :(((');

// console.log(rest.get('name')); // 'Classico Italiano'
// console.log(rest.get(true)); // 'we are opened'
// console.log(rest.get('true')); // undefined
// console.log(rest.get(false)); // 'we are closed'
// console.log(rest.get('false')); // undefined
// console.log(rest.get(1)); // Firenze, Italy
// console.log(rest.get('1')); // Undefined

// const time = 21
// console.log(time > rest.get('open') && time < rest.get('close')); // true
// console.log(rest.get(time > rest.get('open') && time < rest.get('close'))); // we are opened :D

// console.log(rest.has('categories')); // true
// rest.delete(2) // (2, 'Lisbon Portugal') is removed from the object 'rest'
// console.log(rest); // Map(7) {'name' => 'Classico Italiano', 1 => 'Firenze, Italy', 'categories' => Array(4), 'open' => 11, 'close' => 23, …}
// console.log(rest.size); // 7
// // rest.clear() // The whole object is cleared
// // console.log(rest); // Map(0) {size: 0}
// // console.log(rest.size); // 0
// rest.set([1,2], 'test')
// console.log(rest.get[1,2]); // undefined
// // The reason is the object '[1,2]' in 'rest.get[1,2]' and 'rest.set([1,2]' are NOT the same object in the heap, we are referring the objects in two different locations so we cannot retrieve 'test'

// const arr = [1,2]
// rest.set(arr, 'test')
// console.log(rest.get(arr)); // test
// // we are able to retrieve 'test' because we are storing '1,2' in the same array 'arr' and we are referring to the same array for it.
/////////////////////////// MAPS FUNDAMENTALS - END


/////////////////////////// SET - START
// const ordersSet = new Set([
//   'Pasta',
//   'Pizza',
//   'Pizza',
//   'Risotto',
//   'Pasta',
//   'Pizza',
// ]);
// console.log(ordersSet); // Set(3) {'Pasta', 'Pizza', 'Risotto'}
// console.log(new Set('Jonas')); // Set(5) {'J', 'o', 'n', 'a', 's'}
// console.log(ordersSet.size); // 3 => duplicated is NOT counted
// console.log(ordersSet.has("Pizza")); // true
// console.log(ordersSet.has("Bread")); // false
// ordersSet.add("Garlic Bread")
// ordersSet.add("Garlic Bread")
// console.log(ordersSet); // Set(4) {'Pasta', 'Pizza', 'Risotto', 'Garlic Bread'} => Duplication "Garlic Bread" is NOT added
// ordersSet.delete("Risotto")
// console.log(ordersSet); // Set(3) {'Pasta', 'Pizza', 'Garlic Bread'}
// console.log(ordersSet[0]); // undefined => unable to access array elements using indices
// // ordersSet.clear() // Set(0) {size: 0}
// console.log(ordersSet);
// for (const order of ordersSet) console.log(order);
// // 'Pasta'
// // 'Pizza'
// // 'Garlic Bread'

// // Example
// const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']
// const staffUnique = [...new Set(staff)]
// console.log(staffUnique); // (3) ['Waiter', 'Chef', 'Manager'] => Duplication is NOT included
// console.log(new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size); // 3 => Duplication is NOT counted
// console.log(new Set('jonasschedtmann').size); // 11 (There are 15 total characters) => only ONE "s", ONE "n" and ONE "a" is counted
/////////////////////////// SET - END

/////////////////////////// Coding Challenge #2 - START

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/


// 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")

const game = {
  team1: "Bayern Munich",
  team2: "Lucas Oliver",
  players: [
    [
      "Tom",
      "Jerry",
      "Mickey",
      "Minnie",
      "Donald",
      "Goofy",
      "Davies",
      "Muller",
      "Lewandowski",
      "Kimmich"
    ],
    [
      "Warren",
      "Lawrence",
      "Violet",
      "Jon",
      "Jamie",
      "Harley",
      "Robbie",
      "Benjamin",
      "Jake",
      "Kyle"
    ]
  ],
  scored: ["Davies", "Muller", "Lewandowski", "Kimmich"], // 4 players => 4 scores
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5
  }
}

//////////////////////////////// self work - START
// const scored = game.scored
// console.log(scored);

// for (const i of scored.entries()) {
//   // console.log(i);
//   console.log(`Goal ${i[0] + 1}: ${i[1]}`);
// }
//////////////////////////////// self work - END

// Video solution
// for (const [i, player] of game.scored.entries()) { // method returns a new array iterator object that contains the key/value pairs for each index in the array
//   console.log(`Goal ${i + 1}: ${player}`);
// }

// // 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
// const odds = Object.values(game.odds) // "odds" is an Object
// console.log(odds); // (3) [1.33, 3.25, 6.5]
// let average = 0
// for (const odd of odds) average += odd; console.log(`The total odd is ${average}`); // 11.08
// average /= odds.length // average = average / odds.length (3)
// console.log(`The average odd is ${average}`);

// 3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
//       Odd of victory Bayern Munich: 1.33
//       Odd of draw: 3.25
//       Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉


// const game = {
//   team1: "Bayern Munich",
//   team2: "Lucas Oliver",
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5
//   }
// }
// for (const [team, odd] of Object.entries(game.odds)) {
//   // console.log(team, odd);
//   let teamStr = team === 'x' ? 'draw' : `victory ${game[team]}` // if odds.team === 'x' => change to 'draw', otherwise change to 'victory ${game[team]}'
//   console.log(`Odd of ${teamStr}: ${odd}`);
//   //       Odd of victory Bayern Munich: 1.33
//   //       Odd of draw: 3.25
//   //       Odd of victory Lucas Oliver: 6.5
// }

/////////////////////////// Coding Challenge #2 - END


/////////////////////////// Looping Objects Object Keys, Values, and Entries - START

//Property NAMES
// const properties = Object.keys(openingHours)
// const openingHours = {
//   [weekdays[4]]: {
//     open: 12,
//     close: 22,
//   },
//   [weekdays[3]]: {
//     open: 11,
//     close: 23,
//   },
//   [weekends[0]]: {
//     open: 0, // Open 24 hours
//     close: 24,
//   },
// }
// console.log(properties); // (3) ['fri', 'thu', 'sat']

// console.log(`We're opened on ${properties.length} days`);

// for (const day of Object.keys(openingHours)) {
//   console.log(day);
//   // fri
//   // thu
//   // sat
// }

// let openStr = `We're opened on ${properties.length} days: `
// for (const day of properties) {
//   openStr += `${day}, `
// }
// console.log(openStr);

// Property VALUES
// const values = Object.values(openingHours)
// console.log(values);
// {open: 12, close: 22}
// {open: 11, close: 23}
// {open: 0, close: 24}

// Entire object
// const entries = Object.entries(openingHours)
// console.log(entries); // (3) [Array(2), Array(2), Array(2)]

// [key, value]
// for (const [key, { open, close }] of entries) {
//   console.log(`On ${key} we're opened at ${open} and we're closed at ${close}`);
//   // On fri we're opened at 12 and we're closed at 22
//   // On thu we're opened at 11 and we're closed at 23
//   // On sat we're opened at 0 and we're closed at 24
// }

/////////////////////////// Looping Objects Object Keys, Values, and Entries - END


/////////////////////////// Optional Chaining (.) - START
// console.log(restaurant.openingHours.tue?.open); // undefined => NOT opened on Tuesday
// console.log(restaurant.openingHours.fri?.open); // 12 => opened at 12

// const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
// for (const day of days) {
//   const open = restaurant.openingHours[day]?.open ?? "we're closed"
//   console.log(`On ${day} we're opened at ${open}`);
// }

// // Methods
// console.log(restaurant.order?.(0, 1) ?? 'Method does not exist'); // (2) ['Focaccia', 'Pasta'] // Nullish coalescing operator (??), shorter form for ternary operator
// // restaurant.order(0, 1) ? console.log(restaurant.order(0, 1)) : 'Method does not exist' // (2) ['Focaccia', 'Pasta']
// console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// // Arrays
// const users = [{ name: 'Bach', email: 'minhnhan.fastcodingvn@gmail.com' }]

// console.log(users[0]?.name ?? 'User array empty'); // Bach
// if (users.length > 0) console.log(users[0].name); else console.log('user array empty'); // Bach

/////////////////////////// Optional Chaining (.) - END

/////////////////////////// Looping Arrays The for-of Loop - START
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu]
// console.log(menu);
// for (const item of menu) console.log(item);
// for (const item of menu.entries()) { // entries() method returns a new array iterator object that contains the key/value pairs for each index in the array
//   // console.log(item); // log the key and value with array format
//   // console.log(`${item[0] + 1}`); // the array key starts from 0 but we want the logged out number to be 1
//   // console.log(`${item[1]}`); // this the value of each item in the array
//   console.log(`${item[0] + 1}: ${item[1]}`); // 1: Focaccia
// }

// // shortened form for "item"
// for (const [i, el] of menu.entries()) {
//   console.log(`${i + 1}: ${el}`); // 1: Focaccia
// }

// console.log(menu.entries()); // Array Iterator {}
/////////////////////////// Looping Arrays The for-of Loop - END

/////////////////////////// Logical Assignment Operators - START
// const rest1 = {
//   name: "Capri",
//   numGuests: 0
// };

// const rest2 = {
//   name: "La Piazza",
//   owner: "Giovanni Rossi"
// }

// OR ASSIGNMENT OPERATOR
// rest1.numGuests = rest1.numGuests || 10;
// guest2.numGuests = rest2.numGuests || 10;
// rest1.numGuests ||= 10
// rest2.numGuests ||= 10

// nullish assignment operator (null or undefined)
// rest1.numGuests ??= 10
// rest2.numGuests ??= 10

// AND assignment operator
// rest1.owner = rest1.owner && '<ANONYMOUS>';
// rest2.owner = rest2.owner && '<ANONYMOUS>';
// rest1.owner &&= '<ANONYMOUS>';
// rest2.owner &&= '<ANONYMOUS>';

// console.log(rest1);
// console.log(rest2);
/////////////////////////// Logical Assignment Operators - END

/////////////////////////// NULLISH: null and undefined (NOT 0 or '') - START
// restaurant.numGuests = 0;
// const guests = restaurant.numGuests || 10;
// console.log(guests);

// The latter returns the right-hand side operand if the left operand is any falsy value, not only null or undefined
// restaurant.numGuests = 0; => guestCorrect = 0
// restaurant.numGuests = null/undefined; => guestCorrect = 10
// const guestCorrect = restaurant.numGuests ?? 10;
// console.log(guestCorrect);
/////////////////////////// NULLISH: null and undefined (NOT 0 or '') - END

// restaurant.orderDelivery({
//   time: "20:30",
//   address: "Via del Sole, 21",
//   mainIndex: 2,
//   starterIndex: 2
// })

// restaurant.orderDelivery({
//   address: "Via del Sole, 21",
//   mainIndex: 1,
// })

/////////////////////////// REST pattern and parameters - START
// 1. Destructuring
// SPREAD, because on RIGHT side of "=" sign
// const arr = [1,2,...[3,4]]
// console.log(arr); // => 1 2 3 4 5
// REST, because on LEFT side of "=" sign
// const [a,b,...others] = [1,2,3,4,5]
// console.log(a,b, others); // 1 2 => 3 4 5

// const [pizza, risotto, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu
// ]
// mainMenu: ['Pizza', 'Pasta', 'Risotto'],
// starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
// console.log(pizza, risotto, otherFood); // Pizza Pasta => ['Risotto', 'Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']

// Objects
// const {sat, ...weekdays} = restaurant.openingHours
// console.log(weekdays); // {thu: {…}, fri: {…}}
// 2. Functions
// const add = function (...numbers) {
//   console.log(numbers);
//   // (2) [2, 3]
//   // (4) [5, 3, 7, 2]
//   // (7) [8, 2, 5, 3, 2, 1, 4]
// }

// const add = function (...numbers) {
//   let sum = 0
//   for (let i=0;i<numbers.length;i++) sum += numbers[i]
//   console.log(sum);
//   // 5
//   // 17
//   // 25
//   // add(...x) = 35
// }

// add(2, 3);
// add(5, 3, 7, 2);
// add(8, 2, 5, 3, 2, 1, 4);

// const x = [23,5,7]
// add(...x)

// restaurant.orderPizza("mushrooms", "onion", "olives", "spinach")
/////////////////////////// REST pattern and parameters - END

/////////////////////////// Short circuiting - START
// Use ANY data type, return ANY data type, short-circuiting
// console.log(3 || 'Jonas'); // 3
// console.log('' || 'Jonas'); // Jonas
// console.log(true || 0); // true
// console.log(undefined || null); // null

// console.log(undefined || 0 || '' || 'Hello' || 23 || null); // Hello

// restaurant.numGuests = 23;
// const guests1 = restaurant.numGuests ? restaurant.numGuests : 10
// console.log(guests1);

// const guests2 = restaurant.numGuests || 10
// console.log(guests2);

// console.log('------ AND ------');
// console.log(0 && 'Jonas');
// console.log(7 && 'Jonas');

// console.log('Hello' && 23 && null && 'jonas');

// // Practical example
// if (restaurant.orderPizza) {
//   restaurant.orderPizza('mushrooms', 'spinach');
// }

// restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach')
/////////////////////////// Short circuiting - END

/////////////////////////// SPREAD - START
// const arr = [7,8,9]
// console.log(`array "arr" is ${arr}`);
// const badNewArr = [1,2,arr[0], arr[1], arr[2]]
// console.log(badNewArr);

// const newArr = [1,2, ...arr]
// console.log(`array "newArr" using spread is ${newArr}`);

// console.log(...newArr);
// console.log(1,2,7,8,9);

// const newMenu = [...restaurant.mainMenu, "Gnocci "]
// console.log(newMenu);

// Copy array
// const mainMenuCopy = [...restaurant.mainMenu]

// Join 2 arrays
// const menuCombine = [...restaurant.starterMenu, ...restaurant.mainMenu]
// console.log(menuCombine);

// Iterables: arrays, ,strings, maps, sets. NOT objects
// const str = 'Jonas'
// // const letters = [...str, "", "S."]
// console.log(str); // Jonas
// const letters = [...str]
// console.log(letters); // "J", "o", "n", "a", "s"

// Real world example - START
// const ingredients = [
//   // prompt("Let\'s make pasta! Ingredient 1?"),
//   // prompt("Ingredient 2?"),
//   // prompt("Ingredient 3?")
// ]
// console.log(ingredients);
// restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2])
// restaurant.orderPasta(...ingredients) // copy array "ingredients"

// Objects
// const newCoffeeShop = {foundedIn: "2040", ...restaurant, founder: "Bach"}
// console.log(newCoffeeShop);

// const restaurantCopy = {...restaurant}
// console.log(restaurantCopy);
// restaurantCopy.name = "Bach"
// console.log(restaurantCopy.name);
/////////////////////////// SPREAD - END

/////////////////////////// DESTRUCTURING ARRAY - START /////////////////
// const arr = [2,3,4]
// const a = arr[0]
// const b = arr[1]
// const c = arr[2]

// let [main, , secondary] = restaurant.categories
// console.log(main, secondary); // Italian Vegetarian

// Switching variables
// const temp = main
// main = secondary
// secondary = temp
// console.log(main, secondary); // Vegetarian Italian
// [main, secondary] = [secondary, main]
// console.log(main, secondary); // Vegetarian Italian

// console.log(restaurant.order(2, 0)); // Garlic Bread Pizza

// Receive 2 returned values from a function
// const [starter, mainCourse] = restaurant.order(2,0)
// console.log(starter, mainCourse);

// Nested destructuring
// const nested = [2, 4, [5, 6]]
// const [i, , j] = nested
// console.log(i, j); // 2 [5 6]
// const [l, , [m, n]] = nested
// console.log(l, m, n); // 2 5 6

// Default values
// const [p, q, r] = [8, 9]
// console.log(p, q, r); // 8 9 undefined
// const [t=1, u=1, v=1] = [8, 9]
// console.log(t, u, v); // 8, 9, 1
/////////////////////////// DESTRUCTURING ARRAY - END /////////////////


/////////////////////////// DESTRUCTURING OBJECT - START /////////////////
// const {name, openingHours, categories} = restaurant
// console.log(name, openingHours, categories);
// const {name: restaurantName, openingHours: hours, categories: tags} = restaurant
// console.log(restaurantName, hours, tags);
// Default values
// const { menu = [], starterMenu: starters = [] } = restaurant
// console.log(menu, starters);
// Mutating variables
// let a = 111;
// let b = 999;
// const obj = {a:23, b:7, c:14};
// ({a,b} = obj)
// console.log(a,b);

// Nested objects
// const { fri } = openingHours
// console.log(fri); // 11 23
// const { fri: {open, close} } = openingHours
// console.log(open, close); // 11 23
/////////////////////////// DESTRUCTURING OBJECT - END /////////////////

/////////////////////////////////////// Coding Challenge #1 - START

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

// const game = {
//   team1: "Bayern Munich",
//   team2: "Lucas Oliver",
//   players: [
//     [
//       "Tom",
//       "Jerry",
//       "Mickey",
//       "Minnie",
//       "Donald",
//       "Goofy",
//       "Davies",
//       "Muller",
//       "Lewandowski",
//       "Kimmich"
//     ],
//     [
//       "Warren",
//       "Lawrence",
//       "Violet",
//       "Jon",
//       "Jamie",
//       "Harley",
//       "Robbie",
//       "Benjamin",
//       "Jake",
//       "Kyle"
//     ]
//   ],
//   scored: ["Davies", "Muller", "Lewandowski", "Kimmich"], // 4 players => 4 scores
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5
//   }
// }

// 1. Create one player array for each team (variables 'players1' and 'players2')
// const [players1, players2] = game.players
// console.log(`players1: ${players1}`, `players2: ${players2}`);

// 2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
// const [gk, ...fieldPlayers] = players1
// console.log(`gk: ${gk}`);
// console.log(`Team 1's field players: ${fieldPlayers}`);

// 3. Create an array 'allPlayers' containing all players of both teams (22 players)
// const allPlayers = [...players1, ...players2]
// console.log(`Here are all the players: ${allPlayers}`);

// 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
// const players1Final = [...players1, "Thiago", "Coutinho", "Perisic"]
// console.log(`The total members for Team 1 is ${players1Final.length} players including ${players1.length} from the original team and "Thiago", "Coutinho", "Perisic" making the whole new team including ${players1Final}`);

// 5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
// const {odds: {team1, x: draw, team2}} = game
// console.log(team1, draw, team2); // 1.33,3.25,6.5
// console.log(team1, x, team2); // 1.33 => (3) [23, 5, 7] 6.5    WHY THO?

// 6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
// const printGoals = function (...players) {
//   console.log(players);
//   console.log(`${players.length} goals were scored!`); // the scored goals are counted based on the number of goalkeeper
// }

// printGoals("Davies","Muller","Lewandowski","Kimmich")
// printGoals("Davies","Muller")
// printGoals(game.scored) // 1 goals were scored    WHY?
// printGoals(...game.scored) // 4 goals were scored because 'scored: ["Davies", "Muller", "Lewandowski", "Kimmich"]'

// 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.
// team1 > team2 && console.log("Team 1 is more likely to win");
// console.log(team1 > team2); // False
// team1 < team2 && console.log("Team 2 is more likely to win");
// console.log(team2 > team1); // True

/////////////////////////////////////// Coding Challenge #1 - END