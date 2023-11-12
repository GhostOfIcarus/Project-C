import React, { useState, FormEvent } from 'react';
import logo from './img/buurtboer_logo.png'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './Stylesheets/Login.css';

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

  const database: User[] = [
    {
      email: 'user1@binky.com',
      password: 'pass1',
    },
  ];

  const errors: { email: string; Pass: string } = {
    email: 'invalid email',
    Pass: 'invalid password',
  };

  const renderErrorMessage = (name: string) =>
    name === errorMessages.name && <div className='error'>{errorMessages.message}</div>;

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      // Prevent page reload
      event.preventDefault();
    
      const { Email, Pass } = event.currentTarget.elements as any;
    
      // Find user login info
      const userData = database.find((user) => user.email === Email.value);
    
      // Compare user info
      if (userData) {
        if (userData.password !== Pass.value) {
          // Invalid password
          setErrorMessages({ name: 'ass', message: errors.Pass });
        } else {
          setIsSubmitted(true);
        }
      } else {
        // Username not found
        setErrorMessages({ name: 'Email', message: errors.email });
      }
    };

  const renderForm = (

    <>
      <div className='title'>Inloggen</div>
      <form onSubmit={handleSubmit}>
        <input type='email' placeholder='Email' name='Email' required />
        {renderErrorMessage('email')}
        <input type='password' placeholder='Wachtwoord' name='Pass' required />
        <div className='forgot-password'>Wachtwoord vergeten?</div>
         <div className='button-box'>
           <button className='button'>Login</button>
           <p>OF</p>
           <button className='button'>Login met Google</button>
           <button className='button'>Login met Microsoft</button>
         </div>
      </form>
    </>
    

    // <div className='form'>
    //   <div className='title'>Inloggen</div>
    //   <form onSubmit={handleSubmit}>
    //     <div className='input-boxes'>
    //       <div className='input-box-uname'>
    //         <input type='text' placeholder='Email' name='uname' required />
    //         {renderErrorMessage('uname')}
    //       </div>
    //       <div className='input-box-Pass'>
    //         <input type='password' placeholder='Wachtwoord' name='Pass' required />
    //         {renderErrorMessage('Pass')}
    //       </div>
    //     </div>
    //     <div className='forgot-password'>Wachtwoord vergeten?</div>
    //     <div className='button-box'>
    //       <button className='button'>Login</button>
    //       <p>OF</p>
    //       <button className='button'>Login met Google</button>
    //       <button className='button'>Login met Microsoft</button>
    //     </div>
    //   </form>
    // </div>
  );

  return (
    <>
    <div className='Body'></div>
    <div className="container">
      <div className='row'>
        <div className='col-lg-6 login-form'>
          {isSubmitted ? <div className='logged-in'>Je bent ingelogd!</div> : renderForm}
        </div>
        <div className='col-lg-6 image-box'>
            <img src={logo} alt="Buurtboer Logo" className='Buurtboerlogo' />
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
