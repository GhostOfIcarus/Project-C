// Forgot_Password.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { forgotPasswordController} from '../Controllers/Forget_Password';
import logo from './img/buurtboer_logo.png';
import genstyles from './Stylesheets/GeneralStyles.module.css';

interface UserData {
  // Define the structure of your user data here
}

function Forgot_Password() {
  const [email, setEmail] = useState<string>('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const emailExists = await forgotPasswordController(email);
      if (emailExists) {
        console.log('Email exists');
      } else {
        setError('Email not found in the database');
      }
    } catch (error) {
      console.error('An error occurred while fetching employee data:', error);
      setError('An error occurred while fetching employee data.');
    }
  };

  return (
    <>
      <div className={genstyles.container}>
        <div className='row'>
          <div className={`col-lg-6 ${genstyles.login_div}`}>
            <div className={genstyles.title}>Wachtwoord Vergeten</div>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                name="Email"
                value={email}
                onChange={handleEmailChange}
              />
              <button type="submit" className={genstyles.button}>
                Verstuur
              </button>
            </form>
            {userData && (
              <div>
                {/* Display user data here */}
                <p>User data: {JSON.stringify(userData)}</p>
              </div>
            )}
            {error && <p className={genstyles.error}>{error}</p>}
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





// import logo from './img/buurtboer_logo.png';
// import genstyles from './Stylesheets/GeneralStyles.module.css';


// function Forgot_Password() {
//   return (
//     <>
//         <div className={genstyles.container}>
//           <div className='row'>
//             <div className={`col-lg-6 ${genstyles.login_div}`}>
//               <div className={genstyles.title}>Wachtwoord Vergeten</div>
//               <input type="email" placeholder="Email" name="Email" /> 
//               <a href="Change_Password"><button className={genstyles.button}>Verstuur</button></a>
//             </div>
//             <div className={`col-lg-6 ${genstyles.image_div}`}>
//               <img className={genstyles.Buurtboerlogo} src={logo} alt="buurtboerLogo" />
//             </div>
//           </div>
//         </div>
//     </>
//   );
// }



// export default Forgot_Password;
