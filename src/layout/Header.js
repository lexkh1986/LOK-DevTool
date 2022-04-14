import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarText, NavLink, Button } from 'reactstrap';
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
                <Logout />
            </Navbar>
        </div>
    );
};

const Logout = (res) => {
    const navigate = useNavigate();

    const onSuccess = (res) => {
        return navigate('/');
    };

    return (
        <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLE_API_CLIENT_ID}
            render={(renderProps) => (
                <Button size='sm' outline onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    Logout
                </Button>
            )}
            buttonText='Logout'
            onLogoutSuccess={onSuccess}
        />
    );
};

export default Header;
