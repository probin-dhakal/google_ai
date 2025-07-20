import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Demo Firebase configuration for development
const firebaseConfig = {
  apiKey: "demo-key",
  authDomain: "demo.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "demo-app-id"
};

const appId = 'demo-app';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Authentication helper - use anonymous auth for demo
export const authenticateUser = async () => {
  try {
    // Sign in anonymously for demo purposes
    const userCredential = await signInAnonymously(auth);
    return userCredential.user;
  } catch (error) {
    console.error('Authentication error:', error);
    // Return a mock user for demo purposes if auth fails
    return {
      uid: 'demo-user-' + Math.random().toString(36).substr(2, 9),
      isAnonymous: true
    };
  }
};

export { appId };