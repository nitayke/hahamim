import {
  getDatabase,
  ref,
  query,
  orderByChild,
  get,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import {
  getAuth,
  signInAnonymously,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import {
  showLoader,
  hideLoader
} from './utils/functions.js';

showLoader();
const auth = getAuth();
await signInAnonymously(auth);

let qRef = ref(getDatabase(), "records");
const records = query(qRef, orderByChild('score'));

let snapshot = await get(records);
const div = document.getElementById('records');

snapshot.forEach(child => {
  const val = child.val();
  div.innerHTML = '<p>' + val['score'] + ' - ' + val['name'] + '</p>' + div.innerHTML;
});

let s = [];
qRef = ref(getDatabase(), 'scores');
const scores = query(qRef);
snapshot = await get(scores);
snapshot.forEach(child => {
  s.push(child.val());
});
s.pop();

new Chart(document.getElementById("line-chart"), {
  type : 'line',
  data : {
    labels : Array.from({length: 165}, (_, i) => i * 10),
    datasets : [
        {
          data : s,
          label : "כמה קיבלו ככה",
          borderColor : "#759daa",
          fill : false
        }]
  }
});

hideLoader();