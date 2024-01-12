import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import postlogin from './Stylesheets/PostLogin.module.css';
import genstyles from './Stylesheets/GeneralStyles.module.css';
import withAuthentication from '../Controllers/withAuthentication';
import { useTranslation } from 'react-i18next';
import { registerCompanyController } from '../Controllers/Company_RegisterController';
import { useMicrosoftLogin } from '../Controllers/microsoftLogin_Controller';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface GoogleAccountsResponse {
  credential: string;
}

interface localJwtPayload {
  given_name: string;
  family_name: string;
  email: string;
  name: string;
}

const clientID = "1075521165727-h558b9b3eg32llcsq606gbqbsvipjaqt.apps.googleusercontent.com";
declare global {
  interface Window {
    google: any;
  }
}

export function Company_Register() {
  const { register } = useMicrosoftLogin();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [companyEmail, setCompanyEmail] = useState<string>('');
  const [companyPass, setCompanyPass] = useState('');
  const [companyPass2, setCompanyPass2] = useState('');
  const [isEmailUnique, setIsEmailUnique] = useState(true);
  const full_schedule = false;
  const [user, setUser] = useState({});

  const checkEmailAvailability = async (email: string) => {
    try {
      const response = await axios.post('http://localhost:5000/api/check-email', { email });
      console.log(response.data.emailExists);
      return response.data.emailExists;
    } catch (error) {
      console.error('Error checking email availability:', error);
      return false;
    }
  };

  //function that handles the microsoft login
  const handleMicrosoftLogin = async () => {
    const apiUrl = 'http://localhost:5000/api/admin/registerAdmin';
    try {
      const params = new URLSearchParams(location.search);
      const token = params.get('token') || '';

      const verifiedToken = await axios.post('http://localhost:5001/checkToken', {
        token: token,
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const microsoftData = await register();
      console.log(microsoftData);
      if (microsoftData) {
        console.log(microsoftData);
        const registrationSuccess = await axios.post(apiUrl, {
          admin_first_name: microsoftData.firstname,
          admin_last_name: microsoftData.lastname,
          company_name: verifiedToken.data.data.companyName,
          full_schedule: false,
          email: microsoftData.email,
          password: '',
        });
        if (registrationSuccess) {
          // Redirect to the login page or show a success message
          setRegistrationSuccess(true);
          setSuccessMessage(t('successfullyMadeCompany'))
          console.log('created successfully');
        } else {
          // Handle registration failure
          console.error('Company registration failed');
        }
      }

    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error('An error occurred during company registration', error);
    }
  };

  const handleGoogleSignIn = (response: GoogleAccountsResponse) => {
    console.log("Encoded JWT token: ", response.credential);
    var userObject: localJwtPayload = jwtDecode(response.credential);
    console.log(userObject);

    // Check if the user exists in the database
    const registrationSuccess = axios.post('http://localhost:5000/api/check-email', { email: userObject.email })
      .then((response) => {
        if (response.data.emailExists) {
          console.log("User", userObject.email, "already exists");
        } else {
          console.log("User does not exist, inserting into the database: ", userObject.email);
          // Insert the user into the database
          axios.post('http://localhost:5000/api/admin/registerAdmin', {
            admin_first_name: userObject.given_name,
            admin_last_name: userObject.family_name,
            company_name: userObject.name,
            full_schedule: false, // Set the company name accordingly
            email: userObject.email,
            password: ''
          })
            .then((registrationSuccess) => {
              if (registrationSuccess)
              {console.log("User inserted successfully");
                // Redirect to the login page or show a success message
                setRegistrationSuccess(true);
                setSuccessMessage(t('successfullyMadeCompany'))
                console.log('created successfully');}
              
            })
            .catch((insertError) => {
              console.error("Error inserting user into the database", insertError);
            });
        }
      })
      .catch((error) => {
        console.error("Error checking user in the database", error);
      });

    // Set user and hide sign-in div
    setUser(userObject);
    const signInDiv = document.getElementById("signInDiv");
    if (signInDiv) {
      // signInDiv.hidden = true;
    } else {
      console.error("Element with ID 'signInDiv' not found");
    }
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: clientID,
      callback: handleGoogleSignIn
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );
  }, []);

  const isPasswordValid = (password: string) => {
    // Check if password is at least 8 characters long and contains at least one special character
    const minLength = 8;
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password);
    return password.length >= minLength && hasSpecialCharacter;
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate email format
    if (!companyEmail.includes('@')) {
      setIsEmailUnique(false);
      return; // Stop further execution
    }

    const EmailNotAvailable = await checkEmailAvailability(companyEmail);

    if (EmailNotAvailable) {
      setIsEmailUnique(true);
      return;
    }

    // Validate password
    if (!isPasswordValid(companyPass)) {
      return;
    }

    // Check if passwords match
    if (companyPass !== companyPass2) {
      return;
    }

    const params = new URLSearchParams(location.search);
    const token = params.get('token') || '';

    const verifiedToken = await axios.post('http://localhost:5001/checkToken', {
      token: token,
    }, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // TODO: Successfully made company email or screen needs to be made before sending the user to the login page
    try {
      // Make a call to the registerCompanyController function
      const registrationSuccess = await registerCompanyController(verifiedToken.data.data.adminFirstName, verifiedToken.data.data.adminLastName, verifiedToken.data.data.companyName, full_schedule, companyEmail, companyPass);

      if (registrationSuccess) {
        setRegistrationSuccess(true);
        setSuccessMessage(t('successfullyMadeCompany'));
        console.log('SUCCESSSS');
        // navigate(`/login`);
      } else {
        // Handle registration failure
        console.error('Company registration failed');
      }
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error('An error occurred during company registration', error);
    }
  };

  return (
    <>

      <div className={`container ${postlogin.page_container} mt-5 p-5`}>
        <div className="d-flex justify-content-center w-100">
          <div className="row">
            <div className="col-lg-12">
              <div className="  form_items ms-5 justify-content-center p-5">
                <h2>{t('register_company')}</h2>
                <form onSubmit={handleFormSubmit}>
                  <input
                    type="email"
                    id="companyEmail"
                    placeholder="Email"
                    value={companyEmail}
                    onChange={(e) => {
                      setCompanyEmail(e.target.value);
                      // Reset email error on input change
                      setIsEmailUnique(true);
                    }}
                  />
                  {/* Display email error message */}
                  {!isEmailUnique && (
                    <div style={{ color: 'red' }}>{t('email_inUse_error')}</div>
                  )}
                  <br /><br />
                  <input
                    type="password"
                    id="companyPass"
                    placeholder={t('password')}
                    value={companyPass}
                    onChange={(e) => {
                      setCompanyPass(e.target.value);
                      // Reset password error on input change
                    }}
                  />
                  {/* Display password error message */}
                  {!isPasswordValid(companyPass) && (
                    <div style={{ color: 'red' }}>{t('password_format_error')}</div>
                  )}
                  <br /><br />
                  <input
                    type="password"
                    id="companyPass2"
                    placeholder={t('repeatPassword')}
                    value={companyPass2}
                    onChange={(e) => setCompanyPass2(e.target.value)}
                  />
                  {/* Display password match error message */}
                  {companyPass !== companyPass2 && (
                    <div style={{ color: 'red' }}>{t('password_match_error')}</div>
                  )}
                  <br /><br />
                  <input type="submit" value={t('submit')} className={genstyles.submmitbutton} />
                  <a>{t('or')}</a>
                  <button onClick={handleMicrosoftLogin} className={genstyles.button}>{t('microsoft')}</button>

                  {/* <button onClick={handleGoogleSignIn} className={genstyles.button}>{t('google')}</button> */}
                  <div id="signInDiv"></div>
                </form>

                {/* Display success message and link to login */}
                {registrationSuccess && (
                  <div style={{ color: 'green' }}>
                    {successMessage}
                    <Link to="/login" className={postlogin.loginLink}>
                      {t('backToLogin')}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Company_Register;
