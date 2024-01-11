import React, { useState } from 'react';
import { Link } from 'react-router-dom';  
import logo from './img/buurtboer_logo.png'; 
import postlogin from './Stylesheets/PostLogin.module.css';
import genstyles from "./Stylesheets/GeneralStyles.module.css"
import Navbar from './Navbar';
import withAuthentication from '../Controllers/withAuthentication';
import { useTranslation } from 'react-i18next';


function ChooseOrder(){
    const { t } = useTranslation();
    return (
        <div>
            <Navbar />

            <div className={`container ${postlogin.page_container}  mt-5 p-5`}>
                <div className="d-flex justify-content-center w-100">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form_items ms-5 justify-content-center p-5">
                                <h2>{t('order_from')}</h2>
                                <div className="justify-content-center">
                                    <a href='AH_order'><button className={genstyles.button}>Albert Hein</button> </a>
                                    <a href="Buurtboer_Order"> <button className={genstyles.button}>Buurtboer</button> </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default withAuthentication(ChooseOrder);