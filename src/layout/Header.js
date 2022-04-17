import React, { useContext } from 'react';
import { signOut } from '../data/firebase';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { UserProfile } from '../data/appContexts';
import '../assets/styles/header.css';

const Header = () => {
	const { profile } = useContext(UserProfile);
	const navItems = [];

	return (
		<div className='header'>
			<Navbar className='justify-content-between' expand='lg' variant='dark' bg='dark' fixed='top'>
				<Navbar.Brand>Organization - {profile.organization.toUpperCase()}</Navbar.Brand>
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
