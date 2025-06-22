// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    setPersistence,
    browserSessionPersistence
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyASYA4v8c4_IPtoSOa8APx5YV302bEqGTo",
    authDomain: "chill-tech-store.firebaseapp.com",
    projectId: "chill-tech-store",
    storageBucket: "chill-tech-store.appspot.com",
    messagingSenderId: "44732837439",
    appId: "1:44732837439:web:d018c31bbc9df50c63928a"
};

const app = initializeApp(firebaseConfig); //
const auth = getAuth(app); //
const db = getFirestore(app);


const provider = new GoogleAuthProvider();

// 🛠️ Force session-based auth (reset login when browser/tab closed)
const loginWithGoogle = async () => {
    await setPersistence(auth, browserSessionPersistence);
    return signInWithPopup(auth, provider);
};

const logout = () => signOut(auth);

export { auth, db, loginWithGoogle, logout };
