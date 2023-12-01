import { Component} from 'react';
import logo from './img/buurtboer_logo.png'; 
import styling from './Stylesheets/Invite_Company.module.css';

function Invite_Company() {
    return (
      <div>
        <div className="top-border">
          <img src="buurtboerLogo.jpg" alt="Your Image Description" />
          <a>-------------Welkom, Dirk-Jan</a>
  
          <div className="right-align top-buttons-container">
            <p>
              <a href="#"><button className="top-button">Bestellen</button></a>
              <a href="#"><button className="top-button">Week Overview</button></a>
              <a href="#"><button className="top-button">Invite Medewerker</button></a>
              <a href="#"><button className="top-button">Uitloggen</button></a>
            </p>
          </div>
        </div>
  
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
      </div>
    );
  }
  
  export default Invite_Company;