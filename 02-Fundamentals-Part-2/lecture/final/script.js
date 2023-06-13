// LECTURE: Functions
// 1. Writeafunctioncalled'describeCountry'whichtakesthreeparameters: 'country', 'population' and 'capitalCity'. Based on this input, the function returns a string with this format: 'Finland has 6 million people and its capital city is Helsinki'
// 2. Callthisfunction3times,withinputdatafor3differentcountries.Storethe returned values in 3 different variables, and log them to the console

// 1
function describeCountry (country, population, capitalCity) {
  return `${country}` + " has " + `${population}` + " people and the capital city is " + `${capitalCity}`
}

// 2
const Vietnam = describeCountry("Vietnam", 97470000, "Hanoi")
console.log(Vietnam);
const Japan = describeCountry("Japan", 67750000, "Tokyo")
console.log(Japan);
const France = describeCountry("France", 97470000, "Paris")
console.log(France);

// LECTURE: Function Declarations vs. Expressions
// 1. Theworldpopulationis7900millionpeople.Createafunctiondeclaration called 'percentageOfWorld1' which receives a 'population' value, and returns the percentage of the world population that the given population represents. For example, China has 1441 million people, so it's about 18.2% of the world population
// 2. Tocalculatethepercentage,dividethegiven'population'valueby7900 and then multiply by 100
// 3. Call'percentageOfWorld1'for3populationsofcountriesofyourchoice, store the results into variables, and log them to the console
// 4. Createafunctionexpressionwhichdoestheexactsamething,called 'percentageOfWorld2', and also call it with 3 country populations (can be the same populations)

const worldPopulation = 7900
// // 1
function percentageOfWorld01 (country, population, percentagePopulation) {
  return `${country}` + " has a population of " + `${population}` + " million people so it is about " + `${percentagePopulation}` + "% of the world population."
}

let VietnamPopulation = 97.47
// 2
let percentagePopulation = percentageOfWorld01("Vietnam", 97.47, VietnamPopulation / worldPopulation * 100)
console.log(percentagePopulation);

let JapanPopulation = 125
// 2
percentagePopulation = percentageOfWorld01("Japan", 125, JapanPopulation / worldPopulation * 100)
console.log(percentagePopulation);

let FrancePopulation = 67.75
// 2
percentagePopulation = percentageOfWorld01("France", 67.75, FrancePopulation / worldPopulation * 100)
console.log(percentagePopulation);

// 3
let percentageOfWorld2 = function (country, population, percentagePopulation) {
  return `${country}` + " has a population of " + `${population}` + " million people so it is about " + `${percentagePopulation}` + "% of the world population."
}

FrancePopulation = 67.75

percentagePopulation = percentageOfWorld2("France", 67.75, FrancePopulation / worldPopulation * 100)
console.log(percentagePopulation);

// LECTURE: Arrow Functions
// 1. Recreatethelastassignment,butthistimecreateanarrowfunctioncalled
//    'percentageOfWorld3'

const percentageOfWorld3 = (country, population, percentagePopulation) => {
  return `${country}` + " has a population of " + `${population}` + " million people so it is about " + `${percentagePopulation}` + "% of the world population."
}

percentagePopulation = percentageOfWorld3("France", 67.75, FrancePopulation / worldPopulation * 100)
console.log(percentagePopulation);

// LECTURE: Functions Calling Other Functions
// 1. Createafunctioncalled'describePopulation'.Usethefunctiontypeyou like the most. This function takes in two arguments: 'country' and 'population', and returns a string like this: 'China has 1441 million people, which is about 18.2% of the world.'
// 2. Tocalculatethepercentage,'describePopulation'callthe 'percentageOfWorld1' you created earlier
// 3. Call'describePopulation'withdatafor3countriesofyourchoice

const population = 38.25
// 1
function percentageOfWorld01 (population) {
  return population / worldPopulation * 100
}

// 1
const describePopulation = (country, population) => {
  // 2
  const percentage = percentageOfWorld01(population);
  const description = `${country} has ${population} million people, which is about ${percentage} of the world.`;
  console.log(description);
}

describePopulation("Canada", 38.25)

// 3

const countryPopulation = (country, population) => {
  const percentage = percentageOfWorld01(population);
  const description = `${country} has ${population} million people, which is about ${percentage} of the world.`;
  console.log(description);
}

countryPopulation("Spain", 47.42)
countryPopulation("Japan", 125.7)
countryPopulation("America", 331.9)

