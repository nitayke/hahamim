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

function getRecords() {
  
  const scoresRef = ref(getDatabase(), "scores");
  const q = query(scoresRef, orderByChild("nitay")); // works
  get(q).then((snapshot) => {
    snapshot.forEach((child) => {
      console.log(child.val());
    });
  });
}

getRecords();
