import { Component } from "react";
import { Link } from "react-router-dom";
import genstyles from './Stylesheets/GeneralStyles.module.css';
import logo from "./img/buurtboer_logo.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import withAuthentication from '../Controllers/withAuthentication';
import Navbar from './Navbar';
import postlogin from './Stylesheets/PostLogin.module.css';



export function Company_Register() {
  

  return (
    <>
      <Navbar />

      <div className={`container ${postlogin.page_container}  mt-5 p-5`}>
        <div className="d-flex justify-content-center w-100">
          <div className="row">
            <div className="col-lg-12">
                <div className="  form_items ms-5 justify-content-center p-5">
                  <h2>Bedrijf registreren</h2>
                  {/* <div className="justify-content-center">
                      <input type="text" id="firstName" placeholder="Voornaam" /> 
                      <input type="text" id="lastName" placeholder="Achternaam" />
                      <input type="email" id="emailInput" placeholder="Email" /> 
                      <a href="index.html"><button className={genstyles.button}>Stuur Invite</button></a>
                  </div> */}
                  <form >
                      <input type="email" id="companyEmail" placeholder="Email"/> 
                      <br /><br />
                      <input type="text" id="companyPass" placeholder="Wachtwoord"/>
                      <br /><br />
                      <input type="text" id="companyPass2" placeholder="Herhaal hachtwoord"/> 
                      <br /><br />
                      <input type="submit" value="Submit" className={genstyles.submmitbutton} />
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