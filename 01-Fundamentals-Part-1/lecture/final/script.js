// // LECTURE: Values and Variables
// // 1
// // let country = "Vietnam"
// // let continent = "Asia"
// // let population = 97470000
// // 2
// console.log(country);
// console.log(continent);
// console.log(population);

// // LECTURE: Data Types
// // 1
// // let isIsland = false
// // let language;
// // 2
// console.log(typeof(isIsland));
// console.log(typeof(population));
// console.log(typeof(country));
// console.log(typeof(language));


// // LECTURE: let, const and var
// // 1
// // language = "Vietnamese";
// // 2
// // const myCountry = "Vietnam";
// // const myContinent = "Asia";
// // 3. Trytochangeoneofthechangedvariablesnow,andobservewhathappens


// // LECTURE: Basic Operators
// // 1
// let halfPopulation = population / 2;
// console.log(halfPopulation);
// // 2
// console.log(population + 1); // increase the population by 1
// // 3
// const finlandPopulation = 6000000
// console.log(population > finlandPopulation); // true - Vietnam has higher population than Finland
// // 4
// const averagePopulation = 33000000
// console.log(population < averagePopulation); // false - Vietnam has higher than average population
// // 5
// let description = country + " is in " + continent + " and its " + population + " people speak " + language;
// console.log(description);

// // LECTURE: Strings and Template Literals
// description = country + ` is in `  + continent + ` and its ` + population + ` people speak ` + language;
// console.log(description);

// // LECTURE: Taking Decisions: if / else Statements
// // 1
// if (population > averagePopulation) {
//   console.log(country + ` has higher than average population.`);
// } else {
//   console.log(country + ' is ' + (averagePopulation - population) + ` below the average population.`);
// }
// // 2
// population = 13;
// if (population > averagePopulation) {
//   console.log(country + ` has higher than average population.`);
// } else {
//   console.log(country + ' is ' + (averagePopulation - population) + ` below the average population.`);
// }
// // 2
// population = 130;
// if (population > averagePopulation) {
//   console.log(country + ` has higher than average population.`);
// } else {
//   console.log(country + ' is ' + (averagePopulation - population) + ` below the average population.`);
// }

// // LECTURE: Type Conversion and Coercion
// '9' - '5'; // '4'
// // console.log('9' - '5');
// '19' - '13' + '17'; // '617'
// // console.log('19' - '13' + '17');
// '19' - '13' + 17; // '23'
// // console.log('19' - '13' + 17);
// '123' < 57; // false
// // console.log('123' < 57);
// 5 + 6 + '4' + 9 - 4 - 2; // 1143
// // console.log(5 + 6 + '4' + 9 - 4 - 2);

// // LECTURE: Equality Operators: == vs. ===
// // 1
// let numNeighbors = "2"
// console.log(typeof(numNeighbors));
// // 2
// if (numNeighbors === 1) {
//   console.log("Only 1 border!");
// }
// // 3
// else if (numNeighbors > 1) {
//   console.log("More than 1 border!");
// }
// // 4
// else {
//   console.log("No borders"); // 'numNeighbours' is 0 or any other value
// }
// 8 => For loose equality (==) the values are compared as either type of "string" or "number"
// 8 => With triple equals (===) the values are compared as numbers
// 8 - the string of number 1 ("1") does not equal to the number 1 => comparing using "==" will give "No borders"
// 8 - the number 1 equals to 1 as numbers => comparing using "==" will give "Only 1 border!"
// 8 - we should always use "===" (triple equals) for equally comparison!

// LECTURE: Logical Operators
// 1 - Comment out the previous code so the prompt doesn't get in the way
// 2
let countrySearch = "Brazil"
let languageSearch = "Portuguese"
let populationSearch = 214300000
let isIslandSearch = false
console.log(typeof(isIslandSearch));
// 3
if(languageSearch = "English" && populationSearch < 50000000 && !isIslandSearch) {
  console.log(`You should live in ${countrySearch}`);
} else {
  console.log(`${countrySearch} does not meet your criteria!`);
}

// LECTURE: The switch Statement
let language = "Hindi"
switch (language) {
  case "Chinese" || "Mandarin":
    console.log(`${language}` + " has the MOST number of native speakers!");
    break;
  case "Spanish":
    console.log(`${language}` + " is the 2nd place in number of native speakers!");
    break;
  case "English":
    console.log(`${language}` + " is the 3rd place in number of native speakers!");
    break;
  case "Hindi":
    console.log(`${language}` + " is the 4th place in number of native speakers!");
    break;
  case "Arabic":
    console.log(`${language}` + " is the 5th most spoken language!");
    break;
    default:
      console.log(`${language}` + " is a great language too!");
}

// LECTURE: The Conditional (Ternary) Operator
// 1
const country = "Vietnam"
// let vietnamPopulation = 97470000
// let vietnamPopulation = 13470000
// vietnamPopulation > 33000000 ? console.log(`${country}\'s` + " population is above average") : console.log(`${country}\'s` + " population is below average");
// 2
let vietnamPopulation = 130470000
vietnamPopulation > 33000000 ? console.log(`${country}\'s` + " population is above average") : console.log(`${country}\'s` + " population is below average");

