// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpfbRjhSqSWVSWolrSkZ0w6jdlFo05EwY",
  authDomain: "twitter-clone-d4b17.firebaseapp.com",
  projectId: "twitter-clone-d4b17",
  storageBucket: "twitter-clone-d4b17.appspot.com",
  messagingSenderId: "1050003375056",
  appId: "1:1050003375056:web:c85c2c96cbcd5a0dfc6fd5",
  measurementId: "G-QBR8XRKBYB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
// export default db;

export default app;

// const firebaseAppConfig = getFirebaseConfig();
// initializeApp(firebaseAppConfig);
