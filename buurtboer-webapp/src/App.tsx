import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Views/Landing_Page';
import Login from './Views/Login';
import EmployeeOverview from './Views/Employee_Overview';
import ForgotPassword from './Views/Forgot_Password';
import ChangePassword from './Views/Change_Password';
import RegisterCompany from './Views/Company_Register';
import InviteEmployee from './Views/Invite_Employee';
import EmployeeWeekOverview from './Views/Employee_Week_Overview';
import ChooseOrder from "./Views/Choose_Order";
import CompanyOverview from "./Views/Company_Overview";
import OrderOverview from "./Views/Order_Overview";
import SettingsPage from "./Views/Settings_Page"
import InviteCompany from "./Views/Invite_Company";
import SuperAdmin_Settings_Page from './Views/SuperAdmin_Settings_Page';
import EmployeesOverview from './Views/Employees_Overview';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Forgot_Password" element={<ForgotPassword />} />
        <Route path="/Employee_Overview" element={<EmployeeOverview />} />
        <Route path="/Change_Password" element={<ChangePassword />} />
        <Route path="/Company_Register" element={<RegisterCompany />} />
        <Route path="/Invite_Employee" element={<InviteEmployee />} />
        <Route path="/Invite_Company" element= {<InviteCompany />} />
        <Route path="/Employee_Week_Overview" element={<EmployeeWeekOverview />} />
        <Route path="/Choose_Order" element={<ChooseOrder/>}/>
        <Route path="/Company_Overview" element={<CompanyOverview/>}/>
        <Route path="/Order_Overview" element={< OrderOverview/>} />
        <Route path="/Settings_Page" element={< SettingsPage/>}/>
        <Route path="/SuperAdmin_Settings_Page" element={< SuperAdmin_Settings_Page/>}/>
        <Route path='/Employees_Overview' element={<EmployeesOverview/>} />

      </Routes>
    </Router>
  );
}

export default App;