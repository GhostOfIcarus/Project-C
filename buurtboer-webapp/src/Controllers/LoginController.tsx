import { useState, FormEvent } from 'react';
import axios from 'axios';

interface ErrorMessages {
  name: string;
  message: string;
}

const errorMessages: { email: string; Pass: string } = {
  email: 'email error',
  Pass: 'invalid password',
};

export function useLoginController() {
  const [errorMessage, setErrorMessage] = useState<ErrorMessages>({ name: '', message: errorMessages.email });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

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
            headers: {
              'Content-Type': 'application/json'
            }
          });

          console.log(response);
          console.log(response.data);

          if (response.data.email !== email || response.data.password !== password) {
            response = await axios.post('http://localhost:5000/api/SuperAdmin/login', {
              email,
              password
            }, {
              headers: {
                'Content-Type': 'application/json'
              }
            });

            console.log(response);
            console.log(response.data);
          }

          if (response.data.email === email && response.data.password === password) {
            setIsSubmitted(true);
          }
        } catch (error) {
          console.log(error);
          setErrorMessage({ name: 'email', message: errorMessages.email });
        }


    };

  return { isSubmitted, renderErrorMessage, handleSubmit };
}
