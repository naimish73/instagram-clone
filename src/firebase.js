import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAC_VdkShdgdOJ3nY0eVC_7XBmW5Jq6rGo",
    authDomain: "instagram-clone-10784.firebaseapp.com",
    projectId: "instagram-clone-10784",
    storageBucket: "instagram-clone-10784.appspot.com",
    messagingSenderId: "376712734098",
    appId: "1:376712734098:web:fea68383d162d30e7d8d4b",
    measurementId: "G-9EFZZF9NQL",
});

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
