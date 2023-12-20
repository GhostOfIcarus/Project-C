import React, { useState } from 'react';
import Navbar from './Navbar';
import withAuthentication from '../Controllers/withAuthentication';
import genstyles from './Stylesheets/GeneralStyles.module.css';
import postlogin from './Stylesheets/PostLogin.module.css';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Invite_Company() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [CompanyName, setBedrijfNaam] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminFirstName, setAdminVoornaam] = useState('');
  const [adminLastName, setAdminAchternaam] = useState('');

  const handleInviteClick = () => {
    // Do something with the stored variables, e.g., send them to an API or perform some action
    console.log('CompanyName:', CompanyName);
    console.log('adminEmail:', adminEmail);
    console.log('adminFirstName:', adminFirstName);
    console.log('adminLastName:', adminLastName);

    //saves all the inputs so the next page can use it (this needs to change with the email functionality)
    const queryString = `?CompanyName=${CompanyName}&adminEmail=${adminEmail}&adminFirstName=${adminFirstName}&adminLastName=${adminLastName}`;

    //navigate(`/Company_Register${queryString}`);

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
  );


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
                  onChange={(e) => setAdminEmail(e.target.value)}
                />
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

export default withAuthentication(Invite_Company);
