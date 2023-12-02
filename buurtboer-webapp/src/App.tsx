import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Views/Login';
import EmployeeOverview from './Views/Employee_Overview';
import ForgotPassword from './Views/Forgot_Password';
import ChangePassword from './Views/Change_Password';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Forgot_Password" element={<ForgotPassword />} />
        <Route path="/Employee_Overview" element={<EmployeeOverview />} />
        <Route path="/Change_Password" element={<ChangePassword />} />
      </Routes>
    </Router>
  );
}

export default App;