import { useState, FormEvent } from 'react';
import axios, { AxiosError } from 'axios';

interface ErrorMessages {
  name: string;
  message: string;
}

const errorMessages: { email: string; Pass: string } = {
  email: 'Invalid email',
  Pass: 'Invalid password',
};

export function useLoginController() {
  const [errorMessage, setErrorMessage] = useState<ErrorMessages>({ name: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [loginFailed, setLoginFailed] = useState<boolean>(false);

  const renderErrorMessage = (name: string) =>
    name === errorMessage.name && <div className='error'>{errorMessage.message}</div>;

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
          return;
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        console.log(error);
        if (axiosError.response && axiosError.response.status === 401) {
          // If Company Admin login failed, try Super Admin login
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

  return { isSubmitted, loginFailed, renderErrorMessage, handleSubmit };
}