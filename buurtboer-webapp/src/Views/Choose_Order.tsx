import React, { useState } from 'react';
import { Link } from 'react-router-dom';  
import logo from './img/buurtboer_logo.png'; 
import postlogin from './Stylesheets/PostLogin.module.css';
import genstyles from "./Stylesheets/GeneralStyles.module.css"
import Navbar from './Navbar';

function ChooseOrder(){
    return (
        <div>
            <Navbar />

            <div className={`container ${postlogin.page_container}  mt-5 p-5`}>
                <div className="d-flex justify-content-center w-100">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form_items ms-5 justify-content-center p-5">
                                <h2>Bestellen via:</h2>
                                <div className="justify-content-center">
                                    <button className={genstyles.button}>Albert Hein</button>
                                    <button className={genstyles.button}>Buurtboer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ChooseOrder;