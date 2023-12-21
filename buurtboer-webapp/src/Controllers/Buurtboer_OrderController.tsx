import { useState, FormEvent, useEffect } from 'react';
import axios from 'axios';

export interface AttendanceData {
  day: string;
  value: any;
}

export interface UserData {
  userId: any;
  firstName: string;
  lastName: string;
  email: string;
}

export function Buurtboer_OrderController() {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
  const [totalAttendance, setTotalAttendance] = useState<number>(0);
  const [totalAbsent, setTotalAbsent] = useState<number>(0);
  const [selectedWeek, setSelectedWeek] = useState<number>(49);
  const [userdata, setUserData] = useState<UserData | null>(null);
  const [selectedRosterValue, setSelectedRosterValue] = useState(false);

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
        const selectedRosterValue = userData.full_schedule;
        setUserData(userData);
        setSelectedRosterValue(selectedRosterValue);
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, []);

  // Function to calculate total attendance and absent counts
  const calculateTotals = (data: any) => {
    if (selectedRosterValue == true){
        const totalAttendanceCount =
        parseInt(data.monday_true, 10) +
        parseInt(data.tuesday_true, 10) +
        parseInt(data.wednesday_true, 10) +
        parseInt(data.thursday_true, 10) +
        parseInt(data.friday_true, 10) +
        parseInt(data.saturday_true) +
        parseInt(data.sunday_true);
      const totalAbsentCount =
        parseInt(data.monday_false, 10) +
        parseInt(data.tuesday_false, 10) +
        parseInt(data.wednesday_false, 10) +
        parseInt(data.thursday_false, 10) +
        parseInt(data.friday_false, 10) +
        parseInt(data.saturday_true) +
        parseInt(data.sunday_true);
      // Update state
      setTotalAttendance(totalAttendanceCount);
      setTotalAbsent(totalAbsentCount);
      setIsSubmitted(true);
    }else{
        const totalAttendanceCount =
        parseInt(data.monday_true, 10) +
        parseInt(data.tuesday_true, 10) +
        parseInt(data.wednesday_true, 10) +
        parseInt(data.thursday_true, 10) +
        parseInt(data.friday_true, 10);
      const totalAbsentCount =
        parseInt(data.monday_false, 10) +
        parseInt(data.tuesday_false, 10) +
        parseInt(data.wednesday_false, 10) +
        parseInt(data.thursday_false, 10) +
        parseInt(data.friday_false, 10);
  
      // Update state
      setTotalAttendance(totalAttendanceCount);
      setTotalAbsent(totalAbsentCount);
      setIsSubmitted(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'http://localhost:5000/api/employees/attendance',
          {
            comp_id: userdata?.userId,
            week_number: selectedWeek.toString(),
          },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (response.data) {
          const data = response.data;
          calculateTotals(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [selectedWeek, userdata?.userId]); // Trigger the effect when selectedWeek or userId changes

  const updateSelectedWeek = (week: number) => {
    setSelectedWeek(week);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/employees/attendance',
        {
          comp_id: userdata?.userId,
          week_number: selectedWeek.toString(),
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data) {
        const data = response.data;
        calculateTotals(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isSubmitted,
    handleSubmit,
    totalAttendance,
    totalAbsent,
    attendanceData,
    selectedWeek,
    updateSelectedWeek,
  };
}
