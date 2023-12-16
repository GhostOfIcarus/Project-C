import React, { useState } from 'react';
import Navbar from './Navbar';
import postlogin from './Stylesheets/PostLogin.module.css';
import genstyles from './Stylesheets/GeneralStyles.module.css';
import NL from "./img/nl_flag.png";
import EN from "./img/en_flag.png";
import withAuthentication from '../Controllers/withAuthentication';
import { SettingsController } from '../Controllers/SettingsController';
import { useTranslation } from 'react-i18next';


function Settings() {
  const { t } = useTranslation();
  const [editable, setEditable] = useState(false);
  const [selectedRooster, setSelectedRooster] = useState('Ma-Vr');
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const { language, setLanguage } = SettingsController();

  const handleEditButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setEditable(true);
    setConfirmationVisible(true);
  };

  const handleRoosterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRooster(event.target.value);
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
                <input type="text" id="AdminNaam" placeholder="Admin Naam" readOnly={!editable} />
              </div>
              <div className="mb-3">
                <input type="text" id="adminEmail" placeholder="Admin Email" readOnly={!editable} />
              </div>
              <div className="mb-3">
                <input type="text" id="BedrijfNaam" placeholder="Bedrijf Naam" readOnly={!editable} />
              </div>
              <div className="mb-3">
                <label htmlFor="Rooster">{t('scheduleOverviewHeader')}</label>
                <select id="Rooster" disabled={!editable} value={selectedRooster} onChange={handleRoosterChange}>
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
