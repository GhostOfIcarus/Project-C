import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import withAuthentication from '../Controllers/withAuthentication';
import { useEmployeesOverviewController } from '../Controllers/Employees_OverviewController';
import { useTranslation } from 'react-i18next';

function Employee_Week_Overview() {
  const { t } = useTranslation();
  const { id, week, firstname, lastname } = useParams();
  const { fetchSchedule, schedule } = useEmployeesOverviewController();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchSchedule(Number(id), Number(week));
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

    fetchData();
  }, [id, week, fetchSchedule]);

  const renderSchedule = () => {
    if (!schedule) {
      return <p>No schedule found for this week.</p>;
    }

    return (
      <>
        <p>{t('Employee_Schedule')}:</p>
        <p>Monday: {schedule.monday ? '✔' : '❌'}</p>
        <p>Tuesday: {schedule.tuesday ? '✔' : '❌'}</p>
        <p>Wednesday: {schedule.wednesday ? '✔' : '❌'}</p>
        <p>Thursday: {schedule.thursday ? '✔' : '❌'}</p>
        <p>Friday: {schedule.friday ? '✔' : '❌'}</p>
        <p>Saturday: {schedule.saturday ? '✔' : '❌'}</p>
        <p>Sunday: {schedule.sunday ? '✔' : '❌'}</p>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div>
        <h2>{firstname} {lastname}</h2>
        {renderSchedule()}
      </div>
    </>
  );
}

export default withAuthentication(Employee_Week_Overview);
