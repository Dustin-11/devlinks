import { } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  apiKey: "AIzaSyBg_nkPX0QIeR6Z8mTg7bbd2R0E1ZP7Zlg",
  authDomain: "newshomepage-dfc16.firebaseapp.com",
  projectId: "newshomepage-dfc16",
  storageBucket: "newshomepage-dfc16.appspot.com",
  messagingSenderId: "436283135443",
  appId: "1:436283135443:web:3734518c2b5080227d0b26",
  measurementId: "G-4ZCV0J9LFM"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(app);
export { db, app, auth };