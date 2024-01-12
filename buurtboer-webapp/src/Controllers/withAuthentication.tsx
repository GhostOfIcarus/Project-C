import React, { useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios'; 
import { useNavigate } from 'react-router-dom';

const withAuthentication = (WrappedComponent: React.FC, SendBackRoute: string = "/Login", superAdminOnly: boolean = false, sendToLandingPageIfAuthenticated: boolean = false) => {
  const WithAuthentication: React.FC = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      // Fetch authentication data from the API
      axios.get('http://localhost:5000/api/auth', {
        headers: {
          'Content-Type': 'application/json',
        },
            withCredentials: true,
      })
        .then((response: AxiosResponse) => {
          // User is authenticated, proceed to render the wrapped component
          if (superAdminOnly && response.data.userData.userRole !== 'SuperAdmin') {
            navigate(SendBackRoute);
          }

          else if (sendToLandingPageIfAuthenticated) {
            navigate('/');
          }
        })
        .catch((error: AxiosError) => {
          if (error.response?.status === 401) {
            // User is not authenticated, redirect to login page
            navigate(SendBackRoute);
          } 
          
          else {
            console.log('Error fetching authentication data:', error);
          }
        });
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };

  return WithAuthentication;
};

export default withAuthentication;
