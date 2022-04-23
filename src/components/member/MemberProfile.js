import React, { useContext, useEffect, useState } from 'react';
import { MemberProfile as memProfile, Session } from '../../connection/appContexts';
import { getMemberByEmail } from '../../connection/sql/organizations';
import { sortByDate } from '../functions/share';
import PleaseWait from '../PleaseWait';
import AuthorizedContent from './AuthorizedContent';
import UnauthorizedContent from './UnauthorizedContent';

const MemberProfile = () => {
	const { session } = useContext(Session);
	const { memberProfile, setProfile } = useContext(memProfile);

	const [contributionHistory, setData] = useState([]);
	const [isloading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		getMemberByEmail(session.email).then((snapshot) => {
			let prof = snapshot.docs.map((doc) => doc.data())[0];
			let contributionData = sortByDate(prof.contributions, true);

			setProfile(prof);
			setData(contributionData);
			setLoading(false);
		});
	}, []);

	return (
		<div className='profile-content'>
			{isloading ? (
				<PleaseWait type='page-spinner' />
			) : !memberProfile ? (
				<UnauthorizedContent session={session} />
			) : (
				<AuthorizedContent profile={memberProfile} contributions={contributionHistory} />
			)}
		</div>
	);
};

export default MemberProfile;
