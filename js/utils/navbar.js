// eyal's js
const mobileMenu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".nav-menu");
const allSite = document.querySelector(".footer");

// Display Mobile Menu
const applyMobileMenu = () => {
  mobileMenu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
};

mobileMenu.addEventListener("click", applyMobileMenu);

//  Close mobile Menu when clicking on a menu item or the screen
function hideMobileMenu() {
  const menuBars = document.querySelector(".is-active");
  if (window.innerWidth <= 960 && menuBars) {
    mobileMenu.classList.toggle("is-active");
    menuLinks.classList.remove("active");
  }
}

menuLinks.addEventListener("click", hideMobileMenu);

//POPUP
function openPopUp() {
  document.querySelector(".dark-screen").hidden = false;
  document.querySelector(".pop-up-img").hidden = false;
  document.querySelector(".pop-up-text").hidden = false;
}
function closePopUp() {
  document.querySelector(".pop-up-img").hidden = true;
  document.querySelector(".pop-up-text").hidden = true;
  document.querySelector(".dark-screen").hidden = true;
}

const navLinks = document.querySelectorAll(".nav-links");

window.onload = function checkActivepage() {
  if (window.location.href.includes("about")) {
    changeActivePage(3);
  } else if (window.location.href.includes("add-question")) {
    changeActivePage(1);
  } else if (window.location.href.includes("records")) {
    console.log(1)
    changeActivePage(2);
  } else {
    changeActivePage(0);
  }
};

function changeActivePage(place) {
  navLinks.forEach((nl) => nl.classList.remove("active-page"));
  navLinks[place].classList.add("active-page");
}
