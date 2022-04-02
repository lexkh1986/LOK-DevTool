import React from 'react';
import { Navbar, NavbarBrand, NavbarText, NavLink } from 'reactstrap';
import './Header.css';

const Header = () => {
    const logoName = 'League Of Kingdom - DevTool';
    const author = 'Designed by ABooBoo - Trial version';
    const navItems = ['Signout'];

    return (
        <div className='header'>
            <Navbar color="dark" dark expand fixed="top" light>
                <NavbarBrand href="/LOK-DevTool">{logoName}</NavbarBrand>
                <NavbarText>{author}</NavbarText>
                {
                    navItems.map((item, index) =>
                        <NavLink key={index} href="#">{item}</NavLink>
                    )
                }
            </Navbar>
        </div>
    );
}

export default Header;