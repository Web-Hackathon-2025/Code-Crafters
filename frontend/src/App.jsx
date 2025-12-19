import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import './App.css'
import Login from "./users/Login"
import Signup from "./users/Signup"
import Auth from "./service_provider/Auth"

function App() {


  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="signup" element={<Signup/>}/>
      <Route path="service-provider/auth" element={<Auth/>}/>
    
    </Routes>
  )
}

export default App

