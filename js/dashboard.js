import { firebaseConfig } from "./firebaseConfig.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  doc,
  runTransaction,
  getFirestore,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const dbref = doc(collection(db, "codeCrafter"));

function adminNavContainer() {
  document.getElementById("nav").innerHTML = `
  <nav class="navbar navbar-expand-lg bg-light shadow-sm">
  <div class="container-fluid">
      <a class="navbar-brand fw-bold" href="#">CodeCraft</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end fw-bold" id="navbarNav">
          <ul class="navbar-nav">
              <li class="nav-item">
                  <a class="nav-link active" href="#" id="nav_create">Create</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#" id="nav_user">Users</a>
              </li>
              <li class="nav-item">
              <div class="dropdown-center">
              <a class="nav-link active " href="#" id="account" data-bs-toggle="dropdown" aria-expanded="false">Account</a>
              <ul class="dropdown-menu p-0 m-0 dropdown-menu-end px-3 py-2">
                <li><a class="dropdown-item p-0" href="#">Profile</a></li>
                <li><a class="dropdown-item p-0" href="#" id="sign_out">Sign out</a></li>
              </ul>
            </div>
              </li>
          </ul>
      </div>
  </div>
</nav>`;
}
adminNavContainer();

function loadingTemplate() {
  return ` <div class="d-flex justify-content-center container-h align-items-center">
  <div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div> 
</div> `;
}

// Sign out
document.getElementById("sign_out").addEventListener("click", (e) => {
  e.preventDefault();
  signOut(auth)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      // An error happened.
    });
});
// Nav Create user
document.getElementById("nav_create").addEventListener("click", (e) => {
  e.preventDefault();
  // document.getElementById("create").style.display = "block";
  // document.getElementById("view_user").style.display = "none";
  // location.reload();
  document.getElementById("view_user").innerHTML = "";
  document.getElementById("create").style.display = "block";
});
// Create user
document.getElementById("create_user").addEventListener("click", async (e) => {
  e.preventDefault();
  let user_name = document.getElementById("user_name");
  let user_age = document.getElementById("user_age");
  let user_email = document.getElementById("user_email");
  let user_password = document.getElementById("user_password");
  if (
    user_name.value &&
    user_age.value &&
    user_email.value &&
    user_password.value !== ""
  ) {
    document.getElementById("loadingCreation").style.display = "block";
    document.getElementById("loadingCreation").innerHTML = loadingTemplate();
    document.getElementById("create").style.visibility = "hidden";
    const docRef = await setDoc(
      dbref,
      {
        name: user_name.value,
        age: user_age.value,
        email: user_email.value,
        password: user_password.value,
      },
      { merge: true }
    );
    setTimeout(async function () {
      document.getElementById("create").style.visibility = "visible";
      document.getElementById("loadingCreation").style.display = "none";
      user_name.value = "";
      user_age.value = "";
      user_email.value = "";
      user_password.value = "";
      location.reload();
    }, 1500);
  } else {
    alert("Please fill all fields");
  }
});

// Nav View users
document.getElementById("nav_user").addEventListener("click", async (e) => {
  e.preventDefault();
  document.getElementById("loading").style.display = "block";
  document.getElementById("create").style.display = "none";
  document.getElementById("loading").innerHTML = loadingTemplate();
  document.getElementById("view_user").style.visibility = "hidden";
  document.getElementById("view_user").innerHTML = `  
  <div class="d-flex justify-content-center">
  <div class="container m-0 p-0">
      <div class="row pt-5 m-0" id="get_user">
          <h4>View users</h4>
          <div class="border-bottom mb-3"></div>

      </div>
  </div>
</div>`;

  const studentsContainer = document.getElementById("get_user");
  try {
    const querySnapshot = await getDocs(collection(db, "codeCrafter"));
    querySnapshot.forEach((doc) => {
      const studentCard = document.createElement("div");
      studentCard.classList.add("card", "m-1");
      studentCard.style.width = "17rem";
      const GetStudentTemplate = `<div class="card-body">
    <h5 class="card-title">${doc.data().name}</h5>
    <p class="card-text">${doc.data().age}</p>
    <a href="#" class="btn btn-primary" id="delete_user">Delete</a>
    <a href="#" class="btn btn-primary">Edit</a>
</div>`;
      studentCard.innerHTML = GetStudentTemplate;
      studentsContainer.appendChild(studentCard);
    });
  } catch (e) {
    console.error(e);
  }
  setTimeout(async function () {
    document.getElementById("view_user").style.visibility = "visible";
    //document.getElementById("view_user").removeAttribute("style");
    document.getElementById("loading").style.display = "none";
  }, 1500);
});
