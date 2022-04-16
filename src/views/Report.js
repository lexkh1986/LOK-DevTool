import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import RptMemContribution from '../components/RptMemContribution';

const Report = () => {
	return (
		<motion.div className='report' initial={{ width: 0 }} animate={{ width: '100%' }} exit={{ x: '100%' }}>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
				<h2>Reports</h2>
			</div>
			<Row>
				<Col md='12'>
					<RptMemContribution />
				</Col>
			</Row>
		</motion.div>
	);
};

export default Report;
