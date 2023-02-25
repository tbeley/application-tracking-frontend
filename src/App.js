import React from 'react'
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'

import Login from './components/Login'
import Applications from './components/Applications'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Applications />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
