import React from 'react';
import { Col, Row } from 'reactstrap';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Main.css';

const Main = () => {
    return (
        <Row>
            <Col className='col-2'>
                <Sidebar />
            </Col>
            <Col className='col-auto'>
                <Outlet />
            </Col>
        </Row>
    )
}

export default Main;