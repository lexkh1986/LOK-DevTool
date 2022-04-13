import React from 'react';
import { Row, Col } from 'reactstrap';
import RptMemContribution from '../components/RptMemContribution';

const Report = () => {
    return (
        <div className='report'>
            <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
                <h2>Reports</h2>
            </div>
            <Row>
                <Col md='12'>
                    <RptMemContribution />
                </Col>
            </Row>
        </div>
    );
};

export default Report;
