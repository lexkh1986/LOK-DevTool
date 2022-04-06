import React from 'react';
import { useGoogleLogin } from 'react-use-googlelogin';

const GoogleAuthContext = React.createContext();

export const GoogleAuthProvider = ({ children }) => {
    const googleAuth = useGoogleLogin({
        // clientId: process.env.GOOGLE_CLIENT_ID,
        clientId: '129123030731-jna8pn3o75crio0vdkq02o6lvhdp05qh.apps.googleusercontent.com',
    });

    return (
        <GoogleAuthContext.Provider value={googleAuth}>
            {children}
        </GoogleAuthContext.Provider>
    );
}

export const useGoogleAuth = () => React.useContext(GoogleAuthContext);