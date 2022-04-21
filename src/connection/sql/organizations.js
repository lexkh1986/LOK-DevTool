import { db } from '../firebase';
import { collection, getDoc, setDoc, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';

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

export async function getMemberByEmail(email) {
	let qRef = query(collection(db, 'members'), where('email', '==', email));
	return await getDocs(qRef);
}

export async function getPayoutRate(organization) {
	return await getDoc(doc(db, 'organizations', organization), 'payoutRate');
}

export async function setPayoutRates(organization, data) {
	let docRef = doc(db, 'organizations', organization);
	await setDoc(
		docRef,
		{ payoutRate: data },
		{
			merge: true,
		}
	);
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

export async function setLand(organization, id, data) {
	let docRef = doc(collection(db, 'organizations', organization, 'lands'), id.toString());
	await setDoc(docRef, data, {
		merge: true,
	});
}
