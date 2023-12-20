import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Landing_Page() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/Login');
    }, [navigate]);

    return null;
}

export default Landing_Page;