import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp( {
    apiKey: "YOUR_DATA",
    authDomain: "YOUR_DATA",
    projectId: "YOUR_DATA",
    storageBucket: "YOUR_DATA",
    messagingSenderId: "YOUR_DATA",
    appId: "YOUR_DATA",
    measurementId: "YOUR_DATA7"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };