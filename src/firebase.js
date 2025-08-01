import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwLTPT0MkOz697T86qumpSmC8BHFlATuM",
  authDomain: "kpi-sistem-maiwp.firebaseapp.com",
  projectId: "kpi-sistem-maiwp",
  storageBucket: "kpi-sistem-maiwp.firebasestorage.app",
  messagingSenderId: "71862519812",
  appId: "1:71862519812:web:5b3e2353f563acd57bcd51",
  measurementId: "G-2K8LEGD8YT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app; 