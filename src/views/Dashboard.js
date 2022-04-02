import React from 'react';
import { ButtonGroup, Button } from 'reactstrap';

const Dashboard = () => {
    return (
        <div className='dashboard'>
            <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
                <h1 className="h2">Dashboard</h1>
                <ButtonGroup>
                    <Button outline={true} size='sm'>Share</Button>
                </ButtonGroup>
            </div>
        </div>
    );
}

export default Dashboard;