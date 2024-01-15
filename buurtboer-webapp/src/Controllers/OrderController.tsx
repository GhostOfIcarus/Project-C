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

export function OrderController() {
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

  const calculateTotals = (data: any) => {
    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const selectedDays = daysOfWeek.slice(0, selectedRosterValue ? 7 : 5);

    const totalAttendanceCount = selectedDays.reduce((acc, day) => acc + parseInt(data[`${day}_true`] || 0, 10), 0);
    const totalAbsentCount = selectedDays.reduce((acc, day) => acc + parseInt(data[`${day}_false`] || 0, 10), 0);

    setTotalAttendance(totalAttendanceCount);
    setTotalAbsent(totalAbsentCount);
    setIsSubmitted(true);
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
