import {
  getDatabase,
  ref,
  update,
  orderByChild,
  query,
  set,
  push,
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
var firstTime;
var timeDistance;
var time = 0;
var interval;

let question = document.querySelector(".question");
let answers = document.querySelectorAll(".answer-btn");
let rightAnswer;
let chosenAnswer;
let questionIndex = 0;
let score = 0;
let level = 0;
const NUM_OF_QUESTIONS = 1;
const types = ['easy', 'medium', 'hard', 'exotic'];
const hebrew_types = ['קל', 'בינוני', 'כבד', 'אקזוטי'];

let questions = [];

function timer() {
  var now = new Date().getTime();
  timeDistance = now - firstTime;
  var seconds = Math.floor(timeDistance / 1000);
  var milliseconds = Math.floor((timeDistance % 1000) / 10);
  time = seconds.toFixed() + ":" +  String(milliseconds).padStart(2, '0');
  document.getElementById("time").innerHTML = time;
}

function startGame() {
  startContainer.classList.add("scale-down");
  hide(startContainer);
  show(gameContainer);
  startLevel();
}

async function startLevel() {
  questionIndex = 0;
  questions = [];
  document.getElementById('level').innerHTML = 'רמת קושי: ' + hebrew_types[level];
  showLoader();
  await getQuestions();
  newQuestion();
  hideLoader();
}

async function getQuestions() {
  const auth = getAuth();
  await signInAnonymously(auth);
  const qRef = ref(getDatabase(), "questions/" + types[level]);
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
}

function handleOneQuestion() {
  question.innerHTML = Object.values(questions)[questionIndex].name;
  rightAnswer = Object.values(questions)[questionIndex].type;
}

function endGame()
{
  hide(gameContainer);
  show(endContainer);
  document.querySelector(".score").innerHTML = score;
}

function addError(errorPlace, errorText) {
  errorPlace.previousElementSibling.classList.add("make-it-red");
  errorPlace.innerHTML = errorText;
}

async function addRecord() {
  const name = document.getElementById('name').value;
  if (name === "")
  {
    addError(document.querySelector(".error-place"), "אומרך להכניס שם");
    return;
  }
  showLoader();
  const quesionsRef = ref(getDatabase(), "records");
  const newQuestionRef = push(quesionsRef);

  const auth = getAuth();
  await signInAnonymously(auth);
  await set(newQuestionRef, {
    name: name,
    score: score
  });
  window.location.href = "index.html";
}

async function newQuestion() {
  if (questionIndex < NUM_OF_QUESTIONS) {  
    firstTime = new Date().getTime();
    interval = setInterval(timer, 51);
    handleOneQuestion();
    questionIndex++;
  } else if (level < 3) {
    level++;
    startLevel();
  }
  else {
    endGame();
  }
}

function checkAnswer(ansNum) {
  clearInterval(interval);
  chosenAnswer = ansNum;
  answers.forEach((ans) => ans.classList.add("disable-pointer-events"));
  if (chosenAnswer == rightAnswer) {
    answers[chosenAnswer].classList.add("make-it-green");
    document.querySelector(".after-answer-text").innerHTML = "יפה מאוד";
    score += Math.floor(100 * Math.pow(Math.E, -0.08*(timeDistance/1000)));
  } else {
    answers[chosenAnswer].classList.add("make-it-red");
    answers[rightAnswer].classList.add("make-it-green");
    document.querySelector(".after-answer-text").innerHTML = "גרוע";
  }
  document.querySelector(".smaller-score").innerHTML = "ניקוד: " + score;
  show(gameFooter);
}

function nextQuestion() {
  answers.forEach((ans) => ans.classList.remove("disable-pointer-events"));
  if (document.querySelector(".make-it-green")) {
    answers[chosenAnswer].classList.remove("make-it-red");
    answers[rightAnswer].classList.remove("make-it-green");
  }
  document.querySelector(".game-footer").classList.remove("show-game-footer");
  hide(gameFooter);
  newQuestion(level);
}

function showLoader() {
  show(loader);
  show(darkScreen);
}

function hideLoader() {
  hide(loader);
  hide(darkScreen);
}

function hide(element) {
  element.hidden = true;
}

function show(element) {
  element.hidden = false;
}

window.startGame = startGame;
window.checkAnswer = checkAnswer;
window.nextQuestion = nextQuestion;
window.addRecord = addRecord;