import React, { useState } from 'react';
import axios from 'axios';

export async function fetchUserData(email: string): Promise<boolean> {
  const apiUrl = '/api/employee/forgot_password';

  try {
    // Perform validation or any other necessary checks on the email here

    const response = await axios.post(apiUrl, { email });

    // Check if the email exists in the database
    return response.data ? true : false;
  } catch (error) {
    // Handle errors appropriately
    throw error;
  }
}
  

