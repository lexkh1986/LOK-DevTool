import { db } from '../firebase';
import { collection, getDoc, setDoc, deleteDoc, doc } from 'firebase/firestore';

// Common helper
export async function getDocByID(collection, id) {
	let snap = await getDoc(doc(db, collection, id));
	if (snap.exists()) {
		return snap.data();
	} else {
		return Promise.reject(Error(`No such document: ${collection}.${id}`));
	}
}

// By functions
export function getLands(organization) {
	return collection(db, 'organizations', organization, 'lands');
}

export async function deleteLand(organization, id) {
	let docRef = doc(db, 'organizations', organization);
	let subcolRef = collection(docRef, 'lands');
	await deleteDoc(doc(subcolRef, id.toString()));
}

export async function addLand(organization, id, data) {
	let docRef = doc(db, 'organizations', organization);
	let subcolRef = collection(docRef, 'lands');
	let newDoc = doc(subcolRef, id.toString());
	await setDoc(newDoc, data);
}
