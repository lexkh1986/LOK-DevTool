import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth, db } from '../data/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore/lite';
import { Button } from 'react-bootstrap';
import logo from '../assets/images/logo.png';

const Login = ({ handleSignIn }) => {
	const signInWithGoogle = () => {
		signInWithPopup(auth, new GoogleAuthProvider())
			.then((res) => {
				(async (res) => {
					const allUsersSnapshot = await getDocs(collection(db, 'users'));
					const users = allUsersSnapshot.docs.map((doc) => doc.data());

					// Check valid user
					users.forEach((user) => {
						if (user.email === res.user.email) {
							if (user.role === 'landlord') {
								sessionStorage.setItem('organizationID', user.organization);
							}
							sessionStorage.setItem('user', user.email);
							sessionStorage.setItem('role', user.role);
							handleSignIn(user.role);
							return;
						}
					});
				})(res);
			})
			.catch((err) => {
				alert('Caught an error during logging in: ' + err.toString());
			});
	};

	return (
		<AnimatePresence>
			<motion.div
				className='layout-center login'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ delay: 1 }}
				>
					<motion.img
						initial={{ scale: 0 }}
						animate={{ rotate: 360, scale: 1 }}
						transition={{
							type: 'spring',
							stiffness: 260,
							damping: 120,
						}}
						src={logo}
						alt=''
					/>
					<h1>League of Kingdoms - Lands Manager</h1>
					<p>Designed by ABooBoo</p>
					<div style={{ margin: '4px' }}>
						<p>
							Please contact site admin at email <strong>darthrev1986@gmail.com</strong> to Sign Up
						</p>
					</div>

					<Button variant='outline-secondary' onClick={signInWithGoogle}>
						Login with Google
					</Button>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
};

export default Login;
