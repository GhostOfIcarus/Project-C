import { useState, FormEvent } from 'react';

interface User {
  email: string;
  password: string;
}

interface ErrorMessages {
  name: string;
  message: string;
}

const database: User[] = [
  {
    email: 'user1@binky.com',
    password: 'pass1',
  }
];

const errors: { email: string; Pass: string } = {
  email: 'invalid email',
  Pass: 'invalid password',
};

export function useLoginController() {
  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({ name: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const renderErrorMessage = (name: string) =>
    name === errorMessages.name && <div className='error'>{errorMessages.message}</div>;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { Email, Pass } = event.currentTarget.elements as any;

    const userData = database.find((user) => user.email === Email.value);

    if (userData) {
      if (userData.password !== Pass.value) {
        setErrorMessages({ name: 'Pass', message: errors.Pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      setErrorMessages({ name: 'Email', message: errors.email });
    }
  };

  return { isSubmitted, renderErrorMessage, handleSubmit };
}