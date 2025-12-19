import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import './App.css'
import CustomerAuth from "./users/CustomerAuth"

import Auth from "./service_provider/Auth"

function App() {


  return (
    <Routes>
      <Route path="/" element={<CustomerAuth />} />
      <Route path="service-provider/auth" element={<Auth/>}/>
    
    </Routes>
  )
}

export default App

