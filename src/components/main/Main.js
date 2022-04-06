import React, { useEffect, useState } from 'react';
import { Col, Row, Container } from 'reactstrap';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from '../header/Header';
import '../../assets/styles/main.css';

const Main = () => {
    const [user, setUser] = useState('guest');

    useEffect(() => {
        setUser(sessionStorage.getItem('user'));
    }, []);

    if (user === 'guest') {
        return (
            <div className='layout-center'>
                <h6>Please <a href='/LOK-DevTool'>login</a> before using admin dashboard</h6>
            </div>
        )
    } else {
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
}

export default Main;