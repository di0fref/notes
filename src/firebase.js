// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, setPersistence, signInWithPopup, browserLocalPersistence, GoogleAuthProvider} from "firebase/auth";
import NotesService from "./service/NotesService";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCMOACdQHFnxEDFS5iAhunZ5mH-Sntyx1o",
    authDomain: "noteer-c97df.firebaseapp.com",
    projectId: "noteer-c97df",
    storageBucket: "noteer-c97df.appspot.com",
    messagingSenderId: "71711370142",
    appId: "1:71711370142:web:dc53314b44a9140c4d848f"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth()

export const signOutFireBAse = () => {
    auth.signOut().then((res) =>{})
}

setPersistence(auth, browserLocalPersistence)
    .then(() => {})
    .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
    });


