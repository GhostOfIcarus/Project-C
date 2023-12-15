// import { Component} from 'react';
// import logo from './img/buurtboer_logo.png'; 
// import postlogin from './Stylesheets/PostLogin.module.css';
// import Navbar from './Navbar';
// //import styling from './Stylesheets/Company_overview.module.css';
// //TODO:fix css so we can actually use the stuff

// function EmployeesOverview() {
//     return (
//       <div>
//         <Navbar />
  
//         <div className={`container ${postlogin.page_container}  mt-5 p-5`}>
//           <h2>Medewerker overview</h2>
//           <div className="middle-buttons-container col-lg-5 content mt-5 mx-auto center-align">
//             <div className="left-align top-buttons-container">
//               <a href="Invite_Company"><button className="m-button">Medewerker toevoegen</button></a>
//             </div>
//             <button className="middle-button">Medewerker 1</button>
//             <button className="middle-button">Medewerker 2</button>
//             <button className="middle-button">Medewerker 3</button>
//           </div>
//         </div>
//       </div>
//     );
//   }
  
//   export default EmployeesOverview;


import React from 'react';
import { Link } from 'react-router-dom';  // Assuming you are using React Router
import postlogin from './Stylesheets/PostLogin.module.css';
import genstyles from './Stylesheets/GeneralStyles.module.css';
import withAuthentication from '../Controllers/withAuthentication';
import Navbar from './Navbar';


function EmployeesOverview() {
  return (
    <div>
      <Navbar />

      <div className={`container ${postlogin.page_container} mt-5 p-5 ${genstyles.title}`}>
        <h2>Medewerker Overview</h2>
        <div className="middle-buttons-container col-lg-5 content mt-5 mx-auto center-align">
          <div className="left-align top-buttons-container">
            <Link to="Invite_Company">
              <button className="m-button">Medewerker toevoegen</button>
            </Link>
          </div>
          <table className="table mt-3">
            <tbody>
              {/* array.forEach(element => {
                
              }); */}
              <tr>
                <td style={{ textAlign: 'left' }}><Link to="/Employee_Week_Overview/{id}">Medewerker 1</Link></td>
                <td>X</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'left' }}><Link to="/Employee_Week_Overview">Medewerker 2</Link></td>
                <td>X</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'left' }}><Link to="/Employee_Week_Overview">Medewerker 3</Link></td>
                <td>X</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </div>
  );
}

export default withAuthentication(EmployeesOverview);