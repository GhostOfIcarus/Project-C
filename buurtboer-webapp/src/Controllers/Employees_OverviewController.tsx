import { useState, FormEvent, useEffect } from 'react';
import axios from 'axios';

export interface UserData{
    userId: any;
    firstName: string;
    lastName: string;
    email: string;
    userRole: string;
  }

  export function useEmployeesOverviewController() {
    const [employees, setEmployees] = useState([]);
    const [userdata, setUserData] = useState<UserData | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/auth', {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          });
  
          const userData = response.data.userData;
          await setUserData(userData);
        } catch (error) {
          // Handle error
        }
      };
  
      fetchData();
    }, []); // Empty dependency array to run the effect only once when the component mounts
  
    useEffect(() => {
      if (userdata) {
        fetchEmployees();
      }
    }, [userdata]);
  
    useEffect(() => {
      console.log("Employees state updated:", employees);
    }, [employees]); // Log whenever the employees state changes
  
    const fetchEmployees = async () => {
      try {
        const response = await axios.post(
          'http://localhost:5000/api/employee/company',
          {
            company_id: userdata?.userId,
          },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
          
        console.log(response);

        if (response.data && response.data.length > 0) {
          console.log("Employees found: ", response.data);
          const employeesData = response.data.map((employee: any) => ({
            id: employee.id,
            first_name: employee.first_name,
            last_name: employee.last_name,
          }));
          await setEmployees(employeesData);
          // console.log("setemployees: ", employees);
        } else {
          console.log("No employees found");
        }
      } catch (error) {
        console.log('Error fetching employees:', error);
      }
    };
  
    const RemoveEmployee = async (id: number) => {
      const employee_id = id;
      try {
        const response = await axios({
          method: 'delete',
          url: 'http://localhost:5000/api/employee/delete',
          data: {
            employee_id,
          },
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.data) {
          console.log(response.data);
        }
      } catch (error) {
        console.log('Error removing employee:', error);
      }
    };
  
    return {
      fetchEmployees,
      employees,
      RemoveEmployee,
    };
  }
  