import firebase from "firebase";

//Auth
var firebaseConfig = {
  apiKey: "AIzaSyDD-Zc693U6Ku2WiUgl9u2bWEIvlOMHX5A",
  authDomain: "fitnow-6c40b.firebaseapp.com",
  projectId: "fitnow-6c40b",
  storageBucket: "fitnow-6c40b.appspot.com",
  messagingSenderId: "905046714197",
  appId: "1:905046714197:web:24815055f06729434431dc",
  measurementId: "G-X378GMB877",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
firebase.analytics();

//database

// Required for side-effects
require("firebase/firestore");

export { auth, db };
export default db;
