// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5QRO4xX_87lZlKQgOm8A-1eQ4XfCemrc",
  authDomain: "distraction-dismantlers.firebaseapp.com",
  databaseURL: "https://distraction-dismantlers-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "distraction-dismantlers",
  storageBucket: "distraction-dismantlers.appspot.com",
  messagingSenderId: "1046018569928",
  appId: "1:1046018569928:web:e488f972e8c170e28317fd",
  measurementId: "G-XG8YSGDDJT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);


/* 
  const docRef = doc(database, "Users", "VdnPvW6BXGJTK2gHVhFl");


  getDoc(docRef).then((snapshot) => {
      console.log(snapshot.data())
    });
*/