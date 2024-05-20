// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2ez6YzjQt1XVlR57O1wPzETy6dQdUimo",
  authDomain: "vite-contact-ebc7c.firebaseapp.com",
  projectId: "vite-contact-ebc7c",
  storageBucket: "vite-contact-ebc7c.appspot.com",
  messagingSenderId: "966949785139",
  appId: "1:966949785139:web:9cfe203934777ff6d65d46"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);