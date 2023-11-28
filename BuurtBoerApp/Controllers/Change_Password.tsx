import Employee from './../Models/Employee';
import loginData from './../Models/loginData.json';
import { Alert } from 'react-native';

export const handleChangePassword = (password: string, confirmPassword: string, navigation: any, employee: Employee) => {
  if (password !== confirmPassword) {
    // Passwords do not match, show an alert
    Alert.alert('Passwords Do Not Match', 'Please make sure the passwords match.');
  } else {
    // Passwords match, update the password in the JSON file and navigate to the Login screen
    // Note: Updating the JSON file might not be possible depending on your setup
    // You might need to make an API call to update the password in your database
    const employeeIndex = loginData.users.findIndex((u: Employee) => u.email === employee.email);
    if (employeeIndex !== -1) {
      loginData.users[employeeIndex].password = password;
    }
    navigation.navigate("Login");
  }
};