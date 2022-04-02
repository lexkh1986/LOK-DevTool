import React from 'react';
import { Col, Row } from 'reactstrap';
import { Link, Outlet } from 'react-router-dom';
import './Sidebar.css';

const Main = () => {
    return (
        <Row>
            <Col xs='3'>
                <nav className='bg-light sidebar'>
                    <div className='sidebar-sticky'>
                        <ul className='nav flex-column'>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/'>Dashboard</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/lands'>Lands</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/members'>Members</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </Col>
            <Col xs='auto'>
                <Outlet />
            </Col>
        </Row>
    )
}

export default Main;