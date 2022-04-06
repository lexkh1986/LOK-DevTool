import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useNavigate } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarText, NavLink } from 'reactstrap';
import '../../assets/styles/header.css';

const Header = () => {
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
                <Logout />
            </Navbar>
        </div>
    );
}

const Logout = (res) => {
    const navigate = useNavigate();
    const clientId = '129123030731-jna8pn3o75crio0vdkq02o6lvhdp05qh.apps.googleusercontent.com';

    const onSuccess = (res) => {
        return navigate('/LOK-DevTool');
    }

    return (
        <GoogleLogout clientId={clientId}
            render={renderProps => (
                <button onClick={renderProps.onClick} disabled={renderProps.disabled}>Logout</button>
            )}
            buttonText='Logout'
            onLogoutSuccess={onSuccess}
        />
    );
}

export default Header;