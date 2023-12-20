import { useState, useEffect } from 'react';
import i18next from 'i18next';
import axios from 'axios';

interface UpdatedAdminInfo {
  admin_first_name?: string;
  admin_last_name?: string;
  company_name?: string;
  full_schedule?: boolean;
  email?: string;
  password?: string;
}

export interface AdminInfo {
  adminName: string;
  adminEmail: string;
  companyName: string;
  userRole: string;
  // Add other fields as needed
}


export const updateAdminInfo = async (adminId: string, updatedAdminInfo: UpdatedAdminInfo) => {
  try {
    const response = await axios.post('http://localhost:5000/api/admin/updateAdmin', {
      adminId,
      ...updatedAdminInfo,
    });
    console.log(response);
    if (response.data.message === 'Admin information updated successfully') {
      console.log('Admin information updated successfully');
    } else {
      console.error('Unexpected response:', response.data);
    }

    return response.data.success; // Assuming your API sends a success flag
  } catch (error) {
    console.error('Error updating admin information:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export function SettingsController() {
  const [language, setLanguage] = useState(i18next.language);
  

  useEffect(() => {
    const updateLanguage = () => {
      setLanguage(i18next.language);
    };

    i18next.on('languageChanged', updateLanguage);

    return () => {
      i18next.off('languageChanged', updateLanguage);
    };
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'nl' : 'en';
    setLanguage(newLanguage);
    i18next.changeLanguage(newLanguage);
    storeLanguage(newLanguage);
    console.log('Language toggled to:', newLanguage);
  };

  const setLanguageDirectly = (newLanguage: string) => {
    setLanguage(newLanguage);
    i18next.changeLanguage(newLanguage);
    storeLanguage(newLanguage);
    console.log('Language set directly to:', newLanguage);
  };

  const storeLanguage = (newLanguage: string) => {
    localStorage.setItem('language', newLanguage);
  };


  return {
    language,
    toggleLanguage,
    setLanguage: setLanguageDirectly,
  };
}
