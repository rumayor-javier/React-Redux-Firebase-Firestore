// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAlgeAL8lWUNQsklYKPkUueat6zzO1NOEk",
    authDomain: "react-redux-f1db7.firebaseapp.com",
    projectId: "react-redux-f1db7",
    storageBucket: "react-redux-f1db7.appspot.com",
    messagingSenderId: "418789120052",
    appId: "1:418789120052:web:fe449f91830dac2ad61261"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirestoreDB = getFirestore(FirebaseApp);