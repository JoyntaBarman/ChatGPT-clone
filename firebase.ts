// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANnaLUkyO8kEx3cN0NXzVw-rfk6zMsHsE",
  authDomain: "chatgpt-2f72c.firebaseapp.com",
  projectId: "chatgpt-2f72c",
  storageBucket: "chatgpt-2f72c.appspot.com",
  messagingSenderId: "1035553645928",
  appId: "1:1035553645928:web:f7a11375a30e870535a2dd",
  measurementId: "G-LYG9QFQJ94"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db}