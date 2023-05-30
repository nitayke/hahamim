const nav = `<nav class="nav">
<div class="logo-container">
        <img src="images/white.png" style="background-color:transparent;" class="nav-logo-image" alt="">
</div>
<header>
<h1>קשיא</h1>
<h2 class="nav-head">טריוויה על הש"ס</h2>
</header>
<div class="nav-container">
<div class="nav-toggle" id="mobile-menu">
    <span class="bar"></span>
    <span class="bar"></span>
    <span class="bar"></span>
</div>

    <ul class="nav-menu">
        <li class="nav-items">
         <a href="index.html" class="nav-links active-page">
         <i class='fas fa-book-open nav-icons'></i>שחק</a>
        </li>
        <li class="nav-items">
            <a href="add-question.html" class="nav-links">
            <i class='fa fa-plus nav-icons'></i>הוסף שאלה</a>
        </li>
        <li class="nav-items">
            <a href="#" class="nav-links" onClick="openPopUp()">
            <i class="fa fa-list nav-icons"></i>שיאים</a>
        </li>
        <li class="nav-items">
            <a href="#" class="nav-links" onClick="openPopUp()">
            <i class='fa fa-gear nav-icons'></i>הגדרות</a>
        </li>
    </ul>
</div>
</nav>`;

const body = document.getElementsByTagName("body")[0];
body.innerHTML += nav;

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
  if (window.location.href.includes("settings")) {
    changeActivePage(3);
  } else if (window.location.href.includes("add-question")) {
    changeActivePage(1);
  } else if (window.location.href.includes("records")) {
    changeActivePage(2);
  } else {
    changeActivePage(0);
  }
};

function changeActivePage(place) {
  navLinks.forEach((nl) => nl.classList.remove("active-page"));
  navLinks[place].classList.add("active-page");
}
