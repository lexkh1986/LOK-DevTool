import { db } from '../firebase';
import { collection, query, where, getDoc, getDocs, doc, ref } from 'firebase/firestore/lite';

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
export async function getLands(organization) {
	let data = [];
	let lands = await getDocs(collection(db, 'organizations', organization, 'lands'));
	lands.forEach((land) => {
		data.push({ id: parseInt(land.id), ...land.data() });
	});
	return data;
}
