import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyBWt2UUWmZK2kpCzyD-3r1rY8n_WKS5G50",
  authDomain: "alashas.firebaseapp.com",
  projectId: "alashas",
  storageBucket: "alashas.appspot.com",
  messagingSenderId: "1081560476726",
  appId: "1:1081560476726:web:09f40aa184d657f3a43c97",
  measurementId: "G-58M996Q282",
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
