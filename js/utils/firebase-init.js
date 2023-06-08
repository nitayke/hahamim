// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";
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
