// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCvIXwViWlrygPQ90RZQEzbOVTAhi2h89o",
    authDomain: "chat-1b248.firebaseapp.com",
    projectId: "chat-1b248",
    storageBucket: "chat-1b248.appspot.com",
    messagingSenderId: "185042997208",
    appId: "1:185042997208:web:dfd2db809c27ea4ffeecad"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()