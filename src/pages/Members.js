import React from 'react';
import { ButtonGroup, Button, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import MemberList from '../components/MemberList';

const Members = () => {
	return (
		<motion.div className='members' initial={{ width: 0 }} animate={{ width: '100%' }} exit={{ x: '120%' }}>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
				<h2>Members Management</h2>
				<ButtonGroup>
					<Button variant='outline-secondary' size='sm'>
						Export
					</Button>
				</ButtonGroup>
			</div>
			<Row>
				<Col md='12'>
					<MemberList id='memberGroup' />
				</Col>
			</Row>
		</motion.div>
	);
};

export default Members;
