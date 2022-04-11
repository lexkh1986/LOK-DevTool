import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import logo from '../assets/images/logo.png';

const validateUser = (email) => {
    return (email === 'darthrev1986@gmail.com' || email === 'felinosacijul@gmail.com') ? true : false;
}

const Login = () => {
    const clientId = '129123030731-jna8pn3o75crio0vdkq02o6lvhdp05qh.apps.googleusercontent.com';
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.setItem('user', 'guest');
    }, []);

    const onSuccess = (res) => {
        if (validateUser(res.profileObj.email)) {
            sessionStorage.setItem('user', res.profileObj.email);
            return navigate('/dashboard');
        } else {
            sessionStorage.setItem('user', 'guest');
            return navigate('/');
        }
    }

    const onFailure = (res) => {
        console.log('Logged in failed', res);
    }

    return (
        <div className='layout-center login'>
            <img src={logo} alt="" />
            <h1>League of Kingdom - DevTools</h1>
            <p>Designed by ABooBoo</p>
            <GoogleLogin clientId={clientId}
                buttonText='Login with Google'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '100px' }} />
        </div>
    );
};

export default Login;