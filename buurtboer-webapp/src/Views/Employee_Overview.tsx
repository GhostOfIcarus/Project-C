import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import postlogin from './Stylesheets/PostLogin.module.css';
import Navbar from './Navbar';
import withAuthentication from '../Controllers/withAuthentication';
import { useEmpOverviewController } from '../Controllers/Employee_OverviewController';
import { useTranslation } from 'react-i18next';
import genstyles from './Stylesheets/GeneralStyles.module.css';

function Employee_Overview() {
  const {fetchEmployeeInfoAndSendEmails} = useEmpOverviewController()
  const { t } = useTranslation();
  const [selectedWeek, setSelectedWeek] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const{ exportToCSV, isSubmitted, handleSubmit, countMonday, countTuesday, countWednesday, countThursday, countFriday, countSaturday, countSunday,
    absentMonday,
    absentTuesday,
    absentWednesday,
    absentThursday,
    absentFriday,
    absentSaturday,
    absentSunday, userdata} = useEmpOverviewController();

    const attendanceData = [countMonday, countTuesday, countWednesday, countThursday, countFriday, countSaturday, countSunday, absentMonday, absentTuesday, absentWednesday, absentThursday, absentFriday, absentSaturday, absentSunday];
    const Date = selectedWeek;

    const handleSendNotification = async () => {
      try {
        await fetchEmployeeInfoAndSendEmails();
        setSuccessMessage(t('emails_send_succesfully'));
      } catch (error) {
        console.error('Error sending email:', error);
        setSuccessMessage(t('email_send_failed'));
      }
    };
  

  return (
    <>
      <Navbar />
       {/* Week selecteren */}
       <div className={`container ${postlogin.page_container}  mt-5 p-5`}>
        <div className="d-flex justify-content-center w-100">
          <div className="row">
            <div className="col-lg-12 ">
              <h1>{t('Employee_Overview')}</h1>
              <div className='row'>
                <div className='col-lg-6'>
                  <form onSubmit={handleSubmit} className='input-group mb-3 col-5'>
                    <div className="input-group mb-3 mt-2">
                      <input className="form-control" type="week" id="week" name="week" value={selectedWeek} onChange={e => setSelectedWeek(e.target.value)} />
                      <input className="btn btn-outline-secondary" type="submit" value={t('submit')} />
                    </div>
                  </form>
                </div>
              </div>
              

              {/* Tabel voor aanwezigen (wordt later verbonden met de week die geselecteerd is) */}
              
              {userdata?.full_schedule === false ? (
                <table className="table roundedCorners">
                  <thead>
                    <tr>
                      <th>{t('date')}</th>
                      <th>{t('present')}</th>
                      <th>{t('absent')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{t('monday')}</td>
                      <td>{countMonday}</td>
                      <td>{absentMonday}</td>
                    </tr>
                    <tr>
                      <td>{t('tuesday')}</td>
                      <td>{countTuesday}</td>
                      <td>{absentTuesday}</td>
                    </tr>
                    <tr>
                      <td>{t('wednesday')}</td>
                      <td>{countWednesday}</td>
                      <td>{absentWednesday}</td>
                    </tr>
                    <tr>
                      <td>{t('thursday')}</td>
                      <td>{countThursday}</td>
                      <td>{absentThursday}</td>
                    </tr>
                    <tr>
                      <td>{t('friday')}</td>
                      <td>{countFriday}</td>
                      <td>{absentFriday}</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <table className="table roundedCorners">
                  <thead>
                    <tr>
                      <th>{t('date')}</th>
                      <th>{t('present')}</th>
                      <th>{t('absent')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{t('monday')}</td>
                      <td>{countMonday}</td>
                      <td>{absentMonday}</td>
                    </tr>
                    <tr>
                      <td>{t('tuesday')}</td>
                      <td>{countTuesday}</td>
                      <td>{absentTuesday}</td>
                    </tr>
                    <tr>
                      <td>{t('wednesday')}</td>
                      <td>{countWednesday}</td>
                      <td>{absentWednesday}</td>
                    </tr>
                    <tr>
                      <td>{t('thursday')}</td>
                      <td>{countThursday}</td>
                      <td>{absentThursday}</td>
                    </tr>
                    <tr>
                      <td>{t('friday')}</td>
                      <td>{countFriday}</td>
                      <td>{absentFriday}</td>
                    </tr>
                    <tr>
                      <td>{t('saturday')}</td>
                      <td>{countSaturday}</td>
                      <td>{absentSaturday}</td>
                    </tr>
                    <tr>
                      <td>{t('sunday')}</td>
                      <td>{countSunday}</td>
                      <td>{absentSunday}</td>
                    </tr>
                    
                    
                  </tbody>
                </table>
              )}         
            </div>
            <div className="col-lg-4">
              <button onClick={() => exportToCSV(attendanceData, Date, userdata?.full_schedule)} className={genstyles.button}>{t('export_data')}</button>
            </div>
            <br></br>
            <div className="col-lg-4">
              <button onClick={handleSendNotification} className={genstyles.button}>{t('send_notification')}</button>
            </div>
            
            
            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuthentication(Employee_Overview);
