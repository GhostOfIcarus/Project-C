import React, { useState, FormEvent } from 'react';
import logo from './img/buurtboer_logo.png'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './Stylesheets/Forgot_Password.css';

interface User {
  email: string;
  password: string;
}

interface ErrorMessages {
  name: string;
  message: string;
}

function App() {
  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({ name: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);


  return (
    <>
        <div className="container">
            <p>wachtwoord vergeten</p>
            <input type="email" placeholder="Email" /> 
            <a href="Change_Password.tsx"><button>verstuur</button></a>
        </div>
        <div>
            <img id="sideImage" src={logo} alt="buurtboerLogo" />
        </div>
    </>
  );
}

export default App;
