'use strict';

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


/////////////////////////////////////// 007 Implementing Smooth Scrolling - START

const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.getElementById('section--1')

// Element.getBoundingClientRect() method returns a DOMRect object providing information about the size of an element and its position relative to the viewport.
// ...Rect: rectangle

btnScrollTo.addEventListener('click', function (e) {
  const sec1coords = section1.getBoundingClientRect()
  console.log(sec1coords);
  // DOMRect {x: 0, y: 950, width: 1342, height: 1510.96875, top: 950, …}

  // The button itself that we click
  console.log(e.target.getBoundingClientRect()); // btnScrollTo
  // DOMRect {x: 96, y: 633.578125, width: 112.46875, height: 29, top: 633.578125, …}
  // y - from the button (the element) to the top of the page.

  console.log('Current scroll (X/Y) ', window.pageXOffset, pageYOffset);
  // Current scroll (X/Y)  0 611
  // pageYOffset - from the top of the viewport to the top of the page

  console.log(
    'Client height/width ',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  // Client height/width  810 1387

  ////////// Scrolling
  // window.scrollTo(
  //   sec1coords.left + window.pageXOffset,
  //   sec1coords.top + window.pageYOffset
  // );

  ////////// Smooth Scrolling
  // This will support old browser
  // window.scrollTo({
  //   left: sec1coords.left + window.pageXOffset,
  //   top: sec1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // });

  ////////// Smooth Scrolling
  // This will support new browser
  section1.scrollIntoView({ behavior: 'smooth' })
})

/////////////////////////////////////// 007 Implementing Smooth Scrolling - END