import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore/lite';

export async function getUserByEmail(user) {
	let snapshot = await getDocs(query(collection(db, 'users'), where('email', '==', user.email)));
	let dbUsers = snapshot.docs.map((doc) => doc.data());

	// If valid user in db, return the user
	return dbUsers.filter((dbUser) => dbUser.email === user.email)[0];
}
