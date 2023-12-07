import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Views/Landing_Page';
import Login from './Views/Login';
import EmployeeOverview from './Views/Employee_Overview';
import ForgotPassword from './Views/Forgot_Password';
import ChangePassword from './Views/Change_Password';
import RegisterEmployee from './Views/Register_Employee';
import InviteEmployee from './Views/Invite_Employee';
import EmployeeWeekOverview from './Views/Employee_Week_Overview';
import ChooseOrder from "./Views/Choose_Order";
import CompanyOverview from "./Views/Company_Overview";
import OrderOverview from "./Views/Order_Overview";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Forgot_Password" element={<ForgotPassword />} />
        <Route path="/Employee_Overview" element={<EmployeeOverview />} />
        <Route path="/Change_Password" element={<ChangePassword />} />
        <Route path="/Register_Employee" element={<RegisterEmployee />} />
        <Route path="/Invite_Employee" element={<InviteEmployee />} />
        <Route path="/Employee_Week_Overview" element={<EmployeeWeekOverview />} />
        <Route path="/Choose_Order" element={<ChooseOrder/>}/>
        <Route path="/Company_Overview" element={<CompanyOverview/>}/>
        <Route path="/Order_Overview" element={< OrderOverview/>} />
      </Routes>
    </Router>
  );
}

export default App;