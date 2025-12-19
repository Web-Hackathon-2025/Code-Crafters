import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import './App.css'
import Login from "./users/Login"
import Signup from "./users/Signup"
import Auth from "./service_provider/Auth"
import ServiceProviderDashboard from "./service_provider/ServiceProviderDashboard"
import ServiceManagement from "./service_provider/ServiceManagement"
import AdminSignIn from './admin/AdminLogin';
import Dashboard from './admin/Dashboard';

import AdminSignIn from './admin/AdminLogin';
import Dashboard from './admin/Dashboard';


import ServiceManagement from "./service_provider/ServiceManagement"
function App() {


  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="signup" element={<Signup/>}/>
      <Route path="service-provider/auth" element={<Auth/>}/>
      <Route path="service-provider/dashboard" element={<ServiceProviderDashboard/>}/>
      <Route path="service-provider/service-management" element={<ServiceManagement/>}/>
    
      <Route path="/admin" element={<AdminSignIn/>}/>
      <Route path="/admin/dashboard" element={<Dashboard/>}/>

      <Route path="/admin" element={<AdminSignIn/>}/>
      <Route path="/admin/dashboard" element={<Dashboard/>}/>

      <Route path="/admin" element={<AdminSignIn/>}/>
      <Route path="/admin/dashboard" element={<Dashboard/>}/>

    </Routes>
  )
}

export default App