// LECTURE: Introduction to Arrays
// 1. Createanarraycontaining4populationvaluesof4countriesofyourchoice. You may use the values you have been using previously. Store this array into a variable called 'populations'
// 2. Logtotheconsolewhetherthearrayhas4elementsornot(trueorfalse)
// 3. Createanarraycalled'percentages'containingthepercentagesofthe
// world population for these 4 population values. Use the function 'percentageOfWorld1' that you created earlier to compute the 4 percentage values

// 1
let populations = [38.25,47.42,125.7,331.9]
// 2
console.log(populations.length === 4);
// 3
function percentageOfWorld01 (populations) {
  return populations / worldPopulation * 100 // you can multiply by 1000 if the decimal number is too small
}
const percentages = [
  percentageOfWorld01 (populations[0]),
  percentageOfWorld01 (populations[1]),
  percentageOfWorld01 (populations[2]),
  percentageOfWorld01 (populations[3])
]
console.log("worldPopulation: " + worldPopulation);
console.log(percentages);

// LECTURE: Basic Array Operations (Methods)
// 1. Createanarraycontainingalltheneighbouringcountriesofacountryofyour choice. Choose a country which has at least 2 or 3 neighbours. Store the array into a variable called 'neighbours'
// 2. Atsomepoint,anewcountrycalled'Utopia'iscreatedintheneighbourhoodof your selected country. So add it to the end of the 'neighbours' array
// 3. Unfortunately,aftersometime,thenewcountryisdissolved.Soremoveitfrom the end of the array
// 4. Ifthe'neighbours'arraydoesnotincludethecountry‘Germany’,logtothe console: 'Probably not a central European country :D'
// 5. Changethenameofoneofyourneighbouringcountries.Todothat,findthe index of the country in the 'neighbours' array, and then use that index to change the array at that index position. For example, you can search for 'Sweden' in the array, and then replace it with 'Republic of Sweden'.

// 1
const neighbors = ["China", "Laos", "Cambodia"]
// 2
neighbors.push("Utopia")
// 3
neighbors.pop()
// 4
if (!neighbors.includes("Germany")) {
  console.log("Probably not a central European country");
} else {
  console.log("Here goes Germany");
}
// why does "if (neighbors.includes("Germany"))" log "Here goes Germany"? There is no "Germany"
console.log(neighbors.includes("Germany"));
// 5
console.log(neighbors.indexOf("Laos"));
neighbors[1] = "Japan"
console.log(neighbors);
console.log(neighbors.indexOf("China"));
console.log(neighbors.indexOf("Cambodia"));
neighbors[0] = "Korea"
neighbors[2] = "Italy"
console.log(neighbors);

// LECTURE: Introduction to Objects
// 1. Createanobjectcalled'myCountry'foracountryofyourchoice,containing properties 'country', 'capital', 'language', 'population' and 'neighbours' (an array like we used in previous assignments)

// const myCountry = {
//   country: "Vietnam",
//   capital: "Hanoi",
//   language: "Vietnamese",
//   population: 97.47,
//   neighbours: ["China", "Laos", "Cambodia"]
// }

// LECTURE: Dot vs. Bracket Notation
// 1. Usingtheobjectfromthepreviousassignment,logastringlikethistothe console: 'Finland has 6 million finnish-speaking people, 3 neighbouring countries and a capital called Helsinki.'
// 2. Increasethecountry'spopulationbytwomillionusingdotnotation,andthen decrease it by two million using brackets notation.

// 1
// console.log(myCountry.country + ` has ` + myCountry.population + ` million Vietnamese speaking people, ` + myCountry.neighbours.length + ` neighboring countries and a capital called ` + myCountry.capital);
// 2
// console.log(myCountry.population + 2);
// console.log(myCountry['population'] - 2);
// 2 - a different way
// myCountry.population += 2 // 97.47 + 2 = 99.47
// console.log(myCountry.population);
// myCountry['population'] -= 2 // 99.47 + 2 = 97.47
// console.log(myCountry.population);

// LECTURE: Object Methods
// 1. Addamethodcalled'describe'tothe'myCountry'object.Thismethod will log a string to the console, similar to the string logged in the previous assignment, but this time using the 'this' keyword.
// 2. Callthe'describe'method
// 3. Addamethodcalled'checkIsland'tothe'myCountry'object.This
// method will set a new property on the object, called 'isIsland'. 'isIsland' will be true if there are no neighbouring countries, and false if there are. Use the ternary operator to set the property.

