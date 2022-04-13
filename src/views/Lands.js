import React from 'react';
import LandManagement from '../components/LandManagement';
import RptLandContribution from '../components/RptLandContribution';
import { motion } from 'framer-motion';

const Lands = () => {
	return (
		<motion.div className='lands' initial={{ width: 0 }} animate={{ width: '100%' }} exit={{ x: '100%' }}>
			<LandManagement />
			<RptLandContribution />
		</motion.div>
	);
};

export default Lands;
