import axios, { AxiosError } from 'axios';

export async function changePasswordController(newPassword: string, email: string): Promise<boolean> {
  const apiUrl = 'http://localhost:5000/api/change_password';
  try {
    const response = await axios.post(apiUrl, { newPassword, email });
    console.log('Response status:', response.status);
    console.log('Response data:', response.data);

    // Check if the password change was successful
    return response.status === 200 && response.data.message === 'Password changed successfully';
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error('Response data:', axiosError.response.data);
      console.error('Response status:', axiosError.response.status);
    } else if (axiosError.request) {
      console.error('Request made but no response received:', axiosError.request);
    } else {
      console.error('Error setting up the request:', axiosError.message);
    }
    throw error;
  }
}

