import React, { useState, useEffect, MouseEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';  
import 'bootstrap/dist/css/bootstrap.min.css';
import postlogin from './Stylesheets/PostLogin.module.css';
import Navbar from './Navbar';
import genstyles from './Stylesheets/GeneralStyles.module.css';
import withAuthentication from '../Controllers/withAuthentication';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { response } from 'express';


export interface UserData{
  userId: any;
  firstName: string;
  lastName: string;
  email: string;
  userRole: string;
}

function Invite_Employee() {
  const { t } = useTranslation();
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [employeeFirstName, setEmployeeFirstName] = useState('');
  const [employeeLastName, setEmployeeLastName] = useState('');
  const [submitMessages, setSubmitMessages] = useState('');
  // const [activationKey, setActivationKey] = useState('');
  const navigate = useNavigate();
  const [userdata, setUserData] = useState<UserData | null>(null);


   //get companyID
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

  const sendInvite = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if any input is empty and don't proceed with the submission if any input is empty
    if (!employeeEmail || !employeeFirstName || !employeeLastName) {
      setSubmitMessages(t('input_error'));
      return;
    }

    setSubmitMessages(t('invite_send'));
    //console.log("First Name: ", employeeFirstName);

   
  
    // Add employee to database
    try {
      const createResponse = await axios.post(
        'http://localhost:5000/api/employee/add',
        {
          comp_id: userdata?.userId,
          first_name: employeeFirstName,
          last_name: employeeLastName,
          email: employeeEmail,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("createResponse: ", createResponse);

      if (createResponse.data) {
        console.log(createResponse.data);
        // setActivationKey(createResponse.data);
      }


      // Send email
      await axios.post(
        'http://localhost:5001/sendEmail/employeeInvitation',
        {
          to: employeeEmail,
          employeeFirstName: employeeFirstName,
          employeeLastName: employeeLastName,
          // activationKey: createResponse.data,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );


    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    // Clear input fields after successfully sending out the invite
    setEmployeeEmail('');
    setEmployeeFirstName('');
    setEmployeeLastName('');
  }, [submitMessages]);

  return (
    <>
      <Navbar />

      <div className={`container ${postlogin.page_container}  mt-5 p-5`}>
        <div className="d-flex justify-content-center w-100">
          <div className="row">
            <div className="col-lg-12">
                <div className="  form_items ms-5 justify-content-center p-5">
                  <h2>{t('employee_invite')}</h2>
                  
                  <form onSubmit={sendInvite}>
                      <input className='form-control mt-3' type="email" id="emailInput" placeholder="Email" value={employeeEmail} onChange={(e) => setEmployeeEmail(e.target.value)}/> 
                      <br />
                      <input className='form-control' type='text' id="firstName" placeholder={t('first_name')} value={employeeFirstName} onChange={(e) => setEmployeeFirstName(e.target.value)}/> 
                      <br />
                      <input className='form-control' type='text' id="lastName" placeholder={t('last_name')} value={employeeLastName} onChange={(e) => setEmployeeLastName(e.target.value)}/>
                      <br />
                      <button className={genstyles.submmitbutton} type="submit">{t('send_invite')}</button>
                      {submitMessages && <div className={genstyles.error}>{submitMessages}</div>}
                  </form>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuthentication(Invite_Employee);
