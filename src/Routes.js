import React, { useContext, useEffect, useState } from 'react';
import { Routes as DOMRoutes, Route, Navigate, useLocation } from 'react-router-dom';
import { signInGoogle, validateUser, useAuth } from './data/firebase';
import { Spinner } from 'react-bootstrap';

import { UserProfile, Session } from './data/appContexts';
import Main from './layout/Main';
import Lands from './views/Lands';
import Members from './views/Members';
import Report from './views/Report';
import Login from './views/Login';
import Profile from './views/Profile';

function Routes() {
	const location = useLocation();
	const { profile, setProfile } = useContext(UserProfile);
	const { session, setSession } = useContext(Session);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		useAuth((user) => {
			setSession(user);
			validateUser(user).then((dbUser) => {
				setProfile(dbUser ? dbUser : { email: user.email, organization: null, role: 'member' });
				setLoading(false);
				return;
			});
			setLoading(false);
		});
	}, []);

	async function handleSignin() {
		await signInGoogle().then(async (res) => {
			setLoading(true);
			setSession(res.user);
			let userProfile = await validateUser(res.user);
			setProfile(userProfile ? userProfile : { email: user.email, organization: null, role: 'member' });
		});
		setLoading(false);
	}

	return isLoading ? (
		<div className='page-spinner'>
			<div>
				<Spinner animation='border' variant='primary' />
				<h6>Please wait ...</h6>
			</div>
		</div>
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
		<p>Oops 404 page</p>
	);
}

export default Routes;
