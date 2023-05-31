import {
  getDatabase,
  ref,
  set,
  push,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import {
  getAuth,
  signInAnonymously,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

var d = {};

let errorPlaces = document.querySelectorAll(".error-place");
document.getElementById("add-question-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    // form validation

    let question = document.getElementById('q');
    let answer = document.getElementById('answer');
    let level = document.getElementById('level');


    if (question.value.replace(/[^A-Za-z]/g, "")) {
      addError(errorPlaces[0], "השאלה חייבת להיות בעברית");
    }

    if (question.value === "" || question.value == null) {
      addError(errorPlaces[0], "יש להוסיף שאלה");
    }

    if (answer.value === "" || answer.value == null) {
      addError(errorPlaces[1], "יש לבחור תשובה");
    }

    if (level.value === "" || level.value == null) {
      addError(errorPlaces[2], "יש לבחור דרגת קושי");
    }

    if (!document.querySelector(".make-it-red")) {
      addQuestion();
    }
  });

function addError(errorPlace, errorText) {
  errorPlace.previousElementSibling.classList.add("make-it-red");
  errorPlace.innerHTML = errorText;
}

window.removeError = function removeError(errorPlace) {
  errorPlaces[errorPlace].previousElementSibling.classList.remove(
    "make-it-red"
  );
  errorPlaces[errorPlace].innerHTML = "";
};

async function addQuestion() {
  document.querySelector(".loader").hidden = false;
  document.querySelector(".dark-screen").hidden = false;
  const q = document.getElementById("q").value;
  const answer = parseInt(document.getElementById("answer").value);
  const level = parseInt(document.getElementById("level").value);

  const quesionsRef = ref(getDatabase(), "waiting");
  const newQuestionRef = push(quesionsRef);

  const auth = getAuth();
  await signInAnonymously(auth);
  await set(newQuestionRef, {
    q: q,
    answer: answer,
    level: level
  });
  window.location.href = "question-added.html";
}
