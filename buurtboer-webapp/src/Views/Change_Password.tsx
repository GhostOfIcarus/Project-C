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
        setShowSuccessModal(true);
      } else {
        setErrorMessages('Failed to change password');
      }
    } catch (error) {
      console.error('An error occurred while changing the password:', error);
      setErrorMessages('An error occurred while changing the password');
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate('/Login'); // Go back to login page after closing the modal
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
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            /> 
            <input 
              type="password" 
              placeholder={t('repeatPassword')}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className={genstyles.button} onClick={handleChangePassword}>{t('send')}</button>
            {errorMessages && <div className={genstyles.error}>{errorMessages}</div>}
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

export default ChangePassword;
