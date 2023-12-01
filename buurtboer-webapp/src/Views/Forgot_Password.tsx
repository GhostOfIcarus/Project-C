import logo from './img/buurtboer_logo.png';
import styling from './Stylesheets/Forgot_Password.module.css';

function Forgot_Password() {
  return (
    <>
        <div className={styling.container}>
          <div className='row'>
            <div className='col-6'>
              <div>
                <img className={styling.sideImage} src={logo} alt="buurtboerLogo" />
              </div>
            </div>
            <div className='col-6'>
              <p>wachtwoord vergeten</p>
              <input type="email" placeholder="Email" /> 
              <a href="Change_Password"><button>verstuur</button></a>
            </div>
          </div>
            
        </div>
        
    </>
  );
}



export default Forgot_Password;
