// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOlzhUQSvLk-ZPk1JiTAItfJljhDtD6V0",
  authDomain: "create-eve.firebaseapp.com",
  projectId: "create-eve",
  storageBucket: "create-eve.appspot.com",
  messagingSenderId: "621398773003",
  appId: "1:621398773003:web:72b92a9a369d48042f260e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
