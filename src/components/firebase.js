// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// 1:779730955712:web:513ebe4b33737ff8d26c25
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBDcsFFH9GuL_1Tielic38CKfCD-Vb2wZM",
  authDomain: "login-auth-a79c0.firebaseapp.com",
  projectId: "login-auth-a79c0",
  storageBucket: "login-auth-a79c0.appspot.com",
  messagingSenderId: "779730955712",
  appId: "1:779730955712:web:513ebe4b33737ff8d26c25"
};
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;


// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration