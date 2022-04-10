import React from 'react';
import {
    ButtonGroup,
    Button,
    Row, Col
} from 'reactstrap';
import ContributionReport from '../components/ContributionReport';

const Report = () => {
    return (
        <div className='report'>
            <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
                <h2>Reports</h2>
                <ButtonGroup>
                    <Button outline={true} size='sm'>
                        Export
                    </Button>
                </ButtonGroup>
            </div>
            <Row>
                <Col md='12'>
                    <ContributionReport />
                </Col>
            </Row>
        </div>
    );
}

export default Report;