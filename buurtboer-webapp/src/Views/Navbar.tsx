import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  
import logo from './img/buurtboer_logo.png'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import postlogin from './Stylesheets/PostLogin.module.css';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

interface UserData {
  firstName: string;
}

const Navbar = () => {
  const { t } = useTranslation();
  const [userdata, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth', {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        // console.log("Response data: ", response.data);
        const userData = response.data.userData;
        // console.log(userData.firstName);
        setUserData(userData);
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that this effect runs once on mount

  const buurtboer_nav = {
    backgroundColor: '#FFFFFF',
    padding: '5px',
    // borderRadius: '5px', // Add border-radius or other styles as needed
  };

  const imageContainerStyle = {
    backgroundColor: '#09a090',
    padding: '5px',
    // borderRadius: '5px', // Add border-radius or other styles as needed
  };

  const linkStyle = {
    color: '#000000', // Replace with your desired color
    textDecoration: 'none', // Remove underline
    transition: 'color 0.3s ease'
  };

  const [hoveredLinkStyle, setHoveredLinkStyle] = useState({
    color: '#F9834C', // Replace with your desired hover color
  });

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
            {userdata && <span className="nav-link text-black"> Welkom, {userdata.firstName}!</span>}
          </li>
        </ul>
      </div>
        <div className="nav-button me-5 ">
        <Link
            to="/Choose_Order"
            style={{ ...linkStyle, ...hoveredLinkStyle }}
            onMouseEnter={() => setHoveredLinkStyle({ color: '#F9834C' })}
            onMouseLeave={() => setHoveredLinkStyle({ color: '#000000' })}
          >
            {t('order')}
          </Link>
        </div>
        <div className="nav-button me-5">
        <Link
            to="/Employees_Overview"
            style={{ ...linkStyle, ...hoveredLinkStyle }}
            onMouseEnter={() => setHoveredLinkStyle({ color: '#F9834C' })}
            onMouseLeave={() => setHoveredLinkStyle({ color: '#000000' })}
          >
            {t('employee_Overview')}
        </Link>        
        </div>
        <div className="nav-button me-5">
        <Link
            to="/Invite_Employee"
            style={{ ...linkStyle, ...hoveredLinkStyle }}
            onMouseEnter={() => setHoveredLinkStyle({ color: '#F9834C' })}
            onMouseLeave={() => setHoveredLinkStyle({ color: '#000000' })}
          >
            {t('add_employee')}
        </Link>        
        </div>
        <div className="nav-button me-5">
        <Link
            to="/Settings_Page"
            style={{ ...linkStyle, ...hoveredLinkStyle }}
            onMouseEnter={() => setHoveredLinkStyle({ color: '#F9834C' })}
            onMouseLeave={() => setHoveredLinkStyle({ color: '#000000' })}
          >
             {t('settingsHeader')}
        </Link>        
        </div>

        <div className="nav-button me-5">
        <Link
            to="/"
            style={{ ...linkStyle, ...hoveredLinkStyle }}
            onMouseEnter={() => setHoveredLinkStyle({ color: '#F9834C' })}
            onMouseLeave={() => setHoveredLinkStyle({ color: '#000000' })}
          >
            {t('logout')}
        </Link>        
        </div>
      </nav>
    );
  };
  
  export default Navbar;
