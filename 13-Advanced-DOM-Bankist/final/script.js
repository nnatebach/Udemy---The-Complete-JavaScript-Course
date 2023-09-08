'use strict';

/////////////////////////////////////// 007 Implementing Smooth Scrolling - START

const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.getElementById('section--1')

/////////////////////////////////////// 007 Implementing Smooth Scrolling - END

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////////// 007 Implementing Smooth Scrolling - START
////////////////// using the power of event bubbling => Event Delegation

/*
// Element.getBoundingClientRect() method returns a DOMRect object providing information about the size of an element and its position relative to the viewport.
// ...Rect: rectangle

// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  const sec1coords = section1.getBoundingClientRect()
  console.log('section1 ', sec1coords);
  // DOMRect {x: 0, y: 950, width: 1342, height: 1510.96875, top: 950, …}

  // The button itself that we click
  console.log('btnScrollTo', e.target.getBoundingClientRect()); // btnScrollTo
  // DOMRect {x: 96, y: 633.578125, width: 112.46875, height: 29, top: 633.578125, …}
  // y - from the button (the element) to the top of the page.

  console.log('Current scroll (X/Y) ', window.pageXOffset, pageYOffset);
  // Current scroll (X/Y)  0 611
  // pageYOffset - from the top of the viewport to the top of the page

  console.log(
    'Client (viewport) height/width ',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  // Client (viewport) height/width  810 1387

  ////////// Scrolling
  // window.scrollTo(
  //   sec1coords.left + window.pageXOffset,
  //   sec1coords.top + window.pageYOffset
  // );

  ////////// Smooth Scrolling
  // This will support old browser
  window.scrollTo({
    left: sec1coords.left + window.pageXOffset,
    top: sec1coords.top + window.pageYOffset,
    behavior: 'smooth'
  });

  ////////// Smooth Scrolling
  // This will support new browser
  // section1.scrollIntoView({ behavior: 'smooth' })
})
*/

/////////////////////////////////////// 007 Implementing Smooth Scrolling - END


/////////////////////////////////////// 011 Event Delegation Implementing Page Navigation - START

////////////////////// Page navigation - using the 'power' of 'bubbling phase'

//////////// FIRST SOLUTION

// preventDefault() tells the user agent that if the event does not get explicitly handled, its default action should NOT be taken as it normally would be.
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function(e) {
//     e.preventDefault()

//     // get href of the nav__link
//     const id = this.getAttribute('href')
//     console.log(id);

//     // apply smooth scroll for the nav__link using the href
//     // scrollIntoView - element.scrollIntoView({ behavior: "smooth"
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
//   })
// })

//////////// SECOND SOLUTION

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // console.log(e.target); // <a class="nav__link" href="#section--1">Features</a>
  e.preventDefault()

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    // const id = this.getAttribute('href')
    // console.log(this); // <ul class="nav__links">

    const id = e.target.getAttribute('href')
    console.log(id); // #section--1, #section--2, #section--3
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
  }
})

//////////////// Tabbed component
const tabs = document.querySelectorAll('.operations__tab')
const tabsContent = document.querySelectorAll('.operations__content')
const tabsContainer = document.querySelector('.operations__tab-container')

tabsContainer.addEventListener('click', function (e) {
  ///////// Storing the variable of the button as we click on it
  // We want to get the 'data-tab' value by clicking on the button AND the span 'number' within the button
  // This is what the button looks like
  // <button class="btn operations__tab operations__tab--1 operations__tab--active" data-tab="1">
  //   <span>01</span>Instant Transfers
  // </button>
  const clicked = e.target.closest('.operations__tab')
  console.log(clicked);

  ///////// Guard clause - What if we click on the area outside the button?
  // a 'click' that happens outside the area of 'clicked' will result in 'null' => we want to ignore the 'null' result
  // 'return' the function => the next line of code will NOT be executed
  if (!clicked) return;

  ///////// Active tab
  // Remove 'operations__tab--active' for all the tabs before we click them
  // As we click on the next button, 'operations__tab--active' will be removed on the previous button
  tabs.forEach(t => t.classList.remove('operations__tab--active'))
  tabsContent.forEach(c => c.classList.remove('operations__content--active'))

  ///////// Activate tab
  // Adding 'operations__tab--active' class to the tab as we click it
  clicked.classList.add('operations__tab--active')

  ///////// Activate content area
  console.log(clicked.dataset.tab); // 1 2 3
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})

// QUESTION: Why use 'querySelector' for ONLY 'tabsContainer'?

