import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Main from '../layout/Main';
import Login from '../views/Login';
import Lands from '../views/Lands';
import Members from '../views/Members';
import Report from '../views/Report';

function AnimatedRoutes() {
	const location = useLocation();

	return (
		<AnimatePresence>
			<Routes location={location} key={location.pathname}>
				<Route exact path='/' element={<Login />} />
				<Route path='/dashboard' element={<Main />}>
					<Route path='/dashboard/lands' element={<Lands />} />
					<Route path='/dashboard/members' element={<Members />} />
					<Route path='/dashboard/report' element={<Report />} />
				</Route>
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
		</AnimatePresence>
	);
}

export default AnimatedRoutes;
