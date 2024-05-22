// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANVhgJFlHNhrB1R1rRVMnJENbr9FVJUIc",
  authDomain: "trackingorder-ed71e.firebaseapp.com",
  projectId: "trackingorder-ed71e",
  storageBucket: "trackingorder-ed71e.appspot.com",
  messagingSenderId: "907995756634",
  appId: "1:907995756634:web:625d686c85c3f57f628063",
  measurementId: "G-BJ74580FB7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export { auth };