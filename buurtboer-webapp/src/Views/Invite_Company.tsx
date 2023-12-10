import { Component} from 'react';
import logo from './img/buurtboer_logo.png'; 
import styling from './Stylesheets/Invite_Company.module.css';
import postlogin from './Stylesheets/PostLogin.module.css';
import Navbar from './Navbar';

function Invite_Company() {
    return (
      <>
        <Navbar />
  
        <div className={`container ${postlogin.page_container}  mt-5 p-5`}>
          <div className="d-flex justify-content-center w-100">
            <div className="form_items ms-5 p-5">
              <h2>Bedrijf aanmaken</h2>
              <br /><br />
              <div className="justify-content-center">
                <div className="mb-3">
                  <input type="text" id="bedrijfNaam" placeholder="Bedrijf naam" className="mb-3" />
                </div>
                <div className="mb-3">
                  <input type="text" id="adminEmail" placeholder="Admin email" className="mb-3" />
                </div>
                <div className="mb-3">
                  <input type="text" id="adminVoornaam" placeholder="Admin voornaam" className="mb-3" />
                </div>
                <div className="mb-3">
                  <input type="text" id="adminAchternaam" placeholder="Admin achternaam" className="mb-3" />
                </div>
                <br /><br /><br />
                <a href="Company_Overview" className="d-inline-block"><button className="invite-button">stuur invite</button></a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default Invite_Company;