import { getApp, getApps, initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyYourActualAPIKeyHere...',
  authDomain: 'expense-tracker-b0631.firebaseapp.com',
  projectId: 'expense-tracker-b0631',
  storageBucket: 'expense-tracker-b0631.firebasestorage.app',
  messagingSenderId: '597774784435',
  appId: '1:597774784435:web:a1b2c3d4e5f6g7h8i9j0',
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
