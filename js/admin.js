import {
  getDatabase,
  ref,
  query,
  set,
  increment,
  child,
  remove,
  update,
  get,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { showLoader, hideLoader } from "./utils/functions.js";
import { sleep } from "./utils/helpers.js";
import { isAdmin } from "./utils/firebase-init.js";
import { addLogoutButtonForAdmin } from "./utils/navbar.js";

var questions = [];

let userCredential;
const levels = ["easy", "medium", "hard"];

async function loginAsAdmin() {
  let email = prompt("Enter admin email");
  let password = prompt("Enter admin password");
  if (!email || !password) {
    alert("הכנס פרטי כניסה לאדמין");
    return;
  }
  const auth = getAuth();
  userCredential = await signInWithEmailAndPassword(auth, email, password);
  window.currentUser = await userCredential.user;
  return window.currentUser;
}

async function AssureLoginAsAdmin() {
  if (await isAdmin()) return;
  let successLogin = false;
  let tries = 3;
  while (!successLogin && tries-- !== 0) {
    try {
      userCredential = await loginAsAdmin();
      successLogin = !!userCredential;
    } catch (error) {
      console.warn(error);
      alert("שגיאה בהתחברות או משתמש וסיסמה שגויים");
    }
  }
  if (!successLogin || tries === 0) {
    alert("לא הצלחת להתחבר כאדמין, נסה שוב מאוחר יותר");
    // redirect to home page
    window.location.href = "index.html";
    return;
  }
  await addLogoutButtonForAdmin();
}

async function getData() {
  showLoader();
  let qRef = ref(getDatabase(), "scores/sum");
  const p = await get(qRef);
  document.getElementById("enters").innerHTML = "מספר כניסות: " + p.val();
  qRef = ref(getDatabase(), "waiting");
  const q = query(qRef);
  const snapshot = await get(q);
  snapshot.forEach((child) => {
    questions.push({ key: child.key, q: child.val() });
  });
  hideLoader();
}

function updateHtml() {
  if (questions.length === 0) {
    document.getElementById("q").innerHTML = "";
    document.getElementById("answer").innerHTML = "";
    document.getElementById("diff").innerHTML = "";
    document.getElementById("google").href = "";
    return;
  }
  const { q } = questions[0];
  document.getElementById("q").innerHTML = "שאלה: " + q.q;
  document.getElementById("answer").innerHTML = "תשובה: " + q.answer;
  document.getElementById("diff").innerHTML = "דרגה: " + q.level;
  document.getElementById("google").href = "https://google.com/search?q=" + q.q;
}

async function addQuestionToDB(param) {
  if (questions.length === 0) {
    return;
  }
  let { key, q } = questions.shift(); // removing the first element
  if (param !== 2) {
    await remove(ref(getDatabase(), "waiting/" + key));
  }
  if (param === 0) {
    // approve
    const qRef = ref(getDatabase(), "questions");
    const snapshot = await get(child(qRef, levels[q.level] + "/count"));
    await set(child(qRef, levels[q.level] + "/" + snapshot.val()), { name: q.q, type: q.answer });
    let updates = {};
    updates["count"] = increment(1);
    update(child(qRef, levels[q.level]), updates);
  }

  updateHtml();
}
async function initAdminPage() {
  showLoader();
  await sleep(1000); // wait for admin to update from onAuthStateChanged
  hideLoader();
  await AssureLoginAsAdmin();
  await getData();
  updateHtml();
}
initAdminPage();
window.addQuestionToDB = addQuestionToDB;
