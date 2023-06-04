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
    signInAnonymously,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import {
  showLoader,
  hideLoader,
} from './utils/functions.js';

var questions = {};
var index = 0;
const levels = ['easy', 'medium', 'hard'];

async function getData() {
  showLoader();
  const auth = getAuth();
  await signInAnonymously(auth);
  const qRef = ref(getDatabase(), "waiting");
  const q = query(qRef);
  const snapshot = await get(q);
  snapshot.forEach(child => {
    questions[child.key] = child.val();
  });
  hideLoader();
}

function updateHtml() {
  const q = Object.values(questions)[index];
  document.getElementById('q').innerHTML = "שאלה: " + q.q;
  document.getElementById('answer').innerHTML = "תשובה: " + q.answer;
  document.getElementById('diff').innerHTML = "דרגה: " + q.level;
  document.getElementById('google').href = 'https://google.com/search?q=' + q.q;
}

async function c(param) {
  let q = Object.values(questions)[index];
  if (param !== 2) {
    await remove(ref(getDatabase(), "waiting/" + Object.keys(questions)[index]));
  }
  if (param === 0) { // approve
    const qRef = ref(getDatabase(), 'questions');
    const snapshot = await get(child(qRef, levels[q.level] + '/count'));
    console.log(snapshot.val());
    await set(child(qRef, levels[q.level] + '/' +
      snapshot.val()), {'name': q.q, 'type': q.answer});
    let updates = {};
    updates['count'] = increment(1);
    update(child(qRef, levels[q.level]), updates);
  }
  index++;
  updateHtml();
}

await getData();

updateHtml();

window.c = c;