import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import './App.css'
import Login from "./users/Login"
import Signup from "./users/Signup"


function App() {


  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="signup" element={<Signup/>}/>
    </Routes>
  )
}

export default App
