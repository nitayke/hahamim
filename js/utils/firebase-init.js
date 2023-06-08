// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6WVb4j7vDiioyYi-JgVaq53wfdpeRVJ0",
  authDomain: "hahamim-d7a18.firebaseapp.com",
  projectId: "hahamim-d7a18",
  storageBucket: "hahamim-d7a18.appspot.com",
  messagingSenderId: "205614945391",
  appId: "1:205614945391:web:2c8f2f1d75ff625db6e99a",
  measurementId: "G-LZHC0H8EEQ",
  databaseURL: "https://hahamim-d7a18-default-rtdb.europe-west1.firebasedatabase.app",
};
getAnalytics(initializeApp(firebaseConfig));
