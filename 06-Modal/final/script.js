'use strict';

const modal = document.querySelector(".modal")
const overlay = document.querySelector(".overlay")
const btnCloseModal = document.querySelector(".close-modal")
const btnOpenModal = document.querySelectorAll(".show-modal")
console.log(btnOpenModal);

// this "openModal" function is meant to be called by "btnOpenModal"
const openModal = function () {
  console.log("button clicked!!");
  modal.classList.remove("hidden")
  overlay.classList.remove("hidden")
}

// for (let i = 0;i<=btnOpenModal.length-1;i++) {
//   btnOpenModal[i].addEventListener("click", function () {
//     console.log("button clicked!!");
//     modal.classList.remove("hidden")
//     overlay.classList.remove("hidden")
//   })
// }
// refactoring the "btnOpenModal" function
for (let i = 0;i<=btnOpenModal.length-1;i++) {
  btnOpenModal[i].addEventListener("click", openModal)
}

// btnCloseModal.addEventListener("click", function() {
//   modal.classList.add("hidden")
//   overlay.classList.add("hidden")
// })
// transform "btnCloseModal" to a function
const closeModal = () => {
  modal.classList.add("hidden")
  overlay.classList.add("hidden")
}

// we want close the modal by either clicking the "close" X button or by clicking the overlay
overlay.addEventListener("click", function () {
  modal.classList.add("hidden")
  overlay.classList.add("hidden")
})


// since both "btnCloseModal" and "overlay" will do the following functions
// modal.classList.add("hidden")
// overlay.classList.add("hidden")
// which is what "closeModal" does
// so we created the function "closeModal" and call it when we click on "btnCloseModal" and "overlay"
btnCloseModal.addEventListener("click", closeModal)
overlay.addEventListener("click", closeModal)

// handling "Esc" keypress event
// document.addEventListener("keydown", function(e) {
//   console.log(e.key);
//   if (e.key === "Escape") {
//     if (!modal.classList.contains("hidden")) { // if "modal" is shown
//       closeModal()
//     }
//   }
// })

// combining two "if" into one
document.addEventListener("keydown", function(e) {
  console.log(e.key);
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal()
    }
  }
)