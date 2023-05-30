import {
  getDatabase,
  ref,
  get,
  query,
  orderByChild,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js";

function getRecords() {
  // const scoresRef = ref(getDatabase(), 'scores'); // works
  // onValue(scoresRef, (snapshot) => {
  //     snapshot.forEach((child) => {
  //         console.log(child.val())
  //     });
  // }, {
  //     onlyOnce: true
  // })

  const scoresRef = ref(getDatabase(), "scores");
  const q = query(scoresRef, orderByChild("nitay")); // works
  get(q).then((snapshot) => {
    snapshot.forEach((child) => {
      console.log(child.val());
    });
  });
}

getRecords();
