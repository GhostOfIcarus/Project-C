import { useState, FormEvent, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

export interface AttendanceData {
  day: string;
  value: any;
}

export interface UserData{
  userId: any;
  firstName: string;
  lastName: string;
  email: string;
}

export interface EmployeeData{
  userId: any;
  firstName: string;
  lastName: string;
  email: string;
}

export function useEmpOverviewController() {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
  const [countMonday, setCountMonday] = useState<number>(0);
  const [countTuesday, setCountTuesday] = useState<number>(0);
  const [countWednesday, setCountWednesday] = useState<number>(0);
  const [countThursday, setCountThursday] = useState<number>(0);
  const [countFriday, setCountFriday] = useState<number>(0);
  const [absentMonday, setabsentMonday] = useState<number>(0);
  const [absentTuesday, setabsentTuesday] = useState<number>(0);
  const [absentWednesday, setabsentWednesday] = useState<number>(0);
  const [absentThursday, setabsentThursday] = useState<number>(0);
  const [absentFriday, setabsentFriday] = useState<number>(0);
  const [selectedWeek, setSelectedWeek] = useState<number>(0);
  const [userdata, setUserData] = useState<UserData | null>(null);
  const [allEmployees, setAllEmployees] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth', {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        // console.log("Response data: ", response.data);
        const userData = response.data.userData;
        // console.log(userData.firstName);
        setUserData(userData);
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, []);


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
        
      // console.log(response);

      if (response.data && response.data.length > 0) {
        // console.log("Employees found: ", response.data);
        const employeesCount = await response.data.length;
        await setAllEmployees(employeesCount);
        console.log("setemployees: ", allEmployees);
        // const totalEmployees = employeesCount.length;
        // console.log("Total Employees:", totalEmployees);
      } else {
        console.log("No employees found");
      }
    } catch (error) {
      console.log('Error fetching employees:', error);
    }
  };


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    
    const getAttendance = async (elements: FormEvent<HTMLFormElement>) => {
      elements.preventDefault();
      const form = event.currentTarget;
      const wn = form.elements.namedItem('week') as HTMLInputElement;
      const week_number = wn.value.split('-')[1].substring(1);
      // const comp_id = 1;

      try {
        await fetchEmployees();
        let response = await axios.post('http://localhost:5000/api/employees/attendance', {
          comp_id: userdata?.userId,
          week_number
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        

        console.log("binkybonky")
        console.log("company id:", userdata?.userId);

        if (response.data) {
          // console.log(response.data);
          // setSelectedWeek(50);
          return response.data;
        }
        // else{
        // const totalEmployees = allEmployees ? allEmployees.length : 0;
        // console.log("Total Employees:", totalEmployees);}
      } catch (error) {
        console.log(error);
      }
    };

    const data = await getAttendance(event);
    if (data){
      await setCountMonday(data.monday_true);
      await setCountTuesday(data.tuesday_true);
      await setCountWednesday(data.wednesday_true);
      await setCountThursday(data.thursday_true);
      await setCountFriday(data.friday_true);
      await setabsentMonday(data.monday_false);
      await setabsentTuesday(data.tuesday_false);
      await setabsentWednesday(data.wednesday_false);
      await setabsentThursday(data.thursday_false);
      await setabsentFriday(data.friday_false);
      // await setCountSaturday(data.saturday_true);
      // await setCountSunday(data.sunday_true);
    
    console.log(countMonday);
    }
    else{
      await setCountMonday(0);
      await setCountTuesday(0);
      await setCountWednesday(0);
      await setCountThursday(0);
      await setCountFriday(0);
      await setabsentMonday(allEmployees || 0);
      await setabsentTuesday(allEmployees || 0);
      await setabsentWednesday(allEmployees || 0);
      await setabsentThursday(allEmployees || 0);
      await setabsentFriday(allEmployees || 0);
    }
    
  };

  return {
    isSubmitted,
    handleSubmit,
    countMonday,
    countTuesday,
    countWednesday,
    countThursday,
    countFriday,
    absentMonday,
    absentTuesday,
    absentWednesday,
    absentThursday,
    absentFriday,
    attendanceData,
    selectedWeek
  };
}