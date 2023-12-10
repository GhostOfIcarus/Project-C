// import { useState } from 'react';
import logo from './img/buurtboer_logo.png'; 
import genstyles from './Stylesheets/GeneralStyles.module.css';

// interface User {
//   email: string;
//   password: string;
// }

// interface ErrorMessages {
//   name: string;
//   message: string;
// }

function App() {
  // const [errorMessages, setErrorMessages] = useState<ErrorMessages>({ name: '', message: '' });
  // const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  return (
    <>
        <div className={genstyles.container}>
          <div className='row'>
            <div className={`col-lg-6 ${genstyles.login_div}`}>
              <div className={genstyles.title}>Wachtwoord Vergeten</div>
              <input type="password" placeholder="Nieuw wachtwoord" name='Pass'/> 
              <input type="password" placeholder="Nieuw wachtwoord opnieuw invullen" name='PassAgain'/>
              <a href="Login"><button className={genstyles.button}>Verstuur</button></a>
            </div>
            <div className={`col-lg-6 ${genstyles.image_div}`}>
              <img className={genstyles.Buurtboerlogo} src={logo} alt="buurtboerLogo" />
            </div>
          </div>
        </div>
    </>
  );
}

export default App;
