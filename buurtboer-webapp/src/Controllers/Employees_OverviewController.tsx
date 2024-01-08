import { useState, FormEvent, useEffect } from 'react';
import axios from 'axios';

export interface UserData{
    userId: any;
    firstName: string;
    lastName: string;
    email: string;
    userRole: string;
  }


export interface ScheduleData {
  id: number;
  week_number: number;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean,
  thursday: boolean,
  friday: boolean,
  saturday: boolean,
  sunday: boolean
}

  export function useEmployeesOverviewController() {
    const [employees, setEmployees] = useState([]);
    const [userdata, setUserData] = useState<UserData | null>(null);
    const [schedule, setSchedule] = useState<ScheduleData | null>(null);
  
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
      // console.log("Employees state updated:", employees);
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
          
        console.log("companyID: ",userdata?.userId);

        if (response.data && response.data.length > 0) {
          // console.log("Employees found: ", response.data);
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
          // console.log(response.data);
        }
      } catch (error) {
        console.log('Error removing employee:', error);
      }
    };

    const fetchSchedule = async (id: number, week: number) => {
      try {
        const response = await axios.post(
          'http://localhost:5000/api/employee/schedule',
          {
            id,
            week
          },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
    
        if (response.data) {
          // console.log("response: ", response);
          // console.log("emp ID: ", id);
          // console.log("response data: ", response.data);
          // Use a functional update to avoid dependency on the current state
          await setSchedule(prevSchedule => {
            // Only update the state if the data has changed
            if (JSON.stringify(prevSchedule) !== JSON.stringify(response.data)) {
              return response.data;
            }
            // console.log("previous schedule: ", prevSchedule)
            return prevSchedule;
          });
        }
      } catch (error) {
        console.log('Error fetching schedule from employee: ', error);
      }
    }
    
    // useEffect(() => {
    //   console.log("SCHEDULE FR: ", schedule);
    // }, [schedule]);
  
    return {
      fetchEmployees,
      employees,
      RemoveEmployee,
      fetchSchedule,
      schedule
    };
  }
  