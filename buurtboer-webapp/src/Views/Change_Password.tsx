import { useState } from 'react';
import logo from './img/buurtboer_logo.png'; 
import genstyles from './Stylesheets/GeneralStyles.module.css';
import { changePasswordController } from '../Controllers/Change_PasswordController'; // Update the path
import { useLocation } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import withAuthentication from '../Controllers/withAuthentication';
import { useTranslation } from 'react-i18next';

function ChangePassword() {
  const { t } = useTranslation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Track success modal visibility
  const [formSubmitted, setFormSubmitted] = useState(false); // Track whether the form has been submitted
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const token = urlParams.get('token') as string;
  const navigate = useNavigate();

  const isPasswordValid = (password: any) => {
    // Add your password conditions here
    const minLength = 8;
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password);
    return password.length >= minLength && hasSpecialCharacter;
  };

  const handleChangePassword = async () => {
    try {
      setFormSubmitted(true); // Mark the form as submitted

      if (newPassword !== confirmPassword) {
        setErrorMessages(t('password_match_error'));
        return;
      }

      if (!isPasswordValid(newPassword)) {
        setErrorMessages(t('password_format_error'));
        return;
      }

      // Add validation for newPassword and confirmPassword if needed
      const result = await changePasswordController(newPassword, token);

      if (result) {
        // Password changed successfully
        setShowSuccessModal(true);
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
            <div className={genstyles.title}>{t('changePasswordHeader')}</div>
            <input 
              type="password" 
              placeholder={t('newPassword')}
              className='form-control'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            /> 
            {/* Display password error message after form submission */}
            {formSubmitted && !isPasswordValid(newPassword) && (
              <div className={genstyles.error}>{t('password_format_error')}</div>
            )}

            <input 
              type="password" 
              placeholder={t('repeatPassword')}
              className='form-control mt-3 mb-3'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {/* Display password match error message after form submission */}
            <button className={genstyles.button} onClick={handleChangePassword}>{t('send')}</button>
            {formSubmitted && newPassword !== confirmPassword && (
              <div className={genstyles.error}>{t('password_match_error')}</div>
            )}
            {/* Display general error message after form submission */}
            {showSuccessModal && (
              <div className={genstyles.modal}>
                <div className={genstyles.modalContent}>
                  <p>{t('successfullyChangedPassword')}</p>
                  <Link to="/Login" className={genstyles.link}>{t('backToLogin')}</Link>
                </div>
              </div>
            )}
          </div>
          <div className={`col-lg-6 ${genstyles.image_div}`}>
            <img className={genstyles.Buurtboerlogo} src={logo} alt="buurtboerLogo" />
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuthentication(ChangePassword, "/change_password", false, true);
