import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MemberProfile as memProfile } from '../connection/appContexts';
import MemberProfile from '../components/member/MemberProfile';
import '../assets/styles/mem-profile.css';

const Profile = () => {
	const [memberProfile, setProfile] = useState();

	return (
		<motion.div className='member-profile' initial={{ width: 0 }} animate={{ width: '100%' }} exit={{ x: '100%' }}>
			<div className='background-img'></div>
			<div className='overlay-text'>
				<memProfile.Provider value={{ memberProfile, setProfile }}>
					<MemberProfile />
				</memProfile.Provider>
			</div>
		</motion.div>
	);
};

export default Profile;
