import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Views/Login';
import ForgotPassword from './Views/Forgot_Password';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Forgot_Password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;