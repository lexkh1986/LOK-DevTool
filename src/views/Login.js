import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from 'react-bootstrap';
import logo from '../assets/images/logo.png';

const Login = ({ handleSignIn }) => {
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

					<Button variant='outline-secondary' onClick={handleSignIn}>
						Login with Google
					</Button>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
};

export default Login;
