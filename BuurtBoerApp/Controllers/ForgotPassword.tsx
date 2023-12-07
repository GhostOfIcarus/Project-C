import Employee from '../Models/Employee_Model';
import loginData from './../Models/loginData.json';
import { Alert } from 'react-native';

export const handleSend = async (email: string, navigation: any, t: Function) => {
  // Check if the entered email exists in the JSON file
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

  if (!data) {
    Alert.alert(t('email_error'), t('email_error_text'));
    return;
  }

  console.log(data); // inspect the response

  let employeeData = data;
  if (!employeeData) {
    Alert.alert('Error', 'Employee data not found in the response');
    return;
  }
  
  let employee = new Employee(employeeData.id, employeeData.email, employeeData.first_name, employeeData.last_name, employeeData.keepschedule);

  if (employee) {
    // Email exists, navigate to the ChangePassword screen with user data
    navigation.navigate("ChangePassword", { employee });
  } else {
    // Email doesn't exist, show an alert
    Alert.alert(t('email_error'), t('email_error_text'));
  }
};