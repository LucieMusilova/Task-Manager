// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTXM0fdVEguu1PMyvKAueg3kus6kNUQnQ",
  authDomain: "task-manager-11b23.firebaseapp.com",
  projectId: "task-manager-11b23",
  storageBucket: "task-manager-11b23.appspot.com",
  messagingSenderId: "201324393192",
  appId: "1:201324393192:web:e281f0bf1c6c6953eecf5d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export firestore database
// It will be imported into your react app whenever it is needed
export const firestore = getFirestore(app);
