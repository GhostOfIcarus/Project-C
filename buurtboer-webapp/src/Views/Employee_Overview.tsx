import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './img/buurtboer_logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import postlogin from './Stylesheets/PostLogin.module.css';
import Navbar from './Navbar';
import withAuthentication from '../Controllers/withAuthentication';
import Login from './Login';
import { useEmpOverviewController } from '../Controllers/Employee_OverviewController';

function Employee_Overview() {
  const{ isSubmitted, handleSubmit, countMonday, countTuesday, countWednesday, countThursday, countFriday, absentMonday,
    absentTuesday,
    absentWednesday,
    absentThursday,
    absentFriday,} = useEmpOverviewController();

  return (
    <>
      <Navbar />
       {/* Week selecteren */}
       <div className={`container ${postlogin.page_container}  mt-5 p-5`}>
        <div className="d-flex justify-content-center w-100">
          <div className="row">
            <div className="col-lg-12 ">
              <h1>Medewerker Overview</h1>
              <form onSubmit={handleSubmit}>
                  <input type="week" id="week" name="week" />
                  <input type="submit" value="Submit" />
              </form>

              {/* Tabel voor aanwezigen (wordt later verbonden met de week die geselecteerd is) */}
              <table className="table roundedCorners">
                  <thead>
                      <tr>
                          <th>Datum</th>
                          <th>Aanwezig</th>
                          <th>Afwezig</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>Maandag</td>
                          <td>{countMonday}</td>
                          {/*moet nog aangepast worden naar (totalEmployeesByCompany - countMonday)*/}
                          <td>{absentMonday}</td>
                      </tr>
                      <tr>
                          <td>Dinsdag</td>
                          <td>{countTuesday}</td>
                          <td>{absentTuesday}</td>
                      </tr>
                      <tr>
                          <td>Woensdag</td>
                          <td>{countWednesday}</td>
                          <td>{absentWednesday}</td>
                      </tr>
                      <tr>
                          <td>Donderdag</td>
                          <td>{countThursday}</td>
                          <td>{absentThursday}</td>
                      </tr>
                      <tr>
                          <td>Vrijdag</td>
                          <td>{countFriday}</td>
                          <td>{absentFriday}</td>
                      </tr>
                  </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default withAuthentication(Employee_Overview);
