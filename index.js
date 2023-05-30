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
const NUM_OF_QUESTIONS = 20;
// it's gonna be like that: {db_key: {question_object}, db_key: {question_object}, ...}
let questions = [];

async function startGame(gameType) {
  startContainer.classList.add("scale-down");
  startContainer.hidden = true;
  showLoader();

  await getQuestions();

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
  
  if (questionIndex < NUM_OF_QUESTIONS) {
    handleOneQuestion();
    questionIndex++;
  } else {
    endGame(DAFYOMI_GAME);
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
  questionsAnsweredNow++;
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
  } else if (gameType == MEDIUM) {
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
