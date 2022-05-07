import React, { useContext, useEffect, useState } from 'react';
import { MemberProfile as memProfile, Session } from '../../connection/appContexts';
import { getMemberByEmail, getOrg } from '../../connection/sql/organizations';
import { sortByDate } from '../functions/share';
import PleaseWait from '../PleaseWait';
import AuthorizedContent from './AuthorizedContent';
import UnapprovedContent from './UnapprovedContent';
import UnauthorizedContent from './UnauthorizedContent';

const MemberProfile = () => {
	const { session } = useContext(Session);
	const { memberProfile, setProfile } = useContext(memProfile);

	const [contributionHistory, setData] = useState({});
	const [orgs, setOrgs] = useState([]);
	const [isloading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		getMemberByEmail(session.email)
			.then((snapshot) => {
				let prof = snapshot.docs.map((doc) => doc.data())[0];
				setProfile(prof);

				if (prof) {
					setData(sortByDate(Object.values(prof.contributions), true));
				}

				getOrg()
					.then((docs) => {
						setOrgs(docs);
						setLoading(false);
					})
					.catch((err) => {
						alert(`Oops got an error: ${err}!!!`);
						setLoading(false);
					});
			})
			.catch((err) => {
				alert(`Oops got an error: ${err}!!!`);
				setLoading(false);
			});
	}, []);

	return (
		<div className='profile-content'>
			{isloading ? (
				<PleaseWait type='page-spinner' />
			) : !memberProfile ? (
				<UnauthorizedContent session={session} orgs={orgs} />
			) : !memberProfile.approved ? (
				<UnapprovedContent profile={memberProfile} />
			) : (
				<AuthorizedContent profile={memberProfile} contributions={contributionHistory} />
			)}
		</div>
	);
};

export default MemberProfile;
