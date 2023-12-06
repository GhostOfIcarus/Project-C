import Employee from '../Models/Employee_Model';
import loginData from './../Models/loginData.json';
import { Alert, LogBox } from 'react-native';
import bcrypt from 'react-native-bcrypt';
LogBox.ignoreLogs(['Using Math.random is not cryptographically secure!']);
export const handleChangePassword = async (password: string, confirmPassword: string, navigation: any, employee: Employee) => {
  if (password !== confirmPassword) {
    // Passwords do not match, show an alert
    Alert.alert('Passwords Do Not Match', 'Please make sure the passwords match.');
  } else {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    let response = await fetch('http://10.0.2.2:5000/api/employee/change_password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newPassword: hashedPassword,
        email: employee.email,
      }),
    });

    if (!response.ok) {
      // Parse the response body as JSON
      const responseBody = await response.json();
      // Display the error message from the server
      Alert.alert('Error', responseBody.error || `HTTP ${response.status}: ${response.statusText}`);
      return;
    }

    navigation.navigate("Login");
  }
};