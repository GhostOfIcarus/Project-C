import { useState, FormEvent, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { useTranslation } from 'react-i18next';

interface localJwtPayload {
  given_name: string;
  family_name: string;
  email: string;
  name: string;
}

interface ErrorMessages {
  name: string;
  message: string;
}



interface GoogleAccountsResponse {
  credential: string;
}

const clientID = "1075521165727-h558b9b3eg32llcsq606gbqbsvipjaqt.apps.googleusercontent.com";
declare global {
  interface Window {
    google: any;
  }
}

export function useLoginController() {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState<ErrorMessages>({ name: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [loginFailed, setLoginFailed] = useState<boolean>(false);
  const [role, setRol] = useState<string>('');
  const [user, setUser] = useState({});
  const errorMessages: { email: string; Pass: string } = {
    email: t('invalid_email'),
    Pass: t('invalid_password'),
  };


  const renderErrorMessage = (name: string) =>
    name === errorMessage.name && <div className='error'>{errorMessage.message}</div>;

    const handleGoogleSignIn = (response: GoogleAccountsResponse) => {
      console.log("Encoded JWT token: ", response.credential);
      var userObject: localJwtPayload = jwtDecode(response.credential);
      console.log(userObject);
  
      // Check if the user exists in the database
      axios.post('http://localhost:5000/api/check-email', { email: userObject.email })
        .then((response) => {
          if (response.data.emailExists) {
            console.log("User", userObject.email, "already exists");
  
            axios.post('http://localhost:5000/api/CompanyAdmin/login-google', {
              email: userObject.email,
            }, {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json'
              }
            })
              .then((loginResponse) => {
                const { token, userData } = loginResponse.data;
                setIsSubmitted(true);
                setRol('CompanyAdmin');
              })
              .catch((loginError) => {
                console.error('Error during CompanyAdmin login', loginError);
              });
  
          } else {
            console.error("User does not exist, inserting into the database: ", userObject.email);
            // // Insert the user into the database
            // axios.post('http://localhost:5000/api/admin/registerAdmin', {
            //   admin_first_name: userObject.given_name,
            //   admin_last_name: userObject.family_name,
            //   company_name: userObject.name,
            //   full_schedule: false, // Set the company name accordingly
            //   email: userObject.email,
            //   password: ''
            // })
            //   .then((insertResponse) => {
            //     console.log("User inserted successfully");
            //   })
            //   .catch((insertError) => {
            //     console.error("Error inserting user into the database", insertError);
            //   });
          }
        })
        .catch((error) => {
          console.error("Error checking user in the database", error);
        });
  
      // Set user and hide sign-in div
      setUser(userObject);
      const signInDiv = document.getElementById("signInDiv");
      if (signInDiv) {
        // signInDiv.hidden = true;
      } else {
        console.error("Element with ID 'signInDiv' not found");
      }
    };
  
    const handleSignOut = () => {
      setUser({});
      const signInDiv = document.getElementById("signInDiv");
      if (signInDiv) {
        signInDiv.hidden = false;
      } else {
        console.error("Element with ID 'signInDiv' not found");
      }
      console.log("user", user, "successfully signed out");
    };

    useEffect(() => {
      /* global google */
      google.accounts.id.initialize({
        client_id: clientID,
        callback: handleGoogleSignIn
      });
  
      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "large" }
      );
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    
      const form = event.currentTarget;
      const email = form.Email.value;
      const password = form.Pass.value;
    
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
          setIsSubmitted(true);
          setRol('CompanyAdmin');
          return;
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        console.log(error);
        if (axiosError.response && axiosError.response.status === 401) {
          // If Company Admin login failed, try Super Admin login
          console.log('super admin attempt')
          try {
            const response = await axios.post('http://localhost:5000/api/SuperAdmin/login', {
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
              setIsSubmitted(true);
              setRol('SuperAdmin')
            }
          } catch (error) {
            console.log(error);
            setLoginFailed(true);
            setErrorMessage({ name: 'email', message: errorMessages.email });
          }
        } else {
          setLoginFailed(true);
          setErrorMessage({ name: 'email', message: errorMessages.email });
        }
      }
    };
    

  return { isSubmitted, loginFailed, renderErrorMessage, handleSubmit, role, user, handleSignOut };
}