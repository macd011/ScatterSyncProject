import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDQ4O_t9qoIFu0HY4QRa3qJ769IPRrUYhc",
  authDomain: "scattersync-86981.firebaseapp.com",
  projectId: "scattersync-86981",
  storageBucket: "scattersync-86981.firebasestorage.app",
  messagingSenderId: "697384209349",
  appId: "1:697384209349:web:d81f66ffc5e5b6e8bd99ac",
  measurementId: "G-CYHV04SHKV"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const firestore = getFirestore(app);

export { auth, firestore };