import { db } from '../firebase';
import { collection, getDoc, setDoc, addDoc, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';

// Common helper
export async function getDocByID(collection, id) {
	let snap = await getDoc(doc(db, collection, id));
	if (snap.exists()) {
		return snap.data();
	} else {
		return Promise.reject(Error(`No such document: ${collection}.${id}`));
	}
}
// Organization functions
export async function getOrg() {
	let orgs = await getDocs(collection(db, 'organizations'));
	return orgs.docs.map((doc) => doc.id);
}

// Members functions
export async function getAllMembers(organization) {
	return await getDocs(query(collection(db, 'members'), where('organization', '==', organization)));
}

export async function getMemberByEmail(email) {
	return await getDocs(query(collection(db, 'members'), where('email', '==', email)));
}

export async function addMember(data) {
	await addDoc(collection(db, 'members'), data);
}

export async function deleteMember(uid) {
	await deleteDoc(doc(collection(db, 'members'), uid));
}

export async function toggleMemberStatus(uid, status) {
	await setDoc(doc(collection(db, 'members'), uid), { approved: status }, { merge: true });
}

export async function setMemberInfo(uid, data) {
	await setDoc(doc(collection(db, 'members'), uid), data, { merge: true });
}

export async function getMember(uid) {
	return await getDoc(doc(collection(db, 'members'), uid));
}

// Member kingdoms
export async function setMemberKingdoms(uid, kingdoms) {
	await setDoc(doc(collection(db, 'members'), uid), { kingdoms: kingdoms }, { merge: true });
}

// Member contributions
export async function setMemberContributions(uid, contributions) {
	await setDoc(doc(collection(db, 'members'), uid), { contributions: contributions }, { merge: true });
}

// Report functions
export async function addReport(organization, date, data) {
	let docRef = doc(collection(doc(db, 'organizations', organization), 'reports'), date);
	await setDoc(docRef, data, { merge: true });
}

// Payout rate functions
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

// Lands funtions
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

export async function setLand(organization, id, data) {
	let docRef = doc(collection(db, 'organizations', organization, 'lands'), id.toString());
	await setDoc(docRef, data, {
		merge: true,
	});
}
