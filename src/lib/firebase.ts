import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnr1uqJRDOKqAuGXJ54iAOsqKfwb0zglA",
  authDomain: "nedaa-orders.firebaseapp.com",
  projectId: "nedaa-orders",
  storageBucket: "nedaa-orders.firebasestorage.app",
  messagingSenderId: "358698778027",
  appId: "1:358698778027:web:01f137b68bd285d7a0a6ee",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);