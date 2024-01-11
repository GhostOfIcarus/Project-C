import React, { useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios'; // Import AxiosError
import { useNavigate } from 'react-router-dom';

const withAuthentication = (WrappedComponent: React.FC, SendBackRoute: string = "/Login", superAdminOnly: boolean = false) => {
  const WithAuthentication: React.FC = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      // Implement your authentication check here
      axios.get('http://localhost:5000/api/auth', {
        headers: {
          'Content-Type': 'application/json',
        },
            withCredentials: true,
      })
        .then((response: AxiosResponse) => {
          // User is authenticated, proceed
          if (superAdminOnly && response.data.userData.userRole !== 'SuperAdmin') {
            navigate(SendBackRoute);
          }
        })
        .catch((error: AxiosError) => {
          if (error.response?.status === 401) {
            // User is not authenticated, redirect to login page
            navigate(SendBackRoute);
          } 
          
          else {
            console.log('Error fetching authentication data:', error);
            // Handle other errors as needed
          }
        });
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };

  return WithAuthentication;
};

export default withAuthentication;
