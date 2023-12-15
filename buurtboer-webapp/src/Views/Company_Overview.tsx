import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import genstyles from './Stylesheets/GeneralStyles.module.css';
import postlogin from './Stylesheets/PostLogin.module.css';
import Cross from "./img/kruisje_projectC.png";
import { useCompaniesOverviewController } from '../Controllers/Company_OverviewController';

interface Company {
  id: number;
  name: string;
}

function CompanyOverview() {
  const { GetAllCompanies, RemoveCompany, companies } = useCompaniesOverviewController();
  const [companiesList, setCompaniesList] = useState<Company[]>(companies);

  useEffect(() => {
    GetAllCompanies();
  }, []);

  useEffect(() => {
    setCompaniesList(companies);
  }, [companies]);

  const handleRemoveCompany = async (companyId: number) => {
    await RemoveCompany(companyId);
    setCompaniesList(companiesList.filter(company => company.id !== companyId));
  };

 
  return (
    <div>
      <Navbar />

      <div className={`container ${postlogin.page_container}  mt-5 p-5`}>
        <h2 className="text-center">Bedrijf Overview</h2>
        <div className="middle-buttons-container col-lg-7 content mt-5 mx-auto center-align">
          <div className="left-align top-buttons-container">
            <a href="Invite_Company">
              <button className={genstyles.button}>Bedrijf Toevoegen</button>
            </a>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col-11">Company Name</th>
                <th scope="col-1"></th>
              </tr>
            </thead>
            <tbody>
            {companiesList.map((company: Company) => (
            <tr key={company.id}>
              <td>{company.name}</td>
              <td className='text-end'>
                <img
                  src={Cross}
                  alt="cross"
                  className={postlogin.delete_cross}
                  onClick={() => handleRemoveCompany(company.id)}
                />
              </td>
            </tr>
          ))}
              
            </tbody>
          </table>
          
        </div>
      </div>
    </div>
  );
}

export default CompanyOverview;
