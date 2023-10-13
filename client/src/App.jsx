import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import React from "react"
import './App.css'
import LandingP from './components/landing page/Landing';
import Home from './components/home/Home';

function App() {

  return (
    <div>
      <Routes>
      <Route path='/' element={<LandingP />}/>
      <Route path='/home' element={<Home />}/>
      </Routes>
    </div>
  )
}

export default App
