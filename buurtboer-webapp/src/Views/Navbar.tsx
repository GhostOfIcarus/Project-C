import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  
import logo from './img/buurtboer_logo.png'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import postlogin from './Stylesheets/PostLogin.module.css';
import genstyles from './Stylesheets/GeneralStyles.module.css';
import  {SettingsController} from '../Controllers/SettingsController';
import NL from "./img/nl_flag.png";
import EN from "./img/en_flag.png";
import { useTranslation } from 'react-i18next';
import axios from 'axios';


interface UserData {
  firstName: string;
}

const Navbar = () => {
  const { language, setLanguage} = SettingsController();
  const { t } = useTranslation();
  const [userdata, setUserData] = useState<UserData | null>(null);
  const [userRole, setUserRole] = useState(null);


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
        const userRole = userData.userRole;
        console.log(userRole);
        setUserRole(userRole);
      } catch (error) {
        // Handle error
      }
    };

    const handleUserRole = () => {
      setUserRole(userRole);
    };

    fetchData();
    handleUserRole();
    //console.log("users role is: ", userRole)
  }, []); // The empty dependency array ensures that this effect runs once on mount
  
  const imageContainerStyle = {
    backgroundColor: '#09a090',
    padding: '5px',
    // borderRadius: '5px', // Add border-radius or other styles as needed
  };

  return (
    <nav className={`navbar navbar-expand-lg p-0 ${postlogin.buurtboer_nav}`}>
      <a className="navbar-brand p-0 img_logo" href="/">
        <div style={imageContainerStyle}>
          <img
            src={logo}
            className="img-fluid buurtboerlogo"
            style={{ width: '100px', height: 'auto' }}
            alt="Buurtboer Logo"
          />
        </div>
      </a>
      <div className="collapse navbar-collapse " id="navbarSupportedContent">
        <ul className="navbar-nav me-auto ms-3 mb-lg-0">
          <li className="nav-item">
            {userdata && <span className="nav-link text-black"> {t('welcome')}, {userdata.firstName}!</span>}
          </li>
        </ul>
      </div>
      <img
        style={{ width: '20px', height: 'auto', marginRight: '5px', cursor: 'pointer' }}
        src={NL}
        alt="nl"
        onClick={() => setLanguage('nl')} // Use setLanguage from SettingsController
      />
      <span style={{ margin: '0 5px', fontSize: '20px' }}>/</span>
      <img
        style={{ width: '20px', height: 'auto', marginLeft: '5px', cursor: 'pointer' }}
        src={EN}
        alt="en"
        onClick={() => setLanguage('en')} // Use setLanguage from SettingsController
      />

      <div className="nav-button me-5 "></div>
      {userRole === 'CompanyAdmin' && (
        <div className="nav-button me-5">
          <Link
            to="/Choose_Order"
            className={genstyles.nav_link_button}
          >
            {t('order')}
          </Link>
        </div>
      )}
      <div className="nav-button me-5">
        {userRole === 'SuperAdmin' ? (
          <Link
            to="/Company_Overview"
            className={genstyles.nav_link_button}
          >
            {t('company_overview')}
          </Link>
        ) : (
          <Link
            to="/Employees_Overview"
            className={genstyles.nav_link_button}
          >
            {t('employee_Overview')}
          </Link>
        )}
      </div>
      <div className="nav-button me-5">
        {userRole === 'SuperAdmin' ? (
          <Link
            to="/Invite_Company"
            className={genstyles.nav_link_button}
          >
            {t('invite_company')}
          </Link>
        ) : (
          <Link
            to="/Invite_Employee"
            className={genstyles.nav_link_button}
          >
            {t('add_employee')}
          </Link>
        )}
      </div>
      <div className="nav-button me-5">
        {userRole === 'SuperAdmin' ? (
          <Link
            to="/SuperAdmin_Settings_Page"
            className={genstyles.nav_link_button}
          >
            {t('settingsHeader')}
          </Link>
        ) : (
          <Link
            to="/Settings_Page"
            className={genstyles.nav_link_button}
          >
            {t('settingsHeader')}
          </Link>
        )}
      </div>
      <div className="nav-button me-5">
        <Link
            to="/Login"
            className={genstyles.nav_link_button}
            onClick={() => {
              axios.post('http://localhost:5000/api/logout', {}, {
                headers: {
                  'Content-Type': 'application/json',
                },
                withCredentials: true,
              });
              }
            }
          >
            {t('logout')}
        </Link>                
      </div>
    </nav>
  );
};
  
  export default Navbar;

