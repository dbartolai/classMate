import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './Login'
import Register from './Register'
import LandingPage from './LandingPage/LandingPage'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
