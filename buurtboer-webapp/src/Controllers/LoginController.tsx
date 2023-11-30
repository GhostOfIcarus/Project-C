import { useState, FormEvent } from 'react';

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

    const { Email, Pass } = event.currentTarget.elements as any;

    const formData = {
      email: Email.value,
      password: Pass.value,
    };

    try {
      const response = await fetch('/api/employee/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: Email.value, password: Pass.value }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      // Handle successful login here (e.g., save user data to state, redirect to another page, etc.)
      setIsSubmitted(true);
    } catch (error: unknown) {
      console.error(error);
      // Handle failed login here (e.g., show an error message, clear the form, etc.)
      setErrorMessage({ name: 'Email', message: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  return { isSubmitted, renderErrorMessage, handleSubmit };
}
