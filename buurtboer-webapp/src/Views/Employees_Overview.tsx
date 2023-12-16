import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // Assuming you are using React Router
import postlogin from './Stylesheets/PostLogin.module.css';
import genstyles from './Stylesheets/GeneralStyles.module.css';
import Cross from "./img/kruisje_projectC.png";
import withAuthentication from '../Controllers/withAuthentication';
import Navbar from './Navbar';
import { useEmployeesOverviewController } from '../Controllers/Employees_OverviewController';

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
}

function EmployeesOverview() {
  const{ fetchEmployees, employees } = useEmployeesOverviewController();
  const [employeesList, setEmployeesList] = useState<Employee[]>(employees);

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    setEmployeesList(employees);
  }, [employees]);

  return (
    <div>
      <Navbar />

      <div className={`container ${postlogin.page_container}  mt-5 p-5`}>
        <h2 className="text-center">Medewerker Overview</h2>
        <div className="middle-buttons-container col-lg-7 content mt-5 mx-auto center-align">
          <div className="left-align top-buttons-container">
            <a href="Invite_Employee">
              <button className={genstyles.button}>Medewerker Toevoegen</button>
            </a>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col-11">Employee name</th>
                <th scope="col-1"></th>
              </tr>
            </thead>
            <tbody>
            {employeesList.map((employee: Employee) => (
            <tr key={employee.id}>
              <td>{employee.first_name} {employee.last_name}</td>
              <td className='text-end'>
                <img
                  src={Cross}
                  alt="cross"
                  className={postlogin.delete_cross}
                  // onClick={() => handleRemoveCompany(company.id)}
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

export default withAuthentication(EmployeesOverview);