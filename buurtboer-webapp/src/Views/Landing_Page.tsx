// Temp Landing Page

import React from 'react';
import { Link } from 'react-router-dom';
import logo from './img/buurtboer_logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import withAuthentication from '../Controllers/withAuthentication';


export function Landing_Page() {
 
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="title">Welkom bij Buurtboer</div>
                        <div className="sub-title">De online supermarkt voor op het werk!!!!1!!!!!!!1!!!1!!!uitroepteken</div>
                        <div className="button">
                            <Link to="/Login" className="link">Login</Link>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <img src={logo} alt="Buurtboer Logo" className="Buurtboerlogo" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Landing_Page;