import { useLoginController } from '../Controllers/LoginController';
import { Link, BrowserRouter as Router } from 'react-router-dom';  
import logo from './img/buurtboer_logo.png'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './Stylesheets/Login.css';

export function Login() {
  const { isSubmitted, renderErrorMessage, handleSubmit } = useLoginController();

  const renderForm = (
    <>
      <div className='title'>Inloggen</div>
      <form onSubmit={handleSubmit}>
        <input type='email' placeholder='Email' name='Email' required />
        {renderErrorMessage('Email')}
        <input type='password' placeholder='Wachtwoord' name='Pass' required />
        <Router basename="/Forgot_Password">
          {/* Your routes and components */}
        </Router>
        <div className='forgot-password'>Wachtwoord vergeten?</div>
        <div className='button-box'>
          <button className='button'>Login</button>
          <p>OF</p>
          <button className='button'>Login met Google</button>
          <button className='button'>Login met Microsoft</button>
        </div>
      </form>
    </>
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

export default Login;