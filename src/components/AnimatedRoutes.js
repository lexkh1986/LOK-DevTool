import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Main from '../layout/Main';
import Login from '../views/Login';
import Lands from '../views/Lands';
import Members from '../views/Members';
import Report from '../views/Report';

function AnimatedRoutes() {
	const location = useLocation();
	const [role, setRole] = useState('guest');

	useEffect(() => {
		if (role !== 'landlord') {
			sessionStorage.removeItem('organizationID');
			if (role !== 'member') {
				sessionStorage.removeItem('user');
				sessionStorage.removeItem('role');
			}
		}
	}, []);

	if (role === 'landlord') {
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
	} else {
		return (
			<Routes location={location} key={location.pathname}>
				<Route path='/' element={<Login handleSignIn={setRole} />} />
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
		);
	}
}

export default AnimatedRoutes;
