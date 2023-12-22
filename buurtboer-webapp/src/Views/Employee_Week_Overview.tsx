import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import withAuthentication from '../Controllers/withAuthentication';
import { useEmployeesOverviewController } from '../Controllers/Employees_OverviewController';
import { useTranslation } from 'react-i18next';

// interface EmployeeWeekOverviewProps {
//   // You can add any additional props here
// }

function Employee_Week_Overview() {
  const { t } = useTranslation();
  const { id, week, firstname, lastname } = useParams(); // Get the employee id and week from the route parameter
  // console.log("id: ", id, "week: ", week);
  const { fetchSchedule, schedule } = useEmployeesOverviewController();
  // const [schedule, setSchedule] = useState<any>(null); // Update the type as per your schedule data structure

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call fetchSchedule to get the schedule for the employee
        const response = await fetchSchedule(Number(id), Number(week));
        // console.log("attending on monday: ", schedule?.monday);

      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

    fetchData();
  }, [id, week, fetchSchedule]);

  const mondayTrue = schedule?.monday;
  const tuesdayTrue = schedule?.tuesday;
  const wednesdayTrue = schedule?.wednesday;
  const thursdayTrue = schedule?.thursday;
  const fridayTrue = schedule?.friday;
  const saturdayTrue = schedule?.saturday;
  const sundayTrue = schedule?.sunday;

  return (
    <>
      <Navbar />
      <div>
        <h2>{firstname} {lastname}</h2>
        <p>{t('Employee_Schedule')}:</p>
        <p>Monday: {mondayTrue ? '✔' : '❌'}</p>
        <p>Tuesday: {tuesdayTrue ? '✔' : '❌'}</p>
        <p>Wednesday: {wednesdayTrue ? '✔' : '❌'}</p>
        <p>Thursday: {thursdayTrue ? '✔' : '❌'}</p>
        <p>Friday: {fridayTrue ? '✔' : '❌'}</p>
        <p>Saturday: {saturdayTrue ? '✔' : '❌'}</p>
        <p>Sunday: {sundayTrue ? '✔' : '❌'}</p>
      </div>
    </>
  );
}

export default withAuthentication(Employee_Week_Overview);
