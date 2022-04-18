import React, { useContext, useEffect, useState } from 'react';
import { Routes as DOMRoutes, Route, Navigate, useLocation } from 'react-router-dom';
import { signInGoogle, useAuth } from './connection/firebase';
import { getUserByEmail } from './connection/sql/users';

import { UserProfile, Session } from './connection/appContexts';
import PleaseWait from './components/PleaseWait';
import Main from './layout/Main';
import Lands from './views/Lands';
import Members from './views/Members';
import Report from './views/Report';
import Login from './views/Login';
import Profile from './views/Profile';
import Error from './views/Error';

function Routes() {
	const location = useLocation();
	const { profile, setProfile } = useContext(UserProfile);
	const { session, setSession } = useContext(Session);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		useAuth((user) => {
			if (user) {
				getUserByEmail(user).then((dbUser) => {
					setProfile(dbUser ? dbUser : { email: user.email, organization: null, role: 'member' });
					setSession(user);
					setTimeout(() => setLoading(false), 500);
					return;
				});
			}
			setTimeout(() => setLoading(false), 500);
		});
	}, []);

	async function handleSignin() {
		await signInGoogle().then(async (res) => {
			setLoading(true);
			let userProfile = await getUserByEmail(res.user);
			setProfile(userProfile ? userProfile : { email: user.email, organization: null, role: 'member' });
			setSession(res.user);
		});
		setTimeout(() => setLoading(false), 500);
	}

	return isLoading ? (
		<PleaseWait />
	) : !session && !profile ? (
		<DOMRoutes location={location} key={location.pathname}>
			<Route path='/' element={<Login handleSignin={handleSignin} />} />
			<Route path='*' element={<Navigate to='/' replace />} />
		</DOMRoutes>
	) : session && profile && profile.role === 'landlord' ? (
		<DOMRoutes location={location} key={location.pathname}>
			<Route path='/' element={<Main />}>
				<Route path='/lands' element={<Lands />} />
				<Route path='/members' element={<Members />} />
				<Route path='/report' element={<Report />} />
			</Route>
			<Route path='*' element={<Navigate to='/' replace />} />
		</DOMRoutes>
	) : session && profile && profile.role === 'member' ? (
		<DOMRoutes location={location} key={location.pathname}>
			<Route path='/' element={<Profile />} />
			<Route path='*' element={<Navigate to='/' replace />} />
		</DOMRoutes>
	) : (
		<Error />
	);
}

export default Routes;
