import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import postlogin from './Stylesheets/PostLogin.module.css';
import withAuthentication from '../Controllers/withAuthentication';
import { useEmployeeWeekOverviewController } from '../Controllers/Employee_WeekOverviewControllers';
import { useEmpOverviewController } from '../Controllers/Employee_OverviewController';
import { useTranslation } from 'react-i18next';

function Employee_Week_Overview() {
  const { t } = useTranslation();
  const { id, week, firstname, lastname } = useParams() || {};
  const { handleSubmit, schedule } = useEmployeeWeekOverviewController();
  const{ userdata } = useEmpOverviewController();


  const renderSchedule = () => {
    if (!schedule) {
      return (
        <div className={`container ${postlogin.page_container}  mt-5 p-5`}>
        <div className="d-flex justify-content-center w-100">
          <div className="row">
            <div className="col-lg-12 ">
              <h1>{firstname} {lastname}</h1>
              <div className='row'>
                <div className='col-lg-12'>
                  <form className='input-group mb-3' onSubmit={(event) => id && handleSubmit(event, id)}>
                    <input className="form-control" type="week" id="week" name="week" />
                    <input className="btn btn-outline-secondary" type="submit" value="Submit" />
                  </form>
                </div>
              </div>
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
                      <td>{t('No schedule found for this week.')}</td>
                      <td></td><td></td>
                    </tr>
                    
                  </tbody>
                </table>
              
            </div>
          </div>
        </div>
      </div>);
    }
    else {
    return (
      <>
       {/* Week selecteren */}
       <div className={`container ${postlogin.page_container}  mt-5 p-5`}>
        <div className="d-flex justify-content-center w-100">
          <div className="row">
            <div className="col-lg-12 ">
              <h1>{firstname} {lastname}</h1>
              <div className='row'>
                <div className='col-lg-12'>
                  <form className='input-group mb-3' onSubmit={(event) => id && handleSubmit(event, id)}>
                    <input className="form-control" type="week" id="week" name="week" />
                    <input className="btn btn-outline-secondary" type="submit" value="Submit" />
                  </form>
                </div>
              </div>
              
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
                      <td>{schedule.monday ? '✔' : '❌'}</td>
                      <td>{!schedule.monday ? '✔' : '❌'}</td>
                    </tr>
                    <tr>
                      <td>{t('tuesday')}</td>
                      <td>{schedule.tuesday ? '✔' : '❌'}</td>
                      <td>{!schedule.tuesday ? '✔' : '❌'}</td>
                    </tr>
                    <tr>
                      <td>{t('wednesday')}</td>
                      <td>{schedule.wednesday ? '✔' : '❌'}</td>
                      <td>{!schedule.wednesday ? '✔' : '❌'}</td>
                    </tr>
                    <tr>
                      <td>{t('thursday')}</td>
                      <td>{schedule.thursday ? '✔' : '❌'}</td>
                      <td>{!schedule.thursday ? '✔' : '❌'}</td>
                    </tr>
                    <tr>
                      <td>{t('friday')}</td>
                      <td>{schedule.friday ? '✔' : '❌'}</td>
                      <td>{!schedule.friday ? '✔' : '❌'}</td>
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
                      <td>{schedule.monday ? '✔' : '❌'}</td>
                      <td>{!schedule.monday ? '✔' : '❌'}</td>
                    </tr>
                    <tr>
                      <td>{t('tuesday')}</td>
                      <td>{schedule.tuesday ? '✔' : '❌'}</td>
                      <td>{!schedule.tuesday ? '✔' : '❌'}</td>
                    </tr>
                    <tr>
                      <td>{t('wednesday')}</td>
                      <td>{schedule.wednesday ? '✔' : '❌'}</td>
                      <td>{!schedule.wednesday ? '✔' : '❌'}</td>
                    </tr>
                    <tr>
                      <td>{t('thursday')}</td>
                      <td>{schedule.thursday ? '✔' : '❌'}</td>
                      <td>{!schedule.thursday ? '✔' : '❌'}</td>
                    </tr>
                    <tr>
                      <td>{t('friday')}</td>
                      <td>{schedule.friday ? '✔' : '❌'}</td>
                      <td>{!schedule.friday ? '✔' : '❌'}</td>
                    </tr>
                    <tr>
                      <td>{t('saturday')}</td>
                      <td>{schedule.saturday ? '✔' : '❌'}</td>
                      <td>{!schedule.saturday ? '✔' : '❌'}</td>
                    </tr>
                    <tr>
                      <td>{t('sunday')}</td>
                      <td>{schedule.sunday ? '✔' : '❌'}</td>
                      <td>{!schedule.sunday ? '✔' : '❌'}</td>
                    </tr>
                  </tbody>
                </table>
              )}
              
            </div>
          </div>
        </div>
      </div>
      </>
    );}
  };

  return (
    <>
      <Navbar />
      <div>
        {renderSchedule()}
      </div>
    </>
  );
}

export default withAuthentication(Employee_Week_Overview);
