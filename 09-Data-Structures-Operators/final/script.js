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

/////////////////////////// Looping Arrays The for-of Loop - START
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu]
console.log(menu);
for (const item of menu) console.log(item);
for (const item of menu.entries()) { // entries() method returns a new array iterator object that contains the key/value pairs for each index in the array
  // console.log(item); // log the key and value with array format
  // console.log(`${item[0] + 1}`); // the array key starts from 0 but we want the logged out number to be 1
  // console.log(`${item[1]}`); // this the value of each item in the array
  console.log(`${item[0] + 1}: ${item[1]}`); // 1: Focaccia
}

// shortened form for "item"
for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`); // 1: Focaccia
}

console.log(menu.entries()); // Array Iterator {}
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
const [a,b,...others] = [1,2,3,4,5]
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
//   console.log(`${players.length} goals were scored!`); // the scored goals are counted based on the number goalkeeper
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