import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import '../assets/styles/mem-profile.css';

const Profile = () => {
	return (
		<motion.div className='member-profile' initial={{ width: 0 }} animate={{ width: '100%' }} exit={{ x: '100%' }}>
			<div className='background-img'></div>
			<div className='overlay-text'>
				<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
					<h2>Member Profile</h2>
				</div>
				<Row>
					<Col md='12'>
						<div>Content is here</div>
					</Col>
				</Row>
			</div>
		</motion.div>
	);
};

export default Profile;
