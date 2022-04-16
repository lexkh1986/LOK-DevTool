import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../data/firebase';
import { Button } from 'react-bootstrap';
import { Navbar, NavbarBrand, NavbarText, NavLink } from 'reactstrap';
import '../assets/styles/header.css';

const Header = () => {
	const logoName = 'League Of Kingdom - Lands Manager';
	const author = 'Designed by ABooBoo';
	const navItems = [];

	return (
		<div className='header'>
			<Navbar color='dark' dark expand fixed='top' light>
				<NavbarBrand>{logoName}</NavbarBrand>
				<NavbarText>{author}</NavbarText>
				{navItems.map((item, index) => (
					<NavLink key={index} href='#'>
						{item}
					</NavLink>
				))}
				<Button
					size='sm'
					variant='outline-secondary'
					onClick={() => {
						signOut(auth);
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