// REASON:
// - In the index.html-file. There are several elements with the operations__tab-class, and the operations__content-class, but ONLY ONE element with the operations__tab-container-class.
// - We'll want access to all the tabs, so we want a list of them, and we want access to all the contents of the tabs, so we want a list of them too. We only have one tab-container, so why would we want a list of one? :)

// SOLUTION:
// - Use 'querySelectorAll' for element's class that has many instances.
// - Use 'querySelector' for element's class that has ONLY one matching instance.


// NOTES:
// - querySelectorAll returns a NodeList, a list of ALL the elements in that document that matches the string we provided as an argument.
// - querySelector returns the FIRST element in the document that matches the string we provided as an argument.
// - 'querySelectorAll' DOES NOT work with 'addEventListener' => check out 'btnCloseModal', 'btnsOpenModal'


/////////////////////////////////////// 011 Event Delegation Implementing Page Navigation - END


/////////////////////////////////////// 005 Selecting, Creating, and Deleting Elements - START

////////////////// Selecting

// HTMLCollection vs. NodeList
// HTMLCollection (live-collection): if the DOM changes (an element is added/removed), the collection will IMMEDIATELY automatically be updated! - 'getElementsByTagName', 'getElementsByClassName'
// NodeList collection: The collection will NOT be automatically updated/changed when an element is removed/added because the collection is created when that element still existed. - 'querySelectorAll'

// console.log(document.documentElement); // show all elements in the page
// console.log(document.head); // <head></head> all elements in head
// console.log(document.body); // <body></body> all elements in body

const header = document.querySelector('.header')
// console.log(document.querySelector('.header')) // find the first element the matching class '.header'

// find all the elements with the matching class 'section' in the page.
const allSections = document.querySelectorAll('.section') // NodeList(4)
// console.log(allSections);

// find the element with the exact id
// console.log(document.getElementById('section-1')); // null => there is none
// console.log(document.getElementById('section--1')); // <section class="section" id="section--1"></section>

// find all the button elements in the page using the tag name
const button = document.getElementsByTagName('button') // HTMLCollection(9) (live-collection)
// If you manually/programmatically delete a DOM element, the number of DOM will change (decreased)
// console.log(button);
// console.log(document.getElementsByClassName('btn')); // HTMLCollection(5)


////////////////// Creating and Inserting elements

// insertAdjacentHTML()
// - parses the specified text as HTML or XML
// - inserts the resulting nodes into the DOM tree at a specified position.
// Quick snippet
// insertAdjacentHTML(position, text)
// containerMovements = '.movements'
// containerMovements.insertAdjacentHTML('afterbegin', html)
// afterbegin: new child element will appear before the existing child element
// recheck the 'movements' functions in the BANKIST app if necessary!

////////// Creating

const message = document.createElement('div')
message.classList.add('cookie-message')
// message.textContent = 'We use cookied for improved functionality and analytics.'
message.innerHTML = 'We use cookied for improved functionality and analytics.<button class="btn btn--close-cookie">Got it!</button>'

////////// Inserting

// prepend, append, before, after - String objects are inserted as equivalent Text nodes.

// prepend() - inserts a set of Node objects or string objects BEFORE the FIRST CHILD of the Element.
// header.prepend(message) // inserting 'message' BEFORE 'nav'

// append() - inserts a set of Node objects or string objects AFTER the LAST CHILD of the Element.
// header.append(message) // inserting 'message' AFTER 'header__title'

// before() inserts a set of Node or string objects in the children list of this Element's parent, just BEFORE this Element.
header.before(message)

// after() inserts a set of Node or string objects in the children list of this Element's parent, just AFTER this Element.
// header.after(message)

////////// Removing

// The read-only 'parentElement' property of Node interface returns
// - the DOM node's parent Element
// - or null if the node either has no parent, or its parent isn't a DOM Element.
// NOTE: The Node interface is used to represent DOM objects in the browser.
// All Node implementations are an Object , but not all Object types have browser DOM interfaces backing them.

document.querySelector('.btn--close-cookie').addEventListener('click', function () {
  message.parentElement.removeChild(message)
})

/////////////////////////////////////// 005 Selecting, Creating, and Deleting Elements - END


/////////////////////////////////////// 006 Styles, Attributes and Classes - START

