import {
  app,
  auth,
  db,
  createUserWithEmailAndPassword,
  getFirestore,
  collection,
  getDocs,
} from "/scripts/app.js";

const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", function (e) {
  e.preventDefault();

  //get user info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  //signup user
  createUserWithEmailAndPassword(auth, email, password).then((cred) => {
    console.log(cred);
  });
  overlayOff();
  formDisplay("signup-form", "none");
});
