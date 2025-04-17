import { initializeApp, getApps } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCj7d3Z_G62-AARH0Z0Zm1vJdgmV1c8M1w",
  authDomain: "stones-77868.firebaseapp.com",
  projectId: "stones-77868",
  storageBucket: "stones-77868.firebasestorage.app",
  messagingSenderId: "485904457895",
  appId: "1:485904457895:web:92866c87cc5a5679d83b82",
  measurementId: "G-9JPY5Y2LC3"
};

console.log('Initializing Firebase with config:', firebaseConfig);

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Auth
const auth = getAuth(app);

// Initialize Analytics in browser environment only
if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) {
      getAnalytics(app);
    }
  });
}

console.log('Firebase initialized successfully');

export { auth }; 