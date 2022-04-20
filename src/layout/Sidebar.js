import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
	return (
		<Nav className='bg-light sidebar flex-column' >
			<NavItem className='nav-item'>
				<NavLink className='nav-link' to='/lands'>
					<i className='fa fa-map-signs feather' aria-hidden='true'></i>Lands
				</NavLink>
			</NavItem>
			<NavItem className='nav-item'>
				<NavLink className='nav-link' to='/members'>
					<i className='fa fa-address-book-o feather' aria-hidden='true'></i>
					Members
				</NavLink>
			</NavItem>
			<NavItem className='nav-item'>
				<NavLink className='nav-link' to='/settings'>
					<i className='fa fa-cogs feather' aria-hidden='true'></i>
					Settings
				</NavLink>
			</NavItem>
			<NavItem className='nav-item'>
				<NavLink className='nav-link' to='/report'>
					<i className='fa fa-line-chart feather' aria-hidden='true'></i>Report
				</NavLink>
			</NavItem>
		</Nav>
	);
};

export default Sidebar;
