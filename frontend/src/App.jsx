import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import './App.css'
import CustomerAuth from "./users/CustomerAuth"
import KarigarLandingPage from "KarigarLandingPage"
import CustomerServiceDiscovery from "./users/CustomerServiceDiscovery"
// import Signup from "./users/Signup"
import Auth from "./service_provider/Auth"
import ServiceProviderDashboard from "./service_provider/ServiceProviderDashboard"
import ServiceManagement from "./service_provider/ServiceManagement"
import ServiceRequestHistory from "./service_provider/ServiceRequestHistory"
// import AdminSignIn from './admin/AdminLogin';
// import Dashboard from './admin/Dashboard';


function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Login />} /> */}
      <Route path="/" element={<KarigarLandingPage />} />
      <Route path="/customer" element={< CustomerAuth/>}/>
      <Route path="/customer-service" element={< CustomerServiceDiscovery/>}/>
      <Route path="service-provider/auth" element={<Auth/>}/>
      <Route path="service-provider/dashboard" element={<ServiceProviderDashboard/>}/>
      <Route path="service-provider/service-management" element={<ServiceManagement/>}/>
      <Route path="service-provider/service-request" element={<ServiceRequestHistory/>}/>

      {/* <Route path="/admin" element={<AdminSignIn/>}/>
      <Route path="/admin/dashboard" element={<Dashboard/>}/> */}


    </Routes>
  )
}

export default App
