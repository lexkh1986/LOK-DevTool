import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/images/logo.png';
import { valOwn } from '../components/functions/share';

const Login = ({ isUser }) => {
	const navigate = useNavigate();

	useEffect(() => {
		sessionStorage.setItem('user', 'guest');
	}, []);

	const onSuccess = (res) => {
		if (valOwn(res.profileObj.email)) {
			sessionStorage.setItem('user', res.profileObj.email);
			return navigate('/dashboard');
		} else {
			sessionStorage.setItem('user', 'guest');
			return navigate('/');
		}
	};

	const onFailure = (res) => {
		console.log('Logged in failed', res);
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
						<h7>
							Please contact site admin at email <strong>darthrev1986@gmail.com</strong> to Sign Up
						</h7>
					</div>

					<GoogleLogin
						clientId={process.env.REACT_APP_GOOGLE_API_CLIENT_ID}
						buttonText='Login with Google'
						onSuccess={onSuccess}
						onFailure={onFailure}
						cookiePolicy={'single_host_origin'}
						style={{ marginTop: '100px' }}
					/>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
};

export default Login;
