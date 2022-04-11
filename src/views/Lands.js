import React from 'react';
import LandManagement from '../components/LandManagement';
import RptLandContribution from '../components/RptLandContribution';

const Lands = () => {
    return (
        <div className='lands'>
            <LandManagement />
            <div style={{ marginTop: '40px' }} />
            <RptLandContribution />
        </div>
    );
}

export default Lands;