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

console.log(document.documentElement); // show all elements in the page
console.log(document.head); // <head></head> all elements in head
console.log(document.body); // <body></body> all elements in body

const header = document.querySelector('.header')
console.log(document.querySelector('.header')) // find the first element the matching class '.header'

// find all the elements with the matching class 'section' in the page.
const allSections = document.querySelectorAll('.section') // NodeList(4)
console.log(allSections);

// find the element with the exact id
console.log(document.getElementById('section-1')); // null => there is none
console.log(document.getElementById('section--1')); // <section class="section" id="section--1"></section>

// find all the button elements in the page using the tag name
const button = document.getElementsByTagName('button') // HTMLCollection(9) (live-collection)
// If you manually/programmatically delete a DOM element, the number of DOM will change (decreased)
console.log(button);
console.log(document.getElementsByClassName('btn')); // HTMLCollection(5)


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
