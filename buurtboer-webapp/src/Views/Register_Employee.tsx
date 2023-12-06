import { Component } from "react";
import { Link } from "react-router-dom";
import genstyles from './Stylesheets/GeneralStyles.module.css';
import logo from "./img/buurtboer_logo.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export function Register_Employee() {
    
  const renderForm = (
    <>
      <div className={genstyles.title}>Registreren</div>
      <form>

        <input type="text" placeholder="Voornaam" name="FirstName" required />
        {/* renderErrorMessage('Voornaam') */}
        <input type="text" placeholder="Achternaam" name="LastName" required />
        {/* renderErrorMessage('Achternaam') */}
        <input type="email" placeholder="Email" name="Email" required />
        {/* renderErrorMessage('Email') */}
        <input type="password" placeholder="Wachtwoord" name="Pass" required />

        <div className={genstyles.login_button_div}>
          <button className={genstyles.button}>Maak Account</button>
          <Link to="/Login" className={genstyles.link}>
            Al een account? Log in
          </Link>
        </div>
      </form>
    </>
  );

  return (
    <div>
      <>
        <div className={genstyles.container}>
          <div className="row">
            <div className={`col-lg-6 ${genstyles.login_div}`}>{renderForm}</div>
            <div className={`col-lg-6 ${genstyles.image_div}`}>
              <img
                src={logo}
                alt="Buurtboer Logo"
                className={genstyles.Buurtboerlogo}
              />
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default Register_Employee;
