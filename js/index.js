import {
  getDatabase,
  ref,
  equalTo,
  orderByChild,
  query,
  get,
  limitToFirst,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js";
import {
  getAuth,
  signInAnonymously,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";

import "./utils/gematria.js";

const startContainer = document.getElementById("start-container");
const loader = document.querySelector(".loader");
const darkScreen = document.querySelector(".dark-screen");
const gameContainer = document.getElementById("game-container");
const afterRegulerGameStart = document.querySelector(
  ".after-regular-game-start"
);
const gameFooter = document.querySelector(".game-footer");
const endContainer = document.querySelector(".end-game-container");
const nextGameBtns = document.querySelectorAll(".next-game-btn");
const report = document.querySelector(".report-question-form");
report.addEventListener("submit", reportQuestion);

const _MS_PER_DAY = 1000 * 60 * 60 * 24;
const PAGES_IN_SHAS = 2711;
const START_ROUND = "01/05/2020"; // היום שהתחילו בו את הסבב בפעם האחרונה

const DAFYOMI_GAME = 0;
const REGULAR_GAME = 1;
const WITH_FRIENDS_GAME = 2; // אם בכלל נעשה את זה מתישהו

let questionTitle = document.querySelector(".question-title");
let question = document.querySelector(".question");
let answers = document.querySelectorAll(".answer-btn");
let rightAnswer;
let chosenAnswer;
let questionIndex = 0;
let addedQuestions = window.localStorage.getItem("addedQuestions");
let questionsAnswered = window.localStorage.getItem("questionsAnswered");
let questionsAnsweredCorrectly = window.localStorage.getItem(
  "questionsAnsweredCorrectly"
);
let questionsAnsweredNow = 0;
let questionsAnsweredCorrectlyNow = 0;
let gt;
const NUM_OF_QUESTIONS = 10;
// it's gonna be like that: {db_key: {question_object}, db_key: {question_object}, ...}
let questions = [];

function dateDiffInDays(a, b) {
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function getDafYomi() {
  const a = new Date(START_ROUND),
    b = new Date();
  return dateDiffInDays(a, b) % PAGES_IN_SHAS;
}

async function dafNumToText(num) {
  const response = await fetch("add-question.html");
  const text = await response.text();
  var doc = new DOMParser().parseFromString(text, "text/html");
  var options = doc.getElementById("masechet").options;
  var d_options = {};
  for (var i = 0; i < options.length; i++) {
    d_options[options[i].value] = options[i].text;
  }
  var keys = Object.keys(d_options);
  var i1 = 0;
  for (; i1 < keys.length - 2; i1++) {
    if (num < keys[i1 + 1]) break;
  }
  var masechet = d_options[keys[i1]]; // צריך לטפל במסכתות המעצבנות של קינים וכולי
  var page = num - keys[i1];
  return masechet + " דף " + gematriya(page + 2);
}

// function openAfterRegulerGameStart() {
//   startContainer.classList.add("scale-down");
//   startContainer.hidden = true;
//   showLoader();

//   afterRegulerGameStart.hidden = false;
//   hideLoader();
// }

async function startGame(gameType) {
  startContainer.classList.add("scale-down");
  startContainer.hidden = true;
  showLoader();

  await getQuestions();
  if (gameType === DAFYOMI_GAME) {
    questionTitle.innerHTML = "הדף היומי";
  }

  newQuestion(gameType);

  gameContainer.hidden = false;
}

async function getQuestions() {
  const auth = getAuth();
  await signInAnonymously(auth);
  const qRef = ref(getDatabase(), "questions");
  const q = query(
    qRef,
    orderByChild("page"),
    equalTo(getDafYomi()), // it's only for dafYomi for now
    limitToFirst(NUM_OF_QUESTIONS)
  );
  const snapshot = await get(q);
  snapshot.forEach((child) => {
    questions[child.key] = child.val();
  });
  hideLoader();
}

function handleOneQuestion() {
  question.innerHTML = Object.values(questions)[questionIndex].q;
  var list_of_4 = [0, 1, 2, 3];

  var random = Math.floor(Math.random() * 4); // returns 0-3 random
  rightAnswer = random;
  answers[list_of_4[random]].innerHTML =
    Object.values(questions)[questionIndex].answers[0];

  for (var i = 0; i < 3; i++) {
    list_of_4.splice(random, 1);
    random = Math.floor(Math.random() * (3 - i));
    answers[list_of_4[random]].innerHTML =
      Object.values(questions)[questionIndex].answers[i + 1];
  }
}

async function newQuestion(gameType) {
  gt = gameType;
  if (gameType == DAFYOMI_GAME) {
    if (questionIndex < Object.keys(questions).length) {
      handleOneQuestion();
      questionIndex++;
    } else {
      endGame(DAFYOMI_GAME);
    }
  } else if (gameType == REGULAR_GAME) {
    //משחק של דפי גמרא לבחירה
    if (questionIndex < NUM_OF_QUESTIONS) {
      questionTitle.innerHTML = "פשט הגמרא במסכת בבא קמא דף ב.";
      question.innerHTML = "מה זה מבעה לדעת רב?";
      answers[0].innerHTML = "שן";
      answers[1].innerHTML = "רגל";
      answers[2].innerHTML = "מים";
      answers[3].innerHTML = "אדם";
    } else {
      endGame(2);
    }
  } else {
    //משחק של טורניר עם חברים
  }
}

function checkAnswer(ansNum) {
  chosenAnswer = ansNum;
  answers.forEach((ans) => ans.classList.add("disable-pointer-events"));
  if (chosenAnswer == rightAnswer) {
    answers[chosenAnswer].classList.add("make-it-green");
    document.querySelector(".after-answer-text").innerHTML = "תיובתא מעליא!";
    questionsAnsweredCorrectlyNow++;
    questionsAnsweredCorrectly++; // needed to be saved in the end of the game
  } else {
    answers[chosenAnswer].classList.add("make-it-red");
    answers[rightAnswer].classList.add("make-it-green");
    document.querySelector(".after-answer-text").innerHTML = "זיל תיגמור..";
  }
  questionsAnswered++; // כנל
  questionsAnsweredNow++;
  document.querySelector(".questions-added").innerHTML =
    "שאיתלא דהוספת: " + addedQuestions;
  document.querySelector(".questions-answered-correctly").innerHTML =
    "שאילתא דענית טפי: " + questionsAnsweredCorrectly + "/" + questionsAnswered;
  document.querySelector(".questions-answered-correctly-now").innerHTML =
    "שאילתא דענית השתא טפי: " +
    questionsAnsweredCorrectlyNow +
    "/" +
    questionsAnsweredNow;
  gameFooter.hidden = false;
}

function nextQuestion() {
  answers.forEach((ans) => ans.classList.remove("disable-pointer-events"));
  if (document.querySelector(".make-it-green")) {
    answers[chosenAnswer].classList.remove("make-it-red");
    answers[rightAnswer].classList.remove("make-it-green");
  }
  document.querySelector(".game-footer").classList.remove("show-game-footer");
  document.getElementById("game-container").hidden = true;
  gameFooter.hidden = true;
  newQuestion(gt);
  document.getElementById("game-container").hidden = false;
}

function endGame(gameType) {
  // לא יודע למה ההסתרה לא עובדת
  gameContainer.hidden = true;
  showLoader();

  nextGameBtns[gameType].hidden = true;
  let type = "";
  if (gameType == DAFYOMI_GAME) {
    type = "הדף היומי";
  } else if (gameType == REGULAR_GAME) {
    type = "דפי הגמרא שבחרת";
  } else {
    type = "דפי הגמרא שבחרתם";
  }

  document.querySelector(".end-game-type").innerHTML = type;
  document.querySelector(".question-aswered-correctly-now").innerHTML =
    questionsAnsweredCorrectlyNow;

  endContainer.hidden = false;
  hideLoader();
}

async function reportQuestion() {
  const reportType = document.querySelector(".report-options").value;
  const questionRef = ref(
    getDatabase(),
    "questions/" + Object.keys(questions)[questionIndex - 1]
  );
  const q = query(questionRef);
  const snapshot = await get(q);
  snapshot.forEach((child) => {
    console.log(child.val());
  });
  // nextQuestion();
  // closeReportPopUp();
}

function openReportPopUp() {
  document.querySelector(".dark-screen").hidden = false;
  document.querySelector(".report-question-form").hidden = false;
}

function closeReportPopUp() {
  document.querySelector(".dark-screen").hidden = true;
  document.querySelector(".report-question-form").hidden = true;
}

function showLoader() {
  loader.hidden = false;
  darkScreen.hidden = false;
}

function hideLoader() {
  loader.hidden = true;
  darkScreen.hidden = true;
}

if (!window.localStorage.getItem("questionsAnswered")) {
  // first time of user
  window.localStorage.setItem("questionsAnswered", 0);
  window.localStorage.setItem("questionsAnsweredCorrectly", 0);
  window.localStorage.setItem("addedQuestions", 0);
}

// ugly way to solve the module problem
window.startGame = startGame;
window.checkAnswer = checkAnswer;
window.openReportPopUp = openReportPopUp;
window.closeReportPopUp = closeReportPopUp;
window.nextQuestion = nextQuestion;
