import axios, { AxiosError, AxiosResponse } from 'axios';

interface RegisterCompanyResponse {
  message: string;
}

export async function registerCompanyController(
    adminFirstName: string,
    adminLastName: string,
    companyName: string,
    fullSchedule: boolean,
    adminEmail: string,
    adminPassword: string
  ): Promise<boolean> {
    const apiUrl = 'http://localhost:5000/api/admin/registerAdmin';
  
    try {
      const response: AxiosResponse<RegisterCompanyResponse> = await axios.post(apiUrl, {
        admin_first_name: adminFirstName,
        admin_last_name: adminLastName,
        company_name: companyName,
        full_schedule: fullSchedule,
        email: adminEmail,
        password: adminPassword,
      });
  
      if (response.status === 200 && response.data.message === 'Admin registration successful') {
        return true;
      } else {
        console.error('Unexpected response:', response);
        return false;
      }
    } catch (error) {
        const axiosError = error as AxiosError<unknown>;
        handleAxiosError(axiosError);
      return false;
    }
  }
  
function handleAxiosError(error: AxiosError<unknown>) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    } else if (error.request) {
      console.error('Request made but no response received:', error.request);
    } else {
      console.error('Error setting up the request:', error.message);
    }
  } else {
    console.error('Non-Axios error:', error);
  }
}
