// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-app-2a76a.firebaseapp.com",
  projectId: "mern-blog-app-2a76a",
  storageBucket: "mern-blog-app-2a76a.firebasestorage.app",
  messagingSenderId: "798600046868",
  appId: "1:798600046868:web:c5d817af748db776783a01"
}; 

// Initialize Firebase
export const app = initializeApp(firebaseConfig);