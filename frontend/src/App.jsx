import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import './App.css'


import Auth from "./service_provider/Auth"
import ServiceProviderDashboard from "./service_provider/ServiceProviderDashboard"
import ServiceManagement from "./service_provider/ServiceManagement"
import AdminSignIn from './admin/AdminLogin';
import Dashboard from './admin/Dashboard';
import CustomerAuth from "./users/CustomerAuth"
import ServiceRequestsHistory from './service_provider/ServiceRequestHistory';




function App() {


  return (
    <Routes>
      <Route path="/" element={<CustomerAuth />} />

      <Route path="service-provider/auth" element={<Auth/>}/>
      <Route path="service-provider/dashboard" element={<ServiceProviderDashboard/>}/>
      <Route path="service-provider/service-management" element={<ServiceManagement/>}/>
      <Route path="service-provider/service-request" element={<ServiceRequestsHistory/>}/>
    
      <Route path="/admin" element={<AdminSignIn/>}/>
      <Route path="/admin/dashboard" element={<Dashboard/>}/>







    </Routes>
  )
}