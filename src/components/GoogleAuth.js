import React from 'react';
import { useGoogleLogin } from 'react-use-googlelogin';

const GoogleAuthContext = React.createContext();

export const GoogleAuthProvider = ({ children }) => {
    const googleAuth = useGoogleLogin({
        // clientId: process.env.GOOGLE_CLIENT_ID,
        clientId: '129123030731-vtbksr3jpekrobs9dhjhbefn21gb7jk0.apps.googleusercontent.com',
    });

    return (
        <GoogleAuthContext.Provider value={googleAuth}>
            {children}
        </GoogleAuthContext.Provider>
    );
}

export const useGoogleAuth = () => React.useContext(GoogleAuthContext);