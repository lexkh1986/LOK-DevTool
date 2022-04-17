import React from 'react';
import { signOut } from '../data/firebase';
import { Navbar, Nav, Button } from 'react-bootstrap';
import '../assets/styles/header.css';

const Header = ({ org }) => {
	const author = 'Designed by ABooBoo';
	const navItems = [];

	return (
		<div className='header'>
			<Navbar className='justify-content-between' expand='lg' variant='dark' bg='dark' fixed='top'>
				<Navbar.Brand>Organization - {org.toUpperCase()}</Navbar.Brand>
				{navItems.map((item, index) => (
					<Nav.Link key={index} href='#'>
						{item}
					</Nav.Link>
				))}
				<Button
					size='sm'
					variant='outline-secondary'
					onClick={() => {
						signOut();
						window.location.reload(false);
					}}
				>
					Sign Out
				</Button>
			</Navbar>
		</div>
	);
};

export default Header;
