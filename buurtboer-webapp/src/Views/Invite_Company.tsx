import React, { useState } from 'react';
import Navbar from './Navbar';
import withAuthentication from '../Controllers/withAuthentication';
import genstyles from './Stylesheets/GeneralStyles.module.css';
import postlogin from './Stylesheets/PostLogin.module.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Invite_Company() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [CompanyName, setBedrijfNaam] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminFirstName, setAdminVoornaam] = useState('');
  const [adminLastName, setAdminAchternaam] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInviteClick = () => {
    // Check if adminEmail contains '@' symbol
    if (!adminEmail.includes('@')) {
      setErrorMessage(t('email_format_error'));
      return; // Stop further execution
    }

    // Clear any previous error and success messages
    setErrorMessage('');
    setSuccessMessage('');

    // Send email
    axios.post('http://localhost:5001/sendEmail/companyRegistration', 
      {
        to: adminEmail,
        CompanyName: CompanyName,
        adminFirstName: adminFirstName,
        adminLastName: adminLastName,
      }, 
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then(() => {
      // Display success message
      setSuccessMessage(t('Email_success'));
    })
    .catch(error => {
      console.error('Error sending email:', error);
      // Display error message
      setErrorMessage(t('email_fail'));
    });
  };

  return (
    <>
      <Navbar />

      <div className={`container ${postlogin.page_container}  mt-5 p-5`}>
        <div className="d-flex justify-content-center ">
          <div className="form_items ms-5 ">
            <h2>{t('add_company')}</h2>
            <br /><br />
            <div className="justify-content-center">
              <div className="mb-3">
                <input
                  type="text"
                  id="CompanyName"
                  placeholder={t('company_name')}
                  className="input-group input-group-lg"
                  value={CompanyName}
                  onChange={(e) => setBedrijfNaam(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  id="adminEmail"
                  placeholder="Admin email"
                  className="input-group input-group-lg"
                  value={adminEmail}
                  onChange={(e) => {
                    setAdminEmail(e.target.value);
                    // Reset email error on input change
                    setErrorMessage('');
                    // Reset success message on input change
                    setSuccessMessage('');
                  }}
                />
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  id="adminFirstName"
                  placeholder={t('admin_firstname')}
                  className="input-group input-group-lg"
                  value={adminFirstName}
                  onChange={(e) => setAdminVoornaam(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  id="adminLastName"
                  placeholder={t('admin_lastname')}
                  className="input-group input-group-lg"
                  value={adminLastName}
                  onChange={(e) => setAdminAchternaam(e.target.value)}
                />
                {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
              </div>
              <br /><br /><br />
              <div className='d-flex justify-content-center'>
                <button className={genstyles.submmitbutton} onClick={handleInviteClick}>{t('send_invite')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuthentication(Invite_Company, "/Employee_Overview", true);
