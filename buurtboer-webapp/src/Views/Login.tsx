import { useLoginController } from '../Controllers/LoginController';
import { useNavigate, Link } from 'react-router-dom';
import logo from './img/buurtboer_logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import genstyles from './Stylesheets/GeneralStyles.module.css';
import loginstyles from './Stylesheets/Login.module.css';
import { useEffect } from 'react';



export function Login() {
  const { isSubmitted, renderErrorMessage, handleSubmit } = useLoginController();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitted) {
      navigate('/Employee_Overview');
    }
  }, [isSubmitted]);

  const renderForm = (
    <>    
      <div className={genstyles.title}>Inloggen</div>
      <form onSubmit={handleSubmit}>
        <input type='email' placeholder='Email' name='Email' required />
        {renderErrorMessage('Email')}
        <input type='password' placeholder='Wachtwoord' name='Pass' required />
        <Link to="/Forgot_Password" className={genstyles.link}>Wachtwoord vergeten?</Link>
        <div className={loginstyles.login_button_div}>
          <button className={genstyles.button}>Login</button>
          <p>OF</p>
          <button className={genstyles.button}>Login met Google</button>
          <button className={genstyles.button}>Login met Microsoft</button>
        </div>
      </form>
    </>
  );

  return (
    <>
      <div className={genstyles.container}>
        <div className='row'>
          <div className={`col-lg-6 ${genstyles.login_div}`}>            
            {!isSubmitted && renderForm}
            
          </div>
          <div className={`col-lg-6 ${genstyles.image_div}`}>
            <img src={logo} alt="Buurtboer Logo" className={genstyles.Buurtboerlogo} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

