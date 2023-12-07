import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './img/buurtboer_logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import postlogin from './Stylesheets/PostLogin.module.css';
import Navbar from './Navbar';
import withAuthentication from '../Controllers/withAuthentication';
import Login from './Login';

function Employee_Overview() {

  return (
    <>
      <Navbar />
       {/* Week selecteren */}
       <div className={`container ${postlogin.page_container}  mt-5 p-5`}>
        <div className="d-flex justify-content-center w-100">
          <div className="row">
            <div className="col-lg-12 ">
              <h1>Medewerker Overview</h1>
              <form action="/action_page.php">
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
                          <td>8</td>
                          <td>2</td>
                      </tr>
                      <tr>
                          <td>Dinsdag</td>
                          <td>14</td>
                          <td>9</td>
                      </tr>
                      <tr>
                          <td>Woensdag</td>
                          <td>10</td>
                          <td>1</td>
                      </tr>
                      <tr>
                          <td>Donderdag</td>
                          <td>14</td>
                          <td>4</td>
                      </tr>
                      <tr>
                          <td>Vrijdag</td>
                          <td>14</td>
                          <td>6</td>
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
