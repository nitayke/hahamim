import { isAdmin, logout } from "./firebase-utils.js";

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

const navLinks = document.querySelectorAll(".nav-links");

window.onload = function checkActivepage() {
  if (window.location.href.includes("about")) {
    changeActivePage(3);
  } else if (window.location.href.includes("add-question")) {
    changeActivePage(1);
  } else if (window.location.href.includes("records")) {
    changeActivePage(2);
  } else {
    changeActivePage(0);
  }
  setTimeout(() => addLogoutButtonForAdmin(), 1000);
};

function changeActivePage(place) {
  navLinks.forEach((nl) => nl.classList.remove("active-page"));
  navLinks[place].classList.add("active-page");
}

export async function addLogoutButtonForAdmin() {
  if (!(window.location.href.includes("admin") && (await isAdmin()))) return;
  if (document.querySelector("#logout-button")) return; // button already exists

  const navMenu = document.querySelector("#nav-menu");
  const logoutButton = document.createElement("li");
  logoutButton.classList.add("nav-item");
  logoutButton.style = `
  align-self: center;
  justify-self: center;
`;
  // add id to elem
  logoutButton.id = "logout-button";
  window.logout = logout;
  logoutButton.innerHTML = `<button class="btn" onclick="logout()">התנתק</button>`;
  navMenu.appendChild(logoutButton);
}
