import { db } from '../firebase';
import { collection, query, where, getDoc, getDocs, doc } from 'firebase/firestore/lite';

// Common helper
export async function getByID(collection, id) {
	const snap = await getDoc(doc(db, collection, id));
	if (snap.exists()) return snap.data();
	else alert(`No such document: ${collection}.${id}`);
}

// By functions
export async function getLands(organization) {
	let org = await getByID('organizations', organization);
	console.log(org);
}
