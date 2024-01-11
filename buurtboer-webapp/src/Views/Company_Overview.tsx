import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import genstyles from './Stylesheets/GeneralStyles.module.css';
import postlogin from './Stylesheets/PostLogin.module.css';
import Cross from "./img/kruisje_projectC.png";
import { useCompaniesOverviewController } from '../Controllers/Company_OverviewController';
import withAuthentication from '../Controllers/withAuthentication';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'; 

interface Company {
  id: number;
  name: string;
}

function CompanyOverview() {
  const { t } = useTranslation();
  const { GetAllCompanies, RemoveCompany, companies } = useCompaniesOverviewController();
  const [companiesList, setCompaniesList] = useState<Company[]>(companies);

  useEffect(() => {
    GetAllCompanies();
  }, []);

  useEffect(() => {
    setCompaniesList(companies);
  }, [companies]);

  const handleRemoveCompany = async (companyId: number) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete 1 company?`);

    if (confirmDelete) {
      await RemoveCompany(companyId);
      setCompaniesList(companiesList.filter(company => company.id !== companyId));
    }
  };

 
  return (
    <div>
      <Navbar />

      <div className={`container ${postlogin.page_container}  mt-5 p-5`}>
        <h2 className="text-center">Bedrijf Overview</h2>
        <div className="middle-buttons-container col-lg-7 content mt-5 mx-auto center-align">
          <div className="left-align top-buttons-container">
            <a href="Invite_Company">
              <button className={genstyles.button}>{t('add_company')}</button> 
            </a>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col-11">{t('Company_name')}</th>
                <th scope="col-1"></th>
              </tr>
            </thead>
            <tbody>
            {companiesList.map((company: Company) => (
            <tr key={company.id}>
              <td>
              <Link to={`/Employee_Overview/${company.id}`}>
                {company.name}
              </Link>
              </td>
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

export default withAuthentication(CompanyOverview, "/Login", true);
