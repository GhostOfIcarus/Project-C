import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // Assuming you are using React Router
import postlogin from './Stylesheets/PostLogin.module.css';
import genstyles from './Stylesheets/GeneralStyles.module.css';
import Cross from "./img/kruisje_projectC.png";
import withAuthentication from '../Controllers/withAuthentication';
import Navbar from './Navbar';
import { useEmployeesOverviewController } from '../Controllers/Employees_OverviewController';
import { useEmpOverviewController } from '../Controllers/Employee_OverviewController';
import { useTranslation } from 'react-i18next';

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
}

function EmployeesOverview() {
  const { t } = useTranslation();
  const { fetchEmployees, employees, RemoveEmployee } = useEmployeesOverviewController();
  const [employeesList, setEmployeesList] = useState<Employee[]>(employees);


  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    setEmployeesList(employees);
  }, [employees]);

  const handleRemoveEmployee = async (employeeId: number) => {
    const confirmDelete = window.confirm(t('confirmDelete_employee'));

    if (confirmDelete) {
      await RemoveEmployee(employeeId);
      setEmployeesList(employeesList.filter((employee) => employee.id !== employeeId));
    }
  };

  return (
    <div>
      <Navbar />

      <div className={`container ${postlogin.page_container}  mt-5 p-5`}>
        <h2 className="text-center">{t('Employee_Overview')}</h2>
        <div className="middle-buttons-container col-lg-7 content mt-5 mx-auto center-align">
          <div className="left-align top-buttons-container col-lg-4">
            <Link to="/Invite_Employee">
              <button className={genstyles.button}>{t('add_employee')}</button>
            </Link>
          </div>
          {employeesList.length === 0 ? (
            <p className="text-center mt-3">{t('employeesNotFound')}</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col-11">{t('employee_name')}</th>
                  <th scope="col-1"></th>
                </tr>
              </thead>
              <tbody>
                {employeesList.map((employee: Employee) => (
                  <tr key={employee.id}>
                    <td>
                    <Link className={genstyles.link_button} to={`/Employee_Week_Overview/${employee.id}/${employee.first_name}/${employee.last_name}`}>
                      {employee.first_name} {employee.last_name}
                    </Link>
                    </td>
                    <td className='text-end'>
                      <img
                        src={Cross}
                        alt="cross"
                        className={postlogin.delete_cross}
                        onClick={() => handleRemoveEmployee(employee.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuthentication(EmployeesOverview);