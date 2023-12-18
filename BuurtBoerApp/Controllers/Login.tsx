import { useState } from 'react';
import i18next from 'i18next';
import Employee from '../Models/Employee_Model';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import bcrypt from 'react-native-bcrypt';

export const useLoginController = () => {
  // declare state variables
  const [language, setLanguage] = useState(i18next.language);
  const [showPassword, setShowPassword] = useState(false);

  // Get the language from the AsyncStorage
  const sync_language = async () => {
    const language = await AsyncStorage.getItem('language');

    if (language) {
      setLanguage(JSON.parse(language));
      i18next.changeLanguage(JSON.parse(language));
    }
  }

  // Toggle the language between English and Dutch
  const toggleLanguage = async () => {
    const newLanguage = language === 'en' ? 'nl' : 'en';
    setLanguage(newLanguage);
    i18next.changeLanguage(newLanguage);
    await AsyncStorage.setItem('language', JSON.stringify(newLanguage));
  };

  const handleLogin = async (email: string, password: string, navigation: any, rememberMe: boolean, t: Function) => {
    //check if it is an real email
    if (!email.includes("@")) {
      Alert.alert(t('invalid_email_error'), t('invalid_email_error_text'));
      return;
    }
    let response = await fetch('http://10.0.2.2:5000/api/employee/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    
    // Check if the response is ok
    if (!response.ok) {
      Alert.alert('Error', `HTTP ${response.status}: ${response.statusText}`);
      return;
    }
    
    // Get the data from the response
    let data = await response.json();
    if (!data) {
      Alert.alert(t('user_error'), t('user_error_text'));
      return;
    }
    console.log(data); 
  
    if (data.error) {
      Alert.alert('Error', data.error);
      return;
    }

    // Compaires the password with the hashed password
    const passwordsMatch = bcrypt.compareSync(password, data.password);
    if (!passwordsMatch) {
      Alert.alert(t('passowrd_incorrect_error'), t('passowrd_incorrect_error_text'));
      return;
    }
    let employeeData = data;
    let employee = new Employee(employeeData.id, employeeData.email, employeeData.first_name, employeeData.last_name, employeeData.keepschedule, employeeData.company_name);
    
    // Save data to AsyncStorage
    if (rememberMe) {
      await AsyncStorage.setItem('user', JSON.stringify(employee));
    }
    
    // Navigate to the Schedule_Form screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'Schedule_Form', params: { employee } }],
    });
  };

  const handleLogin2 = async (navigation: any, rememberMe: boolean) => {
    
    let employee = new Employee(1, "h", "h", "h", true, "beh");
  
    if (rememberMe) {
      await AsyncStorage.setItem('user', JSON.stringify(employee));
    }
  
    navigation.reset({
      index: 0,
      routes: [{ name: 'Schedule_Form', params: { employee } }],
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return {
    language,
    showPassword,
    sync_language,
    toggleLanguage,
    toggleShowPassword,
    handleLogin,
    handleLogin2,
  };
};





