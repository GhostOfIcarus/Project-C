import logo from './img/buurtboer_logo.png';
import genstyles from './Stylesheets/GeneralStyles.module.css';


function Forgot_Password() {
  return (
    <>
        <div className={genstyles.container}>
          <div className='row'>
            <div className={`col-lg-6 ${genstyles.login_div}`}>
              <div className={genstyles.title}>Wachtwoord Vergeten</div>
              <input type="email" placeholder="Email" name="Email" /> 
              <a href="Change_Password"><button className={genstyles.button}>Verstuur</button></a>
            </div>
            <div className={`col-lg-6 ${genstyles.image_div}`}>
              <img className={genstyles.Buurtboerlogo} src={logo} alt="buurtboerLogo" />
            </div>
          </div>
        </div>
    </>
  );
}



export default Forgot_Password;
