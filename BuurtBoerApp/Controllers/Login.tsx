import { useState } from 'react';
import i18next from 'i18next';
import Employee from '../Models/Employee_Model';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import bcrypt from 'react-native-bcrypt';

export const useLoginController = () => {
  const [language, setLanguage] = useState(i18next.language);
  const [showPassword, setShowPassword] = useState(false);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'nl' : 'en';
    setLanguage(newLanguage);
    i18next.changeLanguage(newLanguage);
  };

  const handleLogin = async (email: string, password: string, navigation: any, rememberMe: boolean) => {
    let response = await fetch('http://10.0.2.2:5000/api/employee/forgot_password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });
  
    if (!response.ok) {
      Alert.alert('Error', `HTTP ${response.status}: ${response.statusText}`);
      return;
    }
  
    let data = await response.json();
    console.log(data); // inspect the response
  
    if (data.error) {
      Alert.alert('Error', data.error);
      return;
    }
    const passwordsMatch = bcrypt.compareSync(password, data.password);
  
    if (!passwordsMatch) {
      Alert.alert('Error', 'Employee data not found in the response');
      return;
    }
    let employeeData = data;
    let employee = new Employee(employeeData.id, employeeData.email, employeeData.first_name, employeeData.last_name, employeeData.keepschedule);
  
    if (rememberMe) {
      await AsyncStorage.setItem('user', JSON.stringify(employee));
    }
  
    navigation.reset({
      index: 0,
      routes: [{ name: 'Schedule_Form', params: { employee } }],
    });
  };

  const handleLogin2 = async (navigation: any, rememberMe: boolean) => {
    
    let employee = new Employee(1, "h", "h", "h", true);
  
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
    toggleLanguage,
    toggleShowPassword,
    handleLogin,
    handleLogin2,
  };
};





