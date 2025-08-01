import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDwLTPT0MkOz697T86qumpSmC8BHFlATuM",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "kpi-sistem-maiwp.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "kpi-sistem-maiwp",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "kpi-sistem-maiwp.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "71862519812",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:71862519812:web:5b3e2353f563acd57bcd51",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-2K8LEGD8YT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app; 