import { useState, useEffect } from 'react';
import i18next from 'i18next';
import axios from 'axios';

interface UserData {
}

export interface AdminInfo {
  adminName: string;
  adminEmail: string;
  companyName: string;
  userRole: string;
  // Add other fields as needed
}

export function SettingsController() {
  const [language, setLanguage] = useState(i18next.language);
  const [userdata, setUserData] = useState<UserData | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userPass, setUserPass] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth', {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        const userData = response.data.userData;
        setUserData(userData);

        const userRole = userData.userRole;
        const userEmail = userData.email;
        const userPass = userData.password;

        setUserRole(userRole);
        setUserEmail(userEmail);
        setUserPass(userPass);
        console.log(userData);
        console.log('fetched data')
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error based on your requirements
      }
    };

    fetchData();
  }, []);

  const fetchAdminInfo = async () => {
    try {
      let apiUrl;
      console.log('made it to fetchAdminInfo');
      if (userRole === 'CompanyAdmin') {
        console.log('sees userRole');
        apiUrl = 'http://localhost:5000/api/admin/singleadmin';
      } else if (userRole === 'SuperAdmin') {
        apiUrl = 'http://localhost:5000/api/SuperAdmin/singlesuperadmin';
      } else {
        throw new Error('Invalid role');
      }
  
      const response = await axios.get(apiUrl, {
        params: {
          email: userEmail, // Make sure to replace these with actual values
          password: userPass, // Replace with actual value
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching admin info:', error);
      return null;
    }
  };

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
    fetchAdminInfo,
  };
}
