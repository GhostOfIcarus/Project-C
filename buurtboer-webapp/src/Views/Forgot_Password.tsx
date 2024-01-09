// Forgot_Password.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { forgotPasswordController} from '../Controllers/Forget_Password';
import logo from './img/buurtboer_logo.png';
import genstyles from './Stylesheets/GeneralStyles.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

function Forgot_Password() {
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [emailSend, setEmailSend] = useState<boolean>(false); 

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailSend(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const emailExists = await forgotPasswordController(email);

      // Send email to the user
      if (emailExists) {
        axios.post('http://localhost:5001/sendEmail/forgotPassword', 
          {
            to: email,
            name: "",
            subject: "Wachtwoord vergeten",
            resetPasswordLink: `http://localhost:3000/Change_Password`
          }, 
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        setEmailSend(true);

        console.log('Email exists');
      } else {
        setError(t('email_error'));
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 404) {
        setError(t('email_error'));
      } else {
        console.error('An error occurred while fetching admin data:', axiosError.message || error);
        setError('An error occurred while fetching admin data.');
      }
    }
  };

  return (
    <>
      <div className={genstyles.container}>
        <div className='row'>
          <div className={`col-lg-6 ${genstyles.login_div}`}>
            <div className={genstyles.title}>{t('forgotPassword')}</div>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                name="Email"
                value={email}
                onChange={handleEmailChange}
              />
              <button type="submit" className={genstyles.button}>
                {t('send')}
              </button>
            </form>
            {
              emailSend && 
              <div>
                <p>{t('email_send')} {email}</p>
                <Link to="/Login" className={genstyles.link}>{t('backToLogin')}</Link>
              </div>
            }
            {error && <p className={genstyles.error}>{error}</p>}
          </div>
          <div className={`col-lg-6 ${genstyles.image_div}`}>
            <img className={genstyles.Buurtboerlogo} src={logo} alt="buurtboerLogo" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Forgot_Password;

