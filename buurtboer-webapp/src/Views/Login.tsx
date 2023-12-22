

import { useLoginController } from '../Controllers/LoginController';
import { useNavigate, Link } from 'react-router-dom';
import logo from './img/buurtboer_logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import genstyles from './Stylesheets/GeneralStyles.module.css';
import loginstyles from './Stylesheets/Login.module.css';
import { useEffect } from 'react';
import withAuthentication from '../Controllers/withAuthentication';
import { useTranslation } from 'react-i18next';


{/* <script src="https://apis.google.com/js/platform.js" async defer></script> */}

// interface GoogleUser {
//   getBasicProfile(): {
//     getId(): string;
//     getName(): string;
//     getEmail(): string;
//   };
// }

// interface ExtendedWindow extends Window {
//   gapi?: {
//     auth2: {
//       getAuthInstance(): {
//         signIn(): Promise<GoogleUser>;
//       };
//       init(config: { client_id: string }): void;
//     };
//     load(api: string, callback: () => void): void;
//   };
// }

// declare var window: ExtendedWindow;

export function Login() {
  const { t } = useTranslation();
  const { isSubmitted, loginFailed, renderErrorMessage, handleSubmit } = useLoginController();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitted) {
      navigate('/Employee_Overview');
    }
  }, [isSubmitted]);

//   useEffect(() => {
//     // Load the Google Sign-In script
//     const script = document.createElement('script');
//     script.src = 'https://apis.google.com/js/platform.js';
//     script.async = true;
//     script.defer = true;
//     document.head.appendChild(script);

//     script.onload = () => {
//       // Initialize Google Sign-In
//       window.gapi?.load('auth2', () => {
//         window.gapi?.auth2.init({
//           client_id: '1075521165727-h558b9b3eg32llcsq606gbqbsvipjaqt.apps.googleusercontent.com',
//         });
//       });
//     };

//     return () => {
//       // Clean up the script when the component is unmounted
//       document.head.removeChild(script);
//     };
//   }, []);

//   const handleGoogleLogin = () => {
//     // Trigger Google Sign-In
//     const auth2 = window.gapi?.auth2.getAuthInstance();
//     auth2?.signIn().then((googleUser: GoogleUser) => {
//       const profile = googleUser.getBasicProfile();
//       console.log('ID: ' + profile.getId()); // Do something with the user's ID
//       console.log('Name: ' + profile.getName()); // Do something with the user's name
//       console.log('Email: ' + profile.getEmail()); // Do something with the user's email

//       // Additional logic (e.g., send the user's Google information to your server)
//     });
//   };


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
          <button className={genstyles.button}>{t('google')}</button>
          <button className={genstyles.button}>{t('microsoft')}</button>
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

