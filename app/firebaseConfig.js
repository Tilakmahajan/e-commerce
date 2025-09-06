// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGBQBeXmwecIyf6i3CPvK0x7EWb35_W4Y",
  authDomain: "max-wholesaler.firebaseapp.com",
  projectId: "max-wholesaler",
  storageBucket: "max-wholesaler.firebasestorage.app",
  messagingSenderId: "906405324595",
  appId: "1:906405324595:web:caa28a62a01aa131a84046",
  measurementId: "G-JH94HDN6TS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);