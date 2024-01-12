import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios, { AxiosResponse } from 'axios';

export function Landing_Page() {
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/api/auth', {
        headers: {
          'Content-Type': 'application/json',
        },
            withCredentials: true,
        })
        .then((response: AxiosResponse) => {
          if (response.data.userData.userRole === 'SuperAdmin') {
            navigate('/Company_Overview');
          }
        })
        navigate('/Employee_Overview');
    }, [navigate]);

    return null;
}

export default Landing_Page;