/*
///////////////////// Styles
// this is meant for 'inline style'

message.style.backgroundColor = '#37383d'
message.style.width = '120%'

console.log(message.style.height); // none => Reason: This is inline style that we set it manually ourselves.

// getComputedStyle()
// - returns an object containing the values of all CSS properties of an element, after applying active stylesheets and resolving any basic computation those values may contain.
// - Individual CSS property values are accessed through APIs provided by the object, or by indexing with CSS property names.
console.log(getComputedStyle(message).height); // CSSStyleDeclaration

//////////// Adding dimension to an element
// Why use 'Number' and 'parseFloat'?
// Reason: message.style.height = getComputedStyle(message).height => 83px (string)
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px'
console.log(message.style.height);

document.documentElement.style.setProperty('--color-primary', 'orangered')

///////////////////// Attributes

const logo = document.querySelector('.nav__logo')
console.log(logo.alt); // Bankist logo
console.log(logo.src); // http://127.0.0.1:8080/img/logo.png => Absolute path
console.log(logo.className); // nav__logo
logo.alt = 'Designed by UX Engineer/Expert @nnatebach'
console.log(logo.alt); // Designed by UX Engineer/Expert @nnatebach

///// Non-standard
// getAttribute()
// - returns the value of a specified attribute on the element.
// - If the given attribute does not exist, the value returned will either be null or "" (the empty string);
console.log(logo.designer); // undefined
console.log(logo.getAttribute('designer')); // nnatebach
console.log(logo.setAttribute('company', 'BachUX')); // undefined
console.log(logo.getAttribute('src')); // img/logo.png => Relative path

// const link = document.querySelector('.twitter-link')
// console.log(link.href); // https://twitter.com/jonasschmedtman
// console.log(link.getAttribute('href')); // https://twitter.com/jonasschmedtman

const link = document.querySelector('.nav__link--btn')
console.log(link.href); // http://127.0.0.1:8080/#
console.log(link.getAttribute('href')); // #

///// Data Attributes
// NOTE:
// In HTML: data-version-number="3.0"
// However, we need to turn that into camelCase => versionNumber
console.log(logo.dataset.versionNumber); // 3.0

///////////////////// Classes

logo.classList.add('c', 'j')
logo.classList.remove('c', 'j')
logo.classList.toggle('c')
logo.classList.contains('c')


// AVOID!
logo.className = 'nnatebach'

*/

/////////////////////////////////////// 006 Styles, Attributes and Classes - END


/////////////////////////////////////// 008 Types of Events and Event Handlers - START

/*
// addEventListener("mouseenter", (event) => {}); => new way
// vs.
// onmouseenter = (event) => {}; => old way

// addEventListener
// - allows us to apply multiple event listeners to the same event at ONCE.
// - we can remove an event handler in case we don't need it anymore (IMPORTANT feature!!)

// onmouseenter - this is a property
// - if we add the second function, it will override the first function

const heading01 = document.querySelector('h1')


////////// 1st way of handling events - single function
// heading01.addEventListener('mouseenter', function(e) {
//   alert('addEventListener: Great you\'re reading the heading')
// })


////////// 2nd way of handling events - multiple function
// first step: export a function into a named function

///// adding an event listener and call it once then remove it
const alertHeading01 = function(e) {
  alert('addEventListener: Great you\'re reading the heading')

  // removing an event listener
  // heading01.removeEventListener('mouseenter', alertHeading01)
}

heading01.addEventListener('mouseenter', alertHeading01)

///// remove an event listener after an amount of time
// - As soon as the time runs out => the event listener will be removed
// - As long as the time is still running, it will keep showing the alert as you hover the mouse over the 'heading01'
// Example: 3 seconds
setTimeout(() => heading01.removeEventListener('mouseenter', alertHeading01), 3000)


////////// 3rd way of handling events - inline 'onclick="alert('HTML alert')"' HTML


// mouseenter event is fired at an Element when a pointing device (usually a mouse) is initially moved so that its hotspot is within the element at which the event was fired.
// heading01.onmouseenter = function(e) {
//   alert('onmouseenter: Great you\'re reading the heading')
// }
*/

/////////////////////////////////////// 008 Types of Events and Event Handlers - END


/////////////////////////////////////// 009 Event Propagation Bubbling and Capturing - START

/* NOTE LATER */

/////////////////////////////////////// 009 Event Propagation Bubbling and Capturing - END


/////////////////////////////////////// 010 Event Propagation in Practice - START

