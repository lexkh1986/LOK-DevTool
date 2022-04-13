import React from 'react';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <Nav className='bg-light sidebar' vertical={true}>
            <NavItem className='nav-item'>
                <NavLink className='nav-link' to='/dashboard/lands'>
                    <i className='fa fa-map-signs feather' aria-hidden='true'></i>Lands
                </NavLink>
            </NavItem>
            <NavItem className='nav-item'>
                <NavLink className='nav-link' to='/dashboard/members'>
                    <i className='fa fa-address-book-o feather' aria-hidden='true'></i>
                    Members
                </NavLink>
            </NavItem>
            <NavItem className='nav-item'>
                <NavLink className='nav-link' to='/dashboard/report'>
                    <i className='fa fa-line-chart feather' aria-hidden='true'></i>Report
                </NavLink>
            </NavItem>
        </Nav>
    );
};

export default Sidebar;
