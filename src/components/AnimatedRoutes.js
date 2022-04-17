import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { signInGoogle, validateUser, useAuth } from '../data/firebase';
import { Spinner } from 'react-bootstrap';
import Main from '../layout/Main';
import Lands from '../views/Lands';
import Members from '../views/Members';
import Report from '../views/Report';
import Login from '../views/Login';
import Profile from '../views/Profile';

function AnimatedRoutes() {
	const location = useLocation();
	const currentUser = useAuth();
	const [renderRole, setRenderRole] = useState();
	const [isLoading, setLoading] = useState(false);

	async function handleSignin() {
		await signInGoogle()
			.then(async (res) => {
				setLoading(true);
				let dbUser = await validateUser(res.user);
				setRenderRole(dbUser ? dbUser.role : 'member');
			})
			.catch((err) => {
				alert('Oops!!! Got an error: ' + err);
			});
		setLoading(false);
	}

	if (isLoading) {
		return (
			<div className='page-spinner'>
				<div>
					<Spinner animation='border' variant='primary' />
					<h6>Please wait ...</h6>
				</div>
			</div>
		);
	} else if (currentUser && renderRole === 'landlord') {
		return (
			<AnimatePresence>
				<Routes location={location} key={location.pathname}>
					<Route path='/' element={<Main />}>
						<Route path='/lands' element={<Lands />} />
						<Route path='/members' element={<Members />} />
						<Route path='/report' element={<Report />} />
					</Route>
					<Route path='*' element={<Navigate to='/' replace />} />
				</Routes>
			</AnimatePresence>
		);
	} else if (currentUser && renderRole === 'member') {
		return (
			<Routes location={location} key={location.pathname}>
				<Route path='/' element={<Profile />} />
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
		);
	} else {
		return (
			<Routes location={location} key={location.pathname}>
				<Route path='/' element={<Login handleSignIn={handleSignin} />} />
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
		);
	}
}

export default AnimatedRoutes;
