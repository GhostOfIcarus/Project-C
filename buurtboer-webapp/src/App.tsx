import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Views/Login';
import EmployeeOverview from './Views/Employee_Overview';
import ForgotPassword from './Views/Forgot_Password';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Forgot_Password" element={<ForgotPassword />} />
        <Route path="/Employee_Overview" element={<EmployeeOverview />} />
      </Routes>
    </Router>
  );
}

export default App;