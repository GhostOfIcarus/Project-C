
import { useMicrosoftLogin } from '../Controllers/microsoftLogin_Controller';
import { useLoginController } from '../Controllers/LoginController';
import { useNavigate, Link } from 'react-router-dom';
import logo from './img/buurtboer_logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import genstyles from './Stylesheets/GeneralStyles.module.css';
import loginstyles from './Stylesheets/Login.module.css';
import { useEffect, useState } from 'react';
import withAuthentication from '../Controllers/withAuthentication';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface localJwtPayload {
  // ... other properties

  // 'given_name' and 'family_name' are common properties for first and last names in Google JWT
  given_name: string;
  family_name: string;

  // 'email' is a common property for the email address in Google JWT
  email: string;
  name: string;
}

const clientID = "1075521165727-h558b9b3eg32llcsq606gbqbsvipjaqt.apps.googleusercontent.com";
declare global {
  interface Window {
    google: any;
  }
}

interface GoogleAccountsResponse {
  credential: string;
}

export function Login() {
  // const [user, setUser] = useState({});
  const { t } = useTranslation();
  const { isSubmitted, loginFailed, renderErrorMessage, handleSubmit, role, user, handleSignOut } = useLoginController();
  const navigate = useNavigate();
  const { login} = useMicrosoftLogin();


  useEffect(() => {
    if (isSubmitted) {
      if (role === 'CompanyAdmin'){
        navigate('/Employee_Overview');
      }
      else{
        navigate('/Company_Overview');
      }
    }
  }, [isSubmitted]);

  const renderForm = (
    <>    
      <div className={genstyles.title}>{t('login')}</div>
      <form onSubmit={handleSubmit}>
        <input type='email' placeholder='Email' name='Email' required className={loginFailed ? loginstyles.errorInput : ''}/>
        {renderErrorMessage('Email')}
        <input type='password' placeholder='Wachtwoord' name='Pass' required className={loginFailed ? loginstyles.errorInput : ''} />
        {loginFailed && <div className={loginstyles.errorInputs}>{t('userdetails_Error')}</div>}
        <Link to="/Forgot_Password" className={genstyles.link}>{t('forgotPassword')}</Link>
        <div className={loginstyles.login_button_div}>
          <button className={genstyles.button}>Login</button>
          <p>{t('or')}</p>
          {/* <button className={genstyles.button}>{t('google')}</button> */}
          <div id="signInDiv"></div>
          <button onClick={login} className={genstyles.button}>{t('microsoft')}</button>
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

export default withAuthentication(Login, "/Login", false, true);

