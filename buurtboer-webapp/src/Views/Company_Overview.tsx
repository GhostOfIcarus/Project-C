import React, { useState } from 'react';
import Navbar from './Navbar';
import genstyles from './Stylesheets/GeneralStyles.module.css';
import postlogin from './Stylesheets/PostLogin.module.css';
import Cross from "./img/kruisje_projectC.png";

function CompanyOverview() {
  const [companies, setCompanies] = useState([
    { id: 1, name: 'bedrijf 1' },
    { id: 2, name: 'bedrijf 2' },
    { id: 3, name: 'bedrijf 3' },
  ]);

  const removeCompany = (companyId : number) => {
    const updatedCompanies = companies.filter(company => company.id !== companyId);
    setCompanies(updatedCompanies);
  };

  return (
    <div>
      <Navbar />

      <div className={`container ${postlogin.page_container}  mt-5 p-5`}>
        <h2>Bedrijf Overview</h2>
        <div className="middle-buttons-container col-lg-5 content mt-5 mx-auto center-align">
          <div className="left-align top-buttons-container">
            <a href="Invite_Company">
              <button className={genstyles.button}>Bedrijf Toevoegen</button>
            </a>
          </div>
          {companies.map(company => (
            <div key={company.id} className="mb-3 d-flex justify-content-between align-items-center">
              <a>{company.name}</a>
              <img
                src={Cross}
                alt="cross"
                className={postlogin.productImage}
                onClick={() => removeCompany(company.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CompanyOverview;
