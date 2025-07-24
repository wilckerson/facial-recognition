import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import RegisterFace from './pages/RegisterFace'
import FaceLogin from './pages/FaceLogin'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterFace />} />
            <Route path="/login" element={<FaceLogin />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
