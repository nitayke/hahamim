import {
  getDatabase,
  ref,
  update,
  orderByChild,
  query,
  get,
  limitToFirst,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import {
  getAuth,
  signInAnonymously,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";


const startContainer = document.getElementById("start-container");
const loader = document.querySelector(".loader");
const darkScreen = document.querySelector(".dark-screen");
const gameContainer = document.getElementById("game-container");
const gameFooter = document.querySelector(".game-footer");
const endContainer = document.querySelector(".end-game-container");
const nextGameBtns = document.querySelectorAll(".next-game-btn");


const EASY = 0;
const MEDIUM = 1;
const HARD = 2;
const EXOTIC = 3;

let questionTitle = document.querySelector(".question-title");
let question = document.querySelector(".question");
let answers = document.querySelectorAll(".answer-btn");
let rightAnswer;
let chosenAnswer;
let questionIndex = 0;
let questionsAnsweredNow = 0;
let questionsAnsweredCorrectlyNow = 0;
let gt;
const NUM_OF_QUESTIONS = 10;
const types = ['easy', 'medium', 'hard', 'exotic']

let questions = [];

async function startGame(gameType) {
  startContainer.classList.add("scale-down");
  startContainer.hidden = true;
  showLoader();

  await getQuestions(gameType);

  newQuestion(gameType);

  gameContainer.hidden = false;
}

async function getQuestions(gameType) {
  const auth = getAuth();
  await signInAnonymously(auth);
  const qRef = ref(getDatabase(), types[gameType]);
  const q = query(
    qRef,
    orderByChild("random_num"),
    limitToFirst(NUM_OF_QUESTIONS)
  );
  const snapshot = await get(q);
  snapshot.forEach((child) => {
    update(child.ref, {"random_num": Math.floor(Math.random() * 100)}); // מבריק
    questions[child.key] = child.val();
  });
  console.log(questions)
  hideLoader();
}

function handleOneQuestion() {
  question.innerHTML = Object.values(questions)[questionIndex].name;
  rightAnswer = Object.values(questions)[questionIndex].type;
}

async function newQuestion(gameType) {
  gt = gameType;
  if (questionIndex < NUM_OF_QUESTIONS) {
    handleOneQuestion();
    questionIndex++;
  } else {
    endGame();
  }
}

function checkAnswer(ansNum) {
  chosenAnswer = ansNum;
  answers.forEach((ans) => ans.classList.add("disable-pointer-events"));
  if (chosenAnswer == rightAnswer) {
    answers[chosenAnswer].classList.add("make-it-green");
    document.querySelector(".after-answer-text").innerHTML = "יפה מאוד";
    questionsAnsweredCorrectlyNow++;
  } else {
    answers[chosenAnswer].classList.add("make-it-red");
    answers[rightAnswer].classList.add("make-it-green");
    document.querySelector(".after-answer-text").innerHTML = "גרוע";
  }
  questionsAnsweredNow++;
  document.querySelector(".questions-answered-correctly-now").innerHTML =
    "שאלות שענית נכונה עד כה: " +
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

  document.querySelector(".end-game-type").innerHTML = type;
  document.querySelector(".question-aswered-correctly-now").innerHTML =
    questionsAnsweredCorrectlyNow;

  endContainer.hidden = false;
  hideLoader();
}

function showLoader() {
  loader.hidden = false;
  darkScreen.hidden = false;
}

function hideLoader() {
  loader.hidden = true;
  darkScreen.hidden = true;
}

// ugly way to solve the module problem
window.startGame = startGame;
window.checkAnswer = checkAnswer;
window.nextQuestion = nextQuestion;
