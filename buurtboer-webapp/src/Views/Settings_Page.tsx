import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import postlogin from './Stylesheets/PostLogin.module.css';
import genstyles from './Stylesheets/GeneralStyles.module.css';
import NL from "./img/nl_flag.png";
import EN from "./img/en_flag.png";
import withAuthentication from '../Controllers/withAuthentication';
import  {SettingsController, AdminInfo, updateAdminInfo} from '../Controllers/SettingsController';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

interface UserData {
  firstName: string;
}

function Settings() {
  const { t } = useTranslation();
  const [editable, setEditable] = useState(false);
  const [selectedRosterValue, setSelectedRosterValue] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const { language, setLanguage} = SettingsController();
  const [errorMessage, setErrorMessage] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState();
  const [userdata, setUserData] = useState<UserData | null>(null);
  const [userName, setUserName] = useState('');
  const [selectedRoster, setSelectedRoster] = useState<string>('');
  const [isEmailUnique, setIsEmailUnique] = useState(true);
  const [initialValues, setInitialValues] = useState({
    userName: '',
    userEmail: '',
    companyName: '',
    selectedRosterValue: false,
  });

  const [confirmedValues, setConfirmedValues] = useState({
    userName: '',
    userEmail: '',
    companyName: '',
    selectedRosterValue: false,
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
        const companyName = userData.companyName;
        const userEmail = userData.userEmail;
        const userName = userData.firstName;
        const selectedRosterValue = userData.full_schedule;

        setUserId(userId);
        setCompanyName(companyName);
        setUserEmail(userEmail);
        setUserName(userName);
        setSelectedRosterValue(selectedRosterValue);
        console.log(userData);
        console.log('fetched data succesfully');
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error based on your requirements
      }
      
      setInitialValues({
        userName,
        userEmail,
        companyName,
        selectedRosterValue: selectedRosterValue,
      });
    };

    fetchData();
  }, []);

  const getCompanyAdminEmail = async (adminId: number) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/getCompanyAdminEmail/${adminId}`);
      const email = response.data.email;
      console.log('Company Admin Email:', email);
      return email;
    } catch (error) {
      console.error('Error getting company admin email:', error);
    }
  };

  const handleEditButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setEditable(true);
    setConfirmationVisible(true);
  };

  const handleRoosterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
  
    // Update the selectedRosterValue based on the selected option
    if (selectedValue === t('5weekday')) {
      setSelectedRosterValue((prevValue) => {
        if (prevValue !== false) {
          return false;
        }
        return prevValue;
      });
    } else if (selectedValue === t('7weekday')) {
      setSelectedRosterValue((prevValue) => {
        if (prevValue !== true) {
          return true;
        }
        return prevValue;
      });
    }
  
    setSelectedRoster(selectedValue);
  };
  
 

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
  
  const handleUserEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
};

  
  
  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
  };

  const handleConfirmButtonClick = async () => {
   if (userId){
    const oldEmail = await getCompanyAdminEmail(userId);
    // Check if any changes were made
    const changesMade =
      userName.trim() !== initialValues.userName.trim() ||
      userEmail.trim() !== initialValues.userEmail.trim() ||
      companyName.trim() !== initialValues.companyName.trim() ||
      selectedRosterValue !== initialValues.selectedRosterValue;

    if (changesMade) {
      // Validate email format and availability
      if (userEmail === '' || userEmail.includes('@')) {
        // Check email availability only if the new email is different from the original email
        if (userEmail !== oldEmail) {
          //checkEmailAvailability checks if the email is already in use, if it is it returns true and doesnt allow the user to change the email.
          const EmailNotAvailable = await checkEmailAvailability(userEmail);

          if (EmailNotAvailable) {
            setErrorMessage(t('email_inUse_error'));
            setIsEmailUnique(false);
            return;
          }
        }
      } else {
        // If the email is invalid (doesn't contain "@"), set an error message
        setErrorMessage(t('email_format_error'));
        setIsEmailUnique(false);
        return;
      }
   } 
      

      // after the conditions are met continue
      try {
        //checks if userId exists
        if (userId) {
          const { success } = await updateAdminInfo(userId, {
            admin_first_name: userName,
            email: userEmail,
            company_name: companyName,
            full_schedule: selectedRosterValue,
          });

          if (success) {
            // If the update is successful, trigger token refresh
            await refreshAccessToken();
            console.log('Token refreshed successfully');
          }
        }
      } catch (error) {
        console.error('Error updating admin information:', error);
      }

      // Update state variables with new values
      setInitialValues({
        userName,
        userEmail,
        companyName,
        selectedRosterValue,
      });

      // Set confirmed values
      setConfirmedValues({
        userName,
        userEmail,
        companyName,
        selectedRosterValue,
      });

      // Log confirmed values to the console
      //console.log('Confirmed Values:', confirmedValues);
      console.log('Final Values:', userName, userEmail, companyName, selectedRosterValue);

      // After handling the logic, hide the confirmation button
      setConfirmationVisible(false);

      // Disable further edits after confirming
      setEditable(false);
    }
  };
  
  useEffect(() => {
    //console.log('Confirmed Values:', confirmedValues);
  }, [confirmedValues]); 

  const refreshAccessToken = async () => {
    try {
      // Make a request to the refreshToken endpoint to get a new token
      const response = await axios.post('http://localhost:5000/api/CompanyAdmin/refreshToken', {}, {
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
                    id="AdminNaam"
                    placeholder={userName}
                    value={userName}
                    onChange={handleUserNameChange}
                  />
                ) : (
                  <span>{userName}</span>
                )}
                </div>
                <div className="mb-3">
                  <a>Email: </a>
                  {editable ? (
                    <div>
                      <input
                        type="text"
                        id="adminEmail"
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
                <div className="mb-3">
                  <a>{t('Company_name')}: </a>
                  {editable ? (
                    <input
                      type="text"
                      id="BedrijfNaam"
                      placeholder={companyName}
                      value={companyName}
                      readOnly={!editable}
                      onChange={handleCompanyNameChange}
                    />
                  ) : (
                    <span>{companyName}</span>
                  )}
                </div>
              <div className="mb-3">
                <label htmlFor="Rooster">{t('scheduleOverviewHeader')}</label>
                <select id="Rooster" disabled={!editable} value= {selectedRoster} onChange={handleRoosterChange}>
                  <option value={t('5weekday')}>{t('5weekday')}</option>
                  <option value={t('yweekday')}>{t('7weekday')}</option>
                </select>
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

export default withAuthentication(Settings);
