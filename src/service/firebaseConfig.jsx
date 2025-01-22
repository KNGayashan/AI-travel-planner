
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCgFdkQvVg-3vneAavfhsL9TkVXsqBmV0I",
  authDomain: "ai-travel-planner-5bdfa.firebaseapp.com",
  projectId: "ai-travel-planner-5bdfa",
  storageBucket: "ai-travel-planner-5bdfa.firebasestorage.app",
  messagingSenderId: "193456245538",
  appId: "1:193456245538:web:b1084588709e5841abb37b"
};


export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);