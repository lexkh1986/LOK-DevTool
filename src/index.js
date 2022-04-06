import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GoogleAuthProvider } from './components/GoogleAuth';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/index.css'

ReactDOM.render(
  <GoogleAuthProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleAuthProvider>,
  document.getElementById('root')
);