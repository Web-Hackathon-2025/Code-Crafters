import { Routes, Route, Link } from "react-router-dom";
import './App.css'
import Login from "./users/Login"
import Signup from "./users/Signup"
<<<<<<< Updated upstream
import Auth from "./service_provider/Auth"
import ServiceProviderDashboard from "./service_provider/ServiceProviderDashboard"
=======
import AdminSignIn from './admin/AdminLogin';
import Dashboard from './admin/Dashboard';


>>>>>>> Stashed changes
function App() {


  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="signup" element={<Signup/>}/>
<<<<<<< Updated upstream
      <Route path="service-provider/auth" element={<Auth/>}/>
      <Route path="service-provider/dashboard" element={<ServiceProviderDashboard/>}/>
    
=======
      <Route path="/admin" element={<AdminSignIn/>}/>
      <Route path="/admin/dashboard" element={<Dashboard/>}/>
>>>>>>> Stashed changes
    </Routes>
  )
}

export default App

