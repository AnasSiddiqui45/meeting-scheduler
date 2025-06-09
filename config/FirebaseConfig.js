// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "meeting-scheduler-1c8dc.firebaseapp.com",
  projectId: "meeting-scheduler-1c8dc",
  storageBucket: "meeting-scheduler-1c8dc.firebasestorage.app",
  messagingSenderId: "836815373887",
  appId: "1:836815373887:web:ae7631f469468dcf58da8a",
  measurementId: "G-LW07TCY81G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