/*
// rbg(255,255,255)
// Math.random() static method returns a floating-point, pseudo-random number that
// - is greater than or equal to 0 and less than 1
// - with approximately uniform distribution over that range — which you can then scale to your desired range

// Math.floor() static method
// - always rounds down
// - returns the largest integer less than or equal to a given number.
const randomInt = (max, min) => Math.floor(Math.random() * (max - min + 1) + min)
const randomColor = () => `rgb(${randomInt(0 , 255)}, ${randomInt(0 , 255)}, ${randomInt(0 , 255)})`
console.log(randomColor(0, 255)); // rgb(171, 117, 139)


////////////////// target property

// target - a reference to the object onto which the event was dispatched.

// currentTarget
// - identifies the current target for the event, as the event traverses the DOM.
// - It always refers to the element to which the event handler has been attached

// target vs. currentTarget - event handler is called during the bubbling or capturing phase of the event.

// Event.target identifies the element on which the event occurred and which may be its descendant.


////////////////// Bubbling phase

// The below event handlers receive events from the target elements AND from the bubbling phase (child elements bubbling up)

document.querySelector('.nav__links').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor()
  console.log('CONTAINER', e.target, e.currentTarget);
})

document.querySelector('.nav__link').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor()
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this); // true
  // the 'currentTarget' is exactly the same as the 'this' keyword
  // the 'this' keyword is also the one pointing to the element on which the 'eventListener' is attached to.
  // the 'currentTarget' and the 'this' keyword is going to be exactly the same in any case of event handler

  ///// STOP PROPAGATION => NOT a good idea yet this might fix the problem in some complex application with many handlers for the same event.
  // '.nav__links' and '.nav' background color will no longer change as we click on '.nav__link' as the propagation will stop right there.
  // e.stopPropagation()
})

document.querySelector('.nav').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor()
  console.log('NAV', e.target, e.currentTarget);
})
// LINK
// CONTAINER
// NAV - last one in the console


////////////////// Capture phase
// As we learn, events are captured when they come down from the document's root all the way to the target
// however, our handlers above are not picking up the events during the capture phase.
// the 'addEventListener' method ONLY listens to the events during the "bubbling" and NOT the 'capture' phase => default behavior of 'addEventListener'
// Reason: the 'capture' phase is usually irrelevant
// 'bubbling' phase can be very useful for 'event delegation'


// Test out 'Capture phase' by setting the 3rd parameter to 'true' in 'addEventListener' function
// the event handler will be listening to 'Capturing' phase and NO longer to 'Bubbling' phase
// document.querySelector('.nav').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor()
//   console.log('NAV', e.target, e.currentTarget);
// }, true)
// NAV - first one in the console
// Reason: 'NAV' element is now listening to the event as it traverses down from the DOM
// while the other elements ('LINK', 'CONTAINER') are listening to the event as they traverse back up in the DOM
// LINK
// CONTAINER

////////////////// NOTE: DOUBLE CHECK THE SLIDE IN 009 Event Propagation Bubbling and Capturing
*/

/////////////////////////////////////// 010 Event Propagation in Practice - END


/////////////////////////////////////// 012 DOM Traversing - START

/*
// DOM Traversing - "move through" - the act of selecting an element from another element
// "find" (or select) HTML elements based on their relation to other elements.

const h1 = document.querySelector('h1')

///////////////////// Going DOWNWARDS: Child

console.log(h1.querySelectorAll('.highlight')); // NodeList(2) [span.highlight, span.highlight]
console.log(h1.childNodes); // NodeList(9) [text, comment, text, span.highlight, text, br, text, span.highlight, text]
console.log(h1.children); // HTMLCollection(3) [span.highlight, br, span.highlight]

// Additional CSS style
h1.firstElementChild.style.color = 'white'
h1.lastElementChild.style.color = 'orangered'

///////////////////// Going UPWARDS: Parents

console.log(h1.parentNode); // <div class="header__title">
console.log(h1.parentElement); // <div class="header__title">

/////////// closest() method - traverses THE ELEMENT AND ITS PARENTS (heading toward the document root) until it finds a node that matches the specified CSS selector.
// color: --gradient-secondary: linear-gradient(to top left, #ffb003, #ffcb03);
h1.closest('.header').style.background = 'var(--gradient-secondary)'
h1.closest('h1').style.background = 'var(--gradient-primary)'

///////////////////// Going SIDEWAY: Siblings

console.log(h1.previousElementSibling); // null
console.log(h1.nextElementSibling); // <h4>A simpler banking experience for a simpler life.</h4>

console.log(h1.previousSibling); // #text
console.log(h1.nextSibling); // #text

console.log(h1.parentElement.children); // HTMLCollection(4) [h1, h4, button.btn--text.btn--scroll-to, img.header__img]
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(.5)'
})

const arrayh1 = [...h1.parentElement.children] // the copy of the array 'h1.parentElement.children' containing elements that are the children of the 'parentElement' of 'h1' => the array containing 'h1' and its siblings
console.log(arrayh1);
*/

/////////////////////////////////////// 012 DOM Traversing - END