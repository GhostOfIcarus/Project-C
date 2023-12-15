import { Component} from 'react';
import logo from './img/buurtboer_logo.png'; 
import postlogin from './Stylesheets/PostLogin.module.css';
import genstyles from './Stylesheets/GeneralStyles.module.css';
import Navbar from './Navbar';

function Invite_Company() {
    return (
      <>
        <Navbar />
  
        <div className={`container ${postlogin.page_container}  mt-5 p-5`}>
          <div className="d-flex justify-content-center ">
            <div className="form_items ms-5 ">
              <h2>Bedrijf aanmaken</h2>
              <br /><br />
              <div className="justify-content-center">
                <div className="mb-3">
                  <input type="text" id="bedrijfNaam" placeholder="Bedrijf naam" className="input-group input-group-lg" />
                </div>
                <div className="mb-3">
                  <input type="text" id="adminEmail" placeholder="Admin email" className="input-group input-group-lg" />
                </div>
                <div className="mb-3">
                  <input type="text" id="adminVoornaam" placeholder="Admin voornaam" className="input-group input-group-lg" />
                </div>
                <div className="mb-3">
                  <input type="text" id="adminAchternaam" placeholder="Admin achternaam" className="input-group input-group-lg" />
                </div>
                <br /><br /><br />
                <div className='d-flex justify-content-center'>
                  <a href="Company_Overview" className="d-inline-block align-center"><button className={genstyles.submmitbutton}>stuur invite</button></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default Invite_Company;