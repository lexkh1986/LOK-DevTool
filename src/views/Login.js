import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from 'react-bootstrap';
import logo from '../assets/images/logo.png';
import googleIcon from '../assets/images/google.png';

const Login = ({ handleSignin }) => {
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

					<Button variant='outline-dark' onClick={handleSignin}>
						<img className='google-icon' src={googleIcon} alt='' />
						<strong> SignIn with Google</strong>
					</Button>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
};

export default Login;
