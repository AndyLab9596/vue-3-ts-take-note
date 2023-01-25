// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGetAD8y4Uz5eU9oYoiliKdz361ihNLGM",
  authDomain: "vue-3-take-note.firebaseapp.com",
  projectId: "vue-3-take-note",
  storageBucket: "vue-3-take-note.appspot.com",
  messagingSenderId: "758783701071",
  appId: "1:758783701071:web:6ab521b4394115852eba3a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
