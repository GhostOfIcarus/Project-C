import React, { useState, FormEvent } from 'react';
import './App.css';

interface User {
  username: string;
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
      username: 'user1',
      password: 'pass1',
    },
  ];

  const errors: { uname: string; pass: string } = {
    uname: 'invalid username poopyhead',
    pass: 'invalid password dipshit',
  };

  const renderErrorMessage = (name: string) =>
    name === errorMessages.name && <div className='error'>{errorMessages.message}</div>;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // Prevent page reload
    event.preventDefault();

    const { uname, pass } = event.currentTarget.elements as any;

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: 'pass', message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: 'uname', message: errors.uname });
    }
  };

  const renderForm = (
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <div className='input-box-uname'>
          <label>Username </label>
          <input type='text' name='uname' required />
          {renderErrorMessage('uname')}
        </div>
        <div className='input-box-pass'>
          <label>Password </label>
          <input type='password' name='pass' required />
          {renderErrorMessage('pass')}
        </div>
        <div className='button-box'>
          <input type='submit' />
        </div>
      </form>
    </div>
  );

  return (
    <div className='App'>
      <div className='login-form'>
        <div className='title'>Sign in</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default App;
