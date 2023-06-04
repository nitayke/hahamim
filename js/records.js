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

async function getRecords() {
  showLoader();
  const auth = getAuth();
  await signInAnonymously(auth);

  const qRef = ref(getDatabase(), "records");
  const records = query(qRef, orderByChild('score'));

  const snapshot = await get(records);
  const div = document.getElementById('records');

  snapshot.forEach(child => {
    const val = child.val();
    div.innerHTML = '<p>' + val['score'] + ' - ' + val['name'] + '</p>' + div.innerHTML;
  })
  hideLoader();
}

getRecords();
