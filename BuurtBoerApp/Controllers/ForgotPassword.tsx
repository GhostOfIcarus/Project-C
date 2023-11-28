import Employee from './../Models/Employee';
import loginData from './../Models/loginData.json';
import { Alert } from 'react-native';

export const handleSend = (email: string, navigation: any) => {
  // Check if the entered email exists in the JSON file
  const employee = loginData.users.find((u: Employee) => u.email === email);

  if (employee) {
    // Email exists, navigate to the ChangePassword screen with user data
    navigation.navigate("ChangePassword", { employee: new Employee(employee.email, employee.password) });
  } else {
    // Email doesn't exist, show an alert
    Alert.alert('Email Not Found', 'The entered email does not exist in our records.');
  }
};