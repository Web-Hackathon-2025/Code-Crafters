import { Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./users/Login";
import Signup from "./users/Signup";
import Auth from "./service_provider/Auth";
import ServiceProviderDashboard from "./service_provider/ServiceProviderDashboard";
import AdminSignIn from './admin/AdminLogin';
import Dashboard from './admin/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="signup" element={<Signup />} />

      {/* Service Provider Routes */}
      <Route path="service-provider/auth" element={<Auth />} />
      <Route path="service-provider/dashboard" element={<ServiceProviderDashboard />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminSignIn />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
