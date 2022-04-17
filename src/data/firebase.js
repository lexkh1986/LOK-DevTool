// Common imports
import { useEffect, useState } from 'react';

// Firebase imports
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, signOut as logOut, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

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

export async function validateUser(user) {
	const allUsersSnapshot = await getDocs(collection(db, 'users'));
	const dbUsers = allUsersSnapshot.docs.map((doc) => doc.data());

	// If valid user in db, return the user
	return dbUsers.filter((dbUser) => dbUser.email === user.email)[0];
}

// Authentication
export function signInGoogle() {
	return signInWithPopup(auth, new GoogleAuthProvider());
}

export function useAuth() {
	const [currentUser, setCurrentUser] = useState();

	useEffect(() => {
		const unsubsc = onAuthStateChanged(auth, (user) => setCurrentUser(user));
		return unsubsc;
	}, []);

	return currentUser;
}

export function signOut() {
	return logOut(auth);
}
