import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import genstyles from './Stylesheets/GeneralStyles.module.css';
import postlogin from './Stylesheets/PostLogin.module.css';
import withAuthentication from '../Controllers/withAuthentication';
import { useTranslation } from 'react-i18next';
import { Buurtboer_OrderController } from '../Controllers/OrderController';

interface UserData {
  firstName: string;
}

function AH_Order() {
  const [userdata, setUserData] = useState<UserData | null>(null);
  const { t } = useTranslation();

  const {
    isSubmitted,
    handleSubmit,
    totalAttendance,
    totalAbsent,
    selectedWeek,
    updateSelectedWeek, 
  } = Buurtboer_OrderController();

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
        setUserData(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // No dependencies needed here

  // Add a function to update the selected week based on the current date
    const updateSelectedWeekBasedOnCurrentDate = () => {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const daysDifference = currentDate.getTime() - startDate.getTime();
    const daysInWeek = 86400000; // milliseconds in a day
    const daysInYear = 365;

    const currentWeek = Math.ceil((daysDifference / daysInWeek + 1) / 7) as number;
        updateSelectedWeek(currentWeek);
    };

  // Call the function when the component mounts
  useEffect(() => {
    updateSelectedWeekBasedOnCurrentDate();
  }, [updateSelectedWeek]);

  return (
    <div>
      <Navbar />

      <div className={`container ${postlogin.page_container} mt-5 p-5`}>
        <div className="d-flex justify-content-center w-100">
          <div className="row">
            <div className="col-lg-12">
              <div className="form_items ms-5 justify-content-center p-5">
                <h2>{t('order')}</h2>
                <form onSubmit={handleSubmit}>
                  <div className="justify-content-center">
                    <p>{t('totalAttendance')}: {totalAttendance}</p>
                    <p>{t('totalAbsent')}: {totalAbsent}</p>
                    <button
                      type="button"
                      onClick={() => {
                        window.location.href = "https://www.ah.nl/producten";
                      }}
                      className={genstyles.button}
                    >
                      {t('order')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthentication(AH_Order);
