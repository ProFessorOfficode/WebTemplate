import { firebaseConfig } from "./firebaseConfig.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service

const auth = getAuth(app);

document.getElementById("user-login").addEventListener("click", (e) => {
  e.preventDefault();

  signInWithEmailAndPassword(
    auth,
    document.getElementById("user-email").value,
    document.getElementById("user-password").value
  )
    .then(() => {
      // Signed in
      alert("Login successful");
      // ...
    })
    .catch((error) => {
      alert(error.message);
    });
});
