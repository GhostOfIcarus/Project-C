import React, { useState, MouseEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';  
import 'bootstrap/dist/css/bootstrap.min.css';
import postlogin from './Stylesheets/PostLogin.module.css';
import Navbar from './Navbar';
import genstyles from './Stylesheets/GeneralStyles.module.css';
import withAuthentication from '../Controllers/withAuthentication';


function Invite_Employee() {
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [employeeFirstName, setEmployeeFirstName] = useState('');
  const [employeeLastName, setEmployeeLastName] = useState('');
  const [submitMessages, setSubmitMessages] = useState('');
  const navigate = useNavigate();

  
  const sendInvite = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if any input is empty and don't proceed with the submission if any input is empty
    if (!employeeEmail || !employeeFirstName || !employeeLastName) {
      setSubmitMessages("Vul alle velden in!");
      return;
    }

    setSubmitMessages("Uitnodiging verstuurd!");
    //console.log("First Name: ", employeeFirstName);

    // Send user input to Employee_Register in the mobile app 
    const emailURL = `?employeeEmail=${employeeEmail}&employeeFirstName=${employeeFirstName}&employeeLastName=${employeeLastName}`;
    navigate(`/Company_Register${emailURL}`);

    // Clear the input fields after succesfully sending out the invite
    setEmployeeEmail('');
    setEmployeeFirstName('');
    setEmployeeLastName('');
  }

  return (
    <>
      <Navbar />

      <div className={`container ${postlogin.page_container}  mt-5 p-5`}>
        <div className="d-flex justify-content-center w-100">
          <div className="row">
            <div className="col-lg-12">
                <div className="  form_items ms-5 justify-content-center p-5">
                  <h2>Medewerker uitnodigen</h2>
                  {/* <div className="justify-content-center">
                      <input type="text" id="firstName" placeholder="Voornaam" /> 
                      <input type="text" id="lastName" placeholder="Achternaam" />
                      <input type="email" id="emailInput" placeholder="Email" /> 
                      <a href="index.html"><button className={genstyles.button}>Stuur Invite</button></a>
                  </div> */}
                  <form onSubmit={sendInvite}>
                      <input type="email" id="emailInput" placeholder="Email" value={employeeEmail} onChange={(e) => setEmployeeEmail(e.target.value)}/> 
                      <br /><br />
                      <input type='text' id="firstName" placeholder="Voornaam" value={employeeFirstName} onChange={(e) => setEmployeeFirstName(e.target.value)}/> 
                      <br /><br />
                      <input type='text' id="lastName" placeholder="Achternaam" value={employeeLastName} onChange={(e) => setEmployeeLastName(e.target.value)}/>
                      <br /><br />
                      <button className={genstyles.submmitbutton} type="submit">Stuur uitnodiging</button>
                      {submitMessages && <div className={genstyles.error}>{submitMessages}</div>}
                  </form>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuthentication(Invite_Employee);
