import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";

import {
  getFirestore,
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyANW6lE6ifrHTDRlpm1Dm1X3huc3c5lxR0",
  authDomain: "library-5500.firebaseapp.com",
  projectId: "library-5500",
  storageBucket: "library-5500.appspot.com",
  messagingSenderId: "898712433264",
  appId: "1:898712433264:web:b4368b807f72c5944b7ab5",
  measurementId: "G-222P1BLNW0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
let dataArray = [];

//Authentication
//Listen for auth status changes
onAuthStateChanged(auth, async (user) => {
  if (user) {
    //getting data from firestore and storing in dataArray
    const querySnapshot = await getDocs(collection(db, "books"));
    dataArray = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setupUi(user);
    updateBookGrid(dataArray);
  } else {
    setupUi(user);
    updateBookGrid(myLibrary);
  }
});

//Signup user
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", function (e) {
  e.preventDefault();

  //get user info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  //signup user
  createUserWithEmailAndPassword(auth, email, password);

  overlayOff();
  formDisplay("signup-form", "none");
});

//Logout user
const logoutBtn = document.querySelector("#logout-btn");
logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut();
});

//Login user
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  signInWithEmailAndPassword(auth, email, password);

  overlayOff();
  formDisplay("login-form", "none");
});

//##################################################
//######################################################
//######################################################

// Firestore
const cloudLibContainer = document.querySelector("#cloud-container");

//Update book display after adding, deleting, editing the books

// function updateCloudBookGrid(data) {
//   cloudLibContainer.innerHTML = "";

//   data.forEach((doc, index) => {
//     const book = doc.data();
//     cloudLibContainer.innerHTML += `
//     <div class="book" id="${index}">
//         <div id="readCircle" class="${
//           book.read == "yes" ? "" : "unread"
//         }"></div>
//         <div>Title : ${book.title}</div>
//         <div>Author : ${book.author}</div>
//         <div>Pages : ${book.pages}</div>
//         <div>
//           <p id="toggleRead">
//            ${book.read == "yes" ? "Mark as Unread" : "Mark as Read"}
//           </p>
//         </div>
//         <div id="delEditBtn">
//           <i id="delBook" class="material-icons">delete</i>
//           <i id="editBook" class="material-icons">edit</i>
//         </div>
//     </div>`;
//   });
// }
