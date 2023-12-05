import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing, { Landing_Page } from './Views/Landing_Page';
import Login from './Views/Login';
import EmployeeOverview from './Views/Employee_Overview';
import ForgotPassword from './Views/Forgot_Password';
import ChangePassword from './Views/Change_Password';
import Register_Employee from './Views/Register_Employee';
import Invite_Employee from './Views/Invite_Employee';
import Employee_Week_Overview from './Views/Employee_Week_Overview';
import Choose_Order from "./Views/Choose_Order";
import CompanyOverview from "./Views/Company_Overview";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing_Page />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Forgot_Password" element={<ForgotPassword />} />
        <Route path="/Employee_Overview" element={<EmployeeOverview />} />
        <Route path="/Change_Password" element={<ChangePassword />} />
        <Route path="/Register_Employee" element={<Register_Employee />} />
        <Route path="/Invite_Employee" element={<Invite_Employee />} />
        <Route path="/Employee_Week_Overview" element={<Employee_Week_Overview />} />
        <Route path="/Choose_Order" element={<Choose_Order/>}/>
        <Route path="/Company_Overview" element={<CompanyOverview/>}/>
      </Routes>
    </Router>
  );
}

export default App;