// 1
const myCountry = {
  country: "Vietnam",
  capital: "Hanoi",
  language: "Vietnamese",
  population: 97.47,
  neighbours: ["China", "Laos", "Cambodia"],
  describe: function () {
    console.log(this.country + ` has ` + this.population + ` million Vietnamese speaking people, ` + this.neighbours.length + ` neighboring countries and a capital called ` + this.capital);
  }
}
// 2
myCountry.describe()
// 3
const myCountry2 = {
  country: "Vietnam",
  capital: "Hanoi",
  language: "Vietnamese",
  population: 97.47,
  neighbours: ["China", "Laos", "Cambodia"],
  describe: function () {
    console.log(this.country + ` has ` + this.population + ` million Vietnamese speaking people, ` + this.neighbours.length + ` neighboring countries and a capital called ` + this.capital);
  },
  checkIsland: function () {
    this.isIsland = this.neighbours.length === 0 ? console.log("true") : console.log("false");
  }
}
myCountry2.checkIsland()

// LECTURE: Iteration: The for Loop
// 1. Thereareelectionsinyourcountry!Inasmalltown,thereareonly50voters. Use a for loop to simulate the 50 people voting, by logging a string like this to the console (for numbers 1 to 50): 'Voter number 1 is currently voting'

// let people = 50
// let v
// for (v=1;v<=people;v++) {
//   console.log("Voter " + v + " is currently voting!");
// }

// LECTURE: Looping Arrays, Breaking and Continuing
// 1. Let'sbringbackthe'populations'arrayfromapreviousassignment
// 2. Useaforlooptocomputeanarraycalled'percentages2'containingthe
// percentages of the world population for the 4 population values. Use the
// function 'percentageOfWorld1' that you created earlier
// 3. Confirmthat'percentages2'containsexactlythesamevaluesasthe
// 'percentages' array that we created manually in the previous assignment, and reflect on how much better this solution is

// 1
// populations = [38.25,47.42,125.7,331.9]
// 2
const percentages2 = [] // creating an empty array for the population percentages
function percentageOfWorld01 (populations) { // calculating the population percentages
  return populations / worldPopulation * 1000
}
for (v=0;v<=populations.length-1;v++) { // looping through the values in the "populations" array with index "v"
  // console.log(populations[v]);
  const perc = percentageOfWorld01(populations[v]) // storing the values in the array "populations" using index "perc"
  percentages2.push(perc) // adding the calculated values into array "percentages2" using index "perc"
}
console.log(percentages2);
// populations.length-1  - what does this mean?

// LECTURE: Looping Backwards and Loops in Loops
// 1. Storethisarrayofarraysintoavariablecalled'listOfNeighbours' [['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden', 'Russia']];
// 2. Logonlytheneighbouringcountriestotheconsole,onebyone,nottheentire arrays. Log a string like 'Neighbour: Canada' for each country
// 3. Youwillneedaloopinsidealoopforthis.Thisisactuallyabittricky,sodon't worry if it's too difficult for you! But you can still try to figure this out anyway 😉

// 1
const listOfNeighbours = [['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden', 'Russia']];
console.log(listOfNeighbours);
// 2
// for (v=0;v<=listOfNeighbours.length-1;v++) {
//   console.log(listOfNeighbours[1]); // log out "Spain" 3 lines in the console.
// }
// for (v=0;v<=listOfNeighbours.length-1;v++) {
//   for (w=0;w<=listOfNeighbours[v].length-1;w++) {
//     console.log(`Neighbor: ${listOfNeighbours[v][w]}`);
//   }
// }


// LECTURE: The while Loop
// 1. Recreatethechallengefromthelecture'LoopingArrays,BreakingandContinuing', but this time using a while loop (call the array 'percentages3')
// 2. Reflectonwhatsolutionyoulikebetterforthistask:theforlooporthewhile loop?

// LECTURE: Looping Arrays, Breaking and Continuing
// 1. Let'sbringbackthe'populations'arrayfromapreviousassignment
// 2. Useaforlooptocomputeanarraycalled'percentages2'containingthe
// percentages of the world population for the 4 population values. Use the
// function 'percentageOfWorld1' that you created earlier
// 3. Confirmthat'percentages2'containsexactlythesamevaluesasthe
// 'percentages' array that we created manually in the previous assignment, and reflect on how much better this solution is
populations = [38.25,47.42,125.7,331.9]
// const population = 38.25
// 1
function percentageOfWorld01 (populations) {
  return populations / worldPopulation * 100
}
const percentages03 = []
let w = 0
while (w<populations.length) {
  console.log(populations[w]);
  const perc02 = percentageOfWorld01(populations[w])
  // percentages03.push(perc02)
  w++;
  console.log(perc02);
  // console.log(percentages03);
}
// question:
// if "w++;" is placed right after "while (w<populations.length)" then the index "0" (value 38.25) in the array "populations" will be skipped!
// WHY?