// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGvtFvfNSoeKKsWStXjCCs-z2M9lV1Kfs",
  authDomain: "chat-app-82d23.firebaseapp.com",
  projectId: "chat-app-82d23",
  storageBucket: "chat-app-82d23.appspot.com",
  messagingSenderId: "1098012493744",
  appId: "1:1098012493744:web:f60fa3f6843e9c2bcef875",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
