import Employee from '../Models/Employee_Model';
import { Alert, LogBox } from 'react-native';
import bcrypt from 'react-native-bcrypt';

LogBox.ignoreLogs(['Using Math.random is not cryptographically secure!']);

class ChangePasswordController {
  static containsSpecialChar(password: string) {
    const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return regex.test(password);
  }

  static CheckPassword = (password: string, confirmPassword: string, t: Function) => {
    // check if password is minimum 7 characters long
    if (password.length < 7) {
      Alert.alert(t('password_lenght_error'), t('password_lenght_error_text'));
      return false;
    }
    // check if password contains a special character
    if (!ChangePasswordController.containsSpecialChar(password)) {
      Alert.alert(t('password_special_char_error'), t('password_special_char_error_text'));
      return false;
    }
    //Check if password and confirm password are the same
    if (password !== confirmPassword) {
      Alert.alert(t('password_match_error'), t('password_match_error_text'));
      return false;
    }
    return true;
  }

  static handleChangePassword = async (password: string, confirmPassword: string, navigation: any, employee: Employee, t: Function, page_key: string) => {
    if (!ChangePasswordController.CheckPassword(password, confirmPassword, t)) {
      return;
    }
    // Hash the password with bcrypt
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    // Send the request to the server
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

    // Check if the response is ok
    if (!response.ok) {
      const responseBody = await response.json();
      Alert.alert('Error', responseBody.error || `HTTP ${response.status}: ${response.statusText}`);
      return;
    }

    let deleteresponse = await fetch('http://10.0.2.2:5000/api/activate/code/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        employee_id: employee.id,
      }),
    });

    // Check if the response is ok
    if (!deleteresponse.ok) {
      const responseBody = await response.json();
      Alert.alert('Error', responseBody.error || `HTTP ${response.status}: ${response.statusText}`);
      return;
    }
    if (page_key == "activate_account") {
      Alert.alert(t('succes'),t('account_activation_success'));
    }
    else if (page_key == "change_password") {
      Alert.alert(t('succes'),t('password_change_success'));
    }
    navigation.navigate("Login");
  };
}

export default ChangePasswordController;