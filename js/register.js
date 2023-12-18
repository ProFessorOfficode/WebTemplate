import { firebaseConfig } from "./firebaseConfig.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  setDoc,
  getFirestore,
  collection,
  doc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service

const auth = getAuth(app);
const db = getFirestore(app);
const dbref = doc(collection(db, "codeCrafter"));

document
  .getElementById("user-register")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      const docRef = await setDoc(dbref, {
        name: document.getElementById("user-name").value,
        age: document.getElementById("user-name").value,
        email: document.getElementById("user-email").value,
        password: document.getElementById("user-password").value,
      });

      //console.log("Document written with ID: ", docRef.id);
      createUserWithEmailAndPassword(
        auth,
        document.getElementById("user-email").value,
        document.getElementById("user-password").value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          alert("Register successful");
          signOut(auth)
            .then(() => {
              // Sign-out successful.
            })
            .catch((error) => {
              // An error happened.
            });
          window.location.href = "index.html";
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  });
