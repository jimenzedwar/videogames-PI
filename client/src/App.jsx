import { Routes, Route } from 'react-router-dom';
import React from "react"
import './App.css'
import LandingP from './components/landing page/Landing';
import Home from './components/home/home';
import Detail from './components/detail/detail';
import NewVg from './components/createVg/createVg';

function App() {


  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingP />} />
        <Route path='/home' element={<Home />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/create' element={<NewVg />} />
      </Routes>
    </div>
  )
}

export default App;

