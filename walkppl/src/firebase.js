// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTt5rN4dMCzkwvFjdey0rRZFVyPHyhV2Y",
  authDomain: "walkppl-41b31.firebaseapp.com",
  projectId: "walkppl-41b31",
  storageBucket: "walkppl-41b31.appspot.com",
  messagingSenderId: "186837470693",
  appId: "1:186837470693:web:1e972a52e1dafbb5c9b30c"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db