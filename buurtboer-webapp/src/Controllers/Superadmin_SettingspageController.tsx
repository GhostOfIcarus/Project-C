import { useState, useEffect } from 'react';
import i18next from 'i18next';
import axios from 'axios';

interface UpdatedSuperAdminInfo {
  admin_first_name?: string;
  admin_last_name?: string;
  company_name?: string;
  full_schedule?: boolean;
  email?: string;
  password?: string;
}

export const updateSuperAdminInfo = async (superadminId: string, updatedSuperAdminInfo: UpdatedSuperAdminInfo) => {
  try {
    const response = await axios.post('http://localhost:5000/api/SuperAdmin/updateSuperAdmin', {
      superadminId,
      ...updatedSuperAdminInfo,
    });

    console.log(response);

    if (response.data.message === 'Super admin information updated successfully') {
      console.log('Super admin information updated successfully');
    } else {
      console.error('Unexpected response:', response.data);
    }

    return response.data.success; // Assuming your API sends a success flag
  } catch (error) {
    console.error('Error updating super admin information:', error);
    throw error; // Rethrow the error to handle it in the component
  }
}

export function LanguageTranslator() {
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
