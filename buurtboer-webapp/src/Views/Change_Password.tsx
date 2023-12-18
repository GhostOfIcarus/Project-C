import { useState } from 'react';
import logo from './img/buurtboer_logo.png'; 
import genstyles from './Stylesheets/GeneralStyles.module.css';
import { changePasswordController } from '../Controllers/Change_PasswordController'; // Update the path
import { useLocation } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import withAuthentication from '../Controllers/withAuthentication';
import { as } from 'pg-promise';

function ChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState('');
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const token = urlParams.get('token') as string;
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        setErrorMessages('Please input the same password twice');
        return;
      }

      // Add validation for newPassword and confirmPassword if needed
      const result = await changePasswordController(newPassword, token);

      if (result) {
        // Password changed successfully

        console.log('Password changed successfully');
        navigate('/Login');
      } else {
        setErrorMessages('Failed to change password');
      }
    } catch (error) {
      console.error('An error occurred while changing the password:', error);
      setErrorMessages('An error occurred while changing the password');
    }
  };

  return (
    <>
      <div className={genstyles.container}>
        <div className='row'>
          <div className={`col-lg-6 ${genstyles.login_div}`}>
            <div className={genstyles.title}>Wachtwoord Vergeten</div>
            <input 
              type="password" 
              placeholder="Nieuw wachtwoord" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            /> 
            <input 
              type="password" 
              placeholder="Nieuw wachtwoord opnieuw invullen" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className={genstyles.button} onClick={handleChangePassword}>Verstuur</button>
            {errorMessages && <div className={genstyles.error}>{errorMessages}</div>}
          </div>
          <div className={`col-lg-6 ${genstyles.image_div}`}>
            <img className={genstyles.Buurtboerlogo} src={logo} alt="buurtboerLogo" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
