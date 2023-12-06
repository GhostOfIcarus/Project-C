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


//TODO: add error handling
export function ChangePasswordController(){
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
  
      // Check if the passwords match 
      //TODO: add thingy that checks if the password is equal to the one of the user, if so password change not succesfull
      if (newPassword === confirmPassword) {
        // Passwords match, you can update the user's password or perform other actions
        console.log('Password change successful!');
      } else {
        // Passwords do not match, you can handle this case (e.g., show an error message)
        console.error('Passwords do not match!');
      }
  
      // Set the submission state
      setIsSubmitted(true);
    
    }

    return{}

}
