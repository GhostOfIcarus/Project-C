import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import postlogin from './Stylesheets/PostLogin.module.css';
import genstyles from './Stylesheets/GeneralStyles.module.css';
import NL from "./img/nl_flag.png";
import EN from "./img/en_flag.png";
import withAuthentication from '../Controllers/withAuthentication';
import { updateSuperAdminInfo, LanguageTranslator } from '../Controllers/Superadmin_SettingspageController';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

interface UserData {
  firstName: string;
}

function SuperAdminSettings() {
  const [editable, setEditable] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEmailUnique, setIsEmailUnique] = useState(true);
  const { t } = useTranslation();
  const { language, setLanguage } = LanguageTranslator();
  const [userEmail, setUserEmail] = useState('');
  const [userdata, setUserData] = useState<UserData | null>(null);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState();
  const [initialValues, setInitialValues] = useState({
    userName: '',
    userEmail: '',
  });

  const [confirmedValues, setConfirmedValues] = useState({
    userName: '',
    userEmail: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth', {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        const userData = response.data.userData;
        setUserData(userData);

        const userId = userData.userId;
        const userEmail = userData.userEmail;
        const userName = userData.firstName;
        setUserEmail(userEmail);
        setUserName(userName);
        setUserId(userId);
        console.log(userId);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error based on your requirements
      }

      setInitialValues({
        userName,
        userEmail,
        //selectedRosterValue: selectedRosterValue,
      });
    };

    fetchData();
  }, []);

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const checkEmailAvailability = async (email: string) => {
    try {
      const response = await axios.post('http://localhost:5000/api/check-email', { email });
      console.log(response.data.emailExists);
      return response.data.emailExists;
    } catch (error) {
      console.error('Error checking email availability:', error);
      return false; 
    }
  };

  const handleUserEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };

  const handleEditButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setEditable(true);
    setConfirmationVisible(true);
  };

  const handleConfirmButtonClick = async () => {
    const changesMade =
    userName.trim() !== initialValues.userName.trim() ||
    userEmail.trim() !== initialValues.userEmail.trim();
    if (changesMade) {
      // Validate email format and availability
      if (userEmail === '' || userEmail.includes('@')) {
        // Check email availability only if the new email is different from the original email
        if (userEmail !== initialValues.userEmail) {
          //checkEmailAvailability checks if the email is already in use, if it is it returns true and doesnt allow the user to change the email.
          const EmailNotAvailable = await checkEmailAvailability(userEmail);

          if (EmailNotAvailable) {
            setErrorMessage('Email is already in use');
            setIsEmailUnique(false);
            return;
          }
        }
      } else {
        // If the email is invalid (doesn't contain "@"), set an error message
        setErrorMessage('Invalid email format');
        setIsEmailUnique(false);
        return;
      }
      try {
        if (userId) {
          const success = await updateSuperAdminInfo(userId, {
            admin_first_name: userName,
            email: userEmail,
          });

          await refreshAccessToken2();
          console.log('Token refreshed successfully');
        }
      } catch (error) {
        console.error('Error updating admin information:', error);
      }

      // Update state variables with new values
      setInitialValues({
        userName,
        userEmail,
      });

      // Set confirmed values
      setConfirmedValues({
        userName,
        userEmail,
      });

      // Log confirmed values to the console
      console.log('Final Values:', userName, userEmail);

      // After handling the logic, hide the confirmation button
      setConfirmationVisible(false);

      // Disable further edits after confirming
      setEditable(false);
    }
  };

  const refreshAccessToken2 = async () => {
    console.log('refreshaccestoken')
    try {
      // Make a request to the refreshToken endpoint to get a new token
      const response = await axios.post('http://localhost:5000/api/SuperAdmin/refreshToken', {}, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
  
      // Extract the new token from the response
      const newToken = response.data.token;
  
      // Set the new token in the cookie or storage, wherever you store your tokens
      // For example, if using cookies:
      document.cookie = `jwt-token=${newToken}; max-age=${2 * 60 * 60}; path=/`;
  
      // Log the success
      console.log('Token refreshed successfully');
    } catch (error) {
      console.error('Error refreshing token:', error);
      // Handle the error based on your requirements
    }
  };


  return (
    <>
      <Navbar />

      <div className={`container ${postlogin.page_container}  mt-5 p-5`}>
        <div className="d-flex justify-content-center w-100">
          <div className="form_items ms-5 p-5">
            <h2>{t('settingsHeader')}</h2>
            <br /><br />
            <div className="justify-content-center">
            <div className="mb-3">
            <a>{t('name')}: </a>
              {editable ? (
                <input
                  type="text"
                  id="SuperAdminNaam"
                  placeholder={userName}
                  value={userName}
                  onChange={handleUserNameChange}
                />
              ) : (
                <span>{userName}</span>
              )}
            </div>
              <div className="mb-3">
                <a>email: </a>
                {editable ? (
                  <div>
                  <input
                    type="text"
                    id="SuperadminEmail"
                    placeholder={userEmail}
                    value={userEmail}
                    onChange={handleUserEmailChange}
                  />
                   {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                  </div>
                ) : (
                  <span>{userEmail}</span>
                )}
              </div>
              <div className="mb-3 d-flex align-items-center">
                <a href="Company_Overview">
                    <button className={genstyles.button}>{t('Companys')}</button>
                </a>
                <img
                  style={{ width: '20px', height: 'auto', marginRight: '5px', cursor: 'pointer' }}
                  src={NL}
                  alt="nl"
                  onClick={() => setLanguage('nl')} // Use setLanguage from SettingsController
                />
                <img
                  style={{ width: '20px', height: 'auto', marginRight: '5px', cursor: 'pointer' }}
                  src={EN}
                  alt="en"
                  onClick={() => setLanguage('en')} // Use setLanguage from SettingsController
                />
              </div>
              {confirmationVisible && (
                <button className={genstyles.button} onClick={handleConfirmButtonClick}>
                  {t('confirm')}
                </button>
              )}
              {!confirmationVisible && (
                <a href="Settings_Page">
                  <button className={genstyles.button} onClick={handleEditButtonClick}>
                  {t('edit')}
                  </button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuthentication(SuperAdminSettings);
