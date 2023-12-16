import { firebaseConfig } from "./firebaseConfig.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  doc,
  runTransaction,
  getFirestore,
  setDoc,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const dbref = doc(collection(db, "codeCrafter"));
// Create user
document.getElementById("create_user").addEventListener("click", async (e) => {
  e.preventDefault();
  //console.log(document.getElementById("user_name").value);
  const docRef = await setDoc(
    dbref,
    {
      name: document.getElementById("user_name").value,
      age: document.getElementById("user_age").value,
      email: document.getElementById("user_email").value,
      password: document.getElementById("user_password").value,
    },
    { merge: true }
  );
});
// Nav Create user
document.getElementById("nav_create").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("create").style.display = "block";
  document.getElementById("view_user").style.display = "none";
});

const studentsContainer = document.getElementById("students-container");
// Nav View users
document.getElementById("nav_user").addEventListener("click", async (e) => {
  e.preventDefault();
  document.getElementById("view_user").style.display = "block";
  document.getElementById("create").style.display = "none";
  // Create a reference to the SF doc.
  //const sfDocRef = doc(db, "codeCrafter", "users");

  try {
    const querySnapshot = await getDocs(collection(db, "codeCrafter"));
    querySnapshot.forEach((doc) => {
      adminNavContainer(doc.data().name, doc.data().age);
      console.log(doc.data());
    });
    // if (!querySnapshot.exists()) {
    //   throw "Document does not exist!";
    // }

    //console.log("Population increased to ", newPopulation);
  } catch (e) {
    // This will be a "population is too big" error.
    console.error(e);
  }
});
// Display Student template
function adminNavContainer(name, age) {
  document.getElementById("get_user").innerHTML = `
  <div class="card m-1" style="width: 17rem;">
  <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <p class="card-text">${age}</p>
      <a href="#" class="btn btn-primary">Delete</a>
      <a href="#" class="btn btn-primary">Update</a>
  </div>
</div>
        `;
}
