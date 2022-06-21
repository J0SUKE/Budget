// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDh1oGvZdNAKKI1pD2gDI7guxQTlSn8Ajc",
  authDomain: "budget-941dd.firebaseapp.com",
  projectId: "budget-941dd",
  storageBucket: "budget-941dd.appspot.com",
  messagingSenderId: "147947812679",
  appId: "1:147947812679:web:402ec52d9bdae936233e62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

