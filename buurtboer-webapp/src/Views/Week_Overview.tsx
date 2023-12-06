import React, { useState } from 'react';
import { Link } from 'react-router-dom';  
import logo from './img/buurtboer_logo.png'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Stylesheets/Invite_Employee.module.css';
import postlogin from './Stylesheets/PostLogin.module.css';
import Navbar from './Navbar';


function Invite_Employee() {
 
  return (
    <>
      <Navbar />

      <div className="container justify-content-center mt-5 p-5">
        <div className="d-flex justify-content-center w-100">
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
      </div>
    </>
  );
}

export default Invite_Employee;
