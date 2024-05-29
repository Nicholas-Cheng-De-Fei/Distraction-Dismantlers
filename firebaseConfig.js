// Import the functions you need from the SDKs you need
<<<<<<< HEAD
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
=======
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
>>>>>>> ac26b60 (Barebones login & Registration Feature implemented)
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5QRO4xX_87lZlKQgOm8A-1eQ4XfCemrc",
  authDomain: "distraction-dismantlers.firebaseapp.com",
<<<<<<< HEAD
  databaseURL: "https://distraction-dismantlers-default-rtdb.asia-southeast1.firebasedatabase.app",
=======
  databaseURL:
    "https://distraction-dismantlers-default-rtdb.asia-southeast1.firebasedatabase.app",
>>>>>>> ac26b60 (Barebones login & Registration Feature implemented)
  projectId: "distraction-dismantlers",
  storageBucket: "distraction-dismantlers.appspot.com",
  messagingSenderId: "1046018569928",
  appId: "1:1046018569928:web:e488f972e8c170e28317fd",
<<<<<<< HEAD
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
=======
  measurementId: "G-XG8YSGDDJT",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

/* 
  const docRef = doc(database, "Users", "VdnPvW6BXGJTK2gHVhFl");
  getDoc(docRef).then((snapshot) => {
      console.log(snapshot.data())
    });
*/
>>>>>>> ac26b60 (Barebones login & Registration Feature implemented)
