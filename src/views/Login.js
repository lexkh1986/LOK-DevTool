import React from 'react';
import { useGoogleAuth } from '../components/GoogleAuth';

const Login = () => {
    const { signIn } = useGoogleAuth();

    return (
        <div>
            <h2>Login Page</h2>
            <button onClick={signIn}>Login</button>
        </div>
    );
};

export default Login;