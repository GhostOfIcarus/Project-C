import React, { useState } from 'react';
import Navbar from './Navbar';
import postlogin from './Stylesheets/PostLogin.module.css';
import genstyles from './Stylesheets/GeneralStyles.module.css';
import NL from "./img/nl_flag.png";
import EN from "./img/en_flag.png";
import withAuthentication from '../Controllers/withAuthentication';

function Settings() {
  const [editable, setEditable] = useState(false);
  const [selectedRooster, setSelectedRooster] = useState('Ma-Vr');
  const [confirmationVisible, setConfirmationVisible] = useState(false);

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
            <h2>Settings</h2>
            <br /><br />
            <div className="justify-content-center">
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
                <label htmlFor="Rooster">Rooster:</label>
                <select id="Rooster" disabled={!editable} value={selectedRooster} onChange={handleRoosterChange}>
                  <option value="Ma-Vr">Ma-Vr</option>
                  <option value="Ma-Sun">Ma-Sun</option>
                </select>
                <img style={{ width: '20px', height: 'auto', marginRight: '5px' }} src={NL} alt="change" />
                <img style={{ width: '20px', height: 'auto', marginRight: '5px' }} src={EN} alt="change" />
              </div>
              {confirmationVisible && (
                <button className={genstyles.button} onClick={handleConfirmButtonClick}>
                  Confirm
                </button>
              )}
              {!confirmationVisible && (
                <a href="Settings_Page">
                  <button className={genstyles.button} onClick={handleEditButtonClick}>
                    bewerk
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
