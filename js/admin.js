import {
    getDatabase,
    ref,
    query,
    get,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import {
    getAuth,
    signInAnonymously,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

var questions = []
var index = 0;

async function getData() {
  const auth = getAuth();
  await signInAnonymously(auth);
  const qRef = ref(getDatabase(), "waiting");
  const q = query(qRef);
  const snapshot = await get(q);
  snapshot.forEach(child => {
    questions.push(child.val())
  });
}

function click() {
    // TODO: approve or decline. add to DB
    const q = questions[index];
    document.getElementById('q').innerHTML = "שאלה: " + q.q;
    document.getElementById('answer').innerHTML = "תשובה: " + q.answer;
    document.getElementById('diff').innerHTML = "דרגה: " + q.level;
    index++;
}

await getData();
click();