import { Component} from 'react';
import logo from './img/buurtboer_logo.png'; 
import styling from './Stylesheets/Invite_Company.module.css';
import postlogin from './Stylesheets/PostLogin.module.css';
import Navbar from './Navbar';

function Invite_Company() {
    return (
      <>
        <Navbar />
  
        <div className="form-container col-lg-5 content mt-5 mx-auto center-align">
          <div className="form_items ms-5 p-5">
            <h2>Bedrijf aanmaken</h2>
            <br /><br />
            <div className="justify-content-center">
              <input type="text" id="bedrijfNaam" placeholder="Bedrijf naam" className="mb-3" />
              <input type="text" id="adminEmail" placeholder="Admin email" className="mb-3" />
              <input type="text" id="adminVoornaam" placeholder="Admin voornaam" className="mb-3" />
              <input type="text" id="adminAchternaam" placeholder="Admin achternaam" className="mb-3" />
              <br /><br /><br />
              <a href="#" className="d-inline-block"><button className="invite-button">stuur invite</button></a>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default Invite_Company;