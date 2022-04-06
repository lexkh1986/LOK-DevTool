import React from 'react';
import { Col, Row } from 'reactstrap';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Container } from "reactstrap";
import Header from '../header/Header';
import '../../assets/styles/main.css';

const Main = () => {
    return (
        <div>
            <Header />
            <Container fluid={true} role='main'>
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
            </Container>
        </div>
    )
}

export default Main;