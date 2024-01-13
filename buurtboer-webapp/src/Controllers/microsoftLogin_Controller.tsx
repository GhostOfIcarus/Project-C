import { useState, useEffect } from 'react';
import { PublicClientApplication, AuthenticationResult, PopupRequest } from '@azure/msal-browser';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useNavigate, Link } from 'react-router-dom';

interface RegisterCompanyResponse {
  message: string;
}

const checkEmailAvailability = async (email: string) => {
  try {
    const response = await axios.post('http://localhost:5000/api/check-email', { email });
    console.log(response.data.emailExists);
    return response.data.emailExists;
  } catch (error) {
    console.error('Error checking email availability:', error);
    return false;
  }
};

let pca: PublicClientApplication | null = null;

const msalConfig = {
  auth: {
    clientId: 'e13c76c9-6f15-4d1f-b08b-aca10921e19b',
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: 'http://localhost:3000',
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: true,
  },
};

export function useMicrosoftLogin() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoginInProgress, setIsLoginInProgress] = useState<boolean>(false);
  const [role, setRol] = useState<string>('');

  const msalInstance = new PublicClientApplication(msalConfig);

  const register = async () => {
    if (isLoginInProgress) {
      console.warn('Login is already in progress. Cancelling the existing interaction.');
      return;
    }

    setIsLoginInProgress(true);

    await msalInstance.initialize();
    try {
      const loginResponse = await msalInstance.loginPopup({
        scopes: ['user.read'],
        prompt: 'login',
      });

      if (loginResponse) {
        const graphResponse = await msalInstance.acquireTokenSilent({
          scopes: ['user.read'],
          account: loginResponse.account,
        });

        const userInfoResponse = await fetch('https://graph.microsoft.com/v1.0/me', {
          headers: {
            Authorization: `Bearer ${graphResponse.accessToken}`,
          },
        });

        const userInfo = await userInfoResponse.json();

        setUser(userInfo);
        console.log('successs');
        console.log(userInfo);
        const email = userInfo.mail;
        const lastname = userInfo.surname;
        const firstname = userInfo.givenName;

        return {email, lastname, firstname};
        //const EmailInDatabase = await checkEmailAvailability(userInfo.mail);
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const login = async () => {
    if (isLoginInProgress) {
      console.warn('Login is already in progress. Cancelling the existing interaction.');
      return;
    }

    setIsLoginInProgress(true);

    await msalInstance.initialize();
    try {
      const loginResponse = await msalInstance.loginPopup({
        scopes: ['user.read'],
        prompt: 'login',
      });

      if (loginResponse) {
        const graphResponse = await msalInstance.acquireTokenSilent({
          scopes: ['user.read'],
          account: loginResponse.account,
        });

        const userInfoResponse = await fetch('https://graph.microsoft.com/v1.0/me', {
          headers: {
            Authorization: `Bearer ${graphResponse.accessToken}`,
          },
        });

        const userInfo = await userInfoResponse.json();

        setUser(userInfo);
        console.log('successs');
        console.log(userInfo);
        console.log(userInfo.mail);

        const EmailInDatabase = await checkEmailAvailability(userInfo.mail);

        if (EmailInDatabase) {
          const email = userInfo.mail;
          const password = '';

          try {
            let response = await axios.post('http://localhost:5000/api/CompanyAdmin/login', {
              email,
              password
            }, {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json'
              }
            });

            if (response.data) {
              console.log(response.data);
              setRol('CompanyAdmin');
              navigate('/Employee_Overview');
              return;
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    } catch (error) {
      setIsAuthenticated(false);
      console.log('wahwah');
      console.log(error);
      console.log(isAuthenticated);
    }
  };



  return { login, register };
}
