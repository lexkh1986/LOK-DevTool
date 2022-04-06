import React from 'react';
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';

const validateUser = (email) => {
    return email === 'darthrev1986@gmail.com' ? true : false;
}

const Login = () => {
    const clientId = '129123030731-jna8pn3o75crio0vdkq02o6lvhdp05qh.apps.googleusercontent.com';
    const navigate = useNavigate();

    const onSuccess = (res) => {
        if (validateUser(res.profileObj.email)) {
            return navigate('/LOK-DevTool', { state: { user: res.profileObj } });
        } else {
            return navigate('/LOK-DevTool/login');
        }
    }

    const onFailure = (res) => {
        console.log('Logged in failed', res);
    }

    return (
        <div className='layout-center'>
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