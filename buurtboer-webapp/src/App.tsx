import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Views/Login';
import EmployeeOverview from './Views/Employee_Overview';
import ForgotPassword from './Views/Forgot_Password';
import ChangePassword from './Views/Change_Password';
import Register_Employee from './Views/Register_Employee';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Forgot_Password" element={<ForgotPassword />} />
        <Route path="/Employee_Overview" element={<EmployeeOverview />} />
        <Route path="/Change_Password" element={<ChangePassword />} />
        <Route path="/Register_Employee" element={<Register_Employee />} />
      </Routes>
    </Router>
  );
}

export default App;