import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import genstyles from './Stylesheets/GeneralStyles.module.css';
import postlogin from './Stylesheets/PostLogin.module.css';
import withAuthentication from '../Controllers/withAuthentication';
import { useTranslation } from 'react-i18next';
import { OrderController } from '../Controllers/OrderController';

interface UserData {
  firstName: string;
}

function Buurtboer_Order() {
  const [userdata, setUserData] = useState<UserData | null>(null);
  const { t } = useTranslation();

  const {
    isSubmitted,
    handleSubmit,
    totalAttendance,
    totalAbsent,
    selectedWeek,
    updateSelectedWeek, 
  } = OrderController();

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

    const updateSelectedWeekBasedOnCurrentDate = () => {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const daysDifference = currentDate.getTime() - startDate.getTime();
    const daysInWeek = 86400000; // milliseconds in a day
    const daysInYear = 365;

    const currentWeek = Math.ceil((daysDifference / daysInWeek + 1) / 7) as number;
        updateSelectedWeek(currentWeek);
    };

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
                    <p>{t('lunch_amount')}: {totalAttendance}</p>
                    <p>{t('totalAbsent')}: {totalAbsent}</p>
                    <button
                      type="button"
                      onClick={() => {
                        window.location.href = "https://debuurtboer.nl/?utm_term=de%20buurtboer&utm_campaign=Generiek%20%7C%20Kantoorlunch&utm_source=adwords&utm_medium=ppc&hsa_acc=9525047286&hsa_cam=18198650116&hsa_grp=146257286368&hsa_ad=619023574966&hsa_src=g&hsa_tgt=kwd-303886323808&hsa_kw=de%20buurtboer&hsa_mt=e&hsa_net=adwords&hsa_ver=3&gad_source=1&gclid=Cj0KCQiA4Y-sBhC6ARIsAGXF1g50oe73chkrIRknUu0cerUyFv9pM63wctK-9to3DFS8ghovCo9vdd8aAvjeEALw_wcB";
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

export default withAuthentication(Buurtboer_Order);
