import Employee from '../Models/Employee_Model';
import { Alert, LogBox } from 'react-native';
import bcrypt from 'react-native-bcrypt';
import { useTranslation } from 'react-i18next';

LogBox.ignoreLogs(['Using Math.random is not cryptographically secure!']);

function containsSpecialChar(password: string) {
  const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return regex.test(password);
}

const CheckPassword = (password: string, confirmPassword: string, t: Function) => {
  // check if password is minimum 7 characters long
  if (password.length < 7) {
    Alert.alert(t('password_lenght_error'), t('password_lenght_error_text'));
    return false;
  }
  if (!containsSpecialChar(password)) {
    Alert.alert(t('password_special_char_error'), t('password_special_char_error_text'));
    return false;
  }
  if (password !== confirmPassword) {
    // Passwords do not match, show an alert
    Alert.alert(t('password_match_error'), t('password_match_error_text'));
    return false;
  }
  return true;
  
}

export const handleChangePassword = async (password: string, confirmPassword: string, navigation: any, employee: Employee, t: Function) => {
  if (!CheckPassword(password, confirmPassword, t)) {
    return;
  }
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
  Alert.alert(t('succes'),t('password_change_success'));
  navigation.navigate("Login");
};