import { useLoginController } from '../Controllers/LoginController';
import { Link } from 'react-router-dom';
import logo from './img/buurtboer_logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Stylesheets/Login.module.css';

export function Login() {
  const { isSubmitted, renderErrorMessage, handleSubmit } = useLoginController();

  const renderForm = (
    <>
      <div className={styles.title}>Inloggen</div>
      <form onSubmit={handleSubmit}>
        <input type='email' placeholder='Email' name='Email' required />
        {renderErrorMessage('Email')}
        <input type='password' placeholder='Wachtwoord' name='Pass' required />
        <Link to="/Forgot_Password" className='forgot-password'>Wachtwoord vergeten?</Link>
        <div className={styles['button-box']}>
          <button className={styles['button']}>Login</button>
          <p>OF</p>
          <button className={styles['button']}>Login met Google</button>
          <button className={styles['button']}>Login met Microsoft</button>
        </div>
      </form>
    </>
  );

  return (
    <>
      <div className={styles.Body}></div>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6 login-form'>
            {isSubmitted ? <div className={styles['logged-in']}>Je bent ingelogd!</div> : renderForm}
          </div>
          <div className='col-lg-6 image-box'>
            <img src={logo} alt="Buurtboer Logo" className={styles.Buurtboerlogo} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

