import React, { useState } from 'react';
import { Link } from 'react-router-dom';  
import logo from './img/buurtboer_logo.png'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Stylesheets/Invite_Employee.module.css';


function Invite_Employee() {
  const imageContainerStyle = {
    backgroundColor: '#09a090',
    padding: '10px'
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
    <>
      <nav className="navbar navbar-expand-lg buurtboer_nav">
        <a className="navbar-brand img_logo" href="#">
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
            <span className="nav-link text-black"> Welkom ....</span>
            </li>
        </ul>
        </div>
        <div className="nav-button me-5 ">
        <Link
            to="#"
            style={{ ...linkStyle, ...hoveredLinkStyle }}
            onMouseEnter={() => setHoveredLinkStyle({ color: '#F9834C' })}
            onMouseLeave={() => setHoveredLinkStyle({ color: '#000000' })}
          >
            Bestellen
          </Link>
        </div>
        <div className="nav-button me-5">
        <Link
            to="#"
            style={{ ...linkStyle, ...hoveredLinkStyle }}
            onMouseEnter={() => setHoveredLinkStyle({ color: '#F9834C' })}
            onMouseLeave={() => setHoveredLinkStyle({ color: '#000000' })}
          >
            Week Overview
        </Link>        
        </div>
        <div className="nav-button me-5">
        <Link
            to="/Invite_Employee"
            style={{ ...linkStyle, ...hoveredLinkStyle }}
            onMouseEnter={() => setHoveredLinkStyle({ color: '#F9834C' })}
            onMouseLeave={() => setHoveredLinkStyle({ color: '#000000' })}
          >
            Invite Medewerker
        </Link>        
        </div>
        <div className="nav-button me-5">
        <Link
            to="/"
            style={{ ...linkStyle, ...hoveredLinkStyle }}
            onMouseEnter={() => setHoveredLinkStyle({ color: '#F9834C' })}
            onMouseLeave={() => setHoveredLinkStyle({ color: '#000000' })}
          >
            Loguit
        </Link>        
        </div>
      </nav>

      <div className="container justify-content-center mt-5 p-5">
        <div className="row">
          <div className="col-lg-8 float-end content">
              <div className="  form_items ms-5 justify-content-center p-5">
                <h2>Invite Medewerker</h2>
                <div className="justify-content-center">
                    <input type="text" id="firstName" placeholder="Voornaam" /> 
                    <input type="text" id="lastName" placeholder="Achternaam" />
                    <input type="email" id="emailInput" placeholder="Email" /> 
                    <a href="index.html"><button className="send_button">Stuur Invite</button></a>
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Invite_Employee;
