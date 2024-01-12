import Employee from '../Models/Employee_Model';
import { Alert } from 'react-native';


class ActivateAccountController {
    static ActivationCodeCheck = async (email: string, activation_key: string, t: Function, navigation: any, page_key: string) => {
        
        // fetch from api
        let response = await fetch('http://10.0.2.2:5000/api/employee/activate/code', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                activation_key: activation_key,
            }),
        });

        // Check if the response is ok
        if (!response.ok) {
            Alert.alert('Error', `HTTP ${response.status}: Invalid activation key`);
            return;
        }

        // Get the data from the response
        let data = await response.json();

        // alert for wrong activation code
        if (!data) 
        {
            Alert.alert(t('code_error'), t('code_error_text'));
            return;
        }
    
        // Check if the data contains the employee data
        let employeeData = data;
        if (!employeeData) {
            Alert.alert(t('employee_data_error'), t('employee_data_error_text'));
            return;
        }

        // Create an employee object
        let employee = new Employee(employeeData.id, employeeData.email, employeeData.first_name, employeeData.last_name, employeeData.keepschedule, employeeData.company_name, employeeData.full_schedule);
        if (employee) 
        {
            // Email exists, navigate to the ChangePassword screen with user data
            navigation.navigate("ChangePassword", { employee, page_key });
        } else 
        {
            return;
        }
    }
}

export default ActivateAccountController;