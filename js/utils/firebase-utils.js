import {
  onAuthStateChanged,
  getAuth,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { sleep } from "./helpers.js";
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
