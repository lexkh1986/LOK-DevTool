import React from 'react';
import { Col, Row } from 'reactstrap';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Main.css';

const Main = () => {
    return (
        <Row className='gx-0'>
            <Col>
                <Sidebar />
            </Col>
            <Col className='col-md-9 ml-sm-auto col-lg-10 px-4'>
                <div className='content'>
                    <Outlet />
                </div>
            </Col>
        </Row>
    )
}

export default Main;