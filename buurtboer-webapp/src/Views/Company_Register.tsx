import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import postlogin from './Stylesheets/PostLogin.module.css';
import genstyles from './Stylesheets/GeneralStyles.module.css';
import withAuthentication from '../Controllers/withAuthentication';
import { useTranslation } from 'react-i18next';
import {registerCompanyController} from '../Controllers/Company_RegisterController'



export function Company_Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();


  //retrieved variables from the invite screen (this needs to change to the info from the cookies with the email stuff)
  // const companyName = params.get('CompanyName') || '';
  // const adminEmail = params.get('adminEmail') || '';
  // const adminFirstName = params.get('adminFirstName') || '';
  // const adminLastName = params.get('adminLastName') || '';

  const [companyEmail, setCompanyEmail] = useState<string>('');
  const [companyPass, setCompanyPass] = useState('');
  const [companyPass2, setCompanyPass2] = useState('');
  const full_schedule = false;

  const handleFormSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(location.search);

  const token = params.get('token') || '';

  const verifiedToken = await axios.post('http://localhost:5001/checkToken', {
    token: token,
  }, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });


    console.log('companyEmail:', companyEmail);
    console.log('companyPass:', companyPass);
    console.log('companyPass2:', companyPass2);

    //TODO: succesfully made company email or screen needs to be made before sending the user to the login page
    try {
      // Make a call to the registerCompanyController function
      const registrationSuccess = await registerCompanyController(verifiedToken.data.data.adminFirstName, verifiedToken.data.data.adminLastName, verifiedToken.data.data.companyName, full_schedule, companyEmail, companyPass);

      if (registrationSuccess) {
        // Redirect to the login page or show a success message
        console.log('SUCCESSSS');
        navigate(`/login`);
      } else {
        // Handle registration failure
        console.error('Company registration failed');
      }
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error('An error occurred during company registration', error);
    }
  };

  return (
    <>
      <Navbar />

      <div className={`container ${postlogin.page_container} mt-5 p-5`}>
        <div className="d-flex justify-content-center w-100">
          <div className="row">
            <div className="col-lg-12">
              <div className="  form_items ms-5 justify-content-center p-5">
                <h2>{t('register_company')}</h2>
                <form onSubmit={handleFormSubmit}>
                  <input
                    type="email"
                    id="companyEmail"
                    placeholder="Email"
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                  />
                  <br /><br />
                  <input
                    type="text"
                    id="companyPass"
                    placeholder={t('password')}
                    value={companyPass}
                    onChange={(e) => setCompanyPass(e.target.value)}
                  />
                  <br /><br />
                  <input
                    type="text"
                    id="companyPass2"
                    placeholder={t('repeatPassword')}
                    value={companyPass2}
                    onChange={(e) => setCompanyPass2(e.target.value)}
                  />
                  <br /><br />
                  <input type="submit" value={t('submit')} className={genstyles.submmitbutton} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuthentication(Company_Register);
