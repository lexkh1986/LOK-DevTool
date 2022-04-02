import React from 'react';
import { Col, Row } from 'reactstrap';
import { Link, Outlet } from 'react-router-dom';
import './Main.css';

const Main = () => {
    return (
        <Row>
            <Col md='2'>
                <nav className='bg-light sidebar'>
                    <div className='sidebar-sticky'>
                        <ul className='nav flex-column'>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/LOK-DevTool'>Dashboard</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/LOK-DevTool/lands'>Lands</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/LOK-DevTool/members'>Members</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </Col>
            <Col md='auto'>
                <Outlet />
            </Col>
        </Row>
    )
}

export default Main;