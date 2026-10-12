import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase Console se mili web app settings yahan configure hoti hain.
const firebaseConfig = {
  apiKey: "AIzaSyDcX63iCe_5l_qFv19Noj6lnFYjNv38z38",
  authDomain: "expense-tracker-b0631.firebaseapp.com",
  projectId: "expense-tracker-b0631",
  storageBucket: "expense-tracker-b0631.firebasestorage.app",
  messagingSenderId: "597774784435",
  appId: "1:597774784435:web:ee29d339407049ff535dc6",
  measurementId: "G-13Z580RJME"
};


if (!firebaseConfig.apiKey || firebaseConfig.apiKey.includes("YOUR_")) {
  console.warn(
    "Firebase config is not set. Replace the placeholder values in src/app/firebase.config.ts with your real Firebase project settings.",
  );
}

// Firebase app ko repeat initialization se bachakar Authentication export karta hai.
export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
