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
  const [selectedRosterValue, setSelectedRosterValue] = useState();
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const { language, setLanguage} = SettingsController();
  const [companyName, setCompanyName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState();
  const [userdata, setUserData] = useState<UserData | null>(null);
  const [userName, setUserName] = useState('');
  const [selectedRoster, setSelectedRoster] = useState<string>('');
  const [initialValues, setInitialValues] = useState({
    userName: '',
    userEmail: '',
    companyName: '',
    //selectedRosterValue: '',
  });

  const [confirmedValues, setConfirmedValues] = useState({
    userName: '',
    userEmail: '',
    companyName: '',
    selectedRoster: '',
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
        console.log(selectedRosterValue);
        console.log('fetched data succesfully');
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error based on your requirements
      }
      
      setInitialValues({
        userName,
        userEmail,
        companyName,
        //selectedRosterValue: selectedRosterValue,
      });
    };

    fetchData();
  }, []);


  const handleEditButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setEditable(true);
    setConfirmationVisible(true);
  };

  const handleRoosterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(selectedRosterValue);
    // Modify the logic based on your conditions
    if (selectedRosterValue === true) {
      // Set value to 'Mon-Sun' if selectedRosterValue is true
      setSelectedRoster(t('7weekday'));
    } else {
      // Set value to 'Ma-Vr' if selectedRosterValue is false
      setSelectedRoster(t('5weekday'));
    }
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleUserEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };

  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
  };

  const handleConfirmButtonClick = async () => {
    // Check if any changes were made
    const changesMade =
      userName !== initialValues.userName ||
      userEmail !== initialValues.userEmail ||
      companyName !== initialValues.companyName;
  
    if (changesMade) {
      try {
        if (userId) {
          // Check if userId is defined
          const success = await updateAdminInfo(userId, {
            admin_first_name: userName,
            email: userEmail,
            company_name: companyName,
          });
  
          if (success) {
            console.log('Admin information updated successfully');
          } else {
            console.log('Error updating admin information');
          }
        }
      } catch (error) {
        console.error('Error updating admin information:', error);
        // Handle error based on your requirements
      }
  
      // Update state variables with new values
      setInitialValues({
        userName,
        userEmail,
        companyName,
      });
  
      // Set confirmed values
      setConfirmedValues({
        userName,
        userEmail,
        companyName,
        selectedRoster,
      });
  
      // Log confirmed values to the console
      console.log('Confirmed Values:', confirmedValues);
      console.log('Final Values:', userName, userEmail, companyName, selectedRoster);
  
      // After handling the logic, hide the confirmation button
      setConfirmationVisible(false);
  
      // Disable further edits after confirming
      setEditable(false);
    }
  };
  
  
useEffect(() => {
  console.log('Confirmed Values:', confirmedValues);
}, [confirmedValues]); 

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
                <input type="text" id="AdminNaam" placeholder={userName} readOnly={!editable} onChange={handleUserNameChange} />
              </div>
              <div className="mb-3">
                <input type="text" id="adminEmail" placeholder={userEmail} readOnly={!editable} onChange={handleUserEmailChange}/>
              </div>
              <div className="mb-3">
                <input type="text" id="BedrijfNaam" placeholder={companyName} readOnly={!editable} onChange={handleCompanyNameChange}/>
              </div>
              <div className="mb-3">
                <label htmlFor="Rooster">{t('scheduleOverviewHeader')}</label>
                <select id="Rooster" disabled={!editable} value= {selectedRoster} onChange={handleRoosterChange}>
                  <option value="Ma-Vr">{t('5weekday')}</option>
                  <option value="Ma-Sun">{t('7weekday')}</option>
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
