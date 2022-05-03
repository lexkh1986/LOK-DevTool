import React from 'react';
import LandManagement from '../components/lands/LandManagement';
import RptLandContribution from '../components/reports/RptLandContribution';
import { motion } from 'framer-motion';

const Lands = () => {
	return (
		<motion.div className='lands' initial={{ width: 0 }} animate={{ width: '100%' }} exit={{ x: '120%' }}>
			<LandManagement />
			<RptLandContribution />
		</motion.div>
	);
};

export default Lands;
