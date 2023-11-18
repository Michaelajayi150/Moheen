// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFd7DQJMMgcYeAu3BeT-MgtBTCCFmKaT8",
  authDomain: "chef-palace.firebaseapp.com",
  projectId: "chef-palace",
  storageBucket: "chef-palace.appspot.com",
  messagingSenderId: "47987952817",
  appId: "1:47987952817:web:b1fb45380279fce9c22690",
  measurementId: "G-1K0G1THPK3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
