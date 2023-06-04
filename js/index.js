import {
  getDatabase,
  ref,
  limitToLast,
  limitToFirst,
  remove,
  child,
  update,
  set,
  increment,
  query,
  orderByChild,
  push,
  get,
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
var last_record;

let question = document.querySelector(".question");
let answers = document.querySelectorAll(".answer-btn");
let rightAnswer;
let chosenAnswer;
let questionIndex = 0;
let score = 0;
let level = 0;
let indexes_questions;
let qRef;
const NUM_OF_QUESTIONS = 5;
const types = ['easy', 'medium', 'hard', 'exotic'];
const hebrew_types = ['קל', 'בינוני', 'כבד', 'אקזוטי'];

function timer() {
  var now = new Date().getTime();
  timeDistance = now - firstTime;
  var seconds = Math.floor(timeDistance / 1000);
  var milliseconds = Math.floor((timeDistance % 1000) / 10);
  time = seconds.toFixed() + ":" +  String(milliseconds).padStart(2, '0');
  document.getElementById("time").innerHTML = time;
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

async function startGame() {
  startContainer.classList.add("scale-down");
  hide(startContainer);
  show(gameContainer);
  showLoader();
  const auth = getAuth();
  await signInAnonymously(auth);
  startLevel();
}

async function startLevel() {
  qRef = ref(getDatabase(), "questions/" + types[level]);
  var snapshot = await get(child(qRef, "count"));
  const count = snapshot.val();
  questionIndex = 0;
  indexes_questions = Array.from(Array(count).keys());
  document.getElementById('level').innerHTML = 'רמת קושי: ' + hebrew_types[level];
  newQuestion();
}

async function newQuestion() {
  if (questionIndex < NUM_OF_QUESTIONS) {  
    await handleOneQuestion();
    firstTime = new Date().getTime();
    interval = setInterval(timer, 51);
    questionIndex++;
  } else if (level < 3) {
    level++;
    startLevel();
  }
  else {
    endGame();
  }
}

async function getQuestion() {
  const rand = indexes_questions[Math.floor(Math.random() * indexes_questions.length)];
  indexes_questions.splice(indexes_questions.indexOf(rand), 1);
  const snapshot = await get(child(qRef, String(rand)));
  return snapshot.val();
}

async function handleOneQuestion() {
  const question1 = await getQuestion();
  question.innerHTML = question1.name;
  rightAnswer = question1.type;
  hideLoader();
}

function addError(errorText) {
  const errorPlace = document.querySelector(".error-place");
  errorPlace.previousElementSibling.classList.add("make-it-red");
  errorPlace.innerHTML = errorText;
}

function checkAnswer(ansNum) {
  clearInterval(interval);
  chosenAnswer = ansNum;
  answers.forEach((ans) => ans.classList.add("disable-pointer-events"));
  if (chosenAnswer == rightAnswer) {
    answers[chosenAnswer].classList.add("make-it-green");
    document.querySelector(".after-answer-text").innerHTML = "יפה מאוד";
    score += Math.floor(100 * Math.pow(Math.E, -0.15*(timeDistance/1000)));
  } else {
    answers[chosenAnswer].classList.add("make-it-red");
    answers[rightAnswer].classList.add("make-it-green");
    document.querySelector(".after-answer-text").innerHTML = "גרוע";
  }
  document.getElementById("smaller-score").innerHTML = "ניקוד: " + score;
  show(gameFooter);
}

function nextQuestion() {
  showLoader();
  answers.forEach((ans) => ans.classList.remove("disable-pointer-events"));
  if (document.querySelector(".make-it-green")) {
    answers[chosenAnswer].classList.remove("make-it-red");
    answers[rightAnswer].classList.remove("make-it-green");
  }
  document.querySelector(".game-footer").classList.remove("show-game-footer");
  hide(gameFooter);
  newQuestion(level);
}

async function addRecord() {
  const name = document.getElementById('name').value;
  if (name === "")
  {
    addError("אומרך להכניס שם");
    return;
  }
  showLoader();

  await remove(ref(getDatabase(), "records/" + Object.keys(last_record)[0]));

  const recordsRef = ref(getDatabase(), "records");
  const newRef = push(recordsRef);

  await set(newRef, {
    name: name,
    score: score
  });
  window.location.href = "index.html";
}

async function get10th()
{
  const qRef = ref(getDatabase(), "records");
  const lowest = query(qRef, orderByChild('score'), limitToFirst(1));
  const snapshot = await get(lowest);
  last_record = snapshot.val();
}

async function getLocation()
{
  const score_level = Math.floor(score / 10);
  var snapshot = await get(child(qRef, 'sum'));
  var all_sum = snapshot.val();
  const higher_scores = query(qRef, limitToLast(201 - score_level));
  snapshot = await get(higher_scores);
  var sum = 1;
  snapshot.forEach(child => {
    sum += child.val();
  });
  sum -= all_sum; // because part of the query is the sum of all
  all_sum++;
  const updates = {};
  updates[score_level] = increment(1);
  updates['sum'] = increment(1);
  update(qRef, updates);
  return sum + '/' + all_sum;
}

async function endGame()
{
  showLoader();
  hide(gameContainer);
  show(endContainer);
  qRef = ref(getDatabase(), "scores");

  await get10th();
  if (score > Object.values(last_record)[0]['score'])
    show(document.getElementById('enter-record'));

  document.getElementById('location').innerHTML = await getLocation();
  document.getElementById("score").innerHTML = score;
  hideLoader();
}

window.startGame = startGame;
window.checkAnswer = checkAnswer;
window.nextQuestion = nextQuestion;
window.addRecord = addRecord;