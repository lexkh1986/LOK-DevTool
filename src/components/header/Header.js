import React from 'react';
import { useGoogleAuth } from '../GoogleAuth';
import { Navbar, NavbarBrand, NavbarText, NavLink } from 'reactstrap';
import '../../assets/styles/header.css';

const Header = () => {
    const { signOut } = useGoogleAuth();
    const logoName = 'League Of Kingdom - DevTool';
    const author = 'Designed by ABooBoo - Trial version';
    const navItems = [];

    return (
        <div className='header'>
            <Navbar color="dark" dark expand fixed="top" light>
                <NavbarBrand href="/LOK-DevTool/dashboard">{logoName}</NavbarBrand>
                <NavbarText>{author}</NavbarText>
                {
                    navItems.map((item, index) =>
                        <NavLink key={index} href="#">{item}</NavLink>
                    )
                }
                <NavLink onClick={signOut}>Logout</NavLink>
            </Navbar>
        </div>
    );
}

export default Header;