// Firebase imports
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, signOut as logOut, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_APIKEY,
	authDomain: process.env.REACT_APP_AUTHDOMAIN,
	projectId: process.env.REACT_APP_PROJECTID,
	storageBucket: process.env.REACT_APP_STORAGEBUCKET,
	messagingSenderId: process.env.REACT_APP_MSGSERNDERID,
	appId: process.env.REACT_APP_APPID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Firestore
export const db = getFirestore(app);

// Authentication
export function signInGoogle() {
	return signInWithPopup(auth, new GoogleAuthProvider());
}

export function useAuth(func) {
	return onAuthStateChanged(auth, (user) => func(user));
}

export function signOut() {
	return logOut(auth);
}
