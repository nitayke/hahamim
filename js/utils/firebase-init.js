// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";
import {
  onAuthStateChanged,
  getAuth,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { sleep } from "./helpers.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxafWABzdwnokrYgyZRqCcfVgLDeXM18I",
  authDomain: "shvushon-hahamim.firebaseapp.com",
  projectId: "shvushon-hahamim",
  storageBucket: "shvushon-hahamim.appspot.com",
  messagingSenderId: "358728914528",
  appId: "1:358728914528:web:088c3dd33ec38fdd0a9505",
  measurementId: "G-SBW22SF8ZE",
  databaseURL: "https://shvushon-hahamim-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();

window.currentUser = auth.currentUser;

onAuthStateChanged(auth, (user) => {
  /*
    will run every time the user logs in or logs out,
    or when the page loads - keeping the state of previous login
   */
  window.currentUser = user;
});

export async function isAdmin() {
  await sleep(0.2); // wait for next loop cycle, so currentUser will be updated from the onAuthStateChanged
  return !!(window.currentUser && !window.currentUser.isAnonymous);
}

export function logout() {
  const auth = getAuth();
  auth.signOut();
  window.currentUser = null;
  window.location.href = "index.html";
}
