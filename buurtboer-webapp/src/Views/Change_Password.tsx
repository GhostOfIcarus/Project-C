import React, { useState, FormEvent } from 'react';
import logo from './img/buurtboer_logo.png'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './Stylesheets/Change_Password.css';

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
            <input type="password" placeholder="Wachtwoord" /> 
            <input type="password" placeholder="Wachtwoord opnieuw invullen" /> 
            <a href="Login.tsx"><button>verstuur</button></a>
        </div>
        <div>
            <img id="sideImage" src={logo} alt="buurtboerLogo" />
        </div>
    </>
  );
}

export default App;
