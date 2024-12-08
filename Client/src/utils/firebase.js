// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "focusnode-c1a81.firebaseapp.com",
  projectId: "focusnode-c1a81",
  storageBucket: "focusnode-c1a81.firebasestorage.app",
  messagingSenderId: "665935264940",
  appId: "1:665935264940:web:d16f43de7ead2d2b927309"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);