import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import postlogin from './Stylesheets/PostLogin.module.css';
import genstyles from './Stylesheets/GeneralStyles.module.css';
import NL from "./img/nl_flag.png";
import EN from "./img/en_flag.png";
import withAuthentication from '../Controllers/withAuthentication';
import  {SettingsController, AdminInfo} from '../Controllers/SettingsController';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

interface UserData {
  firstName: string;
}

function Settings() {
  const { t } = useTranslation();
  const [editable, setEditable] = useState(false);
  const [selectedRosterValue, setSelectedRosterValue] = useState()
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const { language, setLanguage} = SettingsController();
  const [companyName, setCompanyName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userdata, setUserData] = useState<UserData | null>(null);
  const [userName, setUserName] = useState('');
  const [selectedRoster, setSelectedRoster] = useState<string>('Ma-Vr');

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

        const companyName = userData.companyName;
        const userEmail = userData.userEmail;
        const userName = userData.firstName;
        const selectedRosterValue = userData.full_schedule;

        setCompanyName(companyName);
        setUserEmail(userEmail);
        setUserName(userName);
        setSelectedRosterValue(selectedRosterValue);
        console.log(userData);
        console.log(selectedRosterValue);
        console.log('fetched data');
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error based on your requirements
      }
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

  const handleConfirmButtonClick = () => {
    // Handle the confirmation logic here

    // After handling the logic, hide the confirmation button
    setConfirmationVisible(false);

    // Disable further edits after confirming
    setEditable(false);
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
              {/* ... other input fields (admin naam, email and company naam) ... */}
              <div className="mb-3">
                <input type="text" id="AdminNaam" placeholder={userName} readOnly={!editable} />
              </div>
              <div className="mb-3">
                <input type="text" id="adminEmail" placeholder={userEmail} readOnly={!editable} />
              </div>
              <div className="mb-3">
                <input type="text" id="BedrijfNaam" placeholder={companyName} readOnly={!editable} />
              </div>
              <div className="mb-3">
                <label htmlFor="Rooster">{t('scheduleOverviewHeader')}</label>
                <select id="Rooster" disabled={!editable} value= {selectedRosterValue} onChange={handleRoosterChange}>
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
