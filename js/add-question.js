import {
  getDatabase,
  ref,
  set,
  push,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js";
import {
  getAuth,
  signInAnonymously,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";

var d = {};

const csv_url = "yeshivot.json";
let errorPlaces = document.querySelectorAll(".error-place");
getDataFromURL(csv_url).then((json) => {
  d = JSON.parse(json);
  document
    .getElementById("add-question-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      // form validation
      let masechet = document.getElementById("masechet");
      let page = document.getElementById("page");
      let type = document.getElementById("type");
      let question = document.getElementById("q");
      let a1 = document.getElementById("a1");
      let a2 = document.getElementById("a2");
      let a3 = document.getElementById("a3");
      let a4 = document.getElementById("a4");

      if (masechet.value === "" || masechet.value == null) {
        addError(errorPlaces[0], "יש לבחור מסכת מהרשימה");
      }

      if (page.value === "" || page.value == null) {
        addError(errorPlaces[1], "יש לבחור דף מהרשימה");
      }

      if (type.value === "" || type.value == null) {
        addError(errorPlaces[2], "יש לבחור סוג שאלה מהרשימה");
      }

      if (question.value.replace(/[^A-Za-z]/g, "")) {
        addError(errorPlaces[3], "השאלה חייבת להיות בעברית");
      }

      if (question.value === "" || question.value == null) {
        addError(errorPlaces[3], "יש להוסיף שאלה");
      }

      if (a1.value.replace(/[^A-Za-z]/g, "")) {
        addError(errorPlaces[4], "התשובה חייבת להיות בעברית");
      }

      if (a1.value === "" || a1.value == null) {
        addError(errorPlaces[4], "יש להוסיף תשובה נכונה");
      } else if (
        (a1.value == a2.value) |
        (a1.value == a3.value) |
        (a1.value == a4.value)
      ) {
        addError(errorPlaces[4], "תשובות לא יכולות להיות זהות");
      }

      if (a2.value.replace(/[^A-Za-z]/g, "")) {
        addError(errorPlaces[5], "התשובה חייבת להיות בעברית");
      }

      if (a2.value === "" || a2.value == null) {
        addError(errorPlaces[5], "יש להוסיף תשובה שגויה");
      } else if (
        (a2.value == a1.value) |
        (a2.value == a3.value) |
        (a1.value == a4.value)
      ) {
        addError(errorPlaces[5], "תשובות לא יכולות להיות זהות");
      }

      if (a2.value.replace(/[^A-Za-z]/g, "")) {
        addError(errorPlaces[6], "התשובה חייבת להיות בעברית");
      }

      if (a3.value === "" || a3.value == null) {
        addError(errorPlaces[6], "יש להוסיף תשובה שגויה");
      } else if (
        (a3.value == a2.value) |
        (a3.value == a1.value) |
        (a3.value == a4.value)
      ) {
        addError(errorPlaces[6], "תשובות לא יכולות להיות זהות");
      }

      if (a3.value.replace(/[^A-Za-z]/g, "")) {
        addError(errorPlaces[7], "התשובה חייבת להיות בעברית");
      }

      if (a4.value === "" || a4.value == null) {
        addError(errorPlaces[7], "יש להוסיף תשובה שגויה");
      } else if (
        (a4.value == a2.value) |
        (a4.value == a3.value) |
        (a4.value == a1.value)
      ) {
        addError(errorPlaces[7], "תשובות לא יכולות להיות זהות");
      }

      if (!document.querySelector(".make-it-red")) {
        addQuestion();
      }
    });
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

async function getDataFromURL(url) {
  const response = await fetch(url, {});
  return response.text();
}

function makeOptions(start, end) {
  const page = document.getElementById("page");
  page.innerHTML = '<option value="" disabled selected hidden>בחר דף</option>';
  for (var i = start; i < end; i++)
    page.options.add(new Option(gematriya_list[i], i - 1));
}

function updatePages() {
  const e = document.getElementById("masechet");
  var masechet = e.options[e.selectedIndex].text;
  if (masechet == "קנים") makeOptions(21, 25);
  else if (masechet == "תמיד") makeOptions(24, 33);
  else if (masechet == "מדות") makeOptions(33, 37);
  else makeOptions(1, parseInt(d[masechet]) + 1);
}

function addQuestion() {
  document.querySelector(".loader").hidden = false;
  document.querySelector(".dark-screen").hidden = false;
  const page = parseInt(document.getElementById("page").value);
  const masechet = parseInt(document.getElementById("masechet").value);
  const q = document.getElementById("q").value;
  const a1 = document.getElementById("a1").value;
  const a2 = document.getElementById("a2").value;
  const a3 = document.getElementById("a3").value;
  const a4 = document.getElementById("a4").value;
  const author = document.getElementById("author").value;

  const quesionsRef = ref(getDatabase(), "questions");
  const newQuestionRef = push(quesionsRef);

  const e = document.getElementById("type");
  const type = parseInt(e.value);

  const auth = getAuth();
  signInAnonymously(auth)
    .then(() => {
      set(newQuestionRef, {
        q: q,
        answers: [a1, a2, a3, a4],
        page: masechet + page,
        type: type,
        author: author,
        reports: "00000", // spam, twice, wrong_answer, wrong_masechet, wrong_page
      }).then(() => {
        window.localStorage.setItem(
          "addedQuestions",
          parseInt(window.localStorage.getItem("addedQuestions")) + 1
        );
        window.location.href = "question-added.html";
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

window.updatePages = updatePages;
