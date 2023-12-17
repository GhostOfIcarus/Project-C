import { useState, useEffect } from 'react';
import axios from 'axios';



export function useEmployeesOverviewController() {
    const [employees, setEmployees] = useState([]);
    const comp_id = 1; // You can replace this with the appropriate comp_id value

    // Fetch employees when the component mounts
    const fetchEmployees = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/employee/company', {
                company_id: comp_id
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            console.log('Response:', response);
    
            if (response.data && response.data.length > 0) {
                console.log(response.data);
                const employeesData = response.data.map((employee: { id: any; first_name: any; last_name: any; }) => ({
                    id: employee.id,
                    first_name: employee.first_name,
                    last_name: employee.last_name
                  }));
                setEmployees(employeesData);
                console.log('Employees:', response.data);
                console.log('First Name:', response.data[0].first_name);
            }
            else{
                console.log("wahwah")
            }
        } catch (error) {
            console.log('Error:', error);
        }
        
    };


    return {
        fetchEmployees,
        employees
    };
}
