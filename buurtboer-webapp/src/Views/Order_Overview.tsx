import React, { useState } from 'react';
import { Link } from 'react-router-dom';  
import Change from "./img/pen.png"
import Cross from "./img/kruisje_projectC.png"
import postlogin from './Stylesheets/PostLogin.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import genstyles from "./Stylesheets/GeneralStyles.module.css"
import Navbar from './Navbar';
import withAuthentication from '../Controllers/withAuthentication';


function OrderOverview(){

    return (
        <>
        <Navbar />
         <div className={`container ${postlogin.page_container}  mt-5 p-5`}>
          <div className="d-flex justify-content-center w-100">
            <div className="row">
              <div className="col-lg-12 ">
                <h1>Order Overview</h1>
                <button className={genstyles.button}>Voeg product toe</button>
                <table className="table table-bordered roundedCorners">
                    <thead>
                        <tr>
                            <th></th>
                            <th>aantal</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>product 1</td>
                            <td>
                                3
                            </td>
                                <img src={Change} alt="change" className={postlogin.productImage} />
                            <td>
                                
                            </td>
                            <td>
                                <img src={Cross} alt="cross" className={postlogin.productImage} />
                            </td>
                        </tr>
                        <tr>
                            <td>product 2</td>
                            <td>
                                3
                            </td>
                                <img src={Change} alt="change" className={postlogin.productImage} />
                            <td></td>
                            <td>
                                <img src={Cross} alt="cross" className={postlogin.productImage} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button className={genstyles.button}>Bestelling plaatsen</button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

export default withAuthentication(OrderOverview);