import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";

import {
  getFirestore,
  collection,
  getDocs,
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
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export {
  getAuth,
  createUserWithEmailAndPassword,
  getFirestore,
  collection,
  getDocs,
};
