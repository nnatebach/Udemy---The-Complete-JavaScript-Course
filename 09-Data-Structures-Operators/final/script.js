'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order: function (startIndex, mainIndex) {
    return [this.starterMenu[startIndex], this.mainMenu[mainIndex]]
  },
  orderDelivery: function ({startIndex=1, mainIndex=0, time="20:00", address}) {
    console.log(`Order received! ${this.starterMenu[startIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(`The ingredients to make pasta includes ${ing1}, ${ing2}, ${ing3}`);
  }
};

restaurant.orderDelivery({
  time: "20:30",
  address: "Via del Sole, 21",
  mainIndex: 2,
  starterIndex: 2
})

restaurant.orderDelivery({
  address: "Via del Sole, 21",
  mainIndex: 1,
})
/////////////////////////// SPREAD - START
const arr = [7,8,9]
console.log(`array "arr" is ${arr}`);
const badNewArr = [1,2,arr[0], arr[1], arr[2]]
console.log(badNewArr);

const newArr = [1,2, ...arr]
console.log(`array "newArr" using spread is ${newArr}`);

console.log(...newArr);
console.log(1,2,7,8,9);

const newMenu = [...restaurant.mainMenu, "Gnocci "]
console.log(newMenu);

// Copy array
const mainMenuCopy = [...restaurant.mainMenu]

// Join 2 arrays
const menuCombine = [...restaurant.starterMenu, ...restaurant.mainMenu]
console.log(menuCombine);

// Iterables: arrays, ,strings, maps, sets. NOT objects
const str = 'Jonas'
// const letters = [...str, "", "S."]
console.log(str); // Jonas
const letters = [...str]
console.log(letters); // "J", "o", "n", "a", "s"

// Real world example - START
const ingredients = [
  // prompt("Let\'s make pasta! Ingredient 1?"),
  // prompt("Ingredient 2?"),
  // prompt("Ingredient 3?")
]
console.log(ingredients);
restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2])
restaurant.orderPasta(...ingredients) // copy array "ingredients"

// Objects
const newCoffeeShop = {foundedIn: "2040", ...restaurant, founder: "Bach"}
console.log(newCoffeeShop);

const restaurantCopy = {...restaurant}
console.log(restaurantCopy);
restaurantCopy.name = "Bach"
console.log(restaurantCopy.name);
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