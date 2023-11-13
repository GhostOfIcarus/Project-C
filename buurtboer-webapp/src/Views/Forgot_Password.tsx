import logo from './img/buurtboer_logo.png';
import './Stylesheets/Forgot_Password.css';

function Forgot_Password() {
  return (
    <>
        <div className="container">
            <p>wachtwoord vergeten</p>
            <input type="email" placeholder="Email" /> 
            <a href="Change_Password.tsx"><button>verstuur</button></a>
        </div>
        <div>
            <img id="sideImage" src={logo} alt="buurtboerLogo" />
        </div>
    </>
  );
}

export default Forgot_Password;
