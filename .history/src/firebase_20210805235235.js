import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp( {
    apiKey: "AIzaSyC-cxoFZOu3Z__Jq5T-_CIplMYO7LsFAB8",
    authDomain: "instagram-clone-3f730.firebaseapp.com",
    projectId: "instagram-clone-3f730",
    storageBucket: "instagram-clone-3f730.appspot.com",
    messagingSenderId: "954265825209",
    appId: "1:954265825209:web:84d2c5c790eb0a913e5068",
    measurementId: "G-EY5D5SKMR7"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };