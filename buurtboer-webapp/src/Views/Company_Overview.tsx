import { Component} from 'react';
import logo from './img/buurtboer_logo.png'; 
import postlogin from './Stylesheets/PostLogin.module.css';
import Navbar from './Navbar';
//import styling from './Stylesheets/Company_overview.module.css';
//TODO:fix css so we can actually use the stuff
function CompanyOverview() {
    return (
      <div>
        <Navbar />
  
        <div className="form-container col-lg-5 content mt-5 mx-auto center-align">
          <h2>bedrijf overview</h2>
          <div className="middle-buttons-container col-lg-5 content mt-5 mx-auto center-align">
            <div className="left-align top-buttons-container">
              <a href="Invite_Company.tsx"><button className="m-button">bedrijf toevoegen</button></a>
            </div>
            <button className="middle-button">bedrijf 1</button>
            <button className="middle-button">bedrijf 2</button>
            <button className="middle-button">bedrijf 3</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default CompanyOverview